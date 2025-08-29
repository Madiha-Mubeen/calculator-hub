function displayBMIHistory() {
    const history = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    if (history.length === 0) return;

    const historyHTML = `<div class="bmi-history">
        <h3>BMI History (Last 5)</h3>
        <ul>
            ${history.map(entry => `
            <li>
                <span class="date">${entry.date}</span>
                <span class="value">${entry.bmi} (${entry.category})</span>
            </li>`).join("")}
        </ul>
        <div class="history-actions">
            <button id="exportHistoryBtn">Export CSV</button>
            <button id="clearHistoryBtn">Clear History</button>
        </div>
    </div>
 `;

document.getElementById("result").innerHTML += historyHTML;

document.getElementById("clearHistoryBtn").onclick = () => {
    localStorage.removeItem("bmiHistory");
    document.querySelector(".bmi-history").remove();
};

document.getElementById("exportHistoryBtn").onclick = exportCSV;
}

function exportCSV() {
    const history = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    if (history.length === 0) return;

    const csvContent = [
        ["Date", "BMI", "Category"],
        ...history.map(h => [h.date, h.bmi, h.category])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "bmi_history.csv";
    a.click();

    URL.revokeObjectURL(url);
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("bmiForm");
    const resultDiv = document.getElementById("result");
    const toggleBtn = document.getElementById("themeToggle");
    
    form.addEventListener("submit", function (e) {
        e.preventDefault();


        const weight = parseFloat(document.getElementById("weight").value);
        const height = parseFloat(document.getElementById("height").value);

        if (!weight || !height || weight <= 0 || height <= 0) {
            resultDiv.innerHTML = "<p class='error'>Please enter valid values</p>";
            return;
        }

        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);

        let category = "";
        let advice = "";

        if (bmi < 18.5) {
            category = "Underweight";
            advice = "You are underweight. Consider including more nutrient-rich calories in your diet and consult a dietitian to ensure you're meeting your body's needs.";
        } else if (bmi < 24.9) {
            category = "Normal weight";
            advice = "Great! You're a healthy weight range. Maintain a balanced diet and stay active to keep up your health.";
        } else if (bmi < 29.9) {
            category = "Overweight";
            advice = "You're within the overweight range. Consider adopting healthier eating habits and incorporating regular physical activity into your routine.";
        } else {
            category = "Obese";
            advice = "You are in the obese range. It's important to work on weight reduction through a healthy diet, exercise, and possibly guidance from a healthcare provider.";
        }


resultDiv.innerHTML = "";


    setTimeout(() => {



        //Ideal Weight Range Calculation
        const minIdealWeight = 18.5 * (heightInMeters ** 2);
        const maxIdealWeight = 24.9 * (heightInMeters ** 2);

        const idealWeightHTML = `
        <p class="ideal-weight">
            Ideal Weight Range for your height:
            <strong>${minIdealWeight.toFixed(1)}kg</strong> - 
            <strong>${maxIdealWeight.toFixed(1)}kg</strong>
        </p>
        `;

        resultDiv.innerHTML = `
        <div class="bmi-result">
        <p>Your BMI is <strong>${bmi.toFixed(2)}</strong></p>
        <p>Category: <span class="bmi-category">${category}</span></p>
        <p class="bmi-advice">${advice}</p>

     <div class="bmi-bar">
       <div class="bmi-track">
        <div class="bar-segment underweight">Underweight</div>
        <div class="bar-segment normal">Normal</div>
        <div class="bar-segment overweight">Overweight</div>
        <div class="bar-segment obese">Obese</div>
        <div class="bmi-pointer" id="bmiPointer">▲
         <span class="bmi-label">${bmi.toFixed(1)}</span>
         </div>
        </div>
       </div>
        ${idealWeightHTML}
      </div>
     `;

    //Pointer position calculation
     const pointer = document.getElementById("bmiPointer");
     let position = 0;

     if (bmi < 18.5) {
        position = (bmi / 18.5) * 25;
     } else if (bmi < 24.9) {
        position = 25 + ((bmi - 18.5) / (24.9 - 18.5)) * 25;
     } else if (bmi < 29.9) {
        position = 50 + ((bmi - 24.9) / (29.9 - 24.9)) * 25;
     } else {
        position = 75 + ((bmi -29.9) / (40 - 29.9)) * 25;
     }

     pointer.style.left = `${Math.min(position, 100)}%`;
    

    //Save to BMI History
    const history = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    history.unshift({
        bmi: bmi.toFixed(2),
        category,
        date: new Date().toLocaleString()
    });

    if (history.length > 5) history.pop();  //Keep only Latest 5
    
    localStorage.setItem("bmiHistory", JSON.stringify(history));

    //Display History
    displayBMIHistory();

   }, 50);
});

    //Reset Button
    const resetBtn = document.getElementById("resetBtn");
    if (resetBtn) {
        resetBtn.onclick = () => {
            form.reset();
            resultDiv.innerHTML = "";
        };
    }

    //Theme toggle 
    toggleBtn.onclick = () => {
        document.body.classList.toggle("dark");
        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark") ? "dark" : "light");
    };


    //Apply saved theme on load
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark"

    );
    }
 }); 