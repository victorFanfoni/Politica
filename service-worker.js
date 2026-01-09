const CACHE_NAME = "explore-tupa-v2";

// Use caminhos relativos (sem a barra inicial) para maior compatibilidade
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./contato.html",
  "./raizes.html",
  "./trilhas.html",
  "./legado.html",
  "./manifest.json",
  "./imgs/igreja_matriz_de_sao_pedro_em_tupa.jpg",
  "./imgs/bg_btn_historia_tupa.png",
  "./imgs/legado.png",
  "./imgs/bg_btn_trilha.png",
  "./imgs/bg_btn_fotos_antigas.png",
  "./imgs/bg_btn_curiosidades.png",
  "./imgs/bg_btn_rota_cultural.png",
  "./imgs/bg_btn_hospegem.png", // Ajustado para bater com o nome no seu HTML
  "./imgs/bg_btn_alimentacao.png",
  "./imgs/bg_btn_lenda_quiz.png"
];

// INSTALAÇÃO
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Caching assets...");
        return cache.addAll(FILES_TO_CACHE);
      })
      .catch(err => console.error("Erro no Cache AddAll: ", err))
  );
});

// ATIVAÇÃO
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  return self.clients.claim();
});

// BUSCA (FETCH)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
