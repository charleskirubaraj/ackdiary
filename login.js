(function () {
  "use strict";
  var cfg = window.ACK_AUTH || {};
  var SUPABASE_JS = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";
  var LOCK_KEY = "ack-login-lock";
  var MAX_FAILS = 5;
  var LOCK_MS = 60 * 1000;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var msg = document.getElementById("msg");
  var views = ["off", "signin", "signup", "forgot", "reset"];

  function $(id) { return document.getElementById(id); }
  function show(name) {
    views.forEach(function (v) { $("v-" + v).hidden = v !== name; });
    setMsg("");
    var first = $("v-" + name).querySelector("input");
    if (first && name !== "off") setTimeout(function () { first.focus(); }, 0);
  }
  function setMsg(text, ok) { msg.textContent = text; msg.className = "msg " + (ok ? "ok" : "err"); }

  // Only allow same-site relative paths so the login page cannot be used to redirect elsewhere.
  function nextPath() {
    var n = new URLSearchParams(location.search).get("next") || "/";
    return /^\/(?!\/|\\)/.test(n) && n.indexOf("/login") !== 0 ? n : "/";
  }
  function goNext() { location.replace(nextPath()); }
  function callbackUrl() { return cfg.redirectUrl || location.origin + "/auth/callback"; }

  function validPassword(p) { return p.length >= 8 && /[A-Za-z]/.test(p) && /\d/.test(p); }
  function strength(p) {
    var s = 0;
    if (p.length >= 8) s++;
    if (p.length >= 12) s++;
    if (/[a-z]/.test(p) && /[A-Z]/.test(p)) s++;
    if (/\d/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  }

  function lockedFor() {
    try {
      var l = JSON.parse(localStorage.getItem(LOCK_KEY) || "{}");
      return l.until && l.until > Date.now() ? l.until - Date.now() : 0;
    } catch (e) { return 0; }
  }
  function recordFail() {
    try {
      var l = JSON.parse(localStorage.getItem(LOCK_KEY) || "{}");
      l.fails = (l.fails || 0) + 1;
      if (l.fails >= MAX_FAILS) { l.until = Date.now() + LOCK_MS; l.fails = 0; }
      localStorage.setItem(LOCK_KEY, JSON.stringify(l));
    } catch (e) {}
  }
  function clearFails() { try { localStorage.removeItem(LOCK_KEY); } catch (e) {} }

  function friendly(err) {
    var m = (err && err.message ? err.message : "").toLowerCase();
    if (err && err.status === 429 || m.indexOf("rate limit") >= 0 || m.indexOf("too many") >= 0) return "Too many attempts. Please wait a minute and try again.";
    if (m.indexOf("invalid login") >= 0 || m.indexOf("invalid credentials") >= 0) return "Incorrect email or password.";
    if (m.indexOf("not confirmed") >= 0) return "Please confirm your email first. Check your inbox.";
    if (m.indexOf("password") >= 0 && (m.indexOf("weak") >= 0 || m.indexOf("characters") >= 0)) return "Password must be at least 8 characters, with a letter and a number.";
    return "Something went wrong. Please check your connection and try again.";
  }

  function busy(form, on, label) {
    var b = form.querySelector(".primary");
    if (on) { b.dataset.label = b.textContent; b.textContent = label; b.disabled = true; }
    else { b.textContent = b.dataset.label || b.textContent; b.disabled = false; }
  }

  function markInvalid(input, bad) { input.setAttribute("aria-invalid", bad ? "true" : "false"); }

  // Password visibility toggles
  Array.prototype.forEach.call(document.querySelectorAll(".eye"), function (btn) {
    var EYE = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
    var OFF = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.9 4.2A10 10 0 0 1 12 4c6.5 0 10 8 10 8a18 18 0 0 1-2.2 3.2"/><path d="M6.6 6.6C3.9 8.4 2 12 2 12s3.5 8 10 8a9.7 9.7 0 0 0 5.4-1.6"/><path d="m2 2 20 20"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2"/></svg>';
    btn.innerHTML = EYE;
    btn.addEventListener("click", function () {
      var input = $(btn.getAttribute("aria-controls"));
      var showing = input.type === "text";
      input.type = showing ? "password" : "text";
      btn.innerHTML = showing ? EYE : OFF;
      btn.setAttribute("aria-label", showing ? "Show password" : "Hide password");
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll("[data-go]"), function (b) {
    b.addEventListener("click", function () { show(b.getAttribute("data-go")); });
  });

  $("su-pass").addEventListener("input", function () {
    var s = strength(this.value);
    var bar = $("su-bar");
    var pct = Math.min(100, s * 20);
    bar.style.width = (this.value ? Math.max(pct, 10) : 0) + "%";
    bar.style.background = s >= 4 ? "var(--good)" : s >= 3 ? "var(--gold)" : "var(--bad)";
    $("su-strength").textContent = !this.value ? "" : s >= 4 ? "Password strength: strong" : s >= 3 ? "Password strength: fair" : "Password strength: weak";
  });

  if (!cfg.supabaseUrl || !cfg.supabaseAnonKey) { show("off"); return; }

  var client;
  function sb() {
    if (client) return Promise.resolve(client);
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = SUPABASE_JS; s.crossOrigin = "anonymous";
      s.onload = function () {
        client = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, {
          auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
        });
        resolve(client);
      };
      s.onerror = function () { reject(new Error("network")); };
      document.head.appendChild(s);
    });
  }

  var recovering = /type=recovery/.test(location.hash);
  if (recovering) show("reset");

  sb().then(function (c) {
    c.auth.onAuthStateChange(function (event) {
      if (event === "PASSWORD_RECOVERY") { recovering = true; show("reset"); }
    });
    return c.auth.getSession().then(function (r) {
      if (r.data.session && !recovering) goNext();
    });
  }).catch(function () { setMsg("Something went wrong. Please check your connection and try again."); });

  $("f-signin").addEventListener("submit", function (e) {
    e.preventDefault();
    var form = this, email = $("si-email"), pass = $("si-pass");
    var wait = lockedFor();
    if (wait) { setMsg("Too many failed attempts. Try again in a minute."); return; }
    var okEmail = EMAIL_RE.test(email.value.trim());
    markInvalid(email, !okEmail); markInvalid(pass, !pass.value);
    if (!okEmail) { setMsg("Please enter a valid email address."); email.focus(); return; }
    if (!pass.value) { setMsg("Incorrect email or password."); pass.focus(); return; }
    busy(form, true, "Signing in…");
    sb().then(function (c) {
      return c.auth.signInWithPassword({ email: email.value.trim(), password: pass.value });
    }).then(function (r) {
      if (r.error) throw r.error;
      clearFails();
      goNext();
    }).catch(function (err) {
      if (!err || err.message !== "network") recordFail();
      pass.value = "";
      setMsg(friendly(err));
      busy(form, false);
      pass.focus();
    });
  });

  $("f-signup").addEventListener("submit", function (e) {
    e.preventDefault();
    var form = this, email = $("su-email"), pass = $("su-pass"), pass2 = $("su-pass2");
    var okEmail = EMAIL_RE.test(email.value.trim());
    var okPass = validPassword(pass.value);
    var match = pass.value === pass2.value;
    markInvalid(email, !okEmail); markInvalid(pass, !okPass); markInvalid(pass2, !match);
    if (!okEmail) { setMsg("Please enter a valid email address."); email.focus(); return; }
    if (!okPass) { setMsg("Password must be at least 8 characters, with a letter and a number."); pass.focus(); return; }
    if (!match) { setMsg("Passwords do not match."); pass2.focus(); return; }
    busy(form, true, "Creating account…");
    sb().then(function (c) {
      return c.auth.signUp({ email: email.value.trim(), password: pass.value, options: { emailRedirectTo: callbackUrl() } });
    }).then(function (r) {
      if (r.error) throw r.error;
      if (r.data.session) { goNext(); return; }
      form.reset();
      busy(form, false);
      show("signin");
      setMsg("Check your email to confirm your account, then sign in.", true);
    }).catch(function (err) { setMsg(friendly(err)); busy(form, false); });
  });

  $("f-forgot").addEventListener("submit", function (e) {
    e.preventDefault();
    var form = this, email = $("fp-email");
    var okEmail = EMAIL_RE.test(email.value.trim());
    markInvalid(email, !okEmail);
    if (!okEmail) { setMsg("Please enter a valid email address."); email.focus(); return; }
    busy(form, true, "Sending…");
    sb().then(function (c) {
      return c.auth.resetPasswordForEmail(email.value.trim(), { redirectTo: callbackUrl() });
    }).then(function (r) {
      busy(form, false);
      if (r.error && r.error.status === 429) { setMsg(friendly(r.error)); return; }
      // Same message whether or not the account exists, so emails cannot be probed.
      setMsg("If an account exists for this email, a reset link is on its way.", true);
    }).catch(function (err) { setMsg(friendly(err)); busy(form, false); });
  });

  $("f-reset").addEventListener("submit", function (e) {
    e.preventDefault();
    var form = this, pass = $("rp-pass"), pass2 = $("rp-pass2");
    var okPass = validPassword(pass.value), match = pass.value === pass2.value;
    markInvalid(pass, !okPass); markInvalid(pass2, !match);
    if (!okPass) { setMsg("Password must be at least 8 characters, with a letter and a number."); pass.focus(); return; }
    if (!match) { setMsg("Passwords do not match."); pass2.focus(); return; }
    busy(form, true, "Saving…");
    sb().then(function (c) { return c.auth.updateUser({ password: pass.value }); })
      .then(function (r) {
        if (r.error) throw r.error;
        history.replaceState(null, "", location.pathname + location.search);
        setMsg("Password updated. Opening your diary…", true);
        setTimeout(goNext, 1200);
      })
      .catch(function (err) { setMsg(friendly(err)); busy(form, false); });
  });
})();
