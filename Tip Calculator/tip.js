function calculateTip() {
    const bill = parseFloat(document.getElementById("bill").value);
    const tipPercent = parseFloat(document.getElementById("tipPercent").value);
    const people = parseFloat(document.getElementById("people").value);

    if(isNaN(bill) || isNaN(tipPercent) || isNaN(people)  || bill <= 0 || people <= 0) {
        document.getElementById("result").innerText = "Please do enter values to calculate the tip.";
        return;
    }

    const tip = (bill * tipPercent) / 100;
    const total = bill + tip;
    const perPerson = total / people;

    document.getElementById("result").innerHTML = `
    Tipping Amount: ${tip.toFixed(2)} 
    <br>
    Total Billing: ${total.toFixed(2)}
    <br>
    Per Person Amounting: ${perPerson.toFixed(2)}`;
}