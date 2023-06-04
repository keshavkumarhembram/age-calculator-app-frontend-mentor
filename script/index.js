// ************************************* DOM **************************************
// INPUTS
const dayInputDiv = document.querySelector(".day-input-div");
const monthInputDiv = document.querySelector(".month-input-div");
const yearInputDiv = document.querySelector(".year-input-div");
const birthDayInput = document.getElementById("birth-day-form");
const dayInput = document.getElementById("day-input");
const monthInput = document.getElementById("month-input");
const yearInput = document.getElementById("year-input");

const currDate = new Date();
// OUTPUTS
const output = document.querySelector(".output");
const yearOutput = document.getElementById("year-output");
const monthOutput = document.getElementById("month-output");
const dayOutput = document.getElementById("day-output");
// error outputs
const birthDayError = document.getElementById("birth-day-input-error");
const dayError = document.getElementById("day-input-error");
const monthError = document.getElementById("month-input-error");
const yearError = document.getElementById("year-input-error");

// *************************** LISTENING TO EVENTS ********************************
birthDayInput.addEventListener("submit", (event) => {
  event.preventDefault();
  // reseting outputs to default
  dayInputDiv.classList.remove("error");
  monthInputDiv.classList.remove("error");
  yearInputDiv.classList.remove("error");
  yearOutput.innerHTML = "--";
  monthOutput.innerHTML = "--";
  dayOutput.innerHTML = "--";
  birthDayError.innerText = "";
  dayError.innerText = "";
  monthError.innerText = "";
  yearError.innerText = "";

  const notProcced = checkEmptyField();
  if (notProcced) return;

  const valid = checkValidity();
  if (!valid) return;

  const birthDay = getBirthDay();
  if (birthDay == false) {
    return;
  }
  outputAnimation(yearOutput);
  outputAnimation(monthOutput);
  outputAnimation(dayOutput);
  calculateAge(currDate, birthDay);
});

// *************************************  ANIMATIONs ******************************* */
function outputAnimation (element)  {
  element.classList.add('output-animation');
  setTimeout(() => element.classList.remove('output-animation'), 500);
}

// ************************************* FUNCTIONS *********************************
// CALCULATE AGE
function calculateAge(currDate, birthDay) {
  const years = currDate.getFullYear() - birthDay.getFullYear() - 1;
  const currMonth = currDate.toLocaleString("en-US", { month: "2-digit" });
  const birthMonth = birthDay.toLocaleString("en-US", { month: "2-digit" });
  const months = calculateMonth(currMonth, birthMonth);
  const days = calculateDays(
    birthDay.toLocaleString("en-US", { day: "numeric" })
  );

  yearOutput.innerText = years;
  monthOutput.innerText = months;
  dayOutput.innerText = days;
}

// GET BIRTHDAY
function getBirthDay() {
  checkEmptyField();
  console.log(`${dayInput.value}-${monthInput.value}-${yearInput.value}`);
  const birthDay = new Date(
    `${yearInput.value}-${monthInput.value}-${dayInput.value}`
  );
  if (
    birthDay.getDate() == dayInput.value &&
    birthDay.getMonth() == monthInput.value - 1 &&
    birthDay.getFullYear() == yearInput.value
  ) {
    return birthDay;
  } else {
    dayInputDiv.classList.add("error");
    monthInputDiv.classList.add("error");
    yearInputDiv.classList.add("error");
    birthDayError.innerText = "Must be valid date";
    return false;
  }
}

// MONTH
function calculateMonth(currMonth, birthMonth) {
  if (currMonth < birthMonth) {
    const months = 12 + Number(currMonth) - Number(birthMonth);
    return months;
  } else {
    return currMonth - birthMonth;
  }
}

// DAYS
function calculateDays(birthDate) {
  const currDate = new Date();
  const year = currDate.toLocaleString("en-US", { year: "numeric" });
  const month = currDate.toLocaleString("en-US", { month: "numeric" });
  let date = "";
  if (month === 1) {
    date = new Date(`${year}-${12}-${birthDate}`);
  } else {
    date = new Date(`${year}-${month}-${birthDate}`);
  }
  const days = (currDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
  if (days < 0) {
    return Math.floor(31 + days);
  }
  return Math.floor(days);
}

// ------------- ERROR ---------------
// EMPTY FIELD
function checkEmptyField() {
  let flag = false;
  if (dayInput.value === "") {
    dayInputDiv.classList.add("error");
    dayError.innerText = "This field is required";
    flag = true;
  }
  if (monthInput.value === "") {
    monthInputDiv.classList.add("error");
    monthError.innerText = "This field is required";
    flag = true;
  }
  if (yearInput.value === "") {
    yearInputDiv.classList.add("error");
    yearError.innerText = "This field is required";
    flag = true;
  }
  return flag;
}

// BIRTHDAY VALIDITY
function checkValidity() {
  console.log("I am in.");
  const year = [
    "31",
    "28",
    "31",
    "30",
    "31",
    "30",
    "31",
    "31",
    "30",
    "31",
    "30",
    "31",
  ];
  const leapYear = [
    "31",
    "29",
    "31",
    "30",
    "31",
    "30",
    "31",
    "31",
    "30",
    "31",
    "30",
    "31",
  ];
  const currYear = currDate.getFullYear();
  let valid = true;
  if (currYear < yearInput.value) {
    yearInputDiv.classList.add("error");
    yearError.innerText = "Must be in past";
    valid = false;
  }
  if (monthInput.value < 0 || monthInput.value > 12) {
    monthInputDiv.classList.add("error");
    monthError.innerText = "Must be valid month";
    valid = false;
  }
  if (dayInput.value < 0 || dayInput.value > 31) {
    dayInputDiv.classList.add("error");
    dayError.innerText = "Must be valid day";
    valid = false;
  }
  return valid;
}
