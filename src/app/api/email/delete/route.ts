import { NextResponse } from "next/server";
import { apiFetch, guerrillaForgetMe } from "@/lib/mailgw";
import { logger } from "@/lib/logger";

export async function POST(request: Request) {
  try {
    const { accountId, token, provider } = await request.json();
    if (!accountId || !token || !provider) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (provider === "guerrillamail") {
      await guerrillaForgetMe(token);
    } else {
      await apiFetch(provider, `/accounts/${accountId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }

    logger.info(`Deleted account: ${accountId}`);
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to delete account";
    logger.error("Delete account: " + msg);
    return NextResponse.json({ error: msg }, { status: 503 });
  }
}
