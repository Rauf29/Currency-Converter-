const URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".select-container select");
const btn = document.querySelector("button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");

const msg = document.querySelector(".msg");

for (let select of dropdown) {
    for (currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.value = currencyCode;
        newOption.innerText = currencyCode;
        if (select.name === "from" && currencyCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currencyCode === "BDT") {
            newOption.selected = "selected";
        }
        select.appendChild(newOption);

    }
    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    });
}
const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let imsSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = imsSrc;
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if (amountValue === "" || amountValue < 1) {
        amount.value = 1;
    }
    let fromCurr = fromCurrency.value;
    let toCurr = toCurrency.value;

    const endpoint = `${URL}/${fromCurr.toLowerCase()
        }.json`;
    const response = await fetch(endpoint);
    const data = await response.json();
    const rate = data[fromCurr.toLowerCase()][toCurr.toLowerCase()];
    const finalAmount = (amountValue * rate).toFixed(4);
    console.log(finalAmount);
    msg.innerText = `${amountValue} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`
}
btn.addEventListener("click", async (e) => {
    e.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load", () => {
    updateExchangeRate();
})