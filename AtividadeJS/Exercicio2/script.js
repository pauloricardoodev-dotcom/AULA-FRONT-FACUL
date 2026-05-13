const celsius = document.getElementById("celsius");
const fahrenheit = document.getElementById("fahrenheit");

celsius.addEventListener("input", function() {
    const c = parseFloat(celsius.value);
    fahrenheit.value = isNaN(c) ? "" : ((c * 9 / 5) + 32).toFixed(2);
});

fahrenheit.addEventListener("input", function() {
    const f = parseFloat(fahrenheit.value);
    celsius.value = isNaN(f) ? "" : ((f - 32) * 5 / 9).toFixed(2);
});