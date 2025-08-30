const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const resultDiv = document.getElementById("result");
const API_KEY = "fca_live_fjqYaiEgtUPBMTEiMfWBiTRyEZ4YBQjatnNyzoCw";
const API_URL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_fjqYaiEgtUPBMTEiMfWBiTRyEZ4YBQjatnNyzoCw";

async function loadCurrencies() {
    try {
        let res = await fetch(API_URL);
        let data = await res.json();

        //data.data contains exchange rates with USD by default
        let currencies = Object.keys(data.data);

        //Populate dropdowns
        currencies.forEach(code => {
            let option1 = document.createElement("option");
            let option2 = document.createElement("option");

            option1.value = option2.value = code;
            option1.text = option2.text = code;

            fromSelect.appendChild(option1);
            toSelect.appendChild(option2);
        });

        //default values
        fromSelect.value = "USD";
        toSelect.value = "INR";
    } catch (error) {
        resultDiv.innerHTML = "Error loading currency list!";
    }
}

async function convertCurrency() {
    let amount = document.getElementById("amount").value;
    let from = fromSelect.value;
    let to = toSelect.value;

    if (!amount || amount <= 0) {
        resultDiv.innerHTML = "Please enter a valid amount.";
        return;
    }

    try {
        //Get rates relative to "from"
        let url = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_fjqYaiEgtUPBMTEiMfWBiTRyEZ4YBQjatnNyzoCw`;
        let res = await fetch(url);
        let data = await rews.json();

        let rate = data.data[to];
        let converted = (amount * rate).toFixed(2);

        resultDiv.innerHTML = `
        ${amount} ${from} = <br> 
        <strong>${converted} ${to}</strong>`;
    } catch (error) {
        resultDiv.innerHTML = "Conversion failed, please try again later.";
    }
}


//Load currencies when page starts
loadCurrencies();