function submitForm() {
  document.getElementById("formID").hidden = true;

  let [weekendsLeft, upcomingWeekendsList] = countWeekendsLeft(
    document.getElementById("birthday").value
  );
  let [weekendsUsed, pastWeekendsList] = countWeekendsUsed(
    document.getElementById("birthday").value
  );

  let realizationText = document.getElementById("realizationText");
  realizationText.innerText = `You have ${weekendsLeft} weekend${weekendsLeft == 1 ? "" : "s"}  remaining in your twenties until you are 30.`;

  let progressBar = document.getElementById("progressBarID");
  progressBar.value = weekendsUsed;
  progressBar.max = weekendsUsed + weekendsLeft;

  // let weekendsList = countTotalWeekends();

  let str = "";
  let count = 1;
  pastWeekendsList.forEach((weekend) => {
    str += `<strike>${weekend}</strike> (${count})<br/>`;
    count += 1;
  });

  upcomingWeekendsList.forEach((weekend) => {
    str += `${weekend} (${count})<br/>`;
    count += 1;
  });

  document.getElementById("proof").innerHTML = str;
  
  document.getElementById("spacer").className = "take-up-slightly-less-space";

  document.getElementById("realization").hidden = false;
  document.getElementById("viewWeekendsButton").hidden = false;
}

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const SECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
const SECONDS_IN_A_WEEK = SECONDS_IN_A_DAY * 7;

function countWeekendsLeft(birthday) {
  let [year, month, day] = birthday.split("-");

  let targetYear = parseInt(year) + 30;
  let targetDate = new Date(`${targetYear}-${month}-${day}`);

  return weekendsBetween(new Date(), targetDate);
}

function countWeekendsUsed(birthday) {
  let [year, month, day] = birthday.split("-");

  let twentiethYear = parseInt(year) + 20;
  let twentiethBirthday = new Date(`${twentiethYear}-${month}-${day}`);
  
  // account for "dead" people
  let thirtithYear = parseInt(year) + 30;
  let thirtithYearDate = new Date(`${thirtithYear}-${month}-${day}`);
  let today = new Date();
  let targetDate = thirtithYearDate < today ? thirtithYearDate : today;

  return weekendsBetween(twentiethBirthday, targetDate);
}

function weekendsBetween(firstDate, secondDate) {
  let secondsUntilWeekend = (6 - firstDate.getDay()) * SECONDS_IN_A_DAY;
  let currentDate = new Date(firstDate.getTime() + secondsUntilWeekend);
  
  if (currentDate >= secondDate) {
    return [0, []]
  }

  let weekends = [];

  let count = currentDate < secondDate ? 1 : 0;
  while (currentDate < secondDate) {
    // console.log(currentDate)
    weekends.push(dateToYYYYMMDD(currentDate));
    currentDate = new Date(currentDate.getTime() + SECONDS_IN_A_WEEK);
    count += 1;
  }

  console.log(count);
  console.log(weekends);
  return [count, weekends];
}

function dateToYYYYMMDD(date) {
  let month =
    date.getMonth() + 1 >= 10
      ? "" + (date.getMonth() + 1)
      : "0" + (date.getMonth() + 1);
  let day = date.getDate() >= 10 ? "" + date.getDate() : "0" + date.getDate();
  return `${date.getFullYear()}-${month}-${day}`;
}

function switchPage() {
  if (document.getElementById("realization").hidden) {
    document.getElementById("spacer").hidden = false;
    document.getElementById("realization").hidden = false;
    document.getElementById("proof").hidden = true;
    document.getElementById("viewWeekendsButton").innerText = "View Weekends";
  } else {
    document.getElementById("spacer").hidden = true;
    document.getElementById("realization").hidden = true;
    document.getElementById("proof").hidden = false;
    document.getElementById("viewWeekendsButton").innerText = "View Summary";
  }
}

// function countTotalWeekends(birthday) {

//   let [year, month, day] = birthday.split("-");

//   let twentiethYear = parseInt(year) + 20;
//   let twentiethBirthday = new Date(`${twentiethYear}-${month}-${day}`);

//   let thirtithYear = parseInt(year) + 30;
//   let thirtithYearDate = new Date(`${thirtithYear}-${month}-${day}`);

//   return weekendsBetween(twentiethBirthday, )

// }
