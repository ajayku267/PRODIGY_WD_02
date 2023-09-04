$(".stopwatch-btn").click(function () {
  //hide all other wrappers
  $(".outer-wrapper > div").slideUp();
  //show stopwatch wrapper
  $(".stopwatch").slideDown();
  //update type text
  $(".type").html("stopwatch");
});

$(".back-btn").click(function () {
  //hide all other wrappers
  $(".outer-wrapper > div").slideUp();
  //show clock wrapper
  $(".clock").slideDown();
  //update type text
  $(".type").html("stopwatch");
});

$(".timer-btn").click(function () {
  //hide all other wrappers
  $(".outer-wrapper > div").slideUp();
  //show timer wrapper
  $(".timer").slideDown();
  //update type text
  $(".type").html("stopwatch");
});

const addTrailingZero = (num) => {
  return num < 10 ? "0" + num : num;
};

const updateTime = () => {
  const time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";
  document.getElementById("PM").innerText = hours >= 12 ? "AM" : "PM";

  let otherampm = hours >= 12 ? "AM" : "PM";

  //converting 24 hours to 12
  hours = hours % 12 || 12;

  //add trailing zeros if less than 10
  hours = addTrailingZero(hours);
  minutes = addTrailingZero(minutes);
  seconds = addTrailingZero(seconds);

  $("#hour").html(hours);
  $("#min").html(minutes);
  $("#sec").html(seconds);
  $("#ampm").html(ampm);
  $("#other-ampm").html(otherampm);
};

//call the function on page load
updateTime();

//call function after every second
setInterval(updateTime, 1000);

//stopwatch

let stopwatchHours = 0,
  stopwatchMinutes = 0,
  stopwatchSeconds = 0,
  stopwatchMiliseconds = 0,
  stopwatchRunning = false,
  laps = 0,
  stopwatchInterval;

const stopwatch = () => {
  //increase miliseconds by one
  stopwatchMiliseconds++;

  if (stopwatchMiliseconds == 100) {
    //if stopwatch miliseconds equals 100 increase one seconds and set ms 0
    stopwatchSeconds++;
    stopwatchMiliseconds = 0;
  }

  if (stopwatchSeconds == 60) {
    //same with minutes
    stopwatchMinutes++;
    stopwatchSeconds = 0;
  }

  if (stopwatchSeconds == 60) {
    //same with hours
    stopwatchHours++;
    stopwatchMinutes = 0;
  }

  //show values on document
  $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
  $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
  $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
  $("#stopwatch-ms").html(addTrailingZero(stopwatchMiliseconds));
};

//function to start stopwatch
const startStopwatch = () => {
  if (!stopwatchRunning) {
    //if stopwatch not already running
    stopwatchInterval = setInterval(stopwatch, 10);
    stopwatchRunning = true;
  }
};

//function to stop stopwatch
const stopStopwatch = () => {
  clearInterval(StopwatchInterval);
  stopwatchRunning = false;
};

//reset stopwatch function
const resetStopwatch = () => {
  //clear interval and set all values to default
  clearInterval(stopwatchInterval);
  stopwatchHours = 0;
  stopwatchMinutes = 0;
  stopwatchSeconds = 0;
  stopwatchMiliseconds = 0;
  stopwatchRunning = false;
  laps = 0;

  //update values on document to 00
  $("#stopwatch-hour").html("00");
  $("#stopwatch-min").html("00");
  $("#stopwatch-sec").html("00");
  $("#stopwatch-ms").html("00");
  $(".laps").html("");
};

//start stopwatch on start button
$(".start-stopwatch").click(function () {
  startStopwatch();
  //hide start button show lap button
  $(".start-stopwatch").hide();
  $(".lap-stopwatch").show();
});

$(".reset-stopwatch").click(function () {
  resetStopwatch();
  $(".start-stopwatch").show();
  $(".lap-stopwatch").hide();
});

$(".lap-stopwatch").click(function () {
  //on lap button click
  laps++;
  //remove active class
  $(".lap").removeClass("active");

  // Construct the lap element using jQuery
  const lapElement = `
      <div class="lap active">
        <p>lap ${laps}</p>
        <p>
          ${addTrailingZero(stopwatchHours)} : ${addTrailingZero(
    stopwatchMinutes
  )} :
          ${addTrailingZero(stopwatchSeconds)} : ${addTrailingZero(
    stopwatchMiliseconds
  )}
        </p>
      </div>
    `;

  // Prepend the constructed lap element to the laps container
  $(".laps").prepend(lapElement);
});


//Timer
let time = 0,
  timerHours = 0,
  timerMinutes = 0,
  timerSeconds = 0,
  timerMiliseconds = 0,
  timerInterval;

const getTimer = () => {
  time = prompt("Enter time in minutes");
  //convert time into seconds
  time = time * 60;
  //update timer defaults
  setTime();
};

const setTime = () => {
  timerHours = Math.floor(time / 3600);
  timerMinutes = Math.floor((time % 3600) / 60);
  timerSeconds = Math.floor(time % 60);

  //show user entered time on document

  $("#timer-hour").html(addTrailingZero(timerHours));
  $("#timer-min").html(addTrailingZero(timerMinutes));
  $("#timer-sec").html(addTrailingZero(timerSeconds));
  $("#timer-ms").html(addTrailingZero(timerMiliseconds));
};

const timer = () => {
  timerMiliseconds--;
  if (timerMiliseconds == -1) {
    timerMiliseconds = 99;
    timerSeconds--;
  }
  if (timerSeconds == -1) {
    timerSeconds = 59;
    timerMinutes--;
  }
  if (timerMinutes == -1) {
    timerMinutes = 59;
    timerHours--;
  }

  //update time
  $("#timer-hour").html(addTrailingZero(timerHours));
  $("#timer-min").html(addTrailingZero(timerMinutes));
  $("#timer-sec").html(addTrailingZero(timerSeconds));
  $("#timer-ms").html(addTrailingZero(timerMiliseconds));

  //check time up on every interval
  timeUp();
};

const startTimer = () => {
  //before starting check if valid time given
  if (
    (timerHours == 0) & (timerMinutes == 0) &&
    timerSeconds == 0 &&
    timerMiliseconds == 0
  ) {
    //if all values are zero get time
    getTimer();
  } else {
    //start timer
    timerInterval = setInterval(timer, 10);
    $(".start-timer").hide();
    $(".stop-timer").show();
  }
};

const stopTimer = () => {
  clearInterval(timerInterval);
  $(".start-timer").show();
  $(".stop-timer").hide();
};

const resetTimer = () => {
  stopTimer();
  time = 0;
  setTime();
};

function playTimerSound() {
  const audio = document.getElementById("timerSound");
  audio.play();
}

//check if time remaining 0
const timeUp = () => {
  if (
    timerHours == 0 &&
    timerMinutes == 0 &&
    timerSeconds == 0 &&
    timerMiliseconds == 0
  ) {
    stopTimer();
    playTimerSound(); // Play the sound
    // alert("Time's up");
  }
};

$(".start-timer").click(function () {
  startTimer();
});

$(".stop-timer").click(function () {
  stopTimer();
});

$(".reset-timer").click(function () {
  resetTimer();
});

