"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import AdPlaceholder from "@/components/AdPlaceholder";

export default function PrivacyPage() {
  const { t, locale } = useLanguage();

  const content =
    locale === "ar"
      ? [
          { title: "المقدمة", text: "نحن في Muaqt نلتزم بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية تعاملنا مع معلوماتك عند استخدام خدمة البريد الإلكتروني المؤقت." },
          { title: "المعلومات التي نجمعها", text: "لا نقوم بجمع أو تخزين أي معلومات شخصية. جميع البريد الإلكتروني الذي يتم إنشاؤه عبر خدمتنا مؤقت ويتم حذفه تلقائياً بعد انتهاء صلاحيته. لا نقوم بتتبع نشاطك أو تخزين عناوين IP." },
          { title: "كيف نستخدم معلوماتك", text: "نظراً لأننا لا نجمع أي معلومات شخصية، فإننا لا نستخدمها لأي غرض. خدمتنا لا تتطلب تسجيلاً أو حساباً شخصياً." },
          { title: "مشاركة المعلومات", text: "نحن لا نشارك أي معلومات مع أطراف ثالثة. لا نقوم ببيع أو تأجير أو مشاركة بيانات المستخدمين." },
          { title: "الكوكيز", text: "قد نستخدم ملفات تعريف الارتباط (كوكيز) التقنية الأساسية لضمان عمل الخدمة بشكل صحيح. لا نستخدم كوكيز للتتبع أو الإعلانات." },
          { title: "أمان البيانات", text: "نتخذ إجراءات أمنية معقولة لحماية خدمتنا. جميع البيانات مؤقتة ويتم حذفها تلقائياً." },
          { title: "اتصل بنا", text: "إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا من خلال صفحة اتصل بنا." },
          { title: "التغييرات على هذه السياسة", text: "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بنشر أي تغييرات على هذه الصفحة." },
        ]
      : [
          { title: "Introduction", text: "At Muaqt, we are committed to protecting your privacy. This Privacy Policy explains how we handle your information when you use our temporary email service." },
          { title: "Information We Collect", text: "We do not collect or store any personal information. All emails created through our service are temporary and automatically deleted after expiration. We do not track your activity or store IP addresses." },
          { title: "How We Use Your Information", text: "Since we do not collect any personal information, we do not use it for any purpose. Our service does not require registration or a personal account." },
          { title: "Information Sharing", text: "We do not share any information with third parties. We do not sell, rent, or share user data." },
          { title: "Cookies", text: "We may use essential technical cookies to ensure the service functions properly. We do not use tracking or advertising cookies." },
          { title: "Data Security", text: "We take reasonable security measures to protect our service. All data is temporary and automatically deleted." },
          { title: "Contact Us", text: "If you have any questions about this Privacy Policy, please contact us through our Contact page." },
          { title: "Changes to This Policy", text: "We may update this Privacy Policy from time to time. We will post any changes on this page." },
        ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <AdPlaceholder className="w-full mb-6" />
      <h1 className="text-3xl font-bold text-text-primary mb-2">{t.nav.privacy}</h1>
      <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-8" />
      <div className="flex flex-col gap-6">
        {content.map((section, i) => (
          <div key={i}>
            <h2 className="text-lg font-semibold text-text-primary mb-2">{section.title}</h2>
            <p className="text-sm text-text-secondary leading-relaxed">{section.text}</p>
          </div>
        ))}
      </div>
      <AdPlaceholder className="w-full mt-8" />
    </div>
  );
}
