document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("themeToggle");
    const resultBox = document.getElementById("result");

    //Theme toggle Logic
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });

    //Parallax blob animation
    const blobs = document.querySelectorAll(".blob");

    document.addEventListener("mousemove", (e) => {
        const {clientX, clientY } = e;
        blobs.forEach((blob, i) => {
            const movement = (i + 1) * 0.02;
            const x = (clientX - window.innerWidth / 2) * movement;
            const y = (clientY - window.innerHeight / 2) * movement;
            blob.style.transform = `translate(${x}px, ${y}px) scale(1)`;
        });
    });

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
});