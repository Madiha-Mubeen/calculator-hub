document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.querySelector(".themeToggle");
    const body = document.body;
    const card = document.querySelector(".card");
    const dateInput = document.getElementById("dob");
    const resultDiv = document.querySelector(".result");
    const form = document.getElementById("ageForm");

    let isDarkMode = true;

    themeToggle.addEventListener("click", () => {
        isDarkMode = !isDarkMode;

        if (isDarkMode) {
            body.style.background = getComputedStyle(document.documentElement).getPropertyValue('--bg-dark');
            body.style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-dark');
            card.style.boxShadow = `0 0 25px ${getComputedStyle(document.documentElement).getPropertyValue('--card-glow-dark')}`;
        } else {
            body.style.background = getComputedStyle(document.documentElement).getPropertyValue('--bg-light');
            body.style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-light');
            card.style.boxShadow = `0 0 25px ${getComputedStyle(document.documentElement).getPropertyValue('--card-glow-light')}`;
        }
    });

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

        resultDiv.textContent = `You are ${years} years, ${months} months, and ${days} days old.`;

    });
});