document.addEventListener("DOMContentLoaded", () => {
    const resultBox = document.getElementById("result");

    //Carbon Footprint Calculator 
    document.getElementById("footprintForm").addEventListener("submit", (e) => {
        e.preventDefault();

        //Get user inputs
        const carKm = parseFloat(document.getElementById("carKm").value) || 0;
        const flightHours = parseFloat(document.getElementById("flightHours").value) || 0;
        const electricity = parseFloat(document.getElementById("electricity").value) || 0;
        const waste = parseFloat(document.getElementById("waste").value) || 0;
        const diet = document.getElementById("diet").value;

        //Emission Factors (apprx values)
        const carEmission = carKm * 0.21 * 52;  //per week x 52 weeks
        const flightEmission = flightHours * 90;
        const electricityEmission = electricity * 12 * 0.475; //per month * 12
        const wasteEmission = waste * 52 * 0.45;

        let dietEmission;
        if (diet === "meat") dietEmission = 2000;
        else if (diet === "vegeterian") dietEmission = 1500;
        else dietEmission = 1000;

        //Total Emission Calculation
        const totalEmission = carEmission + flightEmission + electricityEmission + wasteEmission + dietEmission;


        //show result
        resultBox.querySelector(".result-text").innerHTML = `
        <strong>${totalEmission.toFixed(2)} kg CO₂/year</strong> is your estimated annual carbon footprint.
        `;
        resultBox.classList.add("show");
    });

    const toggleBtn = document.getElementById("themeToggle");
    const body = document.body;

    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark");
        toggleBtn.textContent = "Light Mode";
    } else {
        toggleBtn.textContent = "Dark Mode";
    }

    toggleBtn.addEventListener("click", () => {
        body.classList.toggle("dark");

        if (body.classList.contains("dark")) {
            toggleBtn.textContent = "Light Mode";
        } else {
            toggleBtn.textContent = "Dark Mode";
            localStorage.setItem("theme", "light");
        }
    });
});

