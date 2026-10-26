import nodemailer from 'nodemailer'
import path from 'path'
import fs from 'fs'
import { COMPANY_INFO } from '@/constants'

// Nodemailer Transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export interface ContactEmailData {
  fullName: string
  phone: string
  email?: string
  serviceRequired: string
  location?: string
  message: string
}

/**
 * Sends a high-converting, professional lead notification email to the admin
 * and an executive acknowledgment to the customer (if a real email is provided).
 */
export async function sendContactNotification(data: ContactEmailData): Promise<void> {
  const brandRed = '#C01E2E'
  const brandNavy = '#0B1A30'
  const brandAccent = '#E02438'
  const brandLight = '#F8FAFC'
  const brandBorder = '#E2E8F0'

  const rawPhone = data.phone.replace(/\D/g, '')
  const cleanPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone
  const displayPhone = data.phone.startsWith('+91') ? data.phone : `+91 ${data.phone}`

  // Check if logo exists locally for CID attachment
  const logoPath = path.join(process.cwd(), 'public', 'logo_new.png')
  const hasLocalLogo = fs.existsSync(logoPath)

  const attachments = hasLocalLogo
    ? [
        {
          filename: 'rcr-logo.png',
          path: logoPath,
          cid: 'rcrlogo@rcrenterprises',
        },
      ]
    : []

  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Asia/Kolkata',
  }).format(new Date())

  const cleanLocation = data.location?.trim() || 'Mumbai / Pune Region'
  const isRealEmail = data.email && !data.email.startsWith('lead_') && data.email.includes('@') && !data.email.endsWith('@rcrenterprises.co.in')
  const displayEmail = isRealEmail ? data.email : 'Not Provided (Quick Mobile Lead)'

  const whatsappMessage = encodeURIComponent(
    `Hello ${data.fullName}, thank you for contacting RCR ENTERPRISES. Our RCR Team received your website inquiry for ${data.serviceRequired} (${cleanLocation}). We will connect with you as soon as possible to provide an accurate estimate.`
  )

  const adminDashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://rcrenterprises.co.in'}/admin/inquiries`

  // ============================================================
  // ADMIN NOTIFICATION TEMPLATE
  // ============================================================
  const adminHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🚨 New Lead: ${data.fullName}</title>
  </head>
  <body style="margin: 0; padding: 25px 10px; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <div style="max-width: 620px; width: 100%; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.35); border: 1px solid #1e293b;">
            
            <!-- HEADER -->
            <div style="background: linear-gradient(135deg, ${brandNavy} 0%, #172554 100%); padding: 32px 28px; text-align: center; border-bottom: 4px solid ${brandRed};">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    ${hasLocalLogo ? `
                    <div style="display: inline-block; background-color: #ffffff; padding: 6px; border-radius: 12px; margin-bottom: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.25);">
                      <img src="cid:rcrlogo@rcrenterprises" alt="RCR ENTERPRISES Logo" width="64" height="64" style="display: block; border-radius: 8px; object-fit: contain;">
                    </div>
                    ` : ''}
                    <h1 style="color: #ffffff; margin: 0 0 6px 0; font-size: 24px; font-weight: 800; letter-spacing: 2.5px; text-transform: uppercase;">
                      RCR ENTERPRISES
                    </h1>
                    <p style="color: #94a3b8; margin: 0 0 12px 0; font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;">
                      Civil Contractors &amp; RCC Specialists • Quality Work with Commitment
                    </p>
                    <div style="display: inline-block; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 4px 14px; font-size: 11px; color: #cbd5e1; font-weight: 600;">
                      GST: ${COMPANY_INFO.registration.gstNo} &bull; Udyog Aadhaar: ${COMPANY_INFO.registration.udyogAadhaar}
                    </div>
                  </td>
                </tr>
              </table>
            </div>

            <!-- ALERT BANNER -->
            <div style="background-color: #FEF2F2; border-left: 6px solid ${brandRed}; border-bottom: 1px solid #FECACA; padding: 16px 24px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display: inline-block; background-color: ${brandRed}; color: #ffffff; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 4px; letter-spacing: 1px; text-transform: uppercase;">
                      HIGH PRIORITY LEAD
                    </span>
                    <h2 style="margin: 6px 0 2px 0; color: #991B1B; font-size: 18px; font-weight: 800;">
                      New Website Inquiry Received
                    </h2>
                    <p style="margin: 0; color: #7F1D1D; font-size: 12px;">
                      Timestamp: <strong>${formattedDate}</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </div>

            <!-- LEAD DETAILS TABLE -->
            <div style="padding: 28px 24px;">
              <h3 style="margin: 0 0 16px 0; color: ${brandNavy}; font-size: 15px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
                📋 Client &amp; Project Specifications
              </h3>

              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid ${brandBorder}; border-radius: 10px; overflow: hidden; border-collapse: separate;">
                <tr>
                  <td width="34%" style="padding: 13px 16px; background-color: ${brandLight}; border-bottom: 1px solid ${brandBorder}; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase;">
                    Client Name
                  </td>
                  <td style="padding: 13px 16px; background-color: #ffffff; border-bottom: 1px solid ${brandBorder}; font-size: 15px; font-weight: 800; color: #0F172A;">
                    ${data.fullName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 13px 16px; background-color: ${brandLight}; border-bottom: 1px solid ${brandBorder}; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase;">
                    Mobile / Phone
                  </td>
                  <td style="padding: 13px 16px; background-color: #ffffff; border-bottom: 1px solid ${brandBorder}; font-size: 15px; font-weight: 800; color: ${brandRed};">
                    <a href="tel:${data.phone}" style="color: ${brandRed}; text-decoration: none;">${displayPhone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 13px 16px; background-color: ${brandLight}; border-bottom: 1px solid ${brandBorder}; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase;">
                    Email Address
                  </td>
                  <td style="padding: 13px 16px; background-color: #ffffff; border-bottom: 1px solid ${brandBorder}; font-size: 13px; font-weight: 600; color: #334155;">
                    ${isRealEmail ? `<a href="mailto:${data.email}" style="color: #2563EB; text-decoration: none;">${data.email}</a>` : `<span style="color: #64748B;">${displayEmail}</span>`}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 13px 16px; background-color: ${brandLight}; border-bottom: 1px solid ${brandBorder}; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase;">
                    Service Required
                  </td>
                  <td style="padding: 13px 16px; background-color: #ffffff; border-bottom: 1px solid ${brandBorder}; font-size: 14px; font-weight: 800; color: #1E293B;">
                    <span style="display: inline-block; background-color: #FEF3C7; color: #92400E; padding: 4px 10px; border-radius: 6px; font-weight: 700;">
                      ${data.serviceRequired}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 13px 16px; background-color: ${brandLight}; border-bottom: 1px solid ${brandBorder}; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase;">
                    Project Location
                  </td>
                  <td style="padding: 13px 16px; background-color: #ffffff; border-bottom: 1px solid ${brandBorder}; font-size: 14px; font-weight: 800; color: #047857;">
                    📍 ${cleanLocation}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 13px 16px; background-color: ${brandLight}; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; vertical-align: top;">
                    Scope / Details
                  </td>
                  <td style="padding: 13px 16px; background-color: #ffffff; font-size: 13px; line-height: 1.6; color: #1E293B;">
                    ${data.message.replace(/\n/g, '<br>')}
                  </td>
                </tr>
              </table>

              <!-- INSTANT ACTION BUTTONS -->
              <div style="margin-top: 24px;">
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center" style="padding-bottom: 10px;">
                      <a href="https://wa.me/${cleanPhone}?text=${whatsappMessage}" 
                         target="_blank"
                         style="display: block; width: 100%; box-sizing: border-box; text-align: center; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 13px 18px; border-radius: 10px; font-weight: 800; font-size: 14px; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(37,211,102,0.35);">
                        💬 Chat on WhatsApp (+91 ${data.phone.replace(/\D/g, '')})
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-bottom: 10px;">
                      <a href="tel:${data.phone}" 
                         style="display: block; width: 100%; box-sizing: border-box; text-align: center; background-color: ${brandRed}; color: #ffffff; text-decoration: none; padding: 13px 18px; border-radius: 10px; font-weight: 800; font-size: 14px; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(192,30,46,0.35);">
                        📞 Call Client Directly (${displayPhone})
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <a href="${adminDashboardUrl}" 
                         target="_blank"
                         style="display: block; width: 100%; box-sizing: border-box; text-align: center; background-color: #0F172A; color: #ffffff; text-decoration: none; padding: 11px 18px; border-radius: 10px; font-weight: 700; font-size: 13px; border: 1px solid #334155;">
                        📊 Open Admin Dashboard / Inquiries
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- SOCIAL MEDIA CHANNELS -->
              <div style="margin-top: 30px; padding: 20px; background-color: #F8FAFC; border: 1px solid ${brandBorder}; border-radius: 12px; text-align: center;">
                <h4 style="margin: 0 0 12px 0; color: ${brandNavy}; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
                  Official Social Media &amp; Online Presence
                </h4>
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center">
                      <!-- Instagram Button -->
                      <a href="${COMPANY_INFO.social.instagram}" 
                         target="_blank" 
                         style="display: inline-block; margin: 4px; padding: 8px 14px; background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 700; border-radius: 8px;">
                        📸 Instagram (@rcr_enterprises)
                      </a>
                      
                      <!-- Facebook Button -->
                      <a href="${COMPANY_INFO.social.facebook}" 
                         target="_blank" 
                         style="display: inline-block; margin: 4px; padding: 8px 14px; background-color: #1877F2; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 700; border-radius: 8px;">
                        👍 Facebook Page
                      </a>
                      
                      <!-- WhatsApp Button -->
                      <a href="${COMPANY_INFO.social.whatsapp}" 
                         target="_blank" 
                         style="display: inline-block; margin: 4px; padding: 8px 14px; background-color: #25D366; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 700; border-radius: 8px;">
                        🟢 WhatsApp Business
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            <!-- FOOTER -->
            <div style="background-color: #0B1A30; padding: 24px; text-align: center; border-top: 1px solid #1E293B;">
              <p style="color: #FFFFFF; font-size: 13px; font-weight: 800; margin: 0 0 6px 0; letter-spacing: 1px;">
                RCR ENTERPRISES
              </p>
              <p style="color: #94A3B8; font-size: 11px; margin: 0 0 10px 0; line-height: 1.5;">
                ${COMPANY_INFO.address.full}<br>
                Serving All Locations Across <strong>Mumbai</strong> &amp; <strong>Pune</strong>
              </p>
              <p style="color: #64748B; font-size: 10px; margin: 0; line-height: 1.6;">
                Phone: +91 9619439243 | Email: rcrenterprises786@gmail.com | Website: <a href="https://rcrenterprises.co.in" style="color: #F87171; text-decoration: none; font-weight: 700;">www.rcrenterprises.co.in</a><br>
                Government Registered Civil Contractor &bull; GSTIN: ${COMPANY_INFO.registration.gstNo}
              </p>
            </div>

          </div>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `

  // ============================================================
  // CLIENT CONFIRMATION TEMPLATE (Sent only if valid email)
  // ============================================================
  const clientHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Contacting RCR ENTERPRISES</title>
  </head>
  <body style="margin: 0; padding: 25px 10px; background-color: #F1F5F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <div style="max-width: 620px; width: 100%; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 15px 30px rgba(0,0,0,0.08); border: 1px solid #E2E8F0;">
            
            <!-- HEADER -->
            <div style="background: linear-gradient(135deg, ${brandNavy} 0%, #172554 100%); padding: 32px 28px; text-align: center; border-bottom: 4px solid ${brandRed};">
              ${hasLocalLogo ? `
              <div style="display: inline-block; background-color: #ffffff; padding: 6px; border-radius: 12px; margin-bottom: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.25);">
                <img src="cid:rcrlogo@rcrenterprises" alt="RCR ENTERPRISES" width="64" height="64" style="display: block; border-radius: 8px;">
              </div>
              ` : ''}
              <h1 style="color: #ffffff; margin: 0 0 6px 0; font-size: 24px; font-weight: 800; letter-spacing: 2.5px; text-transform: uppercase;">
                RCR ENTERPRISES
              </h1>
              <p style="color: #94A3B8; margin: 0; font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;">
                Civil Contractors &amp; RCC Specialists • Quality Work with Commitment
              </p>
            </div>

            <!-- BODY CONTENT -->
            <div style="padding: 32px 26px;">
              <h2 style="color: ${brandNavy}; margin: 0 0 14px 0; font-size: 20px; font-weight: 800;">
                Dear ${data.fullName},
              </h2>

              <p style="color: #334155; font-size: 14px; line-height: 1.7; margin: 0 0 20px 0;">
                Thank you for reaching out to <strong>RCR ENTERPRISES</strong>. We have successfully received your inquiry for 
                <strong style="color: ${brandRed};">${data.serviceRequired}</strong>${cleanLocation ? ` at <strong>${cleanLocation}</strong>` : ''}.
              </p>

              <!-- WHAT HAPPENS NEXT CARD -->
              <div style="background-color: #ECFDF5; border-left: 4px solid #10B981; border-radius: 8px; padding: 18px 20px; margin-bottom: 24px;">
                <h4 style="margin: 0 0 6px 0; color: #065F46; font-size: 14px; font-weight: 800;">
                  ✅ What Happens Next?
                </h4>
                <p style="margin: 0; color: #047857; font-size: 13px; line-height: 1.6;">
                  Our dedicated <strong>RCR Team will connect with you as soon as possible</strong> to review your project specifications, provide an accurate estimate, and arrange a complimentary on-site visit.
                </p>
              </div>

              <!-- INQUIRY SUMMARY -->
              <div style="background-color: ${brandLight}; border: 1px solid ${brandBorder}; border-radius: 10px; padding: 18px; margin-bottom: 24px;">
                <h4 style="margin: 0 0 10px 0; color: ${brandNavy}; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
                  Your Submitted Inquiry Summary
                </h4>
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 13px; line-height: 1.8; color: #334155;">
                  <tr>
                    <td width="35%" style="font-weight: 700; color: #64748B;">Service Requested:</td>
                    <td style="font-weight: 700; color: #0F172A;">${data.serviceRequired}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: 700; color: #64748B;">Project Location:</td>
                    <td style="font-weight: 700; color: #0F172A;">${cleanLocation}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: 700; color: #64748B;">Contact Mobile:</td>
                    <td style="font-weight: 700; color: ${brandRed};">${displayPhone}</td>
                  </tr>
                </table>
              </div>

              <!-- CONNECT DIRECTLY -->
              <div style="text-align: center; margin-bottom: 26px;">
                <p style="color: #475569; font-size: 13px; margin: 0 0 12px 0; font-weight: 600;">
                  Need immediate discussion with our technical engineering team?
                </p>
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center" style="padding-bottom: 8px;">
                      <a href="${COMPANY_INFO.social.whatsapp}" 
                         target="_blank"
                         style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 800; font-size: 13px; box-shadow: 0 4px 12px rgba(37,211,102,0.35);">
                        💬 Chat on WhatsApp with Project Engineer
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <a href="tel:9619439243" 
                         style="display: inline-block; background-color: ${brandNavy}; color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 10px; font-weight: 700; font-size: 13px;">
                        📞 Call Helpline: +91 9619439243
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- SOCIAL MEDIA INVITE -->
              <div style="background-color: #F8FAFC; border: 1px solid ${brandBorder}; border-radius: 12px; padding: 18px; text-align: center;">
                <p style="margin: 0 0 10px 0; color: ${brandNavy}; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
                  Explore Our Live Construction Work &amp; Project Videos
                </p>
                <div>
                  <a href="${COMPANY_INFO.social.instagram}" target="_blank" style="display: inline-block; margin: 3px; padding: 7px 12px; background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #ffffff; text-decoration: none; font-size: 11px; font-weight: 700; border-radius: 6px;">
                    Instagram (@rcr_enterprises)
                  </a>
                  <a href="${COMPANY_INFO.social.facebook}" target="_blank" style="display: inline-block; margin: 3px; padding: 7px 12px; background-color: #1877F2; color: #ffffff; text-decoration: none; font-size: 11px; font-weight: 700; border-radius: 6px;">
                    Facebook
                  </a>
                  <a href="https://rcrenterprises.co.in" target="_blank" style="display: inline-block; margin: 3px; padding: 7px 12px; background-color: #334155; color: #ffffff; text-decoration: none; font-size: 11px; font-weight: 700; border-radius: 6px;">
                    Official Website
                  </a>
                </div>
              </div>
            </div>

            <!-- FOOTER -->
            <div style="background-color: #0B1A30; padding: 22px; text-align: center; border-top: 1px solid #1E293B;">
              <p style="color: #FFFFFF; font-size: 12px; font-weight: 800; margin: 0 0 4px 0; letter-spacing: 1px;">
                RCR ENTERPRISES
              </p>
              <p style="color: #94A3B8; font-size: 11px; margin: 0 0 8px 0; line-height: 1.5;">
                ${COMPANY_INFO.address.full}<br>
                Government Registered Civil Contractor &bull; GSTIN: ${COMPANY_INFO.registration.gstNo}
              </p>
              <p style="color: #64748B; font-size: 10px; margin: 0;">
                © ${new Date().getFullYear()} RCR ENTERPRISES. All Rights Reserved.
              </p>
            </div>

          </div>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `

  const emailTasks: Promise<unknown>[] = []

  // 1. Send Admin Email
  emailTasks.push(
    transporter.sendMail({
      from: `"RCR ENTERPRISES Leads" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `🚨 New Lead: ${data.fullName} - ${data.serviceRequired} (${cleanLocation})`,
      html: adminHtml,
      attachments,
    })
  )

  // 2. Send Customer Confirmation Email (only if client supplied a real email)
  if (isRealEmail && data.email) {
    emailTasks.push(
      transporter.sendMail({
        from: `"RCR ENTERPRISES" <${process.env.SMTP_USER}>`,
        to: data.email,
        subject: `Thank you for contacting RCR ENTERPRISES - Inquiry Received for ${data.serviceRequired}`,
        html: clientHtml,
        attachments,
      }).catch((err) => {
        console.warn('Customer acknowledgment email failed to send:', err.message)
      })
    )
  }

  await Promise.all(emailTasks)
}
