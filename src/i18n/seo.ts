import type { SupportedLocale } from "@/types";

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
}

export const seoTranslations: Record<SupportedLocale, SEOData> = {
  ar: {
    title: "مؤقت | بريد إلكتروني مؤقت وهمي",
    description: "مؤقت — خدمة بريد إلكتروني مؤقت مجانية لإنشاء إيميلات وهمية واستقبال رسائل التفعيل والتسجيلات بسهولة وأمان.",
    keywords: "بريد مؤقت, بريد وهمي, إيميل مؤقت, temp mail, رسائل تفعيل, بريد عربي مؤقت",
  },
  en: {
    title: "Muaqt | Temporary Disposable Email Service",
    description: "Muaqt — Free temporary email service. Create disposable email addresses instantly to receive activation emails and registrations safely.",
    keywords: "temp mail, temporary email, disposable email, fake email, temporary email address, 10 minute mail",
  },
  fr: {
    title: "Muaqt | Service d'Email Temporaire Jetable",
    description: "Muaqt — Service d'email temporaire gratuit. Créez des adresses email jetables instantanément pour recevoir des emails d'activation en toute sécurité.",
    keywords: "email temporaire, email jetable, email poubelle, adresse email temporaire, temp mail",
  },
  es: {
    title: "Muaqt | Servicio de Email Temporal Desechable",
    description: "Muaqt — Servicio de email temporal gratuito. Cree direcciones de email desechables al instante para recibir correos de activación de forma segura.",
    keywords: "email temporal, email desechable, email falso, temp mail, correo temporal",
  },
  de: {
    title: "Muaqt | Temporärer Wegwerf-E-Mail-Dienst",
    description: "Muaqt — Kostenloser temporärer E-Mail-Dienst. Erstellen Sie sofort Wegwerf-E-Mail-Adressen, um Aktivierungs-E-Mails sicher zu empfangen.",
    keywords: "temp mail, wegwerf email, temporäre email, fake email, wegwerf email adresse",
  },
  tr: {
    title: "Muaqt | Geçici E-posta Hizmeti",
    description: "Muaqt — Ücretsiz geçici e-posta hizmeti. Anında geçici e-posta adresleri oluşturarak aktivasyon e-postalarını güvenle alın.",
    keywords: "geçici mail, temp mail, tek kullanımlık email, sahte email, geçici email",
  },
  ru: {
    title: "Muaqt | Сервис Временной Электронной Почты",
    description: "Muaqt — Бесплатный сервис временной электронной почты. Создавайте одноразовые адреса мгновенно для безопасного получения писем активации.",
    keywords: "временная почта, одноразовая почта, temp mail, фейковая почта, временный email",
  },
  zh: {
    title: "Muaqt | 临时邮箱服务",
    description: "Muaqt — 免费临时邮箱服务。立即创建一次性邮箱地址，安全接收激活邮件和注册确认。",
    keywords: "临时邮箱, 一次性邮箱, 临时邮件, 虚假邮箱, temp mail, 临时电子邮件",
  },
  ja: {
    title: "Muaqt | 使い捨てメールサービス",
    description: "Muaqt — 無料の使い捨てメールサービス。即座に使い捨てメールアドレスを作成し、確認メールを安全に受信できます。",
    keywords: "使い捨てメール, 一時メール, 仮メール, temp mail, 使い捨てアドレス",
  },
};
