/**
 * Prefer the native share sheet on mobile; fall back to clipboard.
 */
export async function shareOrCopy(input: {
  title: string;
  text: string;
  url: string;
  /** Full clipboard payload when share is unavailable (defaults to text + url). */
  clipboardText?: string;
}): Promise<"shared" | "copied" | "cancelled"> {
  const { title, text, url } = input;
  const clipboardText = input.clipboardText ?? `${text}\n${url}`;

  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share({ title, text, url });
      return "shared";
    } catch (err) {
      // User dismissed the sheet — don't force clipboard.
      if (err instanceof DOMException && err.name === "AbortError") {
        return "cancelled";
      }
      // Fall through to clipboard for unsupported payloads / failures.
    }
  }

  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(clipboardText);
    return "copied";
  }

  window.prompt("Copy:", clipboardText);
  return "copied";
}
