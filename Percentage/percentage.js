document.getElementById("percentForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const number = parseFloat(document.getElementById("number").value);
    const percent = parseFloat(document.getElementById("percent").value);
    const operation = document.getElementById("operation").value;
    let result;

    if (isNaN(number) || isNaN(percent)) {
        result = "Please enter a valid numbers";
    } else {
        if (operation === "of") {
                result = `${percent}% ${number} = ${(number * percent / 100).toFixed(2)}`;
        } else if  (operation === "increase") {
                result = `${number} increased by ${percent}% = ${(number + (number * percent / 100)).toFixed(2)}`;
            } else if (operation === "decrease") {
                result = `${number} decreased by ${percent}% = ${(number - (number * percent / 100)).toFixed(2)}`;
            
        }
    }

    document.getElementById("output").innerText = result;
});