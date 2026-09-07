export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body || {};
    const forwarded = req.headers["x-forwarded-for"];
    const ip = forwarded ? String(forwarded).split(",")[0].trim() : (req.socket?.remoteAddress || null);

    const record = {
      receivedAt: new Date().toISOString(),
      ip,
      ...body
    };

    // By default this only returns the record to the page and writes nothing
    // to permanent storage. Add your own database later if you need retention.
    return res.status(200).json({
      ok: true,
      record: {
        receivedAt: record.receivedAt,
        ip: record.ip
      }
    });
  } catch {
    return res.status(400).json({ error: "Invalid request" });
  }
}