import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 18, background: "#1f473b", color: "#fff8e8", fontSize: 22, fontWeight: 900, letterSpacing: -1 }}>
      MG
    </div>,
    { ...size }
  );
}
