const populate = async (value, currency) => {
    let myStr = ""
    url = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_fjqYaiEgtUPBMTEiMfWBiTRyEZ4YBQjatnNyzoCw&base_currency=${currency}`;
    let response = await fetch(url)
    let rJson = await response.json()
    document.querySelector(".output").style.display = "block";

    for (let key of Object.keys(rJson["data"])) {
        myStr += ` <tr>
                        <td>${key}</td>
                        <td>${rJson["data"][key]}</td>
                        <td>${(rJson["data"][key] * value).toFixed(2)}</td>
                    </tr>
                    `;
    }
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = myStr;

}

const btn = document.querySelector(".btn")
btn.addEventListener("click", (e) => {
    e.preventDefault()
    const value = 
    parseInt(document.querySelector("input[name='quantity']").value);
    const currency = 
    document.querySelector("select[name='currency']").value 
    populate(value, currency);
});

const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    toggleBtn.textContent = "Light Mode";
}

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        toggleBtn.textContent = "Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        toggleBtn.textContent = "Dark Mode";
        localStorage.setItem("theme", "light");
    }
});