//backgorund change with time
function updateBackground() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  let backgroundImage = "";

  if (hour === 5 && minute >= 0 && minute <= 30) {
    backgroundImage = "Wallpaper/0015.jpg";
  } else if (hour === 5 && minute >= 31 && minute <= 59) {
    backgroundImage = "Wallpaper/0017.jpg";
  } else if (6 <= hour && hour < 7) {
    backgroundImage = "Wallpaper/0018.jpg";
  } else if (7 <= hour && hour < 8) {
    backgroundImage = "Wallpaper/0019.jpg";
  } else if (hour === 8 && minute >= 0 && minute <= 31) {
    backgroundImage = "Wallpaper/0020.jpg";
  } else if (hour === 8 && minute >= 31 && minute <= 45) {
    backgroundImage = "Wallpaper/0021.jpg";
  } else if (hour === 8 && minute >= 46 && minute <= 59) {
    backgroundImage = "Wallpaper/0022.jpg";
  } else if (hour === 9 && minute >= 0 && minute <= 15) {
    backgroundImage = "Wallpaper/0023.jpg";
  } else if (hour === 9 && minute >= 16 && minute <= 30) {
    backgroundImage = "Wallpaper/0024.jpg";
  } else if (hour === 9 && minute >= 31 && minute <= 45) {
    backgroundImage = "Wallpaper/0025.jpg";
  } else if (hour === 9 && minute >= 46 && minute <= 59) {
    backgroundImage = "Wallpaper/0026.jpg";
  } else if (hour === 10 && minute >= 0 && minute <= 15) {
    backgroundImage = "Wallpaper/0027.jpg";
  } else if (hour === 10 && minute >= 16 && minute <= 30) {
    backgroundImage = "Wallpaper/0028.jpg";
  } else if (hour === 10 && minute >= 31 && minute <= 45) {
    backgroundImage = "Wallpaper/0029.jpg";
  } else if (hour === 10 && minute >= 46 && minute <= 59) {
    backgroundImage = "Wallpaper/0030.jpg";
  } else if (hour === 11 && minute >= 0 && minute <= 15) {
    backgroundImage = "Wallpaper/0031.jpg";
  } else if (hour === 11 && minute >= 16 && minute <= 30) {
    backgroundImage = "Wallpaper/0032.jpg";
  } else if (hour === 11 && minute >= 31 && minute <= 45) {
    backgroundImage = "Wallpaper/0033.jpg";
  } else if (hour === 11 && minute >= 46 && minute <= 59) {
    backgroundImage = "Wallpaper/0034.jpg";
  } else if (hour === 12 && minute >= 0 && minute <= 15) {
    backgroundImage = "Wallpaper/0035.jpg";
  } else if (hour === 12 && minute >= 16 && minute <= 30) {
    backgroundImage = "Wallpaper/0036.jpg";
  } else if (hour === 12 && minute >= 31 && minute <= 45) {
    backgroundImage = "Wallpaper/0037.jpg";
  } else if (hour === 12 && minute >= 45 && minute <= 59) {
    backgroundImage = "Wallpaper/0038.jpg";
  } else if (hour === 13 && minute >= 0 && minute <= 30) {
    backgroundImage = "Wallpaper/0039.jpg";
  } else if (hour === 13 && minute >= 31 && minute <= 59) {
    backgroundImage = "Wallpaper/0040.jpg";
  } else if (hour === 14 && minute >= 0 && minute <= 30) {
    backgroundImage = "Wallpaper/0041.jpg";
  } else if (hour === 14 && minute >= 31 && minute <= 59) {
    backgroundImage = "Wallpaper/0042.jpg";
  } else if (hour === 15 && minute >= 0 && minute <= 30) {
    backgroundImage = "Wallpaper/0043.jpg";
  } else if (hour === 15 && minute >= 31 && minute <= 59) {
    backgroundImage = "Wallpaper/0044.jpg";
  } else if (hour === 15 && minute >= 31 && minute <= 59) {
    backgroundImage = "Wallpaper/0045.jpg";
  } else if (hour === 16 && minute >= 0 && minute <= 30) {
    backgroundImage = "Wallpaper/0046.jpg";
  } else if (hour === 16 && minute >= 31 && minute <= 59) {
    backgroundImage = "Wallpaper/0047.jpg";
  } else if (hour === 17 && minute >= 0 && minute <= 30) {
    backgroundImage = "Wallpaper/0048.jpg";
  } else if (hour === 17 && minute >= 31 && minute <= 59) {
    backgroundImage = "Wallpaper/0049.jpg";
  } else if (hour === 18 && minute >= 0 && minute <= 30) {
    backgroundImage = "Wallpaper/0050.jpg";
  } else if (hour === 18 && minute >= 31 && minute <= 59) {
    backgroundImage = "Wallpaper/0051.jpg";
  } else if (hour === 19 && minute >= 0 && minute <= 30) {
    backgroundImage = "Wallpaper/0052.jpg";
  } else if (hour === 19 && minute >= 31 && minute <= 59) {
    backgroundImage = "Wallpaper/0053.jpg";
  } else if (hour === 20 && minute >= 0 && minute <= 30) {
    backgroundImage = "Wallpaper/0054.jpg";
  } else if (hour === 20 && minute >= 31 && minute <= 59) {
    backgroundImage = "Wallpaper/0054.jpg";
  } else if (hour === 21 && minute >= 0 && minute <= 30) {
    backgroundImage = "Wallpaper/0054.jpg";
  } else if (hour === 21 && minute >= 31 && minute <= 59) {
    backgroundImage = "Wallpaper/0054.jpg";
  } else if (hour === 22 && minute >= 0 && minute <= 30) {
    backgroundImage = "Wallpaper/0054.jpg";
  } else if (hour === 22 && minute >= 31 && minute <= 59) {
    backgroundImage = "Wallpaper/0054.jpg";
  } else if (hour === 23 && minute >= 0 && minute <= 30) {
    backgroundImage = "Wallpaper/0054.jpg";
  } else if (hour === 23 && minute >= 31 && minute <= 59) {
    backgroundImage = "Wallpaper/0054.jpg";
  } else {
    backgroundImage = "Wallpaper/0062.jpg";
  }

  document.body.style.backgroundImage = `url(${backgroundImage})`;
}

updateBackground();
setInterval(updateBackground, 60000); // Update every minute

//analog
const secondHand = document.getElementById("second-hand");
const minuteHand = document.getElementById("minute-hand");
const hourHand = document.getElementById("hour-hand");

function clockTick() {
  const date = new Date();
  const seconds = date.getSeconds() / 60;
  const minutes = (seconds + date.getMinutes()) / 60;
  const hours = (minutes + date.getHours()) / 12;

  rotateClockHand(secondHand, seconds);
  rotateClockHand(minuteHand, minutes);
  rotateClockHand(hourHand, hours);
}

function rotateClockHand(element, rotation) {
  element.style.setProperty("--rotate", rotation * 360);
}

setInterval(clockTick, 1000);