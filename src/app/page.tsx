import DividendCalculator from "@/components/DividendCalculator";
import JsonLd from "@/components/JsonLd";
import { webAppJsonLd } from "@/lib/json-ld";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={webAppJsonLd({
          name: "YieldGrower Dividend Reinvestment Calculator",
          path: "/",
          description:
            "Calculate how investments grow with compound interest and dividend reinvestment (DRIP), including contributions, yield, and tax.",
        })}
      />
      <DividendCalculator />
    </>
  );
}
