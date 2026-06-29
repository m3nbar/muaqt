import { NextResponse } from "next/server";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/rateLimit";
import { sanitizeString, isValidEmail } from "@/lib/sanitize";
import { sendContactEmail } from "@/lib/mail";
import { logger } from "@/lib/logger";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const rateCheck = checkRateLimit(ip);

  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: "Too many requests." },
      { status: 429, headers: getRateLimitHeaders(ip) }
    );
  }

  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400, headers: getRateLimitHeaders(ip) }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400, headers: getRateLimitHeaders(ip) }
      );
    }

    const sanitizedName = sanitizeString(name.slice(0, 100));
    const sanitizedEmail = sanitizeString(email.slice(0, 254));
    const sanitizedMessage = sanitizeString(message.slice(0, 5000));

    logger.info("Contact form submission", { name: sanitizedName, email: sanitizedEmail });

    if (process.env.SMTP_HOST && process.env.CONTACT_TO) {
      await sendContactEmail(sanitizedName, sanitizedEmail, sanitizedMessage);
    } else {
      logger.warn("SMTP not configured — contact message not sent");
    }

    return NextResponse.json(
      { success: true, message: "Message received" },
      { headers: getRateLimitHeaders(ip) }
    );
  } catch (error) {
    logger.error("Contact form error", error);
    return NextResponse.json(
      { error: "Failed to process message." },
      { status: 500, headers: getRateLimitHeaders(ip) }
    );
  }
}
