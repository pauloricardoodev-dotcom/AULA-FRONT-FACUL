function calcular() {
    var erro = document.getElementById('msg-erro');
    var resultado = document.getElementById('resultado');
    erro.textContent = '';
    resultado.style.display = 'none';

    var pacote = parseFloat(document.getElementById('pacote').value);
    var pessoas = parseInt(document.getElementById('pessoas').value);

    if (!pacote) {
      erro.textContent = 'Selecione um pacote antes de calcular.';
      return;
    }

    if (!pessoas || pessoas <= 0) {
      erro.textContent = 'Informe uma quantidade válida de pessoas.';
      return;
    }

    // 1. Custo base
    var bruto = pacote * pessoas;

    // 2. Taxa de serviço
    var taxa = bruto * 0.10;
    var comTaxa = bruto + taxa;

    // 3. Desconto fidelidade
    var desconto = 0;
    var total = comTaxa;

    if (pessoas > 100) {
      desconto = comTaxa * 0.05;
      total = comTaxa - desconto;
    }

    // Exibe
    document.getElementById('val-bruto').textContent = 'R$ ' + bruto.toFixed(2);
    document.getElementById('val-taxa').textContent = 'R$ ' + taxa.toFixed(2);
    document.getElementById('val-total').textContent = 'R$ ' + total.toFixed(2);

    var linhaDesc = document.getElementById('linha-desconto');
    if (desconto > 0) {
      document.getElementById('val-desconto').textContent = '- R$ ' + desconto.toFixed(2);
      linhaDesc.style.display = 'flex';
    } else {
      linhaDesc.style.display = 'none';
    }

    resultado.style.display = 'block';
}