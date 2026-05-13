const nomeInput = document.getElementById("nomeInput");
const lista = document.getElementById("lista");

let convidados = [];

document.getElementById("addBtn").addEventListener("click", adicionar);

nomeInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") adicionar();
});

function adicionar() {
    const nome = nomeInput.value.trim();
    if (!nome) return;
    convidados.push(nome);
    nomeInput.value = "";
    nomeInput.focus();
    renderizar();
}

function renderizar() {
    lista.innerHTML = "";

    convidados.forEach(function(nome, i) {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = nome;

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const concluir = document.createElement("button");
        concluir.textContent = "✓";
        concluir.title = "Concluir";
        concluir.onclick = () => span.classList.toggle("riscado");

        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.onclick = function() {
            const novo = prompt("Novo nome:", nome)?.trim();
            if (novo) { convidados[i] = novo; renderizar(); }
        };

        const excluir = document.createElement("button");
        excluir.textContent = "✕";
        excluir.title = "Excluir";
        excluir.onclick = () => { convidados.splice(i, 1); renderizar(); };

        acoes.append(concluir, editar, excluir);
        li.append(span, acoes);
        lista.appendChild(li);
    });
}