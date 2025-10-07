// Arquivo: lib/parseConfig.js - VERSÃO COMPLETA E CORRIGIDA

import Parse from "parse"; // Import correto

// Inicialização com as chaves do .env.local
if (!Parse.applicationId) {
  Parse.initialize(
    process.env.NEXT_PUBLIC_PARSE_APP_ID,
    process.env.NEXT_PUBLIC_PARSE_JAVASCRIPT_KEY
  );
  Parse.serverURL = "https://parseapi.back4app.com";
}

// Workaround para o erro 'currentInstallationId'
// Este trecho corrige o erro que você está vendo agora
if (typeof window !== "undefined") {
  Parse.CoreManager.set("INSTALLATION_CONTROLLER", {
    currentInstallationId() {
      return Promise.resolve("fake-installation-id");
    },
  });
}

export default Parse;