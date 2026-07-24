import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";
import type { IncomePulse } from "@/lib/income-pulse";

export const alt = "YieldGrower Income Pulse — today’s dividend attractiveness score";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadPulse(): Promise<IncomePulse | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "income-pulse.json"
    );
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as IncomePulse;
  } catch {
    return null;
  }
}

function scoreColor(score: number | null): string {
  if (score === null) return "#64748b";
  if (score >= 70) return "#059669";
  if (score >= 45) return "#4f46e5";
  return "#ea580c";
}

export default async function Image() {
  const data = await loadPulse();
  const score = data?.score ?? null;
  const label = data?.scoreLabel.en ?? "Income Pulse";
  const brief = data?.brief.en ?? "Daily dividend attractiveness vs Treasuries and inflation.";
  const briefShort =
    brief.length > 140 ? `${brief.slice(0, 137)}...` : brief;

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
          background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 55%, #f8fafc 100%)",
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
              display: "flex",
              flexDirection: "column",
              gap: 8,
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
            <div style={{ fontSize: 34, fontWeight: 700, color: "#334155" }}>
              Income Pulse
            </div>
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#64748b",
            }}
          >
            yieldgrower.com/pulse
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 28,
            marginTop: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              color: scoreColor(score),
              lineHeight: 1,
            }}
          >
            <span style={{ fontSize: 180, fontWeight: 800 }}>
              {score ?? "—"}
            </span>
            <span
              style={{
                fontSize: 42,
                fontWeight: 600,
                color: "#94a3b8",
                marginLeft: 12,
              }}
            >
              /100
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: 18,
              gap: 10,
            }}
          >
            <div
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: "#1e293b",
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#64748b",
              }}
            >
              Attractiveness Score
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 28,
            lineHeight: 1.4,
            color: "#475569",
            maxWidth: 1000,
          }}
        >
          {briefShort}
        </div>
      </div>
    ),
    { ...size }
  );
}
