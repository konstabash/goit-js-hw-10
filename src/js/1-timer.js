import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    inputField: document.querySelector("input#datetime-picker"),
    startButton: document.querySelector(".start-button"),
    clockFace: document.querySelector("div.timer"),
    clockDays: document.querySelector('[data-days]'),
    clockHours: document.querySelector('[data-hours]'),
    clockMinutes: document.querySelector('[data-minutes]'),
    clockSeconds: document.querySelector('[data-seconds]'),
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    position: "below",
    onClose(selectedDates) {
        if (selectedDates[0] <= new Date()) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future'
            });
            refs.startButton.classList.remove("is-active");
            return;
        };
        timer.userSelectedDate = selectedDates[0];
        refs.startButton.classList.add("is-active");
        refs.startButton.disabled = false;
        refs.startButton.addEventListener("click", handleStartButtonClick);
    },
};


const timer = {
    userSelectedDate: null,
    intervalId: null,
    startCounting() {
        refs.startButton.classList.remove("is-active");
        refs.inputField.disabled = true;
        refs.startButton.disabled = true;
        refs.startButton.removeEventListener("click", handleStartButtonClick);
        this.intervalId = setInterval(() => {
    this.tick();
}, 1000);
    },

    tick() {
        const currentTime = Date.now();
        const ms = this.userSelectedDate - currentTime;
        if (ms <= 0) {
            clearInterval(this.intervalId);
            this.userSelectedDate = null;
            refs.inputField.disabled = false;
            refs.startButton.disabled = false;
            iziToast.info({
    message: 'Ring-ring!'
});
            return;
        };
        const clockDetails = this.convertMs(ms);
        const finalClock = addLeadingZero(clockDetails);
        refs.clockDays.textContent = finalClock.days;
        refs.clockHours.textContent = finalClock.hours;
        refs.clockMinutes.textContent = finalClock.minutes;
        refs.clockSeconds.textContent = finalClock.seconds;
    },

    convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
},

};

function addLeadingZero({ days, hours, minutes, seconds }) {
        const dayNumber = days.toString().length < 2 ? 2 : days.toString().length;
    days = days.toString().padStart(dayNumber, "0");
    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");

    return { days, hours, minutes, seconds };
};

function handleStartButtonClick() {
    timer.startCounting();
}


flatpickr(refs.inputField, options);