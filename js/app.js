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
// Everything below builds the page.
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

  if (ready && typeof qrcode !== "undefined") {
    // Draws a crisp SVG QR (works on every phone, no canvas needed)
    const qr = qrcode(0, "M");
    qr.addData(c.url);
    qr.make();
    qrBox.innerHTML = qr
      .createSvgTag({ cellSize: 4, margin: 8, scalable: true })
      .replace('fill="black"', 'fill="#5a2d17"');
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

// ─────────────────────────────────────────────────────────────
// BACKGROUND MUSIC  (audio/statue.mp3)
// Phones block sound until the visitor taps something, so the
// song starts on her first tap anywhere, and the button lets her
// pause / resume at any time.
// ─────────────────────────────────────────────────────────────
const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");
let playing = false;
let userPaused = false;

bgm.volume = 0.5; // 0 = silent, 1 = full volume

function updateMusicUI() {
  musicBtn.classList.toggle("on", playing);
}

function startMusic() {
  return bgm
    .play()
    .then(() => {
      playing = true;
      updateMusicUI();
    })
    .catch(() => {
      playing = false;
      updateMusicUI();
    });
}

function stopMusic() {
  bgm.pause();
  playing = false;
  updateMusicUI();
}

// Only show the button if the mp3 actually loads
bgm.addEventListener(
  "canplay",
  () => {
    musicBtn.hidden = false;
  },
  { once: true },
);
bgm.addEventListener("error", () => {
  musicBtn.hidden = true;
  console.warn("Music file not found: put it at audio/Statue.mp3");
});

musicBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // don't trigger the "first tap" starter
  if (playing) {
    userPaused = true;
    stopMusic();
  } else {
    userPaused = false;
    startMusic();
  }
});

// Try autoplay (works on some desktops); otherwise start on her first tap
startMusic().then(() => {
  if (!playing) {
    const firstTap = () => {
      if (!userPaused) startMusic();
      if (playing) document.removeEventListener("click", firstTap);
    };
    document.addEventListener("click", firstTap);
  }
});
