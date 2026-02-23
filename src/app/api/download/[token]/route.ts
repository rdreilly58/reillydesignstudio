import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function getSignedDownloadUrl(fileKey: string, fileName: string): Promise<string> {
  const { S3Client, GetObjectCommand } = await import("@aws-sdk/client-s3");
  const { getSignedUrl } = await import("@aws-sdk/s3-request-presigner");
  const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
  return getSignedUrl(s3, new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: fileKey,
    ResponseContentDisposition: `attachment; filename="${fileName}"`,
  }), { expiresIn: 300 });
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const download = await prisma.digitalDownload.findUnique({ where: { token } });

  if (!download) return NextResponse.json({ error: "Invalid link" }, { status: 404 });
  if (download.expiresAt < new Date()) return NextResponse.json({ error: "Link expired" }, { status: 410 });
  if (download.downloadCount >= download.maxDownloads) return NextResponse.json({ error: "Download limit reached" }, { status: 403 });

  await prisma.digitalDownload.update({
    where: { id: download.id },
    data: { downloadCount: { increment: 1 } },
  });

  const url = await getSignedDownloadUrl(download.fileKey, download.fileName);
  return NextResponse.redirect(url);
}
