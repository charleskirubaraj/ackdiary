/* Runs before the page renders: sends signed-out visitors to the login page. */
(function () {
  var c = window.ACK_AUTH;
  if (!c || !c.supabaseUrl || !c.supabaseAnonKey) return;
  try {
    var ref = new URL(c.supabaseUrl).hostname.split(".")[0];
    var s = JSON.parse(localStorage.getItem("sb-" + ref + "-auth-token") || "null");
    if (s && s.refresh_token && s.user) return;
  } catch (e) {}
  location.replace("/login?next=" + encodeURIComponent(location.pathname + location.search));
})();
