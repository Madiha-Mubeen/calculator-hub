let chart = null;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addEquationBtn").addEventListener("click", addEquationInput);

    //Add default equation input
    addEquationInput();

    //Draw empty graph on load
    plotGraph();
});

function addEquationInput() {
    const container = document.getElementById("equationList");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter equation like y = x^2";
    input.classList.add("equationInput");
    input.addEventListener("input", plotGraph);
    container.appendChild(input);
    input.value = "y = x";
}

function plotGraph() {
    const inputs = document.querySelectorAll(".equationInput");
    const xValues = Array.from({length: 201}, (_, i) => -10 + i * 0.1);
    const datasets = [];

    inputs.forEach((input, index) => {
        const expr = input.value.toLowerCase().replace(/\s+/g, '');
        if(!expr.startsWith("y=")) return;

        const equation = expr.slice(2);
        const yValues = [];

        for (let x of xValues) {
            try {
                const y = evalEquation(equation, x);
                yValues.push(isFinite(y) ? y : null);
            } catch {
                yValues.push(null);
            }
        }

        datasets.push({
            label: `y = ${equation}`,
            data: yValues,
            borderColor: getColor(index),
            fill: false,
            tension: 0.2
        });
    });

    const ctx = document.getElementById("graphCanvas").getContext("2d");
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues,
            datasets
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: getTextColor() }}
            },
            scales: {
                x: {
                    type: 'linear',
                    title: { display: true, text: 'x', color: getTextColor() },
                    ticks: { color: getTextColor() },
                    grid: { color: getGridColor() }
                },
                y: {
                    title: {display: true, text: 'y', color: getTextColor() },
                    ticks: { color: getTextColor() },
                    grid: { color: getGridColor() }
                }
            }
        }
    });
}

function evalEquation(eq, x) {
    const safeEq = eq.replace(/\^/g, "**")
                     .replace(/sin/g, "Math.sin")
                     .replace(/cos/g, "Math.cos")
                     .replace(/tan/g, "Math.tan")
                     .replace(/sqrt/g, "Math.sqrt")
                     .replace(/log/g, "Math.log10")
                     .replace(/ln/g, "Math.log");
    return eval(safeEq);
}

function getColor(i) {
    const colors  = ["#28a745", "#ff6b6b", "#007bff", "#f39c12", "#9b59b6"];
    return colors[i % colors.length];
}

function getTextColor() {
    return document.body.classList.contains("dark") ? "#f1f1f1" : "#222";
}

function getGridColor() {
    return document.body.classList.contains("dark") ? "#333" : "#ccc";
}

function downloadImage() {
    const canvas = document.getElementById("graphCanvas");
    const link = document.createElement("a");
    link.download = "graph.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

const toggleBtn =document.getElementById("themeToggle");
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