# 𓃥 Muaqt — Temporary Email Service

**Muaqt** is a modern, fast, and secure temporary email service. Create disposable email addresses instantly to receive activation emails, verification codes, and registration confirmations — all without revealing your real identity.

> Built with Next.js 15, TypeScript, Tailwind CSS, and powered by [Mail.gw](https://mail.gw) API.

---

## ✨ Features

- **Instant Email Generation** — Get a temporary email address in one click
- **Real Inbox** — Receive and read real emails via the Mail.gw API (no mock data)
- **Auto-Refresh** — Inbox refreshes every 10 seconds automatically
- **Manual Refresh** — Refresh button for instant updates
- **New Message Counter** — See how many new messages arrived
- **Message Detail** — View full message content with HTML support
- **Verification Link Detection** — Automatically detects activation/verification links and turns them into clickable buttons
- **Email Timer** — Visual countdown showing remaining email lifetime (10 minutes)
- **Copy Email** — One-click copy to clipboard
- **Delete Email** — Discard current email and create a new one
- **Multi-Language Support** — 9 languages with RTL support for Arabic
- **Dark/Light Mode** — Theme toggle with system preference detection
- **Glassmorphism Design** — Modern, premium, minimal UI
- **PWA Support** — Install as a progressive web app
- **Responsive** — Works on mobile, tablet, and desktop
- **SEO Optimized** — Meta tags, Open Graph, Twitter cards
- **Rate Limited** — API protection against abuse
- **Sanitized** — Input sanitization for security
- **Ad-Ready** — Placeholder slots for Google AdSense

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4, Glassmorphism |
| State | React Context API |
| API | Next.js API Routes |
| Email API | [Mail.gw](https://api.mail.gw) (free, no API key needed) |
| Icons | Lucide React |
| Fonts | Inter, Cairo (Arabic) |

---

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── api/              # API routes
│   │   ├── email/
│   │   │   ├── generate/ # POST /api/email/generate
│   │   │   ├── inbox/    # GET /api/email/inbox
│   │   │   ├── message/  # GET|DELETE /api/email/message
│   │   │   ├── domains/  # GET /api/email/domains
│   │   │   └── delete/   # POST /api/email/delete
│   │   └── contact/      # POST /api/contact
│   ├── inbox/            # /inbox page
│   ├── faq/              # /faq page
│   ├── contact/          # /contact page
│   ├── privacy/          # /privacy page
│   ├── terms/            # /terms page
│   ├── globals.css       # Global styles + design system
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── Header.tsx        # Navigation header
│   ├── Sidebar.tsx       # Sidebar with email info
│   ├── InboxView.tsx     # Main inbox component
│   ├── MessageDetail.tsx # Message detail modal
│   ├── Footer.tsx        # Site footer
│   ├── Logo.tsx          # Muaqt SVG logo
│   ├── Timer.tsx         # Email countdown timer
│   └── AdPlaceholder.tsx # AdSense placeholder
├── contexts/             # React contexts
│   ├── ThemeContext.tsx   # Dark/Light mode
│   ├── EmailContext.tsx   # Email session & messages
│   └── LanguageContext.tsx # i18n
├── hooks/
│   └── useTimer.ts       # Countdown timer hook
├── i18n/
│   ├── index.ts          # i18n utilities
│   └── translations.ts   # All translations (9 languages)
├── lib/
│   ├── mailgw.ts         # Mail.gw API client
│   ├── rateLimit.ts      # Rate limiter
│   ├── sanitize.ts       # Input sanitization
│   └── logger.ts         # Logging utility
├── types/
│   └── index.ts          # TypeScript types
└── utils/
    ├── cn.ts             # Class name utility
    └── formatDate.ts     # Date formatting
```

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js 18+** (recommended: 20 LTS)
- **npm** (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/Muaqt.git
cd Muaqt

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Start development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_MAIL_API_BASE_URL` | Mail.gw API base URL | No (default: `https://api.mail.gw`) |
| `NEXT_PUBLIC_SITE_URL` | Site URL for SEO | No |

---

## 🌐 Languages

Muaqt supports 9 languages with full translations:

| Language | Code | Direction |
|----------|------|-----------|
| العربية (Arabic) | `ar` | RTL |
| English | `en` | LTR |
| Français (French) | `fr` | LTR |
| Español (Spanish) | `es` | LTR |
| Deutsch (German) | `de` | LTR |
| Türkçe (Turkish) | `tr` | LTR |
| Русский (Russian) | `ru` | LTR |
| 中文 (Chinese) | `zh` | LTR |
| 日本語 (Japanese) | `ja` | LTR |

Language is auto-detected from browser settings and saved locally.

---

## 🚢 Deployment

### Deploy to Vercel

The easiest way to deploy Muaqt is on [Vercel](https://vercel.com):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

Or connect your GitHub repository directly to Vercel for automatic deployments.

### Deploy to Other Platforms

**Docker:**

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🔒 Security

- **Rate Limiting** — 8 requests per second per IP (matching Mail.gw limits)
- **Input Sanitization** — XSS prevention on all inputs
- **Email Validation** — Format validation on form inputs
- **Session Isolation** — Email sessions stored in sessionStorage (not shared)
- **Auto Cleanup** — Emails auto-deleted after expiration
- **CORS Headers** — Security headers set via Next.js config

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🙏 Credits

- **Email API** — [Mail.gw](https://mail.gw) (free temporary email API)
- **Icons** — [Lucide](https://lucide.dev)
- **Inspiration** — Temp-Mail, Mohmal, 10 Minute Mail

---

*Built with ❤️ for privacy and convenience.*
