const botao = document.getElementById("calcular");
const resultado = document.getElementById("resultado");

botao.addEventListener("click", function () {
    const nome = document.getElementById("nome").value || "Aluno";
    const media = (
        Number(document.getElementById("nota1").value) +
        Number(document.getElementById("nota2").value) +
        Number(document.getElementById("nota3").value)
    ) / 3;

    let status, cor;

    if (media >= 7) {
        status = `${nome} foi aprovado.`;
        cor = "blue";
    } else if (media >= 4) {
        status = `${nome} está em exame. Faltam ${(10 - media).toFixed(2)} pontos pra 10.`;
        cor = "green";
    } else {
        status = `${nome} foi reprovado.`;
        cor = "red";
    }

    resultado.style.color = cor;
    resultado.innerHTML = `Média: ${media.toFixed(2)}<br>${status}`;
});