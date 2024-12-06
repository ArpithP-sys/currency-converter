
  // Base API URL
const base_url = "https://api.exchangerate-api.com/v4/latest/";

// Selecting DOM elements
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const amountInput = document.querySelector(".amount input");
const message=document.querySelector(".msg");

// Country and currency mapping
const countryList = {
   AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  CAD: "CA",
  CHF: "CH",
  CNY: "CN",
  COP: "CO",
  CZK: "CZ",
  DKK: "DK",
  DOP: "DO",
  EGP: "EG",
  EUR: "FR",
  GBP: "GB",
  INR: "IN",
  JPY: "JP",
  NGN: "NG",
NOK: "NO",
NZD: "NZ",
PHP: "PH",
PKR: "PK",
RUB: "RU",
SAR: "SA",
SEK: "SE",
SGD: "SG",
USD: "US",
ZAR: "ZA",
};

// Populate dropdowns with currency codes
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.innerText = currCode;

    // Set default selections
    if (select.name === "from" && currCode === "USD") {
      option.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      option.selected = true;
    }

    select.appendChild(option);
  }

  // Add change event listener to update flags
  select.addEventListener("change", (e) => updateFlag(e.target));
}

// Update the flag based on selected currency
const updateFlag = (element) => {
  const currCode = element.value;
  const countryCode = countryList[currCode];
  const img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

// Handle form submission to fetch exchange rates
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amount = parseFloat(amountInput.value);
  if (isNaN(amount) || amount < 1) {
    amount = 1;
    amountInput.value = "1";
  }

  const fromCurrency = fromCurr.value;
  const toCurrency = toCurr.value;

  try {
    // Fetch exchange rates
    const response = await fetch(`${base_url}${fromCurrency}`);
    if (!response.ok) throw new Error("Failed to fetch exchange rates.");

    const data = await response.json();
    const exchangeRate = data.rates[toCurrency];

    if (exchangeRate) {
      // Calculate and display the converted amount
      const convertedAmount = (amount * exchangeRate).toFixed(2);
    //   alert(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
    // } else {
    //   alert("Exchange rate not found.");
    // }
    message.innerText=`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    }
    else{
      message.innerText="Exchange rate not found."
    }

    // let rate =data[toCurrency.value];
    // console.log(rate);
    // }

  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    alert("An error occurred while fetching exchange rates. Please try again later.");
  }
});
