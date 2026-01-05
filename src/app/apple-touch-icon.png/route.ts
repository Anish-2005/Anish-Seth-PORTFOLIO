import { NextResponse } from "next/server";

// Reuse same tiny PNG placeholder for apple-touch-icon. Replace with a proper 180x180 PNG for best results.
const pngBase64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";

export function GET() {
  const bytes = Buffer.from(pngBase64, "base64");
  return new NextResponse(bytes, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
