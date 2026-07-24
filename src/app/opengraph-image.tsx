import { ImageResponse } from "next/og";

export const alt =
  "YieldGrower — dividend reinvestment and FIRE calculators";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background:
            "linear-gradient(135deg, #f8fafc 0%, #eef2ff 55%, #f8fafc 100%)",
          color: "#0f172a",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: "#4f46e5",
            letterSpacing: 1,
          }}
        >
          YieldGrower
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            marginTop: 20,
          }}
        >
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            Visualize your dividend snowball
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              color: "#475569",
              maxWidth: 900,
            }}
          >
            Free DRIP, FIRE, and compound calculators — plus a daily Income
            Pulse score.
          </div>
        </div>

        <div style={{ fontSize: 24, fontWeight: 600, color: "#64748b" }}>
          yieldgrower.com
        </div>
      </div>
    ),
    { ...size }
  );
}
