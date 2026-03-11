// lib/parseConfig.js

// Detecta se o código está rodando no servidor (Node.js) ou no navegador
const isServer = typeof window === "undefined";

if (isServer && typeof globalThis.indexedDB === "undefined") {
  // Stub seguro para ambiente Node: mantém API mínima sem disparar erros de runtime.
  const makeSuccessRequest = (result = null) => {
    const request = {
      result,
      error: null,
      onsuccess: null,
      onerror: null,
      onupgradeneeded: null,
    };

    queueMicrotask(() => {
      if (typeof request.onupgradeneeded === "function") {
        request.onupgradeneeded({ target: request });
      }
      if (typeof request.onsuccess === "function") {
        request.onsuccess({ target: request });
      }
    });

    return request;
  };

  const fakeStore = {
    get: () => makeSuccessRequest(undefined),
    getAll: () => makeSuccessRequest([]),
    put: () => makeSuccessRequest(undefined),
    add: () => makeSuccessRequest(undefined),
    delete: () => makeSuccessRequest(undefined),
    clear: () => makeSuccessRequest(undefined),
    openCursor: () => makeSuccessRequest(null),
    createIndex: () => ({}),
    index: () => fakeStore,
  };

  const fakeTx = {
    objectStore: () => fakeStore,
    abort: () => {},
    commit: () => {},
    oncomplete: null,
    onerror: null,
  };

  const fakeDb = {
    close: () => {},
    createObjectStore: () => fakeStore,
    deleteObjectStore: () => {},
    transaction: () => {
      queueMicrotask(() => {
        if (typeof fakeTx.oncomplete === "function") {
          fakeTx.oncomplete({ target: fakeTx });
        }
      });
      return fakeTx;
    },
  };

  globalThis.indexedDB = {
    open: () => makeSuccessRequest(fakeDb),
    deleteDatabase: () => makeSuccessRequest(undefined),
    cmp: (a, b) => (a === b ? 0 : a > b ? 1 : -1),
  };
}

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
