/* ============================================================
   Born From Us - script.js
   Nav behavior, mobile menu, and email capture.
   Plain vanilla JS. No dependencies.
   ============================================================ */

/* ============================================================
   EMAIL PROVIDER ENDPOINT - PLACEHOLDER  (brief §8)
   ------------------------------------------------------------
   Ritesh hasn't created the email account yet. Until he does,
   the form validates and shows the success state, and the email
   is logged to the console (see submit handler below).

   To go live, create a free ConvertKit or Buttondown account and
   set the ONE constant below to the real endpoint:

   • Buttondown:
       NEWSLETTER_ENDPOINT = "https://buttondown.email/api/emails/embed-subscribe/YOUR_USERNAME";
       NEWSLETTER_PROVIDER = "buttondown";
     (posts form field "email" - no secret key needed client-side)

   • ConvertKit / Kit:
       NEWSLETTER_ENDPOINT = "https://app.kit.com/forms/YOUR_FORM_ID/subscriptions";
       NEWSLETTER_PROVIDER = "convertkit";
     (posts JSON { email_address }; uses the public form ID, no secret key)

   Leave NEWSLETTER_ENDPOINT = "REPLACE_ME" to stay in demo/log mode.
   Never put a SECRET API key here - this file ships to the browser.
   ============================================================ */
const NEWSLETTER_ENDPOINT = "REPLACE_ME";
const NEWSLETTER_PROVIDER = "buttondown"; // "buttondown" | "convertkit"

/* ============================================================
   PRE-ORDER relay (FormSubmit.co - no backend needed)
   ------------------------------------------------------------
   Every signup does two things via one FormSubmit request:
     1. Emails both authors that a reader wants the book (_cc).
     2. Auto-replies to the reader with the pre-order link
        and a short message (_autoresponse).
   Primary recipient goes in the URL; second via the _cc field.
   FormSubmit sends a ONE-TIME activation email to the primary
   address on the first submission - Ritesh must click that link
   once before delivery starts. No API key, no account.
   ============================================================ */
const NOTIFY_PRIMARY = "dogra.ritesh@gmail.com";
const NOTIFY_CC = "onlypriyask@gmail.com";
const NOTIFY_ENDPOINT = "https://formsubmit.co/ajax/" + NOTIFY_PRIMARY;
const PREORDER_URL = "https://anantapress.com/born-from-us/";

const AUTORESPONSE =
  "Thank you for your interest in Born From Us by Ritesh Dogra and Priya Setty.\n\n" +
  "You can pre-order your copy here:\n" +
  PREORDER_URL +
  "\n\n" +
  "AI is the mirror. The decision is still yours. We hope the book helps you " +
  "ask sharper questions inside your own organisation.\n\n" +
  "Warmly,\nThe Born From Us team";

async function notifyAuthors(email) {
  const res = await fetch(NOTIFY_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      email: email, // used by FormSubmit as the reply-to / autoresponse recipient
      _cc: NOTIFY_CC,
      _subject: "Born From Us - new pre-order lead",
      _template: "table",
      _autoresponse: AUTORESPONSE,
      "Reader email": email,
      Message: email + " requested the Born From Us pre-order link.",
    }),
  });
  return res.ok;
}

/* ---------------- Sticky nav: state on scroll ---------------- */
const nav = document.getElementById("nav");

function updateNavState() {
  nav.dataset.state = window.scrollY > 24 ? "scrolled" : "top";
}
updateNavState();
window.addEventListener("scroll", updateNavState, { passive: true });

/* ---------------- Mobile menu toggle ---------------- */
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

function setMenu(open) {
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  nav.dataset.menuOpen = String(open);
  mobileMenu.hidden = !open;
}
navToggle.addEventListener("click", () => {
  setMenu(navToggle.getAttribute("aria-expanded") !== "true");
});
// Close the menu after tapping any link inside it
mobileMenu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => setMenu(false))
);
// Close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    navToggle.focus();
  }
});

/* ---------------- Email capture ---------------- */
const form = document.getElementById("notifyForm");
const emailInput = document.getElementById("email");
const msg = document.getElementById("formMsg");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showMessage(text, type) {
  msg.textContent = text;
  msg.dataset.type = type; // "error" | "success"
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();

  // Inline validation (brief 6.6 / 7)
  if (!EMAIL_RE.test(email)) {
    emailInput.setAttribute("aria-invalid", "true");
    showMessage("Please enter a valid email address.", "error");
    emailInput.focus();
    return;
  }
  emailInput.removeAttribute("aria-invalid");

  const submitBtn = form.querySelector("button[type='submit']");
  const originalLabel = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.textContent = "Adding you…";
  showMessage("", "");

  try {
    const ok = await notifyAuthors(email);
    if (ok) {
      // Success state per brief 6.6 - replace the form with a calm confirmation.
      form.hidden = true;
      showMessage("Check your inbox — we've sent you the pre-order link.", "success");
    } else {
      throw new Error("Provider rejected the request");
    }
  } catch (err) {
    console.error("Signup failed:", err);
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalLabel;
    showMessage("Something went wrong. Please try again in a moment.", "error");
  }
});

// Clear the invalid state as the user corrects the field
emailInput.addEventListener("input", () => {
  if (emailInput.getAttribute("aria-invalid") === "true" && EMAIL_RE.test(emailInput.value.trim())) {
    emailInput.removeAttribute("aria-invalid");
    showMessage("", "");
  }
});

/* ---------------- Footer year (keeps © current automatically) ----------------
   Copy currently reads "© 2026" per brief. If you'd rather it auto-update,
   give the year span an id and uncomment:
   // document.getElementById("year").textContent = new Date().getFullYear();
*/
