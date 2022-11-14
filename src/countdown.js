var timer; 
var timeLeft = 10; // seconds

function stopTimer() {
  cancelInterval(timer);
}

function updateTimer() {
  timeLeft = timeLeft - 1;
  if(timeLeft >= 0)
    $('#timer').html(timeLeft);
  else {
    stopTimer();
  }
}

function start() {
  timer = setInterval(updateTimer, 1000);
  updateTimer();
}