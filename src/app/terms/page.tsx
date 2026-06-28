"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import AdPlaceholder from "@/components/AdPlaceholder";

export default function TermsPage() {
  const { t, locale } = useLanguage();

  const content =
    locale === "ar"
      ? [
          { title: "القبول بالشروط", text: "باستخدام خدمة Muaqt، فإنك توافق على هذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، فيجب عليك التوقف عن استخدام الخدمة." },
          { title: "وصف الخدمة", text: "Muaqt هي خدمة بريد إلكتروني مؤقت تتيح للمستخدمين إنشاء عناوين بريد إلكتروني وهمية لاستقبال الرسائل. البريد الإلكتروني مؤقت ولا يدعم إرسال الرسائل." },
          { title: "الاستخدام المسموح", text: "توافق على استخدام الخدمة فقط للأغراض القانونية. يحظر استخدام الخدمة لأي نشاط غير قانوني أو ضار." },
          { title: "حدود المسؤولية", text: "نقدم الخدمة \"كما هي\" بدون أي ضمانات. نحن غير مسؤولين عن أي أضرار ناتجة عن استخدام الخدمة." },
          { title: "الملكية الفكرية", text: "جميع حقوق الملكية الفكرية للخدمة والعلامات التجارية محفوظة لـ Muaqt." },
          { title: "إنهاء الخدمة", text: "نحتفظ بالحق في إنهاء أو تعليق الوصول إلى الخدمة لأي مستخدم ينتهك هذه الشروط." },
          { title: "التغييرات على الشروط", text: "قد نقوم بتحديث هذه الشروط من وقت لآخر. استمرار استخدام الخدمة بعد التغييرات يعني قبولك للشروط الجديدة." },
          { title: "القانون الواجب التطبيق", text: "تخضع هذه الشروط للقوانين المعمول بها." },
        ]
      : [
          { title: "Acceptance of Terms", text: "By using Muaqt, you agree to these terms and conditions. If you do not agree with any part of these terms, you must stop using the service." },
          { title: "Service Description", text: "Muaqt is a temporary email service that allows users to create disposable email addresses to receive messages. Emails are temporary and the service does not support sending messages." },
          { title: "Permitted Use", text: "You agree to use the service only for lawful purposes. Using the service for any illegal or harmful activity is prohibited." },
          { title: "Limitation of Liability", text: "We provide the service 'as is' without any warranties. We are not liable for any damages arising from the use of the service." },
          { title: "Intellectual Property", text: "All intellectual property rights to the service and trademarks are owned by Muaqt." },
          { title: "Termination", text: "We reserve the right to terminate or suspend access to the service for any user who violates these terms." },
          { title: "Changes to Terms", text: "We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms." },
          { title: "Governing Law", text: "These terms are governed by applicable laws." },
        ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <AdPlaceholder className="w-full mb-6" />
      <h1 className="text-3xl font-bold text-text-primary mb-2">{t.nav.terms}</h1>
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
