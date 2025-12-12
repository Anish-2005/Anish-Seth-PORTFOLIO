export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { name?: string; email?: string; message?: string }
    | null;

  // v0 stub: wire to an email provider (Resend/Postmark) in v1.
  if (!body?.email || !body?.message) {
    return Response.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  return Response.json({ ok: true });
}
