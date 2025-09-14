const unitOptions = {
    length: ["cm", "inch"],
    weight: ["kg", "lbs"],
    temperature: ["°C", "°F"]
};

function updateUnits() {
    const category = document.getElementById("category").value;
    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    unitOptions[category].forEach(unit => {
        let opt1 = document.createElement("option");
        let opt2 = document.createElement("option");
        opt1.value = opt2.value = unit;
        opt1.text = opt2.text = unit;
        fromUnit.appendChild(opt1);
        toUnit.appendChild(opt2);
    });

    toUnit.selectedIndex = 1;   //for default: second unit
    convert();
}

function convert() {
    let fromValue = parseFloat(document.getElementById("fromValue").value);
    if (isNaN(fromValue)) {
        document.getElementById("toValue").value = "";
        return;
    }

    let fromUnit = document.getElementById("fromUnit").value;
    let toUnit = document.getElementById("toUnit").value;
    let result = fromValue;

    //Logic for convert
    if (fromUnit === "cm" && toUnit === "inch") result = fromValue / 2.54;
    else if (fromUnit === "inch" && toUnit === "cm") result = fromValue * 2.54;
     else if (fromUnit === "kg" && toUnit === "lbs") result = fromValue * 2.20462;
     else if (fromUnit === "lbs" && toUnit === "kg") result = fromValue / 2.20462;
     else if (fromUnit === "°C" && toUnit === "°F") result = (fromValue * 9/5) + 32;
     else if (fromUnit === "°F" && toUnit === "°C") result = (fromValue - 32) * 5/9;
     else result = fromValue;   //Gives same value

    document.getElementById("toValue").value = result.toFixed(2);
}

window.onload = updateUnits;


const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

if(localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    toggleBtn.textContent = "Light Mode";
}

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        toggleBtn.textContent = "Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        toggleBtn.textContent = "Dark mode";
        localStorage.setItem("theme", "light");
    }
});