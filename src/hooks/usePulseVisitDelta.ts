"use client";

import { useEffect, useState } from "react";
import type { IncomePulse } from "@/lib/income-pulse";
import {
  readPulseVisit,
  visitScoreDelta,
  writePulseVisit,
} from "@/lib/pulse-visit";

export type PulseVisitState =
  | { status: "loading" }
  | { status: "first" }
  | { status: "same" }
  | { status: "changed"; delta: number };

/**
 * Compare today's score with the last score this browser saw, then save current.
 */
export function usePulseVisitDelta(data: IncomePulse | null | undefined) {
  const [state, setState] = useState<PulseVisitState>({ status: "loading" });

  useEffect(() => {
    if (!data || data.score === null || data.score === undefined) {
      setState({ status: "loading" });
      return;
    }

    const last = readPulseVisit();
    if (!last) {
      setState({ status: "first" });
    } else if (last.updatedAt === data.updatedAt) {
      setState({ status: "same" });
    } else {
      const delta = visitScoreDelta(data.score, data.updatedAt, last);
      setState(
        delta === null
          ? { status: "same" }
          : { status: "changed", delta }
      );
    }

    writePulseVisit(data.score, data.updatedAt);
  }, [data, data?.score, data?.updatedAt]);

  return state;
}
