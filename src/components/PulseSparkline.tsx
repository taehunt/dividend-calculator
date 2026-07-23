type Props = {
  scores: number[];
  className?: string;
};

/** Tiny SVG sparkline for Pulse history (no chart library). */
export default function PulseSparkline({ scores, className = "" }: Props) {
  if (scores.length < 2) return null;

  const w = 96;
  const h = 28;
  const pad = 2;
  const min = Math.min(...scores, 0);
  const max = Math.max(...scores, 100);
  const span = Math.max(max - min, 1);

  const points = scores
    .map((score, i) => {
      const x = pad + (i / (scores.length - 1)) * (w - pad * 2);
      const y = pad + (1 - (score - min) / span) * (h - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      className={className}
      aria-hidden
    >
      <polyline
        fill="none"
        stroke="#4f46e5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}
