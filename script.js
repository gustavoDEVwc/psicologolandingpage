(() => {
  const S = window.SITE || {},
    A = S.agendamento || {};
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const get = (o, p) =>
    p.split(".").reduce((a, k) => (a == null ? a : a[k]), o);
  const esc = (s) =>
    String(s ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );

  // Tema e textos
  document.documentElement.dataset.theme = S.tema || "salvia";
  $$("[data-cfg]").forEach((el) => {
    const v = get(S, el.dataset.cfg);
    if (!v) return;
    el.textContent = v;
    if (el.dataset.href === "mailto") el.href = "mailto:" + v;
  });
  document.title = `${S.nome} | ${S.titulo}`;
  $("#ano").textContent = new Date().getFullYear();

  // Listas editáveis
  $("#topicos-lista").innerHTML = (S.topicos || [])
    .map(
      (t) =>
        `<article><h3>${esc(t.titulo)}</h3><p>${esc(t.texto)}</p></article>`,
    )
    .join("");
  $("#passos-lista").innerHTML = (S.passos || [])
    .map(
      (p) =>
        `<li><strong>${esc(p.titulo)}</strong><span>${esc(p.texto)}</span></li>`,
    )
    .join("");
  $("#sobre-textos").innerHTML = (S.sobre?.textos || [])
    .map((t) => `<p>${esc(t)}</p>`)
    .join("");
  $("#formacao").innerHTML = (S.sobre?.formacao || [])
    .map((f) => `<li>${esc(f)}</li>`)
    .join("");
  $("#faq-lista").innerHTML = (S.faq || [])
    .map(
      (f) =>
        `<details><summary>${esc(f.p)}</summary><p>${esc(f.r)}</p></details>`,
    )
    .join("");
  const iniciais = (S.nome || "")
    .replace(/^(Dra?\.|Psic\.)\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  $("#hero-foto").innerHTML = S.sobre?.foto
    ? `<img src="${esc(S.sobre.foto)}" alt="" width="340" height="340">`
    : esc(iniciais);
  if (A.valor) $("#valor").textContent = A.valor;
  else
    $("#valor").parentElement &&
      ($("#valor").previousElementSibling.hidden = $("#valor").hidden = true);
  $("#duracao").textContent = `${A.duracaoMin || 50} minutos`;

  // WhatsApp
  const wa = (txt) =>
    `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(txt)}`;
  $$("[data-wa]").forEach((a) => {
    a.href = wa(`Olá, ${S.nome}! Gostaria de tirar uma dúvida.`);
    a.target = "_blank";
    a.rel = "noopener";
  });

  // Selects do formulário
  $("#f-mod").innerHTML = (A.modalidades || ["Presencial"])
    .map((m) => `<option>${esc(m)}</option>`)
    .join("");
  $("#f-motivo").innerHTML = [
    ...(S.topicos || []).map((t) => t.titulo),
    "Outro assunto",
    "Prefiro conversar na sessão",
  ]
    .map((m) => `<option>${esc(m)}</option>`)
    .join("");

  // Datas e horários
  const pad = (n) => String(n).padStart(2, "0");
  const ymd = (d) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const dataEl = $("#f-data"),
    slotsEl = $("#slots"),
    erro = $("#erro");
  const hoje = new Date(),
    max = new Date();
  max.setDate(max.getDate() + (A.diasAFrente || 45));
  dataEl.min = ymd(hoje);
  dataEl.max = ymd(max);
  let hora = "";

  const livres = (dia) => {
    const dow = new Date(dia + "T00:00:00").getDay();
    const limite = Date.now() + (A.antecedenciaHoras || 0) * 36e5;
    const off = A.indisponiveis || [];
    if (off.includes(dia)) return [];
    return (A.horarios?.[dow] || []).filter(
      (h) =>
        !off.includes(`${dia} ${h}`) &&
        new Date(`${dia}T${h}:00`).getTime() > limite,
    );
  };
  const desenhar = () => {
    hora = "";
    if (!dataEl.value) {
      slotsEl.innerHTML =
        '<p class="hint">Escolha um dia para ver os horários.</p>';
      return;
    }
    const l = livres(dataEl.value);
    slotsEl.innerHTML = l.length
      ? l
          .map(
            (h) =>
              `<button type="button" class="slot" data-h="${h}" aria-pressed="false">${h}</button>`,
          )
          .join("")
      : '<p class="hint">Sem horários neste dia. Tente outra data ou chame no WhatsApp.</p>';
  };
  dataEl.addEventListener("change", desenhar);
  slotsEl.addEventListener("click", (e) => {
    const b = e.target.closest(".slot");
    if (!b) return;
    $$(".slot", slotsEl).forEach((x) =>
      x.setAttribute("aria-pressed", "false"),
    );
    b.setAttribute("aria-pressed", "true");
    hora = b.dataset.h;
    erro.textContent = "";
  });

  // Envio -> mensagem com contexto da consulta
  $("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const nome = (f.get("nome") || "").trim();
    if (!nome) {
      erro.textContent = "Digite seu nome.";
      return $("[name=nome]").focus();
    }
    if (!dataEl.value) {
      erro.textContent = "Escolha o dia.";
      return dataEl.focus();
    }
    if (!hora) {
      erro.textContent = "Escolha um horário.";
      return;
    }
    if (!f.get("ok")) {
      erro.textContent = "Aceite a Política de Privacidade para continuar.";
      return;
    }
    const dia = new Date(dataEl.value + "T00:00:00").toLocaleDateString(
      "pt-BR",
      { weekday: "long", day: "2-digit", month: "2-digit" },
    );
    const ctx = (f.get("contexto") || "").trim();
    const msg =
      `Olá, ${S.nome}! Sou ${nome} e gostaria de reservar uma consulta.\n` +
      `Data: ${dia}, às ${hora}\nModalidade: ${f.get("modalidade")}\nSituação: ${f.get("paciente")}\n` +
      `Motivo: ${f.get("motivo")}` +
      (ctx ? `\nContexto: ${ctx}` : "") +
      "\nAguardo a confirmação do horário.";
    erro.textContent = "";
    window.open(wa(msg), "_blank", "noopener");
  });

  // Menu mobile
  const btn = $("#menu-btn"),
    menu = $("#menu");
  const toggle = (o) => {
    menu.classList.toggle("open", o);
    btn.setAttribute("aria-expanded", o);
  };
  btn.addEventListener("click", () => toggle(!menu.classList.contains("open")));
  menu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") toggle(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") toggle(false);
  });
})();
