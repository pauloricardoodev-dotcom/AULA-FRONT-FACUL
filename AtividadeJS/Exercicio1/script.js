const inputCpf = document.getElementById("cpfInput");
const resultado = document.getElementById("resultado");
const form = document.getElementById("cpfForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();
    verificar();
});

inputCpf.addEventListener("input", function() {
    this.value = mascaraCpf(this.value);
});

function mascaraCpf(valor) {
    valor = valor.replace(/\D/g, "");
    if (valor.length > 9) {
        valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
    } else if (valor.length > 6) {
        valor = valor.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
    } else if (valor.length > 3) {
        valor = valor.replace(/(\d{3})(\d{0,3})/, "$1.$2");
    }
    return valor;
}

function verificar() {
    const numeros = inputCpf.value.replace(/\D/g, "");

    resultado.className = "";
    resultado.innerHTML = "";

    if (numeros.length !== 11) {
        mostrarResultado("CPF precisa ter 11 dígitos", "erro");
        return;
    }

    if (!validarCpf(numeros)) {
        mostrarResultado("CPF inválido", "erro");
        return;
    }

    mostrarResultado("CPF válido", "ok");
}

function validarCpf(cpf) {
    // CPFs com todos os dígitos iguais são inválidos
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }
    let primeiro = (soma * 10) % 11;
    if (primeiro === 10 || primeiro === 11) primeiro = 0;
    if (primeiro !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }
    let segundo = (soma * 10) % 11;
    if (segundo === 10 || segundo === 11) segundo = 0;
    if (segundo !== parseInt(cpf[10])) return false;

    return true;
}

function mostrarResultado(texto, tipo) {
    resultado.className = tipo;
    resultado.innerHTML = `<span class="dot"></span> ${texto}`;
}