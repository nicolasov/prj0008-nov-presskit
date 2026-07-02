import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; venue?: string; date?: string; message?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Petición inválida' }, { status: 400 });
  }

  const { name, email, venue, date, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Nombre, email y mensaje son requeridos' }, { status: 422 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY not set');
    return NextResponse.json({ error: 'Servicio de email no configurado' }, { status: 503 });
  }

  const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'nicolasolivavelez@gmail.com';
  const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? 'NOV Booking <onboarding@resend.dev>';
  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[NOV Booking] Consulta de ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#020202;color:#F4F1EB;padding:32px;border-radius:4px">
          <h2 style="color:#C9C4BA;font-size:24px;margin:0 0 24px">Nueva consulta de booking</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:10px 0;color:rgba(245,241,235,.56);font-size:13px;width:120px">Nombre</td>
              <td style="padding:10px 0;font-weight:600">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:rgba(245,241,235,.56);font-size:13px">Email</td>
              <td style="padding:10px 0"><a href="mailto:${escapeHtml(email)}" style="color:#C9C4BA">${escapeHtml(email)}</a></td>
            </tr>
            ${venue ? `<tr><td style="padding:10px 0;color:rgba(245,241,235,.56);font-size:13px">Lugar</td><td style="padding:10px 0">${escapeHtml(venue)}</td></tr>` : ''}
            ${date ? `<tr><td style="padding:10px 0;color:rgba(245,241,235,.56);font-size:13px">Fecha</td><td style="padding:10px 0">${escapeHtml(date)}</td></tr>` : ''}
          </table>
          <div style="margin-top:24px;padding:20px;background:#101010;border-radius:4px;border-left:3px solid #C9C4BA">
            <p style="margin:0;line-height:1.7;white-space:pre-line">${escapeHtml(message)}</p>
          </div>
          <p style="margin-top:24px;color:rgba(245,241,235,.38);font-size:12px">
            Enviado desde nov.dj
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('[contact] resend error:', err);
    return NextResponse.json({ error: 'Error al enviar el email. Intentá de nuevo.' }, { status: 500 });
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
