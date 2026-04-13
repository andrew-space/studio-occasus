/* ═══════════════════════════════════════════════════
   Admin Panel — Occasus Lab CMS
   Firebase Firestore CRUD for articles + users
   ═══════════════════════════════════════════════════ */
(function () {
  var db = null;
  var auth = null;
  var currentUser = null;
  var articleListBound = false;
  var usersListBound = false;

  function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
  }

  function getAdminAccess() {
    var fallback = {
      emails: ["andrew.neuburger@community.isunet.edu", "andrew.neuburger@isunet.edu"],
      domains: ["community.isunet.edu", "isunet.edu"]
    };
    var cfg = (typeof ADMIN_ACCESS !== "undefined" && ADMIN_ACCESS) ? ADMIN_ACCESS : fallback;
    var emails = (Array.isArray(cfg.emails) ? cfg.emails : fallback.emails)
      .map(normalizeEmail)
      .filter(Boolean);
    var domains = (Array.isArray(cfg.domains) ? cfg.domains : fallback.domains)
      .map(function (d) { return String(d || "").trim().toLowerCase(); })
      .filter(Boolean);
    return { emails: emails, domains: domains };
  }

  function isAllowedAdminEmail(email) {
    var safe = normalizeEmail(email);
    if (!safe) return false;
    var access = getAdminAccess();
    if (access.emails.indexOf(safe) !== -1) return true;
    var at = safe.lastIndexOf("@");
    if (at === -1) return false;
    var domain = safe.slice(at + 1);
    return access.domains.indexOf(domain) !== -1;
  }

  function mapAuthError(err) {
    if (!err || !err.code) return "Sign-in error.";
    if (err.code === "auth/popup-closed-by-user") return "Sign-in popup was closed.";
    if (err.code === "auth/unauthorized-domain") {
      return "Unauthorized domain. Add " + window.location.hostname + " in Firebase Authentication > Settings > Authorized domains.";
    }
    if (err.code === "auth/operation-not-allowed") return "Google provider is disabled in Firebase Authentication.";
    return err.message || err.code;
  }

  function init() {
    if (typeof FIREBASE_CONFIG === "undefined" || !FIREBASE_CONFIG.apiKey) {
      document.getElementById("admin-gate").innerHTML =
        "<h2>Firebase not configured</h2><p>Add your Firebase config to <code>assets/firebase-config.js</code> to enable the admin panel.</p>";
      return;
    }

    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    auth = firebase.auth();
    db = firebase.firestore();

    auth.onAuthStateChanged(function (user) {
      if (!user) {
        document.getElementById("admin-gate").classList.remove("hidden");
        document.getElementById("admin-dashboard").classList.add("hidden");
        return;
      }

      user.getIdTokenResult().then(function (tokenResult) {
        var byEmail = isAllowedAdminEmail(user.email);
        var byClaim = !!(tokenResult && tokenResult.claims && tokenResult.claims.admin === true);
        if (byEmail || byClaim) {
          currentUser = user;
          document.getElementById("admin-gate").classList.add("hidden");
          document.getElementById("admin-dashboard").classList.remove("hidden");
          loadDashboard();
          return;
        }

        var access = getAdminAccess();
        document.getElementById("admin-gate").innerHTML =
          "<h2>Access Denied</h2><p>" + esc(user.email || "") + " is not an admin.</p>" +
          "<p style='color:var(--muted);font-size:.9rem'>Allowed emails: " + esc(access.emails.join(", ")) + "</p>" +
          "<p style='color:var(--muted);font-size:.9rem'>Allowed domains: " + esc(access.domains.join(", ")) + "</p>" +
          "<p><button class='btn btn--sm btn--ghost' onclick='firebase.auth().signOut()'>Sign out</button></p>";
      }).catch(function () {
        document.getElementById("admin-gate").innerHTML =
          "<h2>Access Check Failed</h2><p>Unable to verify admin claims. Please sign in again.</p>";
      });
    });

    document.getElementById("admin-google-signin").addEventListener("click", function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      auth.signInWithPopup(provider).catch(function (err) {
        console.error("Admin sign-in error:", err);
        var gate = document.getElementById("admin-gate");
        if (gate && err.code !== "auth/popup-closed-by-user") {
          gate.innerHTML = "<h2>Sign-in failed</h2><p>" + esc(mapAuthError(err)) + "</p>";
        }
      });
    });

    document.getElementById("admin-signout").addEventListener("click", function () {
      auth.signOut();
    });

    document.getElementById("btn-new-article").addEventListener("click", function () {
      document.getElementById("article-editor").classList.remove("hidden");
      document.getElementById("editor-title").textContent = "New Article";
      document.getElementById("article-form").reset();
      document.getElementById("art-id").value = "";
    });

    document.getElementById("article-form").addEventListener("submit", function (e) {
      e.preventDefault();
      saveArticle();
    });
  }

  function loadDashboard() {
    loadStats();
    loadArticles();
    loadUsers();
  }

  function loadStats() {
    db.collection("users").get().then(function (snap) {
      document.getElementById("stat-users").textContent = snap.size;
      var pro = 0;
      snap.forEach(function (doc) { if (doc.data().isPro) pro++; });
      document.getElementById("stat-pro").textContent = pro;
    }).catch(function () {
      document.getElementById("stat-users").textContent = "—";
      document.getElementById("stat-pro").textContent = "—";
    });

    db.collection("articles").get().then(function (snap) {
      document.getElementById("stat-articles").textContent = snap.size;
    }).catch(function () {
      document.getElementById("stat-articles").textContent = "—";
    });

    document.getElementById("stat-runs").textContent = "—";
  }

  function loadArticles() {
    var list = document.getElementById("articles-list");
    list.innerHTML = "<p style='color:var(--muted);font-size:.85rem'>Loading...</p>";

    db.collection("articles").orderBy("createdAt", "desc").get().then(function (snap) {
      if (snap.empty) {
        list.innerHTML = "<p style='color:var(--muted);font-size:.85rem'>No articles yet. Click \"+ New Article\" to create one.</p>";
        return;
      }
      list.innerHTML = "";
      snap.forEach(function (doc) {
        var d = doc.data();
        var item = document.createElement("div");
        item.className = "admin__list-item";
        item.innerHTML =
          "<div><strong>" + esc(d.title) + "</strong> <span style='color:var(--muted);font-size:.78rem'>" + esc(d.category || "") + "</span>" +
          (d.isPro ? " <span class='pro-badge'>PRO</span>" : "") + "</div>" +
          "<div><button class='btn btn--sm btn--ghost' data-id='" + doc.id + "' data-action='edit'>Edit</button>" +
          "<button class='btn btn--sm btn--ghost' style='color:var(--red)' data-id='" + doc.id + "' data-action='delete'>Delete</button></div>";
        list.appendChild(item);
      });

      if (!articleListBound) {
        list.addEventListener("click", function (e) {
          var btn = e.target.closest("[data-action]");
          if (!btn) return;
          var id = btn.dataset.id;
          if (btn.dataset.action === "edit") editArticle(id);
          if (btn.dataset.action === "delete") deleteArticle(id);
        });
        articleListBound = true;
      }
    }).catch(function (err) {
      list.innerHTML = "<p style='color:var(--red)'>Error loading articles: " + err.message + "</p>";
    });
  }

  function loadUsers() {
    var list = document.getElementById("users-list");
    list.innerHTML = "<p style='color:var(--muted);font-size:.85rem'>Loading...</p>";

    db.collection("users").orderBy("createdAt", "desc").get().then(function (snap) {
      if (snap.empty) { list.innerHTML = "<p style='color:var(--muted)'>No users yet.</p>"; return; }
      list.innerHTML = "";
      snap.forEach(function (doc) {
        var d = doc.data();
        var item = document.createElement("div");
        item.className = "admin__list-item";
        var nextPro = !d.isPro;
        item.innerHTML =
          "<div><strong>" + esc(d.displayName || "—") + "</strong> <span style='color:var(--muted);font-size:.78rem'>" + esc(d.email || "") + "</span>" +
          (d.isPro ? " <span class='pro-badge'>PRO</span>" : "") + "</div>" +
          "<button class='btn btn--sm " + (d.isPro ? "btn--ghost" : "btn--primary") + "' data-uid='" + doc.id + "' data-toggle-pro data-set-pro='" + (nextPro ? "true" : "false") + "'>" +
          (d.isPro ? "Remove Pro" : "Grant Pro") + "</button>";
        list.appendChild(item);
      });

      if (!usersListBound) {
        list.addEventListener("click", function (e) {
          var btn = e.target.closest("[data-toggle-pro]");
          if (!btn) return;
          var uid = btn.dataset.uid;
          var setTo = btn.dataset.setPro === "true";
          db.collection("users").doc(uid).update({ isPro: setTo }).then(function () {
            loadUsers();
          });
        });
        usersListBound = true;
      }
    }).catch(function (err) {
      list.innerHTML = "<p style='color:var(--red)'>Error: " + err.message + "</p>";
    });
  }

  function saveArticle() {
    var form = document.getElementById("article-form");
    var id = document.getElementById("art-id").value;
    var data = {
      title: form.title.value.trim(),
      slug: form.slug.value.trim(),
      category: form.category.value.trim(),
      excerpt: form.excerpt.value.trim(),
      feeds: form.feeds.value.trim(),
      isPro: form.isPro.checked,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    var promise;
    if (id) {
      promise = db.collection("articles").doc(id).update(data);
    } else {
      data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      promise = db.collection("articles").add(data);
    }

    promise.then(function () {
      document.getElementById("article-editor").classList.add("hidden");
      loadArticles();
    }).catch(function (err) {
      alert("Error saving: " + err.message);
    });
  }

  function editArticle(id) {
    db.collection("articles").doc(id).get().then(function (doc) {
      if (!doc.exists) return;
      var d = doc.data();
      var form = document.getElementById("article-form");
      form.title.value = d.title || "";
      form.slug.value = d.slug || "";
      form.category.value = d.category || "";
      form.excerpt.value = d.excerpt || "";
      form.feeds.value = d.feeds || "";
      form.isPro.checked = !!d.isPro;
      document.getElementById("art-id").value = id;
      document.getElementById("editor-title").textContent = "Edit Article";
      document.getElementById("article-editor").classList.remove("hidden");
    });
  }

  function deleteArticle(id) {
    if (!confirm("Delete this article?")) return;
    db.collection("articles").doc(id).delete().then(function () {
      loadArticles();
    });
  }

  function esc(str) {
    var d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  init();
})();
