// lib/parseConfig.js

// Detecta se o código está rodando no servidor (Node.js) ou no navegador
const isServer = typeof window === "undefined";

// Importa o SDK correto conforme o ambiente
const Parse = isServer
  ? require("parse/node.js")
  : require("parse/dist/parse.min.js");

const APP_ID = process.env.NEXT_PUBLIC_PARSE_APP_ID;
const JS_KEY = process.env.NEXT_PUBLIC_PARSE_JAVASCRIPT_KEY;
const SERVER_URL = process.env.NEXT_PUBLIC_PARSE_SERVER_URL;

// Inicializa o Parse apenas uma vez
if (!Parse.applicationId) {
  Parse.initialize(APP_ID, JS_KEY);
  Parse.serverURL = SERVER_URL;

  if (isServer) {
    console.log("✅ Parse inicializado no SERVIDOR");
  } else {
    console.log("✅ Parse inicializado no CLIENTE");
  }
}

export default Parse;
