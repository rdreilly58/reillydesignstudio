# Softphone — Internal Documentation

A browser-based softphone that lets you make and receive calls using your Mac's mic and speakers, powered by Twilio's Voice JavaScript SDK.

## Architecture

```
Browser (localhost:7777)
    └── Twilio Voice JS SDK
            └── TwiML App (APe808609e9be201d921513c91a4bb82a3)
                    └── ngrok → softphone server (port 7777)
                            ├── /token          → Twilio Access Token
                            ├── /voice/call     → outbound TwiML (Dial)
                            └── /voice/webhook  → proxied to OpenClaw voice server (port 3334)
```

## Components

### 1. Softphone Server (`~/softphone/server.py`)
Python HTTP server on port 7777. Handles:
- `GET /` — serves the softphone UI (`index.html`)
- `GET /token` — generates a Twilio Access Token (TTL: 1hr) using the API key
- `GET /twilio.min.js` — serves the Twilio Voice SDK from local npm install
- `POST /voice/call` — generates TwiML `<Dial>` for outbound browser calls
- `POST /voice/webhook*` — proxies to OpenClaw's voice webhook on port 3334

### 2. Softphone UI (`~/softphone/index.html`)
Single-page dialpad using Twilio Voice JS SDK v2.x. Features:
- Dialpad (0-9, *, #)
- Call / Hangup buttons
- Status display (Ready / Calling / Connected)
- DTMF tone sending during active calls

### 3. LaunchAgent (`~/Library/LaunchAgents/com.openclaw.softphone.plist`)
Keeps the server alive and restarts it on reboot automatically.

### 4. ngrok Tunnel
Exposes port 7777 publicly so Twilio can reach the webhook.
- Domain: `parallelable-channing-estuarial.ngrok-free.dev`
- Both the Twilio phone number and TwiML App voice URLs point here

### 5. OpenClaw Voice Server (port 3334)
Handles AI conversation mode, STT via OpenAI Realtime API, and TTS via OpenAI.
Runs inside the OpenClaw gateway process.

## Twilio Resources

| Resource | ID |
|----------|----|
| Account SID | stored in `~/.openclaw/openclaw.json` (never committed) |
| Phone Number | `+15713832803` (SID stored in openclaw config) |
| TwiML App | `APe808609e9be201d921513c91a4bb82a3` (OpenClaw Softphone) |
| API Key | stored in `~/softphone/server.py` — **do not commit** |

## Usage

Open **http://localhost:7777** in Chrome.

1. Wait for status to show **Ready**
2. Enter a phone number on the dialpad (starts with +1)
3. Click 📞 to call
4. Click 🔴 to hang up
5. Allow microphone access when prompted

## Starting / Stopping

The server is managed by a macOS LaunchAgent and starts automatically on login.

```bash
# Status
launchctl list | grep softphone

# Restart
launchctl unload ~/Library/LaunchAgents/com.openclaw.softphone.plist
launchctl load ~/Library/LaunchAgents/com.openclaw.softphone.plist

# Logs
tail -f /tmp/softphone.log
```

ngrok must also be running for Twilio webhooks to work:
```bash
# Check ngrok
curl -s http://localhost:4040/api/tunnels | python3 -m json.tool

# Restart ngrok (if domain changed, update Twilio URLs)
pkill ngrok
ngrok http 7777 --domain=parallelable-channing-estuarial.ngrok-free.dev &
```

## If ngrok Domain Changes

If the ngrok domain ever changes (e.g. after reinstall), update these two URLs:

```python
import json, urllib.request, urllib.parse, base64

cfg = json.load(open('/Users/rreilly/.openclaw/openclaw.json'))
vc = cfg['plugins']['entries']['voice-call']['config']
sid = vc['twilio']['accountSid']
token = vc['twilio']['authToken']
creds = base64.b64encode(f'{sid}:{token}'.encode()).decode()
NEW_URL = 'https://YOUR-NEW-DOMAIN.ngrok-free.dev'

# Update phone number voice URL
import urllib.request, urllib.parse
for resource, url_field, url_val in [
    (f'https://api.twilio.com/2010-04-01/Accounts/{sid}/IncomingPhoneNumbers/PN2101643950da8414b060f2e128072ea4.json',
     'VoiceUrl', NEW_URL + '/voice/webhook'),
    (f'https://api.twilio.com/2010-04-01/Accounts/{sid}/Applications/APe808609e9be201d921513c91a4bb82a3.json',
     'VoiceUrl', NEW_URL + '/voice/call'),
]:
    data = urllib.parse.urlencode({url_field: url_val}).encode()
    req = urllib.request.Request(resource, data=data, method='POST')
    req.add_header('Authorization', f'Basic {creds}')
    urllib.request.urlopen(req)
    print(f'Updated {url_field} to {url_val}')
```

Also update `publicUrl` in OpenClaw config:
```bash
openclaw config set 'plugins.entries.voice-call.config.publicUrl' '"https://YOUR-NEW-DOMAIN.ngrok-free.dev/voice/webhook"'
openclaw gateway restart
```

## AI Conversation Mode

To have OpenClaw AI answer/make calls (not the softphone):
```python
# Via OpenClaw voice_call tool
voice_call(action="initiate_call", to="+1XXXXXXXXXX", message="Hello!", mode="conversation")
```

Conversation mode uses:
- **STT:** OpenAI Realtime API (gpt-4o-transcribe) via WebSocket media stream
- **LLM:** openai/gpt-4o-mini (configurable via `responseModel`)
- **TTS:** OpenAI tts-1, voice: alloy

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| "Connecting..." forever | Token server down | Restart LaunchAgent |
| "application error" audio | TwiML App pointing at wrong URL | Check ngrok domain matches TwiML App URL |
| Silent call (no audio both ways) | ngrok tunnel down | Restart ngrok |
| STT not working | Streaming not enabled | `openclaw config get plugins.entries.voice-call.config.streaming` |
| `<Pause length="30"/>` TwiML | TTS synthesis failed | Check OpenAI API key in voice-call config |
