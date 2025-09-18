// lib/parseConfig.js
import Parse from "parse/dist/parse.min.js";

// Evita inicializar duas vezes em hot-reload (Next.js)
if (!Parse.applicationId) {
  Parse.initialize(
    "ImDO8gNpdJDVNaEY03zsxcKEnxPYA2lIn1HYUaGU", // Application ID (do seu print)
    "KakF56lrHx4YeUUlW4a3hjfkucapYNU9hMfGTaAd"  // Client Key (não a JavaScript Key)
  );
  Parse.serverURL = "https://parseapi.back4app.com";
}

// Corrige o currentInstallationId no ambiente Web/Next.js
if (typeof window !== "undefined") {
  Parse.CoreManager.set("INSTALLATION_CONTROLLER", {
    currentInstallationId() {
      return Promise.resolve("fake-installation-id");
    },
  });
}

export default Parse;
