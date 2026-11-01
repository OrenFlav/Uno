// ─────────────────────────────────────────────────────────────
// CONFESSION LIST — app.js
// ─────────────────────────────────────────────────────────────

const confessions = [
  {
    part: "Part 1",
    title: "The Envelope",
    note: "where it all started 💌",
    url: "https://orenflav.github.io/Uno_p1/",
  },
  {
    part: "Part 2",
    title: "The Hint 🍊",
    note: "Who's that pokemon?",
    url: "https://orenflav.github.io/Uno_p2/",
  },
  {
    part: "Part 3",
    title: "Uno you know!!",
    note: "shet shet nakita ako",
    url: "https://orenflav.github.io/Uno_p3/",
  },
  {
    part: "Part 4",
    title: "Hopia like it",
    note: "mwehehe",
    url: "https://orenflav.github.io/Uno_p4/",
  },
];

// ─────────────────────────────────────────────────────────────
// Everything below builds the page. You don't need to edit it.
// ─────────────────────────────────────────────────────────────
const list = document.getElementById("list");

function isRealLink(url) {
  return /^https?:\/\//i.test(url) && !url.includes("YOUR-");
}

confessions.forEach((c, i) => {
  const ready = isRealLink(c.url);

  const li = document.createElement("li");
  li.className = "item";
  li.style.animationDelay = i * 0.12 + "s";

  // ── QR code (on top) — tapping it opens the link ──
  const qrBox = document.createElement(ready ? "a" : "div");
  qrBox.className = "qr-box" + (ready ? "" : " empty");
  if (ready) {
    qrBox.href = c.url;
    qrBox.target = "_blank";
    qrBox.rel = "noopener";
    qrBox.setAttribute("aria-label", "Open " + c.title);
  }

  if (ready && typeof QRCode !== "undefined") {
    new QRCode(qrBox, {
      text: c.url,
      width: 180,
      height: 180,
      colorDark: "#5a2d17",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M,
    });
  } else {
    qrBox.textContent = ready ? "QR unavailable" : "link not set yet";
  }

  // ── Text ──
  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = c.part;

  const title = document.createElement("h2");
  title.textContent = c.title;

  const note = document.createElement("p");
  note.className = "note";
  note.textContent = c.note;

  li.append(badge, qrBox, title, note);

  // ── Open button ──
  if (ready) {
    const btn = document.createElement("a");
    btn.className = "btn";
    btn.href = c.url;
    btn.target = "_blank";
    btn.rel = "noopener";
    btn.textContent = "Open it →";
    li.appendChild(btn);
  }

  list.appendChild(li);
});
