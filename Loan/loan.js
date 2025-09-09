document.addEventListener("DOMContentLoaded", function () {
    Chart.register(ChartDataLabels);

    const form = document.getElementById("loanForm");
    const resultDiv = document.getElementById("result");
    const toggleBtn = document.getElementById("themeToggle");
    const resetBtn = document.getElementById("resetBtn");

    //Submit handler
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const amount = parseFloat(document.getElementById("amount").value);
        const interest = parseFloat(document.getElementById("interest").value);
        const years = parseFloat(document.getElementById("years").value);

         if (!amount || !interest || !years || amount <= 0 || interest <= 0 || years <= 0) {
            resultDiv.innerHTML = `<p class="result">Please enter valid loan details.</p>`;
            return;
        }

        //Calculation 
        const monthlyInterest = interest / 100 /12;
        const totalMonths = years * 12;

        const emi = (amount * monthlyInterest * Math.pow(1 + monthlyInterest, totalMonths)) /
                    (Math.pow(1 + monthlyInterest, totalMonths) - 1);

        const totalPayment = emi * totalMonths;
        const totalInterest = totalPayment - amount;

        resultDiv.innerHTML = `
        <div class="loan-result fade-in">
            <p><strong>Monthly EMI:</strong> ₹${emi.toFixed(2)}
               <span class="tooltip">
               <i class="fa fa-info-circle"></i>
                <span class="tooltip-text">Equated Monthly Installment</span>
               </span>
            </p>
            <p><strong>Total Interest:</strong> ₹${totalInterest.toFixed(2)}</p>
            <p><strong>Total Payment:</strong> ₹${totalPayment.toFixed(2)}</p>
            <div class="emi-chart-container">
            <div class="emi-chart-title">EMI Breakdown</div>
                <canvas id="emiChart" width="300" height="300"></canvas>
            <button id="downloadChart" style="margin-top: 1rem;">Download Chart</Button>
        </div>
       </div>
        `;

    
 
        const ctx = document.getElementById("emiChart").getContext("2d");
        let emiChart;
        if (window.emiChart instanceof Chart) {
            window.emiChart.destroy();  //Clear previous chart
            }

        /*if (typeof ChartDataLabels !== 'undefined') {
            Chart.register(ChartDataLabels);
        }*/
       const chartType = document.getElementById("chartType").value;
        window.emiChart = new Chart(ctx, {
            type: chartType,
            data: {
                labels: ["Principal", "Interest"],
                datasets: [{
                    data: [amount, totalInterest],
                    backgroundColor: ["#d2dd6bff", "#ff6384"],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: "bottom"
                    },

                    datalabels: {
                        color: '#fff',
                        formatter: (value, context) => {
                            const data = context.chart.data.datasets[0].data;
                            const total = data.reduce((acc, val) => acc + val, 0);
                            const percentage = (value / total * 100).toFixed(1);
                            return `${percentage}%`;
                        },
                        font: {
                            weight: 'bold',
                            size: 14
                        }
                    }
                }
            },
            plugins: [ChartDataLabels]
        });

        //Save to history 
        const history = JSON.parse(localStorage.getItem("loanHistory")) || [];

        history.unshift({
            amount: amount.toFixed(2),
            interest: interest.toFixed(2),
            years,
            emi: emi.toFixed(2),
            totalPayment: totalPayment.toFixed(2),
            totalInterest: totalInterest.toFixed(2),
            date: new Date().toLocaleString()
        });

        if (history.length > 5) history.pop();

        localStorage.setItem("loanHistory", JSON.stringify(history));
        displayLoanHistory();
    });

    //Reset Button
    resetBtn.onclick = () => {
        form.reset();
        resultDiv.innerHTML = "";
    };

    //Theme Toggle
    toggleBtn.onclick = () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    };

    //Apply Saved Theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }

    //Display existing history on load
    displayLoanHistory();
});

function displayLoanHistory () {
    const history = JSON.parse(localStorage.getItem("loanHistory")) || [];
    const existing = document.querySelector(".loan-history");
    if(existing) existing.remove();

    if (history.length === 0) return;

    const historyContainer = document.createElement("div");
    historyContainer.classList.add("loan-history");
    historyContainer.innerHTML = `
        <h3>Loan History (Last 5)</h3>
        <ul>
            ${history.map(entry => `
                <li>
                    <span class="date">${entry.date}</span><br>
                    <span class="value">₹${entry.amount} at ${entry.interest}% for ${entry.years} yrs → EMI ₹${entry.emi}</span>
                </li>
                `).join("")}
        </ul>
        <div class="history-actions">
            <button id="exportLoanHistoryBtn">Export CSV</button>
            <button id="clearLoanHistoryBtn">Clear History</button>
        </div>
        `;

        document.getElementById("result").appendChild(historyContainer);

        document.getElementById("clearLoanHistoryBtn").onclick = () => {
            localStorage.removeItem("loanHistory");
            document.querySelector(".loan-history").remove();
        };

        document.getElementById("exportLoanHistoryBtn").onclick = exportLoanCSV;
}

function exportLoanCSV() {
    const history = JSON.parse(localStorage.getItem("loanHistory")) || [];
    if (history.length === 0) return;

    const csvContent = [
        ["Date", "Amount", "Interest (%)", "Years", "EMI", "Total Payment", "Total Interest"],
        ...history.map(h => [
            h.date,
            h.amount,
            h.interest,
            h.years,
            h.emi,
            h.totalPayment,
            h.totalInterest
        ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "loan_history.csv";
    a.click();

    URL.revokeObjectURL(url);
}

document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "downloadChart") {
        const link = document.createElement("a");
        link.download = "emi_chart.png";
        link.href = document.getElementById("emiChart").toDataURL;
        link.click();
    }
});