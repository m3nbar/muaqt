import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function GET() {
  const PROVIDERS = ["https://api.mail.tm", "https://api.mail.gw"];

  for (const baseUrl of PROVIDERS) {
    try {
      const res = await fetch(`${baseUrl}/domains`, {
        signal: AbortSignal.timeout(8000),
        headers: { Accept: "application/json" },
      });

      if (!res.ok) continue;

      const text = await res.text();
      let data: any;

      try { data = JSON.parse(text); } catch { continue; }

      let members = data?.["hydra:member"];
      if (!members && Array.isArray(data)) {
        members = data;
      }

      if (members && members.length > 0) {
        return NextResponse.json({ "hydra:member": members, "hydra:totalItems": members.length });
      }
    } catch {}
  }

  return NextResponse.json({ error: "No domains available" }, { status: 503 });
}
