/* ═══════════════════════════════════════════════════
   Occasus Lab — App Engine v3
   Firebase Auth · Freemium Usage · 5 Tool Engines
   ═══════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ── Firebase ─────────────────────────────────── */
  var db = null, auth = null, currentUser = null, isPro = false;
  var firebaseReady = false;

  try {
    if (typeof FIREBASE_CONFIG !== "undefined" && FIREBASE_CONFIG.apiKey) {
      if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
      auth = firebase.auth();
      db = firebase.firestore();
      firebaseReady = true;
    }
  } catch (e) {
    console.warn("Firebase not configured — running in local mode.", e);
  }

  /* ── Limits ───────────────────────────────────── */
  var LIMITS = (typeof FREE_LIMITS !== "undefined") ? FREE_LIMITS : { clarity: 5, brand: 3, utm: 999, tone: 0, headline: 0 };

  function todayKey() { return new Date().toISOString().slice(0, 10); }

  function getUsage() {
    try {
      var d = JSON.parse(localStorage.getItem("occ_usage") || "{}");
      if (d.date !== todayKey()) d = { date: todayKey(), clarity: 0, brand: 0, utm: 0, tone: 0, headline: 0 };
      return d;
    } catch (e) { return { date: todayKey(), clarity: 0, brand: 0, utm: 0, tone: 0, headline: 0 }; }
  }
  function saveUsage(u) { localStorage.setItem("occ_usage", JSON.stringify(u)); }

  function canUse(tool) {
    if (isPro) return true;
    var u = getUsage();
    return (u[tool] || 0) < (LIMITS[tool] || 0);
  }
  function recordUse(tool) {
    var u = getUsage();
    u[tool] = (u[tool] || 0) + 1;
    saveUsage(u);
    updateUsageBar();
    if (firebaseReady && currentUser) {
      db.collection("usage").doc(currentUser.uid).set(u, { merge: true }).catch(function () {});
    }
  }

  /* ── Auth ──────────────────────────────────────── */
  if (firebaseReady) {
    auth.onAuthStateChanged(function (user) {
      currentUser = user;
      if (user) {
        db.collection("users").doc(user.uid).set({
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        db.collection("users").doc(user.uid).get().then(function (doc) {
          isPro = doc.exists && doc.data().isPro === true;
          updateAuthUI();
          updateProGates();
          updateUsageBar();
        });
      } else {
        isPro = false;
        updateAuthUI();
        updateProGates();
        updateUsageBar();
      }
    });
  }

  function updateAuthUI() {
    var signInBtn = document.getElementById("btn-signin");
    var avatarMenu = document.getElementById("avatar-menu");
    if (!signInBtn || !avatarMenu) return;

    if (currentUser) {
      signInBtn.classList.add("hidden");
      avatarMenu.classList.remove("hidden");
      var img = avatarMenu.querySelector(".avatar-btn img");
      if (img) img.src = currentUser.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(currentUser.displayName || "U") + "&background=fdb54f&color=121212&size=72";
      var dropName = document.getElementById("user-name");
      var dropEmail = document.getElementById("user-email");
      var dropPlan = document.getElementById("user-plan");
      if (dropName) dropName.textContent = currentUser.displayName || "";
      if (dropEmail) dropEmail.textContent = currentUser.email || "";
      if (dropPlan) dropPlan.textContent = isPro ? "Pro Plan" : "Free Plan";
      /* Show admin link for whitelisted emails */
      var adminLink = document.getElementById("admin-link");
      var ADMIN_EMAILS = ["andrew.neuburger@community.isunet.edu", "andrew.neuburger@isunet.edu"];
      if (adminLink && ADMIN_EMAILS.indexOf(currentUser.email) !== -1) adminLink.classList.remove("hidden");
    } else {
      signInBtn.classList.remove("hidden");
      avatarMenu.classList.add("hidden");
    }
  }

  function updateProGates() {
    var gates = document.querySelectorAll(".pro-gate");
    gates.forEach(function (g) { g.classList.toggle("unlocked", isPro); });
    var proPanels = document.querySelectorAll("[data-pro-content]");
    proPanels.forEach(function (p) { p.classList.toggle("hidden", !isPro); });
  }

  function updateUsageBar() {
    var bar = document.getElementById("usage-bar");
    if (!bar) return;
    if (isPro) { bar.classList.add("hidden"); return; }
    bar.classList.remove("hidden");
    var u = getUsage();
    var total = (u.clarity || 0) + (u.brand || 0);
    var max = LIMITS.clarity + LIMITS.brand;
    var pct = Math.min(100, Math.round((total / max) * 100));
    var fill = bar.querySelector(".usage-bar__fill");
    var text = bar.querySelector(".usage-bar__text");
    if (fill) { fill.style.width = pct + "%"; fill.classList.toggle("usage-bar__fill--warn", pct >= 80); }
    if (text) text.textContent = total + " / " + max + " free uses today";
  }

  /* ── OccApp global (called from HTML) ────────── */
  window.OccApp = {
    showAuthModal: function () {
      var m = document.getElementById("auth-modal");
      if (m) m.classList.remove("hidden");
    },
    closeModals: function () {
      document.querySelectorAll(".modal-backdrop").forEach(function (m) { m.classList.add("hidden"); });
    },
    googleSignIn: function () {
      if (!firebaseReady) { toast("Firebase not configured", "error"); return; }
      var provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider).then(function () {
        window.OccApp.closeModals();
        toast("Welcome back!", "success");
      }).catch(function (err) {
        if (err.code !== "auth/popup-closed-by-user") toast("Sign-in error: " + err.message, "error");
      });
    },
    signOut: function () {
      if (auth) auth.signOut();
      currentUser = null;
      isPro = false;
      updateAuthUI();
      updateProGates();
      toast("Signed out", "info");
    },
    showUpgradeModal: function () {
      var m = document.getElementById("upgrade-modal");
      if (m) m.classList.remove("hidden");
    },
    selectedPlan: "monthly",
    selectPlan: function (plan) {
      window.OccApp.selectedPlan = plan;
      document.querySelectorAll(".upgrade-option").forEach(function (o) {
        o.classList.toggle("upgrade-option--active", o.dataset.plan === plan);
      });
    },
    processUpgrade: function () {
      if (!currentUser) {
        window.OccApp.closeModals();
        window.OccApp.showAuthModal();
        return;
      }
      /* MVP demo: set Pro directly. Production: redirect to Stripe Checkout. */
      db.collection("users").doc(currentUser.uid).update({ isPro: true }).then(function () {
        isPro = true;
        updateAuthUI();
        updateProGates();
        updateUsageBar();
        window.OccApp.closeModals();
        toast("Welcome to Pro! All tools unlocked.", "success");
      }).catch(function () {
        toast("Upgrade failed — try again", "error");
      });
    },
    toggleAvatarDrop: function () {
      var d = document.getElementById("avatar-dropdown");
      if (d) d.classList.toggle("hidden");
    }
  };

  /* close dropdown on outside click */
  document.addEventListener("click", function (e) {
    var d = document.getElementById("avatar-dropdown");
    if (d && !d.classList.contains("hidden") && !e.target.closest(".avatar-menu")) d.classList.add("hidden");
  });

  /* close modals on backdrop click */
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal-backdrop")) window.OccApp.closeModals();
  });

  /* ── Tabs ──────────────────────────────────────── */
  function initTabs() {
    var wrap = document.querySelector(".tabs");
    if (!wrap) return;
    var btns = wrap.querySelectorAll(".tabs__btn");
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var t = btn.dataset.tool;
        btns.forEach(function (b) { b.classList.toggle("tabs__btn--active", b === btn); });
        document.querySelectorAll(".panel").forEach(function (p) {
          p.classList.toggle("panel--active", p.id === "panel-" + t);
        });
      });
    });
  }

  /* ═══════════════════════════════════════════════════
     TOOL 1 · Clarity Rewriter
     ═══════════════════════════════════════════════════ */
  var JARGON = {
    "utilize": "use", "utilise": "use", "leverage": "use", "implement": "set up",
    "facilitate": "help", "optimize": "improve", "synergy": "teamwork",
    "streamline": "simplify", "paradigm": "model", "actionable": "practical",
    "bandwidth": "capacity", "circle back": "revisit", "deep dive": "look closely",
    "holistic": "complete", "ideate": "brainstorm", "incentivize": "motivate",
    "low-hanging fruit": "easy wins", "move the needle": "make progress",
    "scalable": "expandable", "touch base": "connect", "value-add": "benefit",
    "best-in-class": "leading", "disruptive": "innovative", "core competency": "strength",
    "ecosystem": "system", "end-to-end": "complete", "game-changer": "breakthrough",
    "pain point": "problem", "thought leader": "expert", "blue-sky thinking": "creative thinking",
    "drill down": "examine", "key takeaway": "main point"
  };
  var FILLERS = ["very", "really", "just", "simply", "basically", "actually", "literally", "absolutely", "definitely", "certainly", "obviously", "clearly", "honestly"];

  function rewriteClarity(text) {
    if (!text.trim()) return null;
    var original = text;
    var jargonCount = 0;
    var fillerCount = 0;

    /* jargon swap */
    Object.keys(JARGON).forEach(function (j) {
      var rgx = new RegExp("\\b" + j.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "\\b", "gi");
      if (rgx.test(text)) { jargonCount++; text = text.replace(rgx, JARGON[j]); }
    });

    /* filler removal */
    FILLERS.forEach(function (f) {
      var rgx = new RegExp("\\b" + f + "\\b\\s*", "gi");
      var m = text.match(rgx);
      if (m) { fillerCount += m.length; text = text.replace(rgx, ""); }
    });

    /* fix double spaces */
    text = text.replace(/ {2,}/g, " ").trim();

    /* sentence splitting */
    var sentences = text.split(/(?<=[.!?])\s+/);
    var splitCount = 0;
    sentences = sentences.map(function (s) {
      var words = s.split(/\s+/);
      if (words.length > 20) {
        var mid = Math.ceil(words.length / 2);
        for (var i = mid - 3; i <= mid + 3; i++) {
          if (words[i] && /^(and|but|or|which|that|because|while|so|yet|however)$/i.test(words[i])) {
            splitCount++;
            return words.slice(0, i).join(" ") + "." + "\n" + words[i].charAt(0).toUpperCase() + words[i].slice(1) + " " + words.slice(i + 1).join(" ");
          }
        }
      }
      return s;
    });
    text = sentences.join(" ").replace(/\n /g, "\n").trim();

    var reduction = Math.max(0, Math.round((1 - text.length / original.length) * 100));
    var readTime = Math.max(1, Math.round(text.split(/\s+/).length / 200));

    return {
      rewritten: text,
      jargon: jargonCount,
      fillers: fillerCount,
      splits: splitCount,
      reduction: reduction,
      wordCount: text.split(/\s+/).length,
      readTime: readTime,
      notes: buildClarityNotes(jargonCount, fillerCount, splitCount)
    };
  }

  function buildClarityNotes(j, f, s) {
    var notes = [];
    if (j) notes.push("Replaced " + j + " jargon term" + (j > 1 ? "s" : "") + " with plain language");
    if (f) notes.push("Removed " + f + " filler word" + (f > 1 ? "s" : ""));
    if (s) notes.push("Split " + s + " long sentence" + (s > 1 ? "s" : ""));
    if (!notes.length) notes.push("Text is already clear — no changes needed");
    return notes;
  }

  function runClarity() {
    if (!canUse("clarity")) { toast("Daily limit reached — upgrade to Pro for unlimited", "info"); window.OccApp.showUpgradeModal(); return; }
    var text = document.getElementById("clarity-input").value;
    var result = rewriteClarity(text);
    if (!result) { toast("Paste some text to rewrite", "info"); return; }
    recordUse("clarity");
    document.getElementById("clarity-output").textContent = result.rewritten;
    document.getElementById("clarity-jargon").textContent = result.jargon;
    document.getElementById("clarity-fillers").textContent = result.fillers;
    document.getElementById("clarity-reduction").textContent = result.reduction + "%";
    var notesList = document.getElementById("clarity-notes");
    notesList.innerHTML = "";
    result.notes.forEach(function (n) { var li = document.createElement("li"); li.textContent = n; notesList.appendChild(li); });
    toast("Clarity analysis complete", "success");
  }

  /* ═══════════════════════════════════════════════════
     TOOL 2 · Brand Message Generator
     ═══════════════════════════════════════════════════ */
  function runBrand() {
    if (!canUse("brand")) { toast("Daily limit reached — upgrade to Pro", "info"); window.OccApp.showUpgradeModal(); return; }
    var product = document.getElementById("brand-product").value.trim();
    var audience = document.getElementById("audience").value.trim();
    var problem = document.getElementById("problem").value.trim();
    var outcome = document.getElementById("outcome").value.trim();
    var tone = document.getElementById("tone").value;

    if (!product || !audience || !problem) { toast("Fill in at least product, audience, and problem", "info"); return; }
    recordUse("brand");

    var toneAdj = { professional: "clear and authoritative", friendly: "warm and approachable", bold: "confident and direct", minimal: "concise and elegant" };
    var adj = toneAdj[tone] || "clear";

    var tagline = capitalize(problem.split(" ").slice(0, 3).join(" ")) + "? " + capitalize(product) + ".";
    var elevator = product + " helps " + audience + " solve " + problem + (outcome ? " so they can " + outcome : "") + ". Our approach is " + adj + ".";
    var headline = "Stop " + gerund(problem.split(" ")[0]) + ". Start " + gerund((outcome || "winning").split(" ")[0]) + ".";
    var cta = tone === "bold" ? "Get started now →" : tone === "friendly" ? "Let's make it happen ✦" : "Learn more →";

    document.getElementById("positioning-output").textContent = tagline;
    document.getElementById("value-output").textContent = elevator;
    document.getElementById("lead-output").textContent = headline;
    document.getElementById("brand-cta").textContent = cta;
    toast("Brand messages generated", "success");
  }
  function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ""; }
  function gerund(w) { return w ? (w.endsWith("e") ? w.slice(0, -1) + "ing" : w + "ing") : "doing"; }

  /* ═══════════════════════════════════════════════════
     TOOL 3 · UTM Builder
     ═══════════════════════════════════════════════════ */
  function runUTM() {
    recordUse("utm");
    var base = document.getElementById("base-url").value.trim();
    var source = document.getElementById("utm-source").value.trim();
    var medium = document.getElementById("utm-medium").value.trim();
    var campaign = document.getElementById("utm-campaign").value.trim();
    var content = document.getElementById("utm-content").value.trim();

    if (!base || !source || !medium || !campaign) { toast("Fill in URL, source, medium, and campaign", "info"); return; }

    var slug = function (s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/(^_|_$)/g, ""); };
    var params = "utm_source=" + encodeURIComponent(slug(source)) + "&utm_medium=" + encodeURIComponent(slug(medium)) + "&utm_campaign=" + encodeURIComponent(slug(campaign));
    if (content) params += "&utm_content=" + encodeURIComponent(slug(content));

    var sep = base.indexOf("?") === -1 ? "?" : "&";
    var full = base + sep + params;

    document.getElementById("utm-output").textContent = full;
    toast("UTM link generated", "success");
  }
  function copyUTM() {
    var url = document.getElementById("utm-output").textContent;
    if (!url || url === "—") return;
    navigator.clipboard.writeText(url).then(function () { toast("Copied to clipboard!", "success"); }).catch(function () { toast("Copy failed", "error"); });
  }

  /* ═══════════════════════════════════════════════════
     TOOL 4 · Tone Analyzer (PRO)
     ═══════════════════════════════════════════════════ */
  var TONE_DICT = {
    formal: ["furthermore", "consequently", "therefore", "regarding", "pursuant", "whereas", "hereby", "substantial", "facilitate", "commence", "endeavor", "acknowledge", "demonstrate", "implement", "constitute", "notwithstanding", "hereafter", "aforementioned", "requisite", "pertaining"],
    casual: ["awesome", "cool", "amazing", "gonna", "wanna", "stuff", "pretty", "kind of", "sort of", "hey", "wow", "honestly", "literally", "totally", "super", "dude", "alright", "yeah", "nah", "lol"],
    technical: ["algorithm", "framework", "infrastructure", "optimize", "scalable", "methodology", "paradigm", "architecture", "implementation", "protocol", "vectorize", "deploy", "compile", "integrate", "modular", "api", "refactor", "iterate", "database", "schema"],
    persuasive: ["exclusive", "guaranteed", "proven", "revolutionary", "transform", "unlock", "accelerate", "premium", "breakthrough", "empower", "maximize", "leverage", "elite", "ultimate", "discover", "secret", "irresistible", "limited", "urgent", "act now"]
  };

  function runTone() {
    if (!canUse("tone")) { toast("Tone Analyzer is a Pro feature", "info"); window.OccApp.showUpgradeModal(); return; }
    var text = document.getElementById("tone-input").value.trim().toLowerCase();
    if (!text) { toast("Enter text to analyze", "info"); return; }
    recordUse("tone");

    var counts = { formal: 0, casual: 0, technical: 0, persuasive: 0 };
    var total = 0;
    Object.keys(TONE_DICT).forEach(function (cat) {
      TONE_DICT[cat].forEach(function (w) {
        var rgx = new RegExp("\\b" + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "\\b", "gi");
        var m = text.match(rgx);
        if (m) { counts[cat] += m.length; total += m.length; }
      });
    });

    if (total === 0) total = 1;
    var pcts = {};
    Object.keys(counts).forEach(function (k) { pcts[k] = Math.round((counts[k] / total) * 100); });

    /* render bars */
    var container = document.getElementById("tone-output");
    container.innerHTML = "";
    var dominant = Object.keys(pcts).reduce(function (a, b) { return pcts[a] >= pcts[b] ? a : b; });

    ["formal", "casual", "technical", "persuasive"].forEach(function (cat) {
      var bar = document.createElement("div");
      bar.className = "tone-bar tone-bar--" + cat;
      bar.innerHTML = "<span class='tone-bar__label'>" + cat + "</span>" +
        "<div class='tone-bar__track'><div class='tone-bar__fill' style='width:" + pcts[cat] + "%'></div></div>" +
        "<span class='tone-bar__pct'>" + pcts[cat] + "%</span>";
      container.appendChild(bar);
    });

    var verdict = document.getElementById("tone-advice");
    if (verdict) verdict.textContent = "Your text is predominantly " + dominant + " (" + pcts[dominant] + "%). " + toneAdvice(dominant);
    toast("Tone analysis complete", "success");
  }

  function toneAdvice(t) {
    var map = {
      formal: "Consider softening for broader audiences.",
      casual: "Great for social media, but tighten for professional collateral.",
      technical: "Works for expert audiences — simplify for general marketing.",
      persuasive: "Strong sales copy. Ensure claims are backed by evidence."
    };
    return map[t] || "";
  }

  /* ═══════════════════════════════════════════════════
     TOOL 5 · Headline Scorer (PRO)
     ═══════════════════════════════════════════════════ */
  var POWER_WORDS = ["free", "new", "proven", "secret", "ultimate", "instant", "effortless", "exclusive", "breakthrough", "guaranteed", "discover", "master", "powerful", "unleash", "transform", "boost", "critical", "essential", "surprising", "shocking"];
  var EMOTIONAL_WORDS = ["fear", "love", "hate", "desperate", "amazing", "terrifying", "stunning", "heartbreaking", "thrilling", "dangerous", "brilliant", "tragic", "inspiring", "outrageous", "devastating", "unbelievable", "incredible", "astonishing"];

  function scoreHeadline(text) {
    if (!text.trim()) return null;
    var words = text.trim().split(/\s+/);
    var wc = words.length;
    var lower = text.toLowerCase();

    /* length score: sweet spot 6-12 words (max 25) */
    var len = 0;
    if (wc >= 6 && wc <= 12) len = 25;
    else if (wc >= 4 && wc <= 14) len = 18;
    else if (wc >= 2) len = 10;

    /* power words (max 25) */
    var pw = 0;
    POWER_WORDS.forEach(function (w) { if (lower.indexOf(w) !== -1) pw++; });
    var powerScore = Math.min(25, pw * 8);

    /* clarity: penalize jargon + fillers (max 25) */
    var jCount = 0;
    Object.keys(JARGON).forEach(function (j) { if (lower.indexOf(j) !== -1) jCount++; });
    var fCount = 0;
    FILLERS.forEach(function (f) { if (lower.indexOf(f) !== -1) fCount++; });
    var clarityScore = Math.max(0, 25 - (jCount * 5) - (fCount * 3));

    /* emotional impact (max 25) */
    var emo = 0;
    EMOTIONAL_WORDS.forEach(function (w) { if (lower.indexOf(w) !== -1) emo++; });
    var hasQuestion = /\?/.test(text);
    var hasNumber = /\d/.test(text);
    var emotionalScore = Math.min(25, emo * 7 + (hasQuestion ? 5 : 0) + (hasNumber ? 5 : 0));

    var total = len + powerScore + clarityScore + emotionalScore;
    var grade = total >= 80 ? "A" : total >= 60 ? "B" : total >= 40 ? "C" : "D";

    return { total: total, grade: grade, length: len, power: powerScore, clarity: clarityScore, emotion: emotionalScore, wordCount: wc };
  }

  function runHeadline() {
    if (!canUse("headline")) { toast("Headline Scorer is a Pro feature", "info"); window.OccApp.showUpgradeModal(); return; }
    var h1 = document.getElementById("headline-input").value.trim();
    var h2 = document.getElementById("headline-input-2").value.trim();
    if (!h1) { toast("Enter at least one headline", "info"); return; }
    recordUse("headline");

    var s1 = scoreHeadline(h1);
    renderHeadlineScore("headline-result-1", s1);

    if (h2) {
      var s2 = scoreHeadline(h2);
      document.getElementById("headline-result-2-wrap").classList.remove("hidden");
      renderHeadlineScore("headline-result-2", s2);
      var winner = document.getElementById("headline-winner");
      if (winner) {
        if (s1.total > s2.total) winner.textContent = "→ Headline A wins by " + (s1.total - s2.total) + " points.";
        else if (s2.total > s1.total) winner.textContent = "→ Headline B wins by " + (s2.total - s1.total) + " points.";
        else winner.textContent = "→ It's a tie! Both headlines score equally.";
      }
    } else {
      var wrap2 = document.getElementById("headline-result-2-wrap");
      if (wrap2) wrap2.classList.add("hidden");
    }
    toast("Headlines scored", "success");
  }

  function renderHeadlineScore(containerId, s) {
    var el = document.getElementById(containerId);
    if (!el) return;
    var gradeClass = s.grade === "A" ? "grade-a" : s.grade === "B" ? "grade-b" : "grade-c";
    el.innerHTML =
      "<div class='headline-score'>" +
        "<div class='headline-score__total'>" +
          "<span class='headline-score__number'>" + s.total + "</span>" +
          "<span class='headline-score__grade " + gradeClass + "'>" + s.grade + "</span>" +
          "<span style='font-size:.85rem;color:var(--muted);margin-left:.5rem'>" + s.wordCount + " words</span>" +
        "</div>" +
        "<div class='headline-score__bars'>" +
          scoreBarHTML("Length", s.length, 25) +
          scoreBarHTML("Power", s.power, 25) +
          scoreBarHTML("Clarity", s.clarity, 25) +
          scoreBarHTML("Emotion", s.emotion, 25) +
        "</div>" +
      "</div>";
  }

  function scoreBarHTML(label, val, max) {
    var pct = Math.round((val / max) * 100);
    return "<div class='score-bar'>" +
      "<span class='score-bar__label'>" + label + "</span>" +
      "<div class='score-bar__track'><div class='score-bar__fill' style='width:" + pct + "%'></div></div>" +
      "<span class='score-bar__val'>" + val + "/" + max + "</span>" +
      "</div>";
  }

  /* ═══════════════════════════════════════════════════
     TOAST
     ═══════════════════════════════════════════════════ */
  function toast(msg, type) {
    var c = document.getElementById("toast-container");
    if (!c) return;
    var t = document.createElement("div");
    t.className = "toast toast--" + (type || "info");
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(function () { t.style.opacity = "0"; setTimeout(function () { t.remove(); }, 300); }, 3200);
  }

  /* ═══════════════════════════════════════════════════
     NAV SCROLL OBSERVATION
     ═══════════════════════════════════════════════════ */
  function initScrollSpy() {
    var sections = document.querySelectorAll("section[id]");
    if (!sections.length) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var id = e.target.id;
          document.querySelectorAll(".nav__link").forEach(function (l) {
            l.classList.toggle("active", l.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { obs.observe(s); });
  }

  /* ═══════════════════════════════════════════════════
     INIT
     ═══════════════════════════════════════════════════ */
  function init() {
    initTabs();
    initScrollSpy();
    updateUsageBar();

    /* Wire tool buttons */
    var btnClarity = document.getElementById("btn-clarity");
    if (btnClarity) btnClarity.addEventListener("click", runClarity);

    var btnBrand = document.getElementById("btn-brand");
    if (btnBrand) btnBrand.addEventListener("click", runBrand);

    var btnUTM = document.getElementById("btn-utm");
    if (btnUTM) btnUTM.addEventListener("click", runUTM);

    var btnCopyUTM = document.getElementById("utm-copy");
    if (btnCopyUTM) btnCopyUTM.addEventListener("click", copyUTM);

    var btnTone = document.getElementById("btn-tone");
    if (btnTone) btnTone.addEventListener("click", runTone);

    var btnHeadline = document.getElementById("btn-headline");
    if (btnHeadline) btnHeadline.addEventListener("click", runHeadline);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
