document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.querySelector(".themeToggle");
    const body = document.body;
    const card = document.querySelector(".card");
    const dateInput = document.getElementById("dob");
    const resultDiv = document.querySelector(".result");
    const form = document.getElementById("ageForm");


    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const dob = new Date(dateInput.value);
        if (isNaN(dob.getTime())) {
            resultDiv.textContent = "Please enter a valid date of birth!";
            return;
        }
        
        const today = new Date();
        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();

        if (days < 0) {
            months--;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        resultDiv.textContent = `Oh great! you are ${years} years, ${months} months, and ${days} days old.`;

    });
});