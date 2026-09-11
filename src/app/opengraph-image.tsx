import { ImageResponse } from "next/og";

export const alt = "돈결 - 돈을 대하는 방식 16유형";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", background: "#fff8ed", color: "#1c1917", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 22, background: "#1f473b", color: "#fff8e8", fontSize: 22, fontWeight: 800 }}>MG</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 800 }}>돈결</span>
            <span style={{ marginTop: 2, fontSize: 15, letterSpacing: 4, color: "#78716c" }}>MONEY GRAIN</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 72, fontWeight: 900, lineHeight: 1.18, letterSpacing: -4 }}><span>돈 앞에서 드러나는</span><span>나만의 결이 있습니다</span></div>
          <div style={{ marginTop: 28, fontSize: 29, color: "#57534e" }}>20개의 선택으로 알아보는 돈 성향 16유형</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 22, fontWeight: 700, color: "#8a4a32" }}>
          <span>안정 ↔ 경험 · 계획 ↔ 유연 · 독립 ↔ 공유 · 현재 ↔ 미래</span>
          <span>yieldgrower.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
