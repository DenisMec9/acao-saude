// lib/parseConfig.js
import Parse from "parse";

// ✅ Configuração do Back4App
Parse.initialize(
  "ImDO8gNpdJDVNaEY03zsxcKEnxPYA2lIn1HYUaGU", // Application ID
  "bZPiP5QhKrK5UyvQo6nzaQmxVEBbIcQABkpuhNuO"  // JavaScript Key
);
Parse.serverURL = "https://parseapi.back4app.com";

// ⚠️ Corrige erro do currentInstallationId no ambiente Web/Next.js
Parse.CoreManager.set("INSTALLATION_CONTROLLER", {
  currentInstallationId: () => Promise.resolve("fake-installation-id"),
});

export default Parse;
