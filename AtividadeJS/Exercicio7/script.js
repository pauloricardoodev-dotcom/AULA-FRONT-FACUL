document.getElementById('numero').addEventListener('input', function () {
    var v = this.value.replace(/\D/g, '').substring(0, 16);
    var formatado = v.match(/.{1,4}/g);
    this.value = formatado ? formatado.join(' ') : v;
});

function luhn(num) {
    // inverte
    var digits = num.split('').reverse().map(Number);
    var soma = 0;
    for (var i = 0; i < digits.length; i++) {
        var d = digits[i];
        if (i % 2 === 1) {   
            d = d * 2;
            if (d > 9) d -= 9;
        }
        soma += d;
    }
    return soma % 10 === 0;
}

function getBandeira(num) {
    if (/^4/.test(num)) return 'Visa';
    if (/^5[1-5]/.test(num)) return 'Mastercard';
    if (/^3[47]/.test(num)) return 'American Express';
    if (/^6(?:011|5)/.test(num)) return 'Discover';
    if (/^(301|305|36|38)/.test(num)) return 'Diners Club';
    if (/^35/.test(num)) return 'JCB';
    if (/^(636368|438935|504175|451416|636297|5067|4576|4011)/.test(num)) return 'Elo';
    if (/^(606282)/.test(num)) return 'Hipercard';
    return 'Desconhecida';
}

function getSetor(d) {
    var setores = {
        '0': 'ISO / Redes de telecomunicação',
        '1': 'Companhias aéreas',
        '2': 'Companhias aéreas e outros',
        '3': 'Viagens e entretenimento',
        '4': 'Serviços bancários e financeiros',
        '5': 'Serviços bancários e financeiros',
        '6': 'Comercialização e serviços bancários',
        '7': 'Petróleo e combustíveis',
        '8': 'Saúde e telecomunicações',
        '9': 'Governo e outros'
    };
    return setores[d] || 'Não identificado';
}

function getBanco(num) {
    var bins = {
        '400000': 'Banco do Brasil',
        '411111': 'Citibank',
        '510510': 'Bradesco',
        '516700': 'Nubank',
        '526461': 'Itaú',
        '554360': 'Santander',
        '601782': 'Caixa Econômica',
        '627780': 'Banco Inter',
    };
    var bin6 = num.substring(0, 6);
    if (bins[bin6]) return bins[bin6];

    // identificacao por bandeira como fallback
    var bandeira = getBandeira(num);
    var defaults = {
        'Visa': 'Emissor Visa',
        'Mastercard': 'Emissor Mastercard',
        'American Express': 'American Express',
        'Elo': 'Banco Elo',
        'Hipercard': 'Hipercard'
    };
    return defaults[bandeira] || 'Não identificado';
}

function analisar() {
    var erro = document.getElementById('msg-erro');
    var painel = document.getElementById('painel');
    erro.textContent = '';
    painel.style.display = 'none';

    var raw = document.getElementById('numero').value.replace(/\s|\./g, '');

    if (!/^\d+$/.test(raw)) {
        erro.textContent = 'Use apenas números.';
        return;
    }

    if (raw.length < 13 || raw.length > 16) {
        erro.textContent = 'O número deve ter entre 13 e 16 dígitos.';
        return;
    }

    var valido = luhn(raw);
    var bandeira = getBandeira(raw);
    var setor = getSetor(raw[0]);
    var banco = getBanco(raw);

    var elStatus = document.getElementById('info-status');
    elStatus.textContent = valido ? 'Válido' : 'Inválido';
    elStatus.className = valido ? 'status-valido' : 'status-invalido';

    document.getElementById('info-bandeira').textContent = bandeira;
    document.getElementById('info-setor').textContent = setor;
    document.getElementById('info-banco').textContent = banco;

    painel.style.display = 'block';
}
