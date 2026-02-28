import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    const accountCount = await prisma.account.count();
    const sessionCount = await prisma.session.count();
    return NextResponse.json({
      dbConnected: true,
      userCount,
      accountCount,
      sessionCount,
    });
  } catch (e: any) {
    return NextResponse.json({
      dbConnected: false,
      error: e.message,
    });
  }
}
