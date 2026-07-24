import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type OgCardInput = {
  eyebrow: string;
  title: string;
  description: string;
  urlLabel: string;
};

/** Shared light YieldGrower social card for tool pages. */
export function renderOgCard({
  eyebrow,
  title,
  description,
  urlLabel,
}: OgCardInput) {
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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#4f46e5",
              letterSpacing: 1,
            }}
          >
            YieldGrower
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, color: "#64748b" }}>
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            marginTop: 24,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.12,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              color: "#475569",
              maxWidth: 920,
            }}
          >
            {description}
          </div>
        </div>

        <div style={{ fontSize: 22, fontWeight: 600, color: "#64748b" }}>
          {urlLabel}
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
