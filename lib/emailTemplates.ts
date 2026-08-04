const COLORS = {
  navyDark: "#0a1630",
  navyMid: "#101f42",
  navySoft: "#3a4a6b",
  muted: "#7c869c",
  border: "#eef0f5",
  bg: "#f0f2f7",
  gold: "#d4af37",
  goldLight: "#e8c766",
};

function emailShell(preheader: string, bodyHtml: string) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Imole Aibana Foundation</title>
  </head>
  <body style="margin:0;padding:0;background:${COLORS.bg};font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.bg};padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(10,22,48,0.08);">
            <tr>
              <td style="background:linear-gradient(135deg,${COLORS.navyDark},${COLORS.navyMid});padding:36px 40px;text-align:center;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                  <tr>
                    <td style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#5b7dff,#2b56f5);"></td>
                    <td style="padding-left:10px;">
                      <span style="color:#ffffff;font-size:17px;font-weight:700;letter-spacing:0.01em;">Imole Aibana Foundation</span>
                    </td>
                  </tr>
                </table>
                <p style="margin:12px 0 0;color:${COLORS.goldLight};font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;">
                  Light &middot; Opportunity &middot; Community
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:40px;color:${COLORS.navyDark};font-size:15px;line-height:1.65;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:26px 40px;background:${COLORS.bg};border-top:1px solid ${COLORS.border};">
                <p style="margin:0 0 6px;color:${COLORS.navyDark};font-size:13px;font-weight:600;">
                  Imole Aibana Foundation
                </p>
                <p style="margin:0;color:${COLORS.muted};font-size:12px;line-height:1.7;">
                  Lagos, Nigeria &middot;
                  <a href="tel:+2349119158748" style="color:${COLORS.muted};text-decoration:none;">0911 915 8748</a>
                  <br />
                  <a href="mailto:imoleaibanafoundation@gmail.com" style="color:${COLORS.muted};text-decoration:none;">
                    imoleaibanafoundation@gmail.com
                  </a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function heading(text: string) {
  return `<h2 style="margin:0 0 14px;font-size:21px;font-weight:700;color:${COLORS.navyDark};">${text}</h2>`;
}

function paragraph(text: string) {
  return `<p style="margin:0 0 12px;color:${COLORS.navySoft};">${text}</p>`;
}

function infoCard(rows: Array<{ label: string; value: string }>) {
  const cells = rows
    .map(
      (row, i) => `
      <tr>
        <td style="padding:11px 0;color:${COLORS.muted};font-size:13px;${i > 0 ? `border-top:1px solid ${COLORS.border};` : ""}">${row.label}</td>
        <td style="padding:11px 0;text-align:right;font-weight:600;color:${COLORS.navyDark};${i > 0 ? `border-top:1px solid ${COLORS.border};` : ""}">${row.value}</td>
      </tr>`
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:18px 0;background:${COLORS.bg};border-radius:14px;padding:6px 18px;">${cells}</table>`;
}

function ctaButton(label: string, url: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 4px;">
    <tr>
      <td style="border-radius:999px;background:linear-gradient(135deg,${COLORS.goldLight},${COLORS.gold});">
        <a href="${url}" style="display:inline-block;padding:12px 26px;color:${COLORS.navyDark};font-size:14px;font-weight:700;text-decoration:none;border-radius:999px;">
          ${label}
        </a>
      </td>
    </tr>
  </table>`;
}

export function contactConfirmationEmail(name: string) {
  return emailShell(
    "We received your message",
    heading(`Thanks for reaching out, ${name}.`) +
      paragraph(
        "We've received your message and someone from our team will get back to you within a few business days."
      )
  );
}

export function contactAdminNotification(data: { name: string; email: string; subject: string; message: string }) {
  return emailShell(
    `New contact message from ${data.name}`,
    heading("New contact message") +
      infoCard([
        { label: "From", value: data.name },
        { label: "Email", value: data.email },
        ...(data.subject ? [{ label: "Subject", value: data.subject }] : []),
      ]) +
      paragraph(data.message.replace(/\n/g, "<br />")) +
      ctaButton("Reply to sender", `mailto:${data.email}`)
  );
}

export function volunteerConfirmationEmail(name: string) {
  return emailShell(
    "We received your volunteer application",
    heading(`Thanks for offering your time, ${name}.`) +
      paragraph("We've received your volunteer application and will reach out soon with next steps.")
  );
}

export function volunteerAdminNotification(data: { name: string; email: string; areaOfInterest: string }) {
  return emailShell(
    `New volunteer application from ${data.name}`,
    heading("New volunteer application") +
      infoCard([
        { label: "From", value: data.name },
        { label: "Email", value: data.email },
        ...(data.areaOfInterest ? [{ label: "Area of interest", value: data.areaOfInterest }] : []),
      ]) +
      ctaButton("Reply to applicant", `mailto:${data.email}`)
  );
}

export function partnerConfirmationEmail(contactName: string, organizationName: string) {
  return emailShell(
    "We received your partnership request",
    heading(`Thanks, ${contactName}.`) +
      paragraph(
        `We've received the partnership request from ${organizationName} and will be in touch soon.`
      )
  );
}

export function partnerAdminNotification(data: {
  organizationName: string;
  contactName: string;
  email: string;
  partnershipType: string;
}) {
  return emailShell(
    `New partner request from ${data.organizationName}`,
    heading("New partner request") +
      infoCard([
        { label: "Organization", value: data.organizationName },
        { label: "Contact", value: data.contactName },
        { label: "Email", value: data.email },
        ...(data.partnershipType ? [{ label: "Type", value: data.partnershipType }] : []),
      ]) +
      ctaButton("Reply to contact", `mailto:${data.email}`)
  );
}

export function donationReceiptEmail(data: {
  donorName: string;
  amount: number;
  reference: string;
  paidAt: Date;
}) {
  return emailShell(
    "Your donation receipt",
    heading(`Thank you${data.donorName ? `, ${data.donorName}` : ""}.`) +
      paragraph("Your donation has been received. Here's your receipt.") +
      infoCard([
        { label: "Amount", value: `&#8358; ${data.amount.toLocaleString()}` },
        { label: "Reference", value: data.reference },
        {
          label: "Date",
          value: data.paidAt.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      ]) +
      paragraph("Thank you for helping us reach more communities.")
  );
}
