import { NextRequest, NextResponse } from "next/server";
import { apiFetch, guerrillaGetMessage } from "@/lib/mailgw";
import { logger } from "@/lib/logger";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const id = request.nextUrl.searchParams.get("id");
  const provider = request.nextUrl.searchParams.get("provider");

  if (!token || !id || !provider) {
    return NextResponse.json({ error: "Token, id, and provider are required" }, { status: 400 });
  }

  try {
    if (provider === "guerrillamail") {
      const detail = await guerrillaGetMessage(token, parseInt(id));
      const normalized = {
        id: String(detail.mail_id),
        from: { name: detail.mail_from_addr?.name || detail.mail_from || "", address: detail.mail_from_addr?.address || detail.mail_from || "" },
        to: detail.mail_to ? [{ name: detail.mail_to, address: detail.mail_to }] : [],
        subject: detail.mail_subject || "",
        text: detail.mail_body || "",
        html: detail.mail_body ? [detail.mail_body] : [],
        createdAt: detail.mail_date || new Date(detail.mail_timestamp * 1000).toISOString(),
        seen: detail.mail_read === 1,
        intro: detail.mail_excerpt || "",
      };
      return NextResponse.json(normalized);
    }

    const detail = await apiFetch(provider, `/messages/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    await apiFetch(provider, `/messages/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ seen: true }),
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => {});

    return NextResponse.json(detail);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to fetch message";
    logger.error("Message detail: " + msg);
    return NextResponse.json({ error: msg }, { status: 503 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { token, messageId, provider } = await request.json();
    if (!token || !messageId || !provider) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (provider === "guerrillamail") {
      return NextResponse.json({ success: true });
    }

    await apiFetch(provider, `/messages/${messageId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to delete message";
    logger.error("Delete message: " + msg);
    return NextResponse.json({ error: msg }, { status: 503 });
  }
}
