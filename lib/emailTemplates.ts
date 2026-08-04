function emailShell(preheader: string, bodyHtml: string) {
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f6f7fb;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;">${preheader}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f7fb;padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:#0a1630;padding:24px 32px;">
                <span style="color:#f2dfa0;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;">
                  Imole Aibana Foundation
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;color:#0a1630;font-size:15px;line-height:1.6;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:#f6f7fb;color:#7c869c;font-size:12px;">
                Imole Aibana Foundation &middot; Lagos, Nigeria
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function contactConfirmationEmail(name: string) {
  return emailShell(
    "We received your message",
    `<h2 style="margin:0 0 12px;font-size:20px;">Thanks for reaching out, ${name}.</h2>
     <p style="margin:0;color:#3a4a6b;">We've received your message and someone from our team will get back to you within a few business days.</p>`
  );
}

export function contactAdminNotification(data: { name: string; email: string; subject: string; message: string }) {
  return emailShell(
    `New contact message from ${data.name}`,
    `<h2 style="margin:0 0 12px;font-size:20px;">New contact message</h2>
     <p style="margin:0 0 4px;"><strong>From:</strong> ${data.name} (${data.email})</p>
     ${data.subject ? `<p style="margin:0 0 4px;"><strong>Subject:</strong> ${data.subject}</p>` : ""}
     <p style="margin:16px 0 0;color:#3a4a6b;white-space:pre-wrap;">${data.message}</p>`
  );
}

export function volunteerConfirmationEmail(name: string) {
  return emailShell(
    "We received your volunteer application",
    `<h2 style="margin:0 0 12px;font-size:20px;">Thanks for offering your time, ${name}.</h2>
     <p style="margin:0;color:#3a4a6b;">We've received your volunteer application and will reach out soon with next steps.</p>`
  );
}

export function volunteerAdminNotification(data: { name: string; email: string; areaOfInterest: string }) {
  return emailShell(
    `New volunteer application from ${data.name}`,
    `<h2 style="margin:0 0 12px;font-size:20px;">New volunteer application</h2>
     <p style="margin:0 0 4px;"><strong>From:</strong> ${data.name} (${data.email})</p>
     ${data.areaOfInterest ? `<p style="margin:0;"><strong>Area of interest:</strong> ${data.areaOfInterest}</p>` : ""}`
  );
}

export function partnerConfirmationEmail(contactName: string, organizationName: string) {
  return emailShell(
    "We received your partnership request",
    `<h2 style="margin:0 0 12px;font-size:20px;">Thanks, ${contactName}.</h2>
     <p style="margin:0;color:#3a4a6b;">We've received the partnership request from ${organizationName} and will be in touch soon.</p>`
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
    `<h2 style="margin:0 0 12px;font-size:20px;">New partner request</h2>
     <p style="margin:0 0 4px;"><strong>Organization:</strong> ${data.organizationName}</p>
     <p style="margin:0 0 4px;"><strong>Contact:</strong> ${data.contactName} (${data.email})</p>
     ${data.partnershipType ? `<p style="margin:0;"><strong>Type:</strong> ${data.partnershipType}</p>` : ""}`
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
    `<h2 style="margin:0 0 12px;font-size:20px;">Thank you${data.donorName ? `, ${data.donorName}` : ""}.</h2>
     <p style="margin:0 0 20px;color:#3a4a6b;">Your donation has been received. Here's your receipt.</p>
     <table role="presentation" width="100%" style="border-collapse:collapse;">
       <tr>
         <td style="padding:8px 0;color:#7c869c;">Amount</td>
         <td style="padding:8px 0;text-align:right;font-weight:600;">&#8358;${data.amount.toLocaleString()}</td>
       </tr>
       <tr>
         <td style="padding:8px 0;color:#7c869c;border-top:1px solid #eef0f5;">Reference</td>
         <td style="padding:8px 0;text-align:right;border-top:1px solid #eef0f5;">${data.reference}</td>
       </tr>
       <tr>
         <td style="padding:8px 0;color:#7c869c;border-top:1px solid #eef0f5;">Date</td>
         <td style="padding:8px 0;text-align:right;border-top:1px solid #eef0f5;">${data.paidAt.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</td>
       </tr>
     </table>
     <p style="margin:20px 0 0;color:#3a4a6b;">Thank you for helping us reach more communities.</p>`
  );
}
