(function () {
  const clarityForm = document.getElementById("clarity-form");
  const clarityInput = document.getElementById("clarity-input");
  const clarityOutput = document.getElementById("clarity-output");
  const clarityMetrics = document.getElementById("clarity-metrics");
  const clarityNotes = document.getElementById("clarity-notes");
  const claritySample = document.getElementById("clarity-sample");

  const brandForm = document.getElementById("brand-form");
  const positioningOutput = document.getElementById("positioning-output");
  const valueOutput = document.getElementById("value-output");
  const leadOutput = document.getElementById("lead-output");

  const utmForm = document.getElementById("utm-form");
  const utmOutput = document.getElementById("utm-output");
  const utmCopy = document.getElementById("utm-copy");

  const jargonMap = new Map([
    ["cutting-edge", "advanced"],
    ["full-spectrum", "broad"],
    ["empower", "help"],
    ["mission-aligned", "purpose-led"],
    ["holistic", "clear"],
    ["framework", "system"],
    ["leverages", "uses"],
    ["high-value", "strong"],
    ["strategic differentiation", "clear distinction"],
    ["digital ecosystem", "digital channels"],
    ["synergy", "alignment"],
    ["utilize", "use"],
    ["best-in-class", "strong"],
    ["robust", "solid"],
    ["optimize", "improve"],
    ["stakeholders", "people"],
    ["seamless", "smooth"],
    ["innovative", "useful"],
    ["scalable", "repeatable"],
    ["solution", "tool"]
  ]);

  const fillerWords = ["really", "very", "basically", "actually", "just", "simply", "quite"];
  const claritySamples = [
    "Our integrated solution enables visionary founders to activate a scalable thought-leadership ecosystem that aligns strategic storytelling with conversion-ready content outputs.",
    "We help mission-driven businesses unlock meaningful audience engagement by deploying a holistic narrative architecture across owned and earned media touchpoints.",
    "This offer is designed to give consultants a robust and transformative framework for elevating perception, authority, and consistent digital visibility."
  ];

  function escapeHtml(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function countWords(text) {
    return (text.match(/\b[\w'-]+\b/g) || []).length;
  }

  function countSentences(text) {
    return Math.max(1, (text.match(/[.!?]+/g) || []).length || 1);
  }

  function simplifyText(source) {
    let updated = ` ${source.trim()} `;
    const notes = [];

    jargonMap.forEach((replacement, phrase) => {
      const regex = new RegExp(`\\b${phrase.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}\\b`, "gi");
      if (regex.test(updated)) {
        updated = updated.replace(regex, replacement);
        notes.push(`Replaced jargon like “${phrase}” with simpler wording.`);
      }
    });

    fillerWords.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      if (regex.test(updated)) {
        updated = updated.replace(regex, "");
      }
    });

    if (source !== updated.trim()) {
      notes.push("Removed filler words to reduce noise.");
    }

    updated = updated
      .replace(/\s+,/g, ",")
      .replace(/\s{2,}/g, " ")
      .replace(/,\s+(and|but|so)\s+/gi, ". $1 ")
      .replace(/\s*;\s*/g, ". ")
      .trim();

    const sentences = updated
      .split(/(?<=[.!?])\s+/)
      .flatMap((sentence) => splitLongSentence(sentence.trim()))
      .map(sentenceCase)
      .filter(Boolean);

    if (sentences.length > countSentences(source)) {
      notes.push("Split long sentences into shorter units for easier reading.");
    }

    const rewritten = sentences.join(" ");
    if (!notes.length) {
      notes.push("Tightened sentence flow and preserved the main promise.");
    }

    return { rewritten, notes: dedupe(notes) };
  }

  function splitLongSentence(sentence) {
    const words = sentence.split(/\s+/).filter(Boolean);
    if (words.length <= 18) return [sentence];

    const pivot = sentence.search(/,| and | while | which | that /i);
    if (pivot === -1) return [sentence];

    const first = sentence.slice(0, pivot).replace(/[,:;\s]+$/, "");
    const second = sentence.slice(pivot + 1).replace(/^[,:;\s]+/, "");
    return [first.endsWith(".") ? first : `${first}.`, second];
  }

  function sentenceCase(sentence) {
    if (!sentence) return "";
    const cleaned = sentence.replace(/\s{2,}/g, " ").trim();
    if (!cleaned) return "";
    const normalized = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    return /[.!?]$/.test(normalized) ? normalized : `${normalized}.`;
  }

  function dedupe(items) {
    return [...new Set(items)];
  }

  function renderClarity() {
    const source = clarityInput.value.trim();
    if (!source) return;

    const result = simplifyText(source);
    const beforeWords = countWords(source);
    const afterWords = countWords(result.rewritten);
    const beforeSentences = countSentences(source);
    const afterSentences = countSentences(result.rewritten);
    const sentenceDelta = beforeSentences === 0 ? 0 : Math.round((beforeWords / beforeSentences) - (afterWords / afterSentences));

    clarityOutput.innerHTML = `<p>${escapeHtml(result.rewritten)}</p>`;
    clarityNotes.innerHTML = result.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("");
    clarityMetrics.innerHTML = [
      metricCard("Words", `${beforeWords} → ${afterWords}`),
      metricCard("Sentences", `${beforeSentences} → ${afterSentences}`),
      metricCard("Avg. sentence load", `${sentenceDelta >= 0 ? "-" : "+"}${Math.abs(sentenceDelta)} words`)
    ].join("");
  }

  function metricCard(label, value) {
    return `<div class="metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
  }

  function generateBrandMessage(event) {
    event.preventDefault();
    const form = new FormData(brandForm);
    const audience = form.get("audience").toString().trim();
    const problem = form.get("problem").toString().trim();
    const outcome = form.get("outcome").toString().trim();
    const difference = form.get("difference").toString().trim();
    const proof = form.get("proof").toString().trim();
    const tone = form.get("tone").toString();

    const toneMap = {
      calm: "Clear, calm, and editorial",
      direct: "Direct, confident, and practical",
      warm: "Warm, intelligent, and reassuring"
    };

    positioningOutput.textContent = `For ${audience}, Occasus Lab solves the problem that ${problem} by delivering ${outcome} through ${difference}.`;
    valueOutput.textContent = `Get ${outcome} without bloated tools or generic messaging systems. Built on ${proof}.`;
    leadOutput.textContent = `${toneMap[tone]}. We help ${audience} move from confusion to usable clarity.`;
  }

  function buildUtm(event) {
    event.preventDefault();
    const form = new FormData(utmForm);
    const baseUrl = form.get("base-url").toString().trim();
    let url;

    try {
      url = new URL(baseUrl);
    } catch {
      utmOutput.textContent = "Enter a valid base URL first.";
      return;
    }

    ["utm-source", "utm-medium", "utm-campaign", "utm-content", "utm-term"].forEach((field) => {
      const value = form.get(field).toString().trim();
      if (value) {
        url.searchParams.set(field.replace("utm-", "utm_"), slugify(value));
      }
    });

    utmOutput.textContent = url.toString();
  }

  function slugify(value) {
    return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function cycleSample() {
    const current = claritySamples.indexOf(clarityInput.value.trim());
    const nextIndex = current === -1 ? 0 : (current + 1) % claritySamples.length;
    clarityInput.value = claritySamples[nextIndex];
    renderClarity();
  }

  function copyUtm() {
    const value = utmOutput.textContent.trim();
    if (!value || value === "Enter a valid base URL first.") return;
    navigator.clipboard.writeText(value).then(() => {
      utmCopy.textContent = "Copied";
      window.setTimeout(() => {
        utmCopy.textContent = "Copy result";
      }, 1200);
    });
  }

  clarityForm.addEventListener("submit", function (event) {
    event.preventDefault();
    renderClarity();
  });

  brandForm.addEventListener("submit", generateBrandMessage);
  utmForm.addEventListener("submit", buildUtm);
  claritySample.addEventListener("click", cycleSample);
  utmCopy.addEventListener("click", copyUtm);

  renderClarity();
  brandForm.dispatchEvent(new Event("submit", { cancelable: true }));
  utmForm.dispatchEvent(new Event("submit", { cancelable: true }));
})();