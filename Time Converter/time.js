function convertTime() {
    const value = parseFloat(document.getElementById("timeValue").value);
    const unit = document.getElementById("timeUnit").value;
    const resultDiv = document.getElementById("timeResult");

    if (isNaN(value)) {
        resultDiv.innerHTML = "<p>Please do enter the number to convert.</p>";
        return;
    }

    let seconds;
    switch (unit) {
        case "seconds":
            seconds = value;
            break;
        case "minutes":
            seconds = value * 60;
            break;
        case "hours":
        seconds = value * 3600;
        break;
        case "days":
            seconds = value * 86400;
            break;
    }

    const minutes = seconds / 60;
    const hours = seconds / 3600;
    const days = seconds / 86400;

    resultDiv.innerHTML = `
    <p><strong>Result:</strong></p>
    <p>${seconds} Second(s)</p>
    <p>${minutes} Minute(s)</p>
    <p>${hours} Hour(s)</p>
    <p>${days} Day(s)</p>`;
}