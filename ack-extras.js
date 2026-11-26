/* ACK Diary toolbar: language, share sheet and account menu.
 * Mounted after the app has hydrated so React never sees these nodes. */
(function () {
  "use strict";
  var SUPABASE_JS = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";
  var cfg = window.ACK_AUTH || {};
  var authOn = !!(cfg.supabaseUrl && cfg.supabaseAnonKey);

  function t(s) { return window.ACKi18n ? window.ACKi18n.t(s) : s; }

  var ICON = {
    share: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="m16 6-4-4-4 4"/><path d="M12 2v13"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    phone: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    post: '<path d="M4 4l16 16"/><path d="M20 4 4 20"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 6L2 7"/>',
    sms: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    out: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  };
  function svg(name, size) {
    return '<svg width="' + (size || 18) + '" height="' + (size || 18) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[name] + "</svg>";
  }

  var CSS =
    "#ack-toolbar{position:fixed;z-index:46;display:flex;gap:.5rem;font:500 14px/1.2 system-ui,-apple-system,'Segoe UI',Roboto,'Noto Sans Tamil','Noto Sans Devanagari',sans-serif;color:var(--ink,#1b2340)}" +
    "#ack-toolbar .ack-btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;min-height:40px;border-radius:10px;border:1px solid var(--line,#ddd);background:var(--paper,#fff);color:inherit;font:inherit;cursor:pointer;padding:0 .75rem}" +
    "#ack-toolbar .ack-btn:hover{background:var(--gold-soft,#f2e7cc)}" +
    "#ack-toolbar .ack-primary{background:var(--accent,#1f3a6e);border-color:var(--accent,#1f3a6e);color:#fff}" +
    "#ack-toolbar .ack-primary:hover{filter:brightness(1.1);background:var(--accent,#1f3a6e)}" +
    "#ack-toolbar button:focus-visible,#ack-share button:focus-visible,#ack-share a:focus-visible,#ack-account button:focus-visible{outline:2px solid var(--gold,#b8924a);outline-offset:2px}" +
    "#ack-toolbar .ack-avatar{width:26px;height:26px;border-radius:999px;background:var(--accent,#1f3a6e);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex:none}" +
    "#ack-toolbar .ack-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
    "#ack-toolbar #ack-lang.ack-docked{position:static;box-shadow:none;border-radius:10px;min-height:40px;padding:0 .5rem 0 .7rem}" +
    /* Mobile: compact row in the top header */
    "#ack-toolbar{top:max(.55rem,env(safe-area-inset-top));right:.75rem;align-items:center}" +
    "#ack-toolbar .ack-icon-only .ack-label{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}" +
    "#ack-toolbar .ack-icon-only{width:40px;padding:0}" +
    "header.md\\:hidden>a[aria-label='Sync status']{visibility:hidden}" +
    "@media (max-width:380px){header.md\\:hidden .font-diary{display:none}}" +
    /* Desktop: stacked panel at the bottom of the sidebar */
    "@media (min-width:768px){#ack-toolbar{top:auto;right:auto;left:1rem;bottom:2.75rem;width:13rem;flex-direction:column;align-items:stretch}" +
    "#ack-toolbar .ack-icon-only{width:auto;padding:0 .75rem;justify-content:flex-start}" +
    "#ack-toolbar .ack-icon-only .ack-label{position:static;width:auto;height:auto;clip:auto}" +
    "#ack-toolbar .ack-primary{justify-content:center}#ack-toolbar #ack-lang.ack-docked select{flex:1}}" +
    "@media print{#ack-toolbar{display:none}}" +
    /* Dialogs */
    ".ack-dialog{border:0;padding:0;border-radius:18px;width:min(28rem,calc(100vw - 1.5rem));max-height:calc(100dvh - 2rem);background:var(--paper,#fff);color:var(--ink,#1b2340);box-shadow:0 20px 50px rgba(15,25,60,.25);font:400 15px/1.45 system-ui,-apple-system,'Segoe UI',Roboto,'Noto Sans Tamil','Noto Sans Devanagari',sans-serif}" +
    ".ack-dialog::backdrop{background:rgba(15,22,45,.55)}" +
    ".ack-dialog .ack-head{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;padding:1.25rem 1.25rem .5rem;border-top:4px solid var(--gold,#b8924a);border-radius:18px 18px 0 0}" +
    ".ack-dialog h2{margin:0;font:600 1.35rem/1.2 'Iowan Old Style','Palatino Linotype',Palatino,Georgia,serif}" +
    ".ack-dialog .ack-sub{margin:.3rem 0 0;color:var(--muted,#5b6275);font-size:14px}" +
    ".ack-dialog .ack-close{flex:none;width:40px;height:40px;border-radius:999px;border:1px solid var(--line,#ddd);background:transparent;color:inherit;display:inline-flex;align-items:center;justify-content:center;cursor:pointer}" +
    ".ack-dialog .ack-body{padding:.75rem 1.25rem 1.25rem;display:flex;flex-direction:column;gap:1rem}" +
    ".ack-native{display:flex;align-items:center;justify-content:center;gap:.6rem;min-height:48px;border-radius:12px;border:0;background:var(--accent,#1f3a6e);color:#fff;font:600 15px/1 inherit;font-family:inherit;cursor:pointer}" +
    ".ack-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.5rem}" +
    ".ack-opt{display:flex;flex-direction:column;align-items:center;gap:.4rem;padding:.65rem .25rem;border-radius:12px;border:1px solid var(--line,#ddd);background:transparent;color:inherit;text-decoration:none;font:500 12px/1.2 inherit;font-family:inherit;cursor:pointer;text-align:center}" +
    ".ack-opt:hover{background:var(--gold-soft,#f2e7cc)}" +
    ".ack-opt .ack-dot{width:40px;height:40px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;color:#fff}" +
    ".ack-linkrow{display:flex;gap:.5rem;align-items:center}" +
    ".ack-linkrow input{flex:1;min-width:0;min-height:44px;border-radius:10px;border:1px solid var(--line,#ddd);background:var(--bg,#f3f1ec);color:inherit;padding:0 .75rem;font:inherit}" +
    ".ack-linkrow button{min-height:44px;border-radius:10px;border:1px solid var(--accent,#1f3a6e);background:transparent;color:var(--accent,#1f3a6e);font:600 14px/1 inherit;font-family:inherit;padding:0 .9rem;cursor:pointer;white-space:nowrap}" +
    ".ack-qr{display:flex;align-items:center;gap:1rem;padding:.75rem;border-radius:12px;background:var(--bg,#f3f1ec)}" +
    ".ack-qr img{width:96px;height:96px;border-radius:8px;background:#fff;padding:4px;flex:none}" +
    ".ack-qr p{margin:0;font-size:13px;color:var(--muted,#5b6275)}" +
    ".ack-status{min-height:1.2em;margin:0;font-size:13px;color:var(--good,#3f7d5a);text-align:center}" +
    ".ack-acct{display:flex;align-items:center;gap:.75rem;padding:.75rem;border-radius:12px;background:var(--bg,#f3f1ec)}" +
    ".ack-acct .ack-avatar{width:44px;height:44px;border-radius:999px;background:var(--accent,#1f3a6e);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:18px;flex:none}" +
    ".ack-acct p{margin:0;word-break:break-all}" +
    ".ack-danger{display:flex;align-items:center;justify-content:center;gap:.5rem;min-height:46px;border-radius:12px;border:1px solid #b3261e;background:transparent;color:#b3261e;font:600 15px/1 inherit;font-family:inherit;cursor:pointer}" +
    ".ack-note{margin:0;font-size:13px;color:var(--muted,#5b6275)}";

  function shareUrl() { return location.origin + "/"; }
  function shareText() { return t("Track every rupee with ACK Diary: budget, daily diary, savings and reminders in English, Tamil and Hindi."); }

  var shareDlg, acctDlg;

  function buildShare() {
    shareDlg = document.createElement("dialog");
    shareDlg.id = "ack-share";
    shareDlg.className = "ack-dialog";
    shareDlg.setAttribute("aria-labelledby", "ack-share-title");
    var opts = [
      { id: "whatsapp", label: "WhatsApp", icon: "chat", color: "#1f8f4e" },
      { id: "telegram", label: "Telegram", icon: "send", color: "#2a7fb8" },
      { id: "facebook", label: "Facebook", icon: "globe", color: "#3b5a9a" },
      { id: "x", label: "X", icon: "post", color: "#1b2340" },
      { id: "email", label: "Email", icon: "mail", color: "#8e6a24" },
      { id: "sms", label: "SMS", icon: "sms", color: "#5b4a8f" },
    ];
    var grid = opts.map(function (o) {
      return '<a class="ack-opt" data-share="' + o.id + '" href="#" target="_blank" rel="noopener noreferrer"><span class="ack-dot" style="background:' + o.color + '">' + svg(o.icon, 20) + "</span><span>" + o.label + "</span></a>";
    }).join("") +
      '<button type="button" class="ack-opt" data-share="copy"><span class="ack-dot" style="background:#b8924a">' + svg("link", 20) + "</span><span>Copy link</span></button>";
    shareDlg.innerHTML =
      '<div class="ack-head"><div><h2 id="ack-share-title">Share ACK Diary</h2><p class="ack-sub">Invite friends and family to manage money together.</p></div>' +
      '<button type="button" class="ack-close" aria-label="Close">' + svg("x") + "</button></div>" +
      '<div class="ack-body">' +
      (navigator.share ? '<button type="button" class="ack-native" data-share="native">' + svg("phone") + "<span>Share using phone apps</span></button>" : "") +
      '<div class="ack-grid">' + grid + "</div>" +
      '<div class="ack-linkrow"><label class="ack-label" for="ack-share-url" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">App link</label>' +
      '<input id="ack-share-url" readonly data-i18n-skip><button type="button" data-share="copy">Copy link</button></div>' +
      '<p class="ack-status" role="status" aria-live="polite"></p>' +
      '<div class="ack-qr"><img alt="QR code for the ACK Diary link" width="96" height="96" loading="lazy"><p>Scan to open on another phone</p></div>' +
      "</div>";
    document.body.appendChild(shareDlg);

    shareDlg.querySelector(".ack-close").addEventListener("click", function () { shareDlg.close(); });
    shareDlg.addEventListener("click", function (e) {
      if (e.target === shareDlg) { shareDlg.close(); return; }
      var el = e.target.closest("[data-share]");
      if (!el) return;
      var kind = el.getAttribute("data-share");
      if (kind === "native") {
        e.preventDefault();
        navigator.share({ title: "ACK Diary", text: shareText(), url: shareUrl() }).catch(function () {});
      } else if (kind === "copy") {
        e.preventDefault();
        copyLink();
      } else {
        el.href = targetFor(kind);
      }
    });
    var img = shareDlg.querySelector(".ack-qr img");
    img.addEventListener("error", function () { shareDlg.querySelector(".ack-qr").style.display = "none"; });
  }

  function targetFor(kind) {
    var u = encodeURIComponent(shareUrl());
    var msg = encodeURIComponent(shareText());
    var both = encodeURIComponent(shareText() + " " + shareUrl());
    switch (kind) {
      case "whatsapp": return "https://wa.me/?text=" + both;
      case "telegram": return "https://t.me/share/url?url=" + u + "&text=" + msg;
      case "facebook": return "https://www.facebook.com/sharer/sharer.php?u=" + u;
      case "x": return "https://twitter.com/intent/tweet?text=" + msg + "&url=" + u;
      case "email": return "mailto:?subject=" + encodeURIComponent("ACK Diary") + "&body=" + both;
      case "sms": return "sms:?&body=" + both;
    }
    return "#";
  }

  function copyLink() {
    var status = shareDlg.querySelector(".ack-status");
    var input = shareDlg.querySelector("#ack-share-url");
    function done() { status.textContent = "Link copied"; setTimeout(function () { status.textContent = ""; }, 2500); }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(shareUrl()).then(done, function () { input.select(); document.execCommand("copy"); done(); });
    } else { input.select(); document.execCommand("copy"); done(); }
  }

  function openShare() {
    if (!shareDlg) buildShare();
    shareDlg.querySelector("#ack-share-url").value = shareUrl();
    var img = shareDlg.querySelector(".ack-qr img");
    if (!img.src) img.src = "https://api.qrserver.com/v1/create-qr-code/?size=192x192&margin=0&color=1f3a6e&data=" + encodeURIComponent(shareUrl());
    shareDlg.showModal();
  }

  /* Account */
  function session() {
    if (!authOn) return null;
    try {
      var ref = new URL(cfg.supabaseUrl).hostname.split(".")[0];
      return JSON.parse(localStorage.getItem("sb-" + ref + "-auth-token") || "null");
    } catch (e) { return null; }
  }
  function email() { var s = session(); return (s && s.user && s.user.email) || ""; }

  function loadSupabase() {
    return new Promise(function (resolve, reject) {
      if (window.supabase && window.supabase.createClient) return resolve(window.supabase);
      var s = document.createElement("script");
      s.src = SUPABASE_JS; s.async = true; s.crossOrigin = "anonymous";
      s.onload = function () { resolve(window.supabase); };
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function signOut(btn) {
    btn.disabled = true;
    btn.querySelector("span").textContent = "Signing out…";
    loadSupabase()
      .then(function (sb) { return sb.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey).auth.signOut(); })
      .catch(function () {})
      .then(function () {
        try { localStorage.removeItem("sb-" + new URL(cfg.supabaseUrl).hostname.split(".")[0] + "-auth-token"); } catch (e) {}
        location.replace("/login");
      });
  }

  function openAccount() {
    if (!acctDlg) {
      acctDlg = document.createElement("dialog");
      acctDlg.className = "ack-dialog";
      acctDlg.setAttribute("aria-labelledby", "ack-acct-title");
      acctDlg.innerHTML =
        '<div class="ack-head"><div><h2 id="ack-acct-title">Account</h2></div><button type="button" class="ack-close" aria-label="Close">' + svg("x") + "</button></div>" +
        '<div class="ack-body"><div class="ack-acct"><span class="ack-avatar" aria-hidden="true"></span><div><p class="ack-note">Signed in as</p><p class="ack-email" data-i18n-skip></p></div></div>' +
        '<p class="ack-note">Your diary entries are stored on this device. Sign out on shared phones to keep them private.</p>' +
        '<button type="button" class="ack-danger">' + svg("out") + "<span>Sign out</span></button></div>";
      document.body.appendChild(acctDlg);
      acctDlg.querySelector(".ack-close").addEventListener("click", function () { acctDlg.close(); });
      acctDlg.addEventListener("click", function (e) { if (e.target === acctDlg) acctDlg.close(); });
      acctDlg.querySelector(".ack-danger").addEventListener("click", function () { signOut(this); });
    }
    var em = email();
    acctDlg.querySelector(".ack-email").textContent = em;
    acctDlg.querySelector(".ack-avatar").textContent = (em[0] || "A").toUpperCase();
    acctDlg.showModal();
  }

  function build() {
    if (document.getElementById("ack-toolbar")) return;
    var style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    var bar = document.createElement("div");
    bar.id = "ack-toolbar";
    bar.innerHTML = '<div id="ack-lang-slot" style="display:contents"></div>' +
      '<button type="button" class="ack-btn ack-icon-only ack-share-btn" aria-haspopup="dialog">' + svg("share") + '<span class="ack-label">Share</span></button>';
    if (authOn && session()) {
      var em = email();
      bar.insertAdjacentHTML("beforeend",
        '<button type="button" class="ack-btn ack-icon-only ack-acct-btn" aria-haspopup="dialog" aria-label="Account">' +
        '<span class="ack-avatar" aria-hidden="true" data-i18n-skip>' + (em[0] || "A").toUpperCase() + "</span>" +
        '<span class="ack-label" data-i18n-skip>' + em.replace(/[<>&"]/g, "") + "</span></button>");
    }
    document.body.appendChild(bar);
    bar.querySelector(".ack-share-btn").addEventListener("click", openShare);
    var ab = bar.querySelector(".ack-acct-btn");
    if (ab) ab.addEventListener("click", openAccount);
  }

  window.ACKShare = { open: function () { build(); openShare(); } };

  if (document.readyState === "complete") setTimeout(build, 0);
  else window.addEventListener("load", function () { setTimeout(build, 0); }, { once: true });
})();
