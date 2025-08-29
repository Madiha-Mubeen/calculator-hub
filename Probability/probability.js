document.addEventListener("DOMContentLoaded", () => {
   Chart.register(ChartDataLabels);
   
    const form = document.getElementById("probForm");
    const totalInput = document.getElementById("total");
    const favInput = document.getElementById("favourable");
    const formatSelect = document.getElementById("format");
    const resultBox = document.getElementById("result");
    const probOutput = document.getElementById("probOutput");
    const resetBtn = document.getElementById("resetBtn");
    const themeToggle = document.getElementById("themeToggle");
    const chartCanvas = document.getElementById("probChart");

    let chart; //for Chart.js instance

    //Theme toggle 
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        document.body.classList.toggle("light");
    });

    //Reset Functionality
    resetBtn.addEventListener("click", () => {
        form.reset();
        probOutput.textContent="";
        /*resultBox.classList.add("hidden");*/
        if (chart) {
            chart.destroy();
        }
        });

        //Handle form submission
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const total = parseInt(totalInput.value);
            const favourable = parseInt(favInput.value);
            const format = formatSelect.value;
            
            if (isNaN(total) || isNaN(favourable) || total <= 0) {
                alert("Please enter a valid number of total outcomes.");
                return;
            }
            if (favourable < 0 || favourable > total) {
                alert("Favourable outcomes must be between 0 and total outcomes.");
                return;
            }

            const probability = favourable / total;
            let output = "";

            switch (format) {
                case "decimal":
                    output = `Probability: ${probability.toFixed(4)}`;
                    break;
                case "fraction":
                        output = `Probability: ${simplifyFraction(favourable, total)}`;
                    break;
                case "percent":
                    output = `Probability: ${(probability * 100).toFixed(2)}%`;
                    break;
            }

            //Display result 
            probOutput.textContent = output;
            resultBox.classList.remove("hidden");

            //Draw pie chart
            drawChart(favourable, total - favourable);
        });

        //Function to simplify fraction
        function simplifyFraction(numerator, denominator) {
            const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
            const divisor = gcd(numerator, denominator);
            return `${numerator / divisor}/${denominator / divisor}`;
        }

        //Draw Pie Chart 
        function drawChart(fav, notFav) {
            if (chart) chart.destroy();

            const textColor = getComputedStyle(document.body).getPropertyValue('--text').trim();
            chart = new Chart(chartCanvas, {
                type: "pie",
                data: {
                    labels: ["Favourable", "Other Outcomes"],
                    datasets: [{
                        data: [fav, notFav],
                        backgroundColor: ["#40dfd4ff", "#92e14dff"],
                        borderColor: "#fff",
                        borderWidth: 2
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                color: textColor,
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                }
                            }
                        },
                        datalabels: {
                            color: textColor,
                            font: {
                                weight: 'bold',
                                size: 16
                            },
                            formatter: (value, context) => {
                                return value;
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        // Cursor-Based Blob Parallax Movement
        document.addEventListener("mousemove", (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) *100;
            const y = (e.clientY / window.innerHeight - 0.5) * 100;
            document.querySelectorAll(".blob").forEach(blob => {
                blob.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
 
});