const CACHE_NAME = "explore-tupa-v1";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/contato.html",
  "/raizes.html",
  "/trilhas.html",
  "/legado.html",
  "/manifest.json",

  // imagens principais
  "/imgs/igreja_matriz_de_sao_pedro_em_tupa.jpg",
  "/imgs/bg_btn_historia_tupa.png",
  "/imgs/legado.png",
  "/imgs/bg_btn_trilha.png",
  "/imgs/bg_btn_fotos_antigas.png",
  "/imgs/bg_btn_curiosidades.png",
  "/imgs/bg_btn_rota_cultural.png",
  "/imgs/bg_btn_hospedagem.png",
  "/imgs/bg_btn_alimentacao.png",
  "/imgs/bg_btn_lenda_quiz.png"
];

// INSTALA
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// ATIVA
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});

// FETCH (offline)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
