import { NextResponse } from "next/server"
import sgMail from "@sendgrid/mail"

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY is not set")
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, message } = body || {}

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const to = process.env.SENDGRID_TO || process.env.SENDGRID_FROM
    const from = process.env.SENDGRID_FROM

    if (!to || !from) {
      return NextResponse.json({ error: "Email destination not configured" }, { status: 500 })
    }

    const msg = {
      to,
      from,
      subject: `Nouveau message du site — ${name}`,
      replyTo: email,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p>${message.replace(/\n/g, "<br/>")}</p>`,
    }

    await sgMail.send(msg)

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err?.message || "Internal error" }, { status: 500 })
  }
}
