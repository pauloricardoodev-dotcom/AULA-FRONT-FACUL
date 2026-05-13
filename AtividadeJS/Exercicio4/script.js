const botao = document.getElementById("calcular");
const resultado = document.getElementById("resultado");

const taxas = { visa: 0.02, master: 0.0185, elo: 0.03 };

botao.addEventListener("click", function() {
    const valorVenda  = Number(document.getElementById("valor").value);
    const bandeira    = document.getElementById("bandeira").value;
    const qtdParcelas = Number(document.getElementById("parcelas").value);

    const taxaBandeira = valorVenda * taxas[bandeira];
    const juros        = valorVenda * (0.015 * qtdParcelas);
    const taxaMensal   = 12.50 * qtdParcelas;
    const valorTotal   = valorVenda + taxaBandeira + juros + taxaMensal;
    const valorParcela = valorTotal / qtdParcelas;

    const fmt = v => `R$ ${v.toFixed(2)}`;

    resultado.innerHTML = `
        Valor da venda: ${fmt(valorVenda)}<br>
        Taxa da bandeira: ${fmt(taxaBandeira)}<br>
        Juros: ${fmt(juros)}<br>
        Taxa mensal: ${fmt(taxaMensal)}<br>
        <strong>Total: ${fmt(valorTotal)}</strong><br>
        <strong>Por parcela: ${fmt(valorParcela)}</strong>
    `;
});