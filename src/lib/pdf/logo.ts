import fs from "fs";
import path from "path";

export function getLogoDataUri(): string {
  const logoPath = path.join(process.cwd(), "public", "signature-logo.png");
  const logoBuffer = fs.readFileSync(logoPath);
  return `data:image/png;base64,${logoBuffer.toString("base64")}`;
}
