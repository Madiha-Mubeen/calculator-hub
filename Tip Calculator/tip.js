function calculateTip() {
    const bill = parseFloat(document.getElementById("bill").value);
    const tipPercent = parseFloat(document.getElementById("tipPercent").value);
    const people = parseFloat(document.getElementById("people").value);

    if(isNaN(bill) || isNaN(tipPercent) || isNaN(people)  || bill <= 0 || people <= 0) {
        document.getElementById("result").innerText = "Please do enter values to calculate the tip.";
        return;
    }

    const tip = (bill * tipPercent) / 100;
    const total = bill + tip;
    const perPerson = total / people;

    document.getElementById("result").innerHTML = `
    Tipping Amount: ${tip.toFixed(2)} 
    <br>
    Total Billing: ${total.toFixed(2)}
    <br>
    Per Person Amounting: ${perPerson.toFixed(2)}`;
}

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