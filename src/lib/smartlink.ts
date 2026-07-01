export const SMARTLINK_URL =
  "https://www.effectivecpmnetwork.com/tr9wgxyv?key=260415d49d2d09409ae72277abb7baa0";

export function openSmartlink() {
  const a = document.createElement("a");
  a.href = SMARTLINK_URL;
  a.target = "_blank";
  a.rel = "nofollow sponsored noopener noreferrer";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
