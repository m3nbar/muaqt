import { NextRequest, NextResponse } from "next/server";
import { apiFetch, guerrillaGetMessages } from "@/lib/mailgw";
import { logger } from "@/lib/logger";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const provider = request.nextUrl.searchParams.get("provider");

  if (!token || !provider) {
    return NextResponse.json({ error: "Token and provider are required" }, { status: 400 });
  }

  try {
    if (provider === "guerrillamail") {
      const data = await guerrillaGetMessages(token);
      logger.info(`Inbox fetched via guerrillamail: ${data.count} messages`);
      return NextResponse.json(data, {
        headers: { "Cache-Control": "no-cache, no-store" },
      });
    }

    const data: any = await apiFetch(provider, "/messages", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const messages = Array.isArray(data) ? data : (data?.["hydra:member"] || data?.messages || []);
    logger.info(`Inbox fetched: ${messages.length} messages`);

    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-cache, no-store" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to fetch messages";
    logger.error("Inbox: " + msg);
    return NextResponse.json({ error: msg }, { status: 503 });
  }
}
