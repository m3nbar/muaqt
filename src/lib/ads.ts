const SMART_LINK = "https://www.effectivecpmnetwork.com/tr9wgxyv?key=260415d49d2d09409ae72277abb7baa0";

let triggered = false;

export function triggerSmartLink() {
  if (typeof window === "undefined") return;
  try {
    const win = window.open(SMART_LINK, "_blank");
    if (win) {
      try { win.blur(); } catch {}
      try { window.focus(); } catch {}
    }
  } catch {}
}

export function triggerSmartLinkOnce() {
  if (!triggered) {
    triggered = true;
    triggerSmartLink();
  }
}
