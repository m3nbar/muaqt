import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { guerrillaCreateEmail } from "@/lib/mailgw";

export const dynamic = "force-dynamic";

export async function POST() {
  const PROVIDERS = ["https://api.mail.tm", "https://api.mail.gw"];

  for (const baseUrl of PROVIDERS) {
    try {
      const domainRes = await fetch(`${baseUrl}/domains`, {
        signal: AbortSignal.timeout(10000),
        headers: { Accept: "application/json" },
      });

      if (!domainRes.ok) continue;

      const domainText = await domainRes.text();
      let domainData: any;
      try { domainData = JSON.parse(domainText); } catch { continue; }

      let members = domainData?.["hydra:member"];
      if ((!members || members.length === 0) && Array.isArray(domainData)) {
        members = domainData;
      }
      if (!members || members.length === 0) continue;

      const domain = members[0].domain;
      if (!domain) continue;

      const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
      const username = "user" + Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
      const address = `${username}@${domain}`;
      const password = Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");

      logger.info(`${baseUrl}: creating account ${address}`);

      const accountRes = await fetch(`${baseUrl}/accounts`, {
        method: "POST",
        signal: AbortSignal.timeout(10000),
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ address, password }),
      });

      const accountText = await accountRes.text();
      if (!accountRes.ok) {
        logger.warn(`${baseUrl}: account failed ${accountRes.status}: ${accountText.slice(0, 100)}`);
        continue;
      }

      let account: any;
      try { account = JSON.parse(accountText); } catch { continue; }

      logger.info(`${baseUrl}: getting token...`);

      const tokenRes = await fetch(`${baseUrl}/token`, {
        method: "POST",
        signal: AbortSignal.timeout(10000),
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ address, password }),
      });

      const tokenText = await tokenRes.text();
      if (!tokenRes.ok) {
        logger.warn(`${baseUrl}: token failed ${tokenRes.status}: ${tokenText.slice(0, 100)}`);
        continue;
      }

      let tokenData: any;
      try { tokenData = JSON.parse(tokenText); } catch { continue; }

      logger.info(`Email created: ${address} via ${baseUrl}`);

      return NextResponse.json({
        accountId: account.id,
        address: account.address,
        token: tokenData.token,
        password,
        provider: baseUrl,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.warn(`${baseUrl}: ${msg}`);
    }
  }

  try {
    const session = await guerrillaCreateEmail();
    logger.info(`Email created via guerrillamail: ${session.email_addr}`);

    return NextResponse.json({
      accountId: String(session.email_id),
      address: session.email_addr,
      token: session.sid_token,
      password: "",
      provider: "guerrillamail",
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    logger.warn(`guerrillamail: ${msg}`);
  }

  return NextResponse.json(
    { error: "All email providers failed. Check internet connection or try again later." },
    { status: 503 }
  );
}
