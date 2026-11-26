/* Points the Download buttons at the newest release's installer.
 * Without JavaScript, or if GitHub's API is unreachable or rate-limited, the buttons keep their
 * default href (the Releases page), so they never break and the page never hard-codes a version. */
(function () {
  "use strict";

  var REPO = "kz370/OpenLocalAssistant";

  fetch("https://api.github.com/repos/" + REPO + "/releases/latest", {
    headers: { Accept: "application/vnd.github+json" },
  })
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(function (release) {
      var assets = release.assets || [];
      function find(re) {
        return assets.filter(function (a) { return re.test(a.name); })[0];
      }
      var setup = find(/-setup\.exe$/);
      var portable = find(/-portable-win-x64\.zip$/);
      var sums = find(/-SHA256SUMS\.txt$/);
      var version = String(release.tag_name || "").replace(/^v/, "");

      function setHref(selector, asset) {
        if (!asset) return;
        document.querySelectorAll(selector).forEach(function (a) {
          a.href = asset.browser_download_url;
        });
      }
      setHref("[data-dl='setup']", setup);
      setHref("[data-dl='portable']", portable);
      setHref("[data-dl='sums']", sums);

      if (version) {
        document.querySelectorAll("[data-version]").forEach(function (n) {
          n.textContent = "v" + version;
        });
      }
    })
    .catch(function () {
      /* keep the fallback links */
    });
})();
