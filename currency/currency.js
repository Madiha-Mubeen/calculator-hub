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
            option2.text = option2.text = `${code} - ${symbols[code].description}`;

            fromSelect.add(option1);
            toSelect.add(option2);
            
        }

        //default values
        fromSelect.value = "USD";
        toSelect.value = "INR";
    } catch (error) {
        resultDiv.innerHTML = " OOPs error occurred while loading currency list !";
    }
}

async function convertCurrency() {
    let amount = document.getElementById("amount").value;
    let from = fromSelect.value;
    let to = toSelect.value;

    if (!amount || amount <= 0) {
        resultDiv.innerHTML = "Please do Enter a Valid amount.";
        return;
    }

    try {
        let url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
        let res = await fetch(url);
        let data = await res.json();

        resultDiv.innerHTML = `
        ${amount} ${from} = <br>
        <strong>${data.result.toFixed(2)} ${to}</strong>`;
    } catch (error) {
        resultDiv.innerHTML = "Conversion failed, please try again later.";
    }
}

//Load currency list on page load
loadCurrencies();