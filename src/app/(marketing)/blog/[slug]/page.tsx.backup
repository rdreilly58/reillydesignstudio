import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const blogPosts: Record<string, { title: string; tag: string; date: string; readTime: string; content: string }> = {
  "embedded-board-bring-up": {
    title: "The Art of Embedded Board Bring-Up",
    tag: "Embedded",
    date: "March 2026",
    readTime: "12 min read",
    content: `
<p class="text-lg leading-relaxed">A box arrives from the fab house. Inside is a stack of freshly manufactured PCBs — your design, realized in copper and silicon. They smell faintly of flux. They are, at this moment, the most expensive paperweights you own.</p>

<p>Board bring-up is the process of turning those paperweights into working systems. After twenty years of doing this — on <strong>satellite modems</strong>, <strong>military SIGINT platforms</strong>, <strong>biomedical devices</strong>, and <strong>telemetry units</strong> — I can tell you it's equal parts science, art, and profanity.</p>

<p>Here's how it actually works.</p>

<hr />

<h2>Phase 1: Don't Blow It Up</h2>

<p>Before you power anything on, you verify you won't destroy it. This isn't paranoia — it's experience. I've seen a reversed polarity protection diode that wasn't in the BOM take out an entire <strong>$15,000 prototype run</strong>.</p>

<h3>Visual Inspection</h3>
<p>Magnifying glass or microscope. Check every component against the BOM. Look for <strong>solder bridges</strong>, <strong>missing parts</strong>, <strong>tombstoned passives</strong>, and <strong>backwards ICs</strong>. The assembler is good, but they're not perfect — especially on Rev A boards with new footprints.</p>

<h3>Continuity and Short Checks</h3>
<p>Before any power is applied: <strong>check every power rail for shorts to ground.</strong> Use a multimeter. Check VCC to GND on every voltage domain. If you find a short, find it <em>now</em> — not after you've cooked a regulator.</p>

<h3>Power Rail Sequencing</h3>
<p>Modern SoCs and FPGAs have <strong>strict power sequencing requirements</strong>. Core voltage before I/O voltage. PLL supply before digital. Some parts will <strong>latch up permanently</strong> if you get this wrong. Read the datasheet power-up sequence section three times, then read it again.</p>

<p>Bring up each rail individually with a bench supply and current limiting. Watch the current draw. Know what quiescent current you expect. If the 1.0V core rail is drawing 500mA before the processor is even configured, something is very wrong.</p>

<hr />

<h2>Phase 2: Signs of Life</h2>

<p>The board is powered. Nothing is smoking. Time for signs of life.</p>

<h3>Clock Verification</h3>
<p>Put an oscilloscope probe on every crystal and oscillator output. Verify <strong>frequency</strong>, <strong>amplitude</strong>, and <strong>stability</strong>. Clocks are the heartbeat of every digital system — if the clocks aren't right, nothing downstream will work, and the failure modes will be baffling.</p>

<h3>The First UART</h3>
<p>The most beautiful moment in board bring-up: <strong>the first characters on a serial console.</strong> Connect a USB-to-UART adapter, open a terminal at the right baud rate (usually 115200, but check), and power cycle. If you see bootloader output, you're in business.</p>

<p>If you see garbage characters, your baud rate is wrong or your TX/RX are swapped. If you see nothing, the processor isn't executing — go back to clocks and reset circuitry.</p>

<h3>JTAG/SWD Connection</h3>
<p>Connect your debug probe (<strong>J-Link</strong>, <strong>ST-Link</strong>, or <strong>FTDI-based</strong>). If you can halt the core and read registers, the processor is alive. This is your lifeline for everything that follows. If JTAG doesn't connect, check:</p>

<ul>
<li>JTAG pins aren't being driven by something else</li>
<li>Reset is properly deasserted</li>
<li>Boot mode pins are set correctly</li>
<li>The debug probe supports the target voltage</li>
</ul>

<hr />

<h2>Phase 3: Peripheral Bring-Up</h2>

<p>Now the systematic work begins. <strong>Bring up each peripheral one at a time.</strong> Don't try to get everything working simultaneously — that's how you end up debugging three problems at once and solving none of them.</p>

<h3>Memory Controller</h3>
<p>If you have external DDR, this is often the <strong>hardest part</strong>. DDR initialization involves dozens of timing parameters that must match your specific memory chips and PCB trace lengths. Use the silicon vendor's memory configuration tool if one exists. If not, prepare for hours with the DDR timing spreadsheet.</p>

<p><strong>Run memory tests</strong> — not just a quick read/write, but a proper <strong>walking-ones pattern</strong> across the full address space. Marginal DDR timing will pass quick tests and fail catastrophically under load.</p>

<h3>The Peripheral Checklist</h3>
<p>Work through each peripheral methodically:</p>

<ul>
<li><strong>UART</strong> — Already done (hopefully). Test all ports, not just console.</li>
<li><strong>SPI</strong> — Connect a logic analyzer. Verify clock polarity/phase (<code>CPOL</code>/<code>CPHA</code>). Talk to a known-good SPI device (flash, ADC).</li>
<li><strong>I²C</strong> — Scan the bus. Every device should ACK at its expected address. Check pull-up resistor values — too high and the bus is slow, too low and weak drivers can't pull down.</li>
<li><strong>Ethernet</strong> — PHY negotiation first (check link LED), then ping. MDIO configuration must match the PHY's register map. Don't forget the MAC address.</li>
<li><strong>USB</strong> — Start with device mode (easier to debug). Host mode adds hub complexity.</li>
<li><strong>GPIO</strong> — Toggle every pin, verify with scope. Check for pins that are supposed to be outputs but are stuck (hardware conflict).</li>
<li><strong>ADC/DAC</strong> — Apply known voltages, verify readings. Check reference voltage accuracy.</li>
<li><strong>PWM/Timers</strong> — Verify frequency and duty cycle with scope.</li>
</ul>

<hr />

<h2>Phase 4: Operating System</h2>

<p>With peripherals validated, it's time to bring up the operating system. The choice depends on the application:</p>

<h3>Bare Metal / Super Loop</h3>
<p>For simple, single-purpose devices. A main loop with interrupt-driven I/O. <strong>Fast startup, deterministic timing, minimal memory footprint.</strong> When your MCU has 64KB of flash, this is your only option — and it's a perfectly valid one.</p>

<h3>FreeRTOS</h3>
<p><strong>The workhorse of embedded RTOS.</strong> Lightweight, well-documented, and runs on everything from Cortex-M0 to Cortex-A. Task-based concurrency with priorities, queues, and semaphores. Free (as in beer and speech). I've used it on dozens of products.</p>

<p>Key decisions at bring-up:</p>
<ul>
<li><strong>Tick rate</strong> — 1ms is standard</li>
<li><strong>Heap allocation</strong> — <code>heap_4</code> for most cases</li>
<li><strong>Stack sizes</strong> — always bigger than you think. Stack overflows in RTOS are the <strong>#1 cause of mysterious crashes</strong></li>
</ul>

<h3>VxWorks</h3>
<p>When reliability requirements are <strong>non-negotiable</strong> — aerospace, defense, medical. POSIX-compliant, deterministic, and certified to <strong>DO-178B/C</strong>. The BSP development is more involved than FreeRTOS, but you get a battle-tested kernel with decades of heritage in safety-critical systems.</p>

<h3>Embedded Linux</h3>
<p>When you need the full ecosystem — networking stacks, filesystems, USB device classes, package management. Custom kernel configuration, <strong>device tree</strong> creation, and root filesystem build (<strong>Yocto</strong> or <strong>Buildroot</strong>). Boot time optimization matters — nobody wants to wait 45 seconds for a thermostat to boot.</p>

<hr />

<h2>Phase 5: Integration and Validation</h2>

<p>Individual peripherals work. The OS boots. Now make them all work <em>together</em> under real-world conditions.</p>

<h3>Thermal Testing</h3>
<p>Run the system at full load in a <strong>temperature chamber</strong>. Watch for frequency throttling, memory errors, and peripheral failures at temperature extremes. The datasheet says -40°C to +85°C, but that assumes perfect layout and decoupling. Your board isn't perfect.</p>

<h3>Power Profiling</h3>
<p>Measure actual power consumption in <strong>every operating mode</strong>: sleep, idle, active, peak. Compare to your power budget. For battery-powered devices, this is where you discover that the WiFi module's sleep current is 10x the datasheet value because of a floating enable pin.</p>

<h3>EMI Pre-Scan</h3>
<p>Before formal compliance testing, do a pre-scan with a <strong>near-field probe</strong>. Find the noisy spots now, when you can still add ferrites and adjust layouts. Failing EMI at the test lab costs <strong>$5,000+ per re-test</strong>.</p>

<hr />

<h2>Lessons From Twenty Years</h2>

<ol>
<li><strong>Read the errata.</strong> Every silicon has bugs. The errata sheet is as important as the datasheet.</li>
<li><strong>Keep a lab notebook.</strong> Document everything — every measurement, every configuration change, every weird behavior. Future you will thank present you.</li>
<li><strong>Current limit everything.</strong> Bench supplies should always have current limiting set before power-on. <em>Always.</em></li>
<li><strong>One change at a time.</strong> Change one thing, test, observe. Never change three things and wonder which one fixed (or broke) it.</li>
<li><strong>Trust the scope, not the debugger.</strong> When hardware and software disagree, the oscilloscope tells the truth.</li>
<li><strong>The problem is always in the last place you look</strong> — because you stop looking. But also, it's usually a ground issue.</li>
</ol>

<hr />

<h2>The Payoff</h2>

<p>There's a unique satisfaction in board bring-up that software-only engineers never experience. You're bridging the physical and digital worlds. When that first UART message prints, when the Ethernet link LED blinks, when the RTOS starts scheduling tasks on hardware you helped design — <strong>that's engineering at its most tangible.</strong></p>

<p>If you have a board that needs software, or a design that needs embedded expertise, <a href="/shop/services/embedded">let's talk</a>. I've been doing this for two decades, across satellite modems, defense platforms, biomedical instruments, and everything in between. And I still get excited when the scope shows a clean clock edge.</p>
    `,
  },
  "what-is-openclaw": {
    title: "What Is OpenClaw and How to Set It Up",
    tag: "AI",
    date: "March 2026",
    readTime: "8 min read",
    content: `
<p>Imagine having a personal AI assistant that doesn't just answer questions — it actually <em>does things</em> for you. Checks your email, manages your calendar, sends messages on WhatsApp, controls your smart home, deploys code, and remembers context from yesterday's conversation.</p>

<p>That's <strong>OpenClaw</strong>. And I use it every single day.</p>

<h2>What OpenClaw Actually Is</h2>

<p>OpenClaw is an open-source AI agent platform that connects large language models (like Claude or GPT) to your real-world tools and services. Unlike ChatGPT or other chatbots that just talk, OpenClaw <em>acts</em>. It has a gateway that runs on your hardware, connects to channels like WhatsApp, Telegram, Discord, and SMS, and uses "skills" to interact with APIs, databases, files, and devices.</p>

<p>Think of it as the middleware between AI and your life.</p>

<h2>What Can It Do?</h2>

<ul>
<li><strong>Email triage</strong> — scans your inbox, flags urgent messages, drafts replies</li>
<li><strong>Calendar management</strong> — creates events, checks conflicts, sends reminders</li>
<li><strong>Messaging</strong> — sends and receives WhatsApp, Telegram, iMessage, SMS</li>
<li><strong>Smart home</strong> — controls Hue lights, Sonos speakers, security cameras</li>
<li><strong>Code deployment</strong> — pushes to GitHub, triggers CI/CD, monitors builds</li>
<li><strong>Research</strong> — searches the web, fetches and summarizes pages</li>
<li><strong>Memory</strong> — remembers conversations, preferences, and context across sessions</li>
</ul>

<h2>How to Set It Up</h2>

<h3>Step 1: Install OpenClaw</h3>

<p>On macOS, it's one command:</p>

<pre><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

<p>This installs the gateway, CLI, and desktop app. On Linux, the same script works. Windows support is coming.</p>

<h3>Step 2: Configure Your AI Provider</h3>

<p>OpenClaw works with Anthropic (Claude), OpenAI (GPT), Google (Gemini), and others. You'll need an API key from your preferred provider:</p>

<pre><code>openclaw configure --section ai</code></pre>

<h3>Step 3: Connect Your Channels</h3>

<p>This is where it gets powerful. Connect the messaging platforms you actually use:</p>

<ul>
<li><strong>WhatsApp</strong> — link your number via QR code</li>
<li><strong>Telegram</strong> — create a bot and add the token</li>
<li><strong>Discord</strong> — add a bot to your server</li>
<li><strong>SMS</strong> — connect via Twilio</li>
</ul>

<h3>Step 4: Add Skills</h3>

<p>Skills are plugins that give OpenClaw capabilities. Want it to check your Gmail? Install the Google Workspace skill. Want it to control your lights? Install the Hue skill. Browse available skills at <a href="https://clawhub.com">clawhub.com</a>.</p>

<h3>Step 5: Start Talking</h3>

<p>Send a message on any connected channel. OpenClaw responds, takes actions, and remembers context. It's that simple.</p>

<h2>Why It Matters for Business</h2>

<p>Most "AI for business" solutions are glorified chatbots. OpenClaw is different because it connects to your actual infrastructure. It can manage your CRM, process invoices, monitor systems, and handle customer inquiries — all through natural conversation.</p>

<p>For small businesses, this means having the capabilities of a tech team without hiring one.</p>

<h2>Need Help Setting It Up?</h2>

<p>I offer <a href="/shop/services/ai">OpenClaw implementation services</a> — full setup, channel integrations, custom skill development, and training. As someone who uses OpenClaw daily for everything from managing my business to controlling my home, I know what works and what doesn't.</p>

<p><a href="/shop/services">Request a quote</a> and let's get you set up.</p>
    `,
  },
  "ai-for-small-business": {
    title: "How to Add AI to Your Small Business in 2026",
    tag: "AI",
    date: "March 2026",
    readTime: "7 min read",
    content: `
<p>You've heard the hype. AI is going to transform everything. But if you're running a small business, the question isn't whether AI is impressive — it's whether it's <em>useful</em> for you, right now, without a six-figure budget.</p>

<p>The answer is yes. Here's how.</p>

<h2>Start With the Problem, Not the Technology</h2>

<p>The biggest mistake small businesses make with AI is starting with "we should use AI" instead of "we have this problem." Flip it around:</p>

<ul>
<li>Spending 2 hours a day on email? → AI email triage</li>
<li>Missing customer inquiries? → AI-powered auto-responses</li>
<li>Can't find information across your documents? → RAG pipeline</li>
<li>Manual data entry killing productivity? → AI extraction and automation</li>
</ul>

<h2>The Three Levels of AI Adoption</h2>

<h3>Level 1: AI Tools You Already Have (Free - $20/mo)</h3>

<p>You're probably already paying for AI and don't know it:</p>

<ul>
<li><strong>Gmail</strong> — Smart compose, auto-categorization</li>
<li><strong>Microsoft 365 Copilot</strong> — Document drafting, spreadsheet analysis</li>
<li><strong>Notion AI</strong> — Content generation, summarization</li>
<li><strong>Canva AI</strong> — Design generation and editing</li>
</ul>

<p>Step one: actually use the AI features in tools you're already paying for.</p>

<h3>Level 2: AI Assistant (API costs only, ~$50-200/mo)</h3>

<p>This is where it gets interesting. Set up a personal AI assistant using <a href="/blog/what-is-openclaw">OpenClaw</a> that:</p>

<ul>
<li>Monitors your email and alerts you to important messages</li>
<li>Manages your calendar and schedules meetings</li>
<li>Answers customer questions on WhatsApp or your website</li>
<li>Generates reports from your business data</li>
<li>Handles routine tasks you do every day</li>
</ul>

<p>The cost? Just the AI API usage — typically $50-200/month depending on volume. No subscription fees, no per-seat pricing.</p>

<h3>Level 3: Custom AI Solutions ($2,500+)</h3>

<p>When off-the-shelf tools aren't enough:</p>

<ul>
<li><strong>RAG pipelines</strong> — AI that answers questions about YOUR documents, products, and knowledge base</li>
<li><strong>Custom automation</strong> — Workflows that connect your specific tools and processes</li>
<li><strong>Fine-tuned models</strong> — AI trained on your industry's language and patterns</li>
<li><strong>Customer-facing AI</strong> — Chatbots and assistants that actually know your business</li>
</ul>

<h2>What AI Is NOT Good At (Yet)</h2>

<p>Let's be honest about the limitations:</p>

<ul>
<li><strong>Replacing human judgment</strong> — AI assists decisions, it doesn't make them</li>
<li><strong>Handling novel situations</strong> — It's great at patterns, weak at truly new scenarios</li>
<li><strong>Guaranteed accuracy</strong> — Always verify AI output for critical decisions</li>
<li><strong>Emotional intelligence</strong> — Customer complaints still need a human touch</li>
</ul>

<h2>ROI You Can Actually Measure</h2>

<p>Here's what real small businesses see:</p>

<ul>
<li><strong>Email management:</strong> 1-2 hours saved per day</li>
<li><strong>Customer response time:</strong> From hours to seconds for common questions</li>
<li><strong>Document processing:</strong> 80% reduction in manual data entry</li>
<li><strong>Content creation:</strong> First drafts in minutes instead of hours</li>
</ul>

<p>At even $50/hour of your time, saving 1 hour per day = $1,100/month in value. The tools cost a fraction of that.</p>

<h2>Getting Started</h2>

<p>Don't try to AI-ify everything at once. Pick your biggest time sink, apply AI to it, measure the results, then move to the next one.</p>

<p>If you want expert guidance, I offer <a href="/shop/services/ai">AI consulting</a> specifically for small businesses. No jargon, no overselling — just practical solutions that deliver ROI.</p>

<p><a href="/shop/services">Let's talk about your business</a>.</p>
    `,
  },
  "rag-pipelines-explained": {
    title: "RAG Pipelines Explained for Business Owners",
    tag: "AI",
    date: "March 2026",
    readTime: "6 min read",
    content: `
<p>You've probably heard the term "RAG" thrown around in AI conversations. It sounds technical, but the concept is simple and incredibly useful for businesses. Let me break it down.</p>

<h2>The Problem RAG Solves</h2>

<p>AI models like ChatGPT and Claude are trained on public internet data. They're great at general knowledge, but they don't know anything about:</p>

<ul>
<li>Your company's internal documents</li>
<li>Your product catalog and pricing</li>
<li>Your customer support history</li>
<li>Your HR policies and procedures</li>
<li>Your proprietary research and data</li>
</ul>

<p>So when a customer asks "What's your return policy?" or an employee asks "What's the PTO policy for the Denver office?", a standard AI can't help. RAG fixes this.</p>

<h2>What RAG Actually Is</h2>

<p><strong>RAG = Retrieval-Augmented Generation</strong></p>

<p>In plain English: before the AI answers a question, it first <em>searches your documents</em> for relevant information, then uses what it found to generate an accurate answer.</p>

<p>Think of it like this:</p>

<ol>
<li><strong>Without RAG:</strong> "Hey AI, what's our return policy?" → "I don't know, I'm a general AI."</li>
<li><strong>With RAG:</strong> "Hey AI, what's our return policy?" → <em>searches your policy documents</em> → "Your return policy allows returns within 30 days with receipt. Items must be in original packaging. Refunds are processed within 5-7 business days."</li>
</ol>

<h2>How It Works (Simply)</h2>

<h3>Step 1: Ingest Your Documents</h3>
<p>Your documents (PDFs, Word files, web pages, databases) are broken into small chunks and converted into mathematical representations called "embeddings." These are stored in a vector database.</p>

<h3>Step 2: Search</h3>
<p>When someone asks a question, the system converts the question into an embedding and finds the most relevant document chunks. This is semantic search — it understands meaning, not just keywords.</p>

<h3>Step 3: Generate</h3>
<p>The relevant chunks are sent to the AI along with the question. The AI reads the context and generates an accurate, grounded answer. It can even cite which document the information came from.</p>

<h2>Real Business Use Cases</h2>

<ul>
<li><strong>Customer support:</strong> AI that answers product questions using your actual documentation</li>
<li><strong>Internal knowledge base:</strong> Employees ask questions about policies, procedures, technical docs</li>
<li><strong>Sales enablement:</strong> AI that knows your product catalog, pricing, and competitive positioning</li>
<li><strong>Legal/compliance:</strong> Quick answers from contracts, regulations, and compliance documents</li>
<li><strong>Onboarding:</strong> New employees get instant answers about your company</li>
</ul>

<h2>What It Costs</h2>

<p>A basic RAG setup for a small business typically runs:</p>

<ul>
<li><strong>Setup:</strong> $2,500 - $10,000 (depending on complexity)</li>
<li><strong>Ongoing:</strong> $50 - $500/month (AI API costs + vector database hosting)</li>
<li><strong>ROI:</strong> Usually pays for itself within 2-3 months through time savings</li>
</ul>

<h2>When You DON'T Need RAG</h2>

<p>RAG isn't always the answer:</p>

<ul>
<li>If your documents change every hour → real-time integration might be better</li>
<li>If you have fewer than 10 documents → just paste them into ChatGPT</li>
<li>If accuracy is life-or-death critical → RAG + human review, not RAG alone</li>
</ul>

<h2>Getting Started</h2>

<p>If your business has documents that people frequently search through or ask questions about, RAG can save significant time. I build <a href="/shop/services/ai">custom RAG pipelines</a> for businesses — from document ingestion to deployment.</p>

<p><a href="/shop/services">Let's discuss your use case</a>.</p>
    `,
  },
  "white-space-design": {
    title: "Why White Space Is the Most Underrated Design Tool",
    tag: "Design Theory",
    date: "February 2026",
    readTime: "6 min read",
    content: `
<p>Every designer learns about color, typography, and layout. But the most powerful design element is the one you <em>don't</em> add. White space — also called negative space — is the breathing room between and around elements. And most people drastically underuse it.</p>

<h2>White Space Isn't Wasted Space</h2>

<p>The most common pushback I hear from clients: "Can we use that empty space for something?" It feels counterintuitive — you're paying for a design, so every pixel should be working, right?</p>

<p>Wrong. White space <em>is</em> working. It's doing some of the hardest jobs in design:</p>

<ul>
<li><strong>Directing attention</strong> — When everything is crammed together, nothing stands out. White space creates visual hierarchy by isolating what matters.</li>
<li><strong>Improving comprehension</strong> — Studies consistently show that increased margins and line spacing improve reading comprehension by 20% or more.</li>
<li><strong>Conveying quality</strong> — Luxury brands use massive amounts of white space. It signals confidence and premium positioning. Think Apple, Cartier, Aesop.</li>
<li><strong>Reducing cognitive load</strong> — Your brain processes cluttered layouts slower. White space lets users absorb information without feeling overwhelmed.</li>
</ul>

<h2>Micro vs. Macro White Space</h2>

<p>There are two scales of white space, and both matter:</p>

<h3>Micro White Space</h3>
<p>The small gaps: letter spacing, line height, padding inside buttons, space between form fields. This is where readability lives. Get micro white space wrong and your text feels suffocating — or floaty and disconnected.</p>

<p>Rules of thumb:</p>
<ul>
<li>Body text line height: 1.5–1.7x the font size</li>
<li>Paragraph spacing: at least 1x the line height</li>
<li>Button padding: generous horizontal padding (1.5–2x vertical)</li>
<li>Form field spacing: consistent vertical rhythm</li>
</ul>

<h3>Macro White Space</h3>
<p>The big gaps: margins, section spacing, the gap between a headline and its content. This is where composition lives. Macro white space creates the overall feeling of a page — whether it feels open and inviting or dense and overwhelming.</p>

<p>The best test: squint at your design until you can't read the text. Do you see clear groups and hierarchy, or a uniform grey blob?</p>

<h2>The Proximity Principle</h2>

<p>White space is how you show relationships. Elements that are close together are perceived as related. Elements with space between them are perceived as separate. This is Gestalt's principle of proximity, and it's more powerful than most designers realize.</p>

<p>A practical example: if the space between a heading and its paragraph is the same as the space between that paragraph and the next heading, the hierarchy breaks down. The heading should be <em>closer</em> to its content than to the previous section.</p>

<h2>White Space in Practice</h2>

<h3>Landing Pages</h3>
<p>Give your hero section room to breathe. A full-viewport hero with a single headline, a sentence of copy, and one CTA button will outperform a cramped hero with five competing elements every time.</p>

<h3>Cards and Lists</h3>
<p>Internal card padding should be generous — at minimum 24px on all sides, more for feature cards. The space between cards matters too. If cards are touching, they feel like a wall. Give them 16–24px gaps.</p>

<h3>Typography</h3>
<p>The most impactful white space change you can make: increase your line height. If your body text is at 1.4 line height, bump it to 1.6. The difference is dramatic and immediate.</p>

<h2>When to Break the Rules</h2>

<p>Dense layouts aren't always bad. News sites, dashboards, and data-heavy applications need information density. The key is <em>intentional</em> density — tight spacing with clear hierarchy — versus <em>accidental</em> clutter.</p>

<p>Even in dense layouts, white space still does the heavy lifting at the macro level: section dividers, breathing room around key actions, and clear separation between navigation and content.</p>

<h2>The Takeaway</h2>

<p>Next time you're reviewing a design and something feels "off" but you can't pinpoint why — try adding space. More padding. More margin. More room to breathe. Nine times out of ten, that's the fix.</p>

<p>White space doesn't cost anything. It doesn't slow down your site. And it makes everything else in your design work harder. Use it generously.</p>

<p>Need help with your brand's visual design? <a href="/shop/services">Let's talk</a>.</p>
    `,
  },
  "design-system-2026": {
    title: "Building a Design System from Scratch in 2026",
    tag: "Process",
    date: "January 2026",
    readTime: "9 min read",
    content: `
<p>I've built design systems for startups, agencies, and my own projects. Every time, I learn something new. Here's my current playbook for building a design system from zero — updated for the tools and patterns that actually work in 2026.</p>

<h2>What a Design System Actually Is</h2>

<p>A design system isn't a Figma file. It's not a component library. It's not a style guide. It's all of those things working together as a <em>single source of truth</em> for how your product looks, feels, and behaves.</p>

<p>The components:</p>
<ul>
<li><strong>Design tokens</strong> — Colors, spacing, typography, shadows, radii, motion</li>
<li><strong>Components</strong> — Buttons, inputs, cards, modals, navigation</li>
<li><strong>Patterns</strong> — How components combine (forms, data tables, empty states)</li>
<li><strong>Guidelines</strong> — Voice, tone, accessibility, content rules</li>
<li><strong>Documentation</strong> — How and when to use everything above</li>
</ul>

<h2>Step 1: Audit What Exists</h2>

<p>Before building anything new, screenshot every unique UI element in your product. Every button variant, every card style, every shade of grey. Group them.</p>

<p>You'll find two things:</p>
<ol>
<li>Way more inconsistency than you expected (17 shades of blue, anyone?)</li>
<li>Natural patterns that already work and should be codified</li>
</ol>

<p>This audit is your starting point. Don't design a system in a vacuum — design one that fixes real problems.</p>

<h2>Step 2: Define Your Tokens</h2>

<p>Design tokens are the atomic values that everything else builds on. Start here:</p>

<h3>Color</h3>
<p>Define a color scale, not just individual colors. I use a 50–950 scale (like Tailwind) for each hue. Then create semantic aliases — <code>--color-primary</code>, <code>--color-surface</code>, <code>--color-text-muted</code> — that reference the scale. When you need dark mode or a brand refresh, you change the aliases, not every component.</p>

<h3>Spacing</h3>
<p>Use a consistent scale. I like 4px base with a geometric progression: 4, 8, 12, 16, 24, 32, 48, 64, 96. Every margin, padding, and gap in your system should come from this scale.</p>

<h3>Typography</h3>
<p>Define a type scale with clear hierarchy: Display, H1, H2, H3, Body, Small, Tiny. Each level gets a size, weight, line height, and letter spacing. No ad-hoc font sizes anywhere in the product.</p>

<h2>Step 3: Build Core Components</h2>

<p>Don't try to build everything at once. Start with the five components you use most:</p>

<ol>
<li><strong>Button</strong> — Primary, secondary, ghost, destructive. With sizes and states.</li>
<li><strong>Input</strong> — Text, select, checkbox, radio, textarea. With labels, help text, and error states.</li>
<li><strong>Card</strong> — A flexible container with header, body, footer slots.</li>
<li><strong>Modal/Dialog</strong> — Overlay with focus trap and escape handling.</li>
<li><strong>Navigation</strong> — Header, sidebar, breadcrumbs, tabs.</li>
</ol>

<p>Each component needs a Figma component with proper variants, a coded component with matching props, and documentation on when to use it.</p>

<h2>Step 4: Tooling in 2026</h2>

<ul>
<li><strong>Design:</strong> Figma with Variables for tokens</li>
<li><strong>Code:</strong> React + TypeScript + Tailwind CSS v4</li>
<li><strong>Documentation:</strong> Storybook 8 for interactive component docs</li>
<li><strong>Testing:</strong> Playwright for visual regression, axe-core for accessibility</li>
</ul>

<p>The biggest shift: Tailwind v4's CSS-first configuration means your design tokens <em>are</em> your CSS variables. Define once, use everywhere.</p>

<h2>Step 5: Governance</h2>

<p>A design system without governance is just a component library that gets ignored. For small teams, keep it light: a shared channel, a monthly review, and a CHANGELOG. Contribution guidelines, review process, versioning, and deprecation plans round it out.</p>

<h2>Common Mistakes</h2>

<ul>
<li><strong>Over-engineering early</strong> — Don't build 47 button variants before you ship a product.</li>
<li><strong>Designing for Figma, not for code</strong> — If Figma components don't map to coded components, the system diverges.</li>
<li><strong>Ignoring accessibility</strong> — Bake it in from day one. Retrofitting WCAG compliance is 10x harder.</li>
<li><strong>No dark mode planning</strong> — Use semantic tokens now. It's nearly free upfront and painful to retrofit.</li>
</ul>

<h2>The Payoff</h2>

<p>A well-built design system pays dividends forever: new pages go from days to hours, design reviews focus on UX not pixels, new team members ship consistent UI from day one, and brand refreshes become a token update rather than a full rebuild.</p>

<p>Building a product and need a design system? <a href="/shop/services">I can help</a>.</p>
    `,
  },
  "typography-rules": {
    title: "Typography Rules Every Designer Should Know",
    tag: "Typography",
    date: "January 2026",
    readTime: "7 min read",
    content: `
<p>Typography is the foundation of design. Get it right and everything else falls into place. Get it wrong and no amount of beautiful imagery or clever layout will save you. Here are the rules I live by.</p>

<h2>1. Hierarchy Is Everything</h2>

<p>Every piece of text on a page exists in a hierarchy. The reader's eye should flow naturally from most important to least important, without thinking about it.</p>

<p>You create hierarchy with four tools, in order of effectiveness:</p>
<ol>
<li><strong>Size</strong> — The most obvious. Bigger = more important.</li>
<li><strong>Weight</strong> — Bold draws the eye before regular weight.</li>
<li><strong>Color/contrast</strong> — High contrast text reads as primary. Muted text reads as secondary.</li>
<li><strong>Position</strong> — Top and left are read first (in LTR languages).</li>
</ol>

<p>The mistake most people make: using all four at once on one level, leaving no tools to distinguish secondary from tertiary content.</p>

<h2>2. Choose Two Typefaces. Maximum.</h2>

<p>One for headings, one for body. That's it. If you're using three or more, you almost certainly don't need them — you need better use of weight, size, and spacing within fewer families.</p>

<p>Safe pairings that always work:</p>
<ul>
<li><strong>Geometric sans + humanist sans:</strong> Inter + Source Sans Pro</li>
<li><strong>Serif + sans-serif:</strong> Playfair Display + Inter</li>
<li><strong>Monospace + sans-serif:</strong> JetBrains Mono + Inter (great for dev/tech brands)</li>
</ul>

<p>The cheat: one well-designed typeface with a full weight range (thin through black) can do everything. Inter, Satoshi, and General Sans are all excellent solo choices.</p>

<h2>3. Line Length: 45–75 Characters</h2>

<p>This is the single most ignored typography rule, and it has the biggest impact on readability. The ideal line length for body text is <strong>45–75 characters per line</strong>. For a 16px font, that's roughly <code>max-width: 65ch</code>.</p>

<p>At wider lengths, the eye struggles to track back to the start of the next line. At narrower lengths, constant line-breaking disrupts reading flow.</p>

<h2>4. Line Height Is Not One-Size-Fits-All</h2>

<ul>
<li><strong>Body text (14–18px):</strong> 1.5–1.7 line height</li>
<li><strong>Large text (24–36px):</strong> 1.2–1.4 line height</li>
<li><strong>Display text (48px+):</strong> 1.0–1.2 line height</li>
</ul>

<p>The pattern: as font size increases, line height ratio <em>decreases</em>. Large display text with 1.6 line height has gaps you could drive a truck through. Small body text at 1.2 feels suffocating.</p>

<h2>5. Whitespace > Dividers</h2>

<p>If you're reaching for a horizontal rule or border to separate sections, try removing it and adding more space instead. In most cases, 48–64px of vertical space creates a cleaner separation than a 1px line. Dividers add visual noise. Space adds clarity.</p>

<h2>6. Alignment: Pick One and Commit</h2>

<p>Left-aligned text is the default for a reason — it creates a consistent left edge the eye can track. Center-aligned works for short blocks (headlines, CTAs) but becomes unreadable for paragraphs.</p>

<p>The cardinal sin: mixing left-aligned and center-aligned text in the same section.</p>

<h2>7. Contrast Ratios Matter</h2>

<p>WCAG 2.1 requires <strong>4.5:1</strong> contrast for normal text and <strong>3:1</strong> for large text. Light grey on white might look "clean" but if it fails contrast ratios, it's inaccessible.</p>

<p>On dark backgrounds, pure white on pure black has <em>too much</em> contrast and causes eye strain. Soften it: use zinc-100 on zinc-950 for comfortable reading.</p>

<h2>8. Responsive Typography</h2>

<p>A 72px heading that looks commanding on desktop becomes a wall of text on mobile. Use <code>clamp()</code> for fluid scaling:</p>

<pre><code>h1 { font-size: clamp(2rem, 5vw, 4rem); }</code></pre>

<h2>9. Don't Stretch, Squish, or Fake It</h2>

<p>Never horizontally scale a typeface. Never apply faux bold or faux italic. If you need bold, load the bold weight. Real type designers spend months perfecting weight distribution — don't let CSS undo that in one line.</p>

<h2>10. Read Your Own Design</h2>

<p>The ultimate typography test: actually read the text. Not skim — <em>read</em>. Out loud if possible. If you stumble, lose your place, or feel fatigued, the typography needs work.</p>

<p>Good typography is invisible. The reader absorbs the content without ever thinking about the typeface, spacing, or layout. That's the goal.</p>

<p>Working on a project that needs typographic polish? <a href="/shop/services">I'd love to help</a>.</p>
    `,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  return { title: post?.title || "Blog Post" };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return (
      <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft size={14} /> Back to Blog
        </Link>
        <h1 className="text-4xl font-bold text-white mt-2 mb-2">Post Not Found</h1>
        <p className="text-zinc-400">This post doesn&apos;t exist yet.</p>
      </article>
    );
  }

  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm mb-8 transition-colors">
        <ArrowLeft size={14} /> Back to Blog
      </Link>
      <span className={`text-xs font-medium ${post.tag === "AI" ? "text-emerald-400" : post.tag === "Embedded" ? "text-amber-400" : "text-violet-400"}`}>{post.tag}</span>
      <h1 className="text-4xl font-bold text-white mt-2 mb-2">{post.title}</h1>
      <p className="text-zinc-500 text-sm mb-10">{post.date} · {post.readTime}</p>
      <div
        className="prose prose-invert prose-zinc max-w-none prose-headings:text-white prose-a:text-violet-400 hover:prose-a:text-violet-300 prose-strong:text-white prose-code:text-violet-300 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
