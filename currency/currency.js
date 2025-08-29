const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const resultDiv = document.getElementById("result");

async function loadCurrencies() {
    try {
        let res = await fetch("https://api.exchangerate.host/symbols");
        let data = await res.json();

        let symbols = data.symbols;

        for (let code in symbols) {
            let option1 = document.createElement("option");
            let option2 = document.createElement("option");

            option1.value = option2.value = code;
            option2.text = option2.text = `${code} - ${symbols[code]}`
        }
    }
}