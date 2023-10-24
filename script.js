let second = 1000,
minute = second * 60,
hour = minute * 60,
day = hour * 24;
let finalTime = "Nov 12, 2023 00:00:00"

let countdown = new Date(finalTime).getTime();

setInterval( () => {
  let now = new Date().getTime();

  let distance = countdown - now;

  document.getElementById(`days`).innerText = Math.
    floor(distance / day);

  document.getElementById('hours').innerText = Math.
    floor((distance % day) / hour);

  document.getElementById(`minutes`).innerText = Math.
    floor((distance % hour) / minute);

  document.getElementById(`seconds`).innerText = Math.
    floor((distance % minute) / second);


})
const toggleButton = document.getElementsByClassName(`toggle-button`)[0]
const navbarLinks = document.getElementsByClassName(`navbar-links`)[0]

toggleButton.addEventListener(`click`,() => {
  navbarLinks.classList.toggle(`active`)
})

 



