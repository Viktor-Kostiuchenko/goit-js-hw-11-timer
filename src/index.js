import './css/styles.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  dataEl: document.getElementById('datetime-picker'),
  flatpickrEl: document.querySelectorAll('input'),
  startBtnEl: document.querySelector('[data-start]'),
  clearBtnEl: document.querySelector('[data-clear]'),
}

const { dataEl, startBtnEl, clearBtnEl, flatpickrEl } = refs
console.log(flatpickrEl)

class CountdownTimer {
  constructor({ selector, targetDate, onTick }) {
    this.intervalId = null
    this.selector = selector
    this.targetDate = targetDate
    this.daysEl = document.querySelector('[data-value="days"]')
    this.hoursEl = document.querySelector('[data-value="hours"]')
    this.minsEl = document.querySelector('[data-value="mins"]')
    this.secsEl = document.querySelector('[data-value="secs"]')
  }

  startInterval() {
    this.selector = setInterval(() => {
      const currentTime = Date.now()
      const deltaTime = this.targetDate - currentTime
      const countDown = this.getTimeComponents(deltaTime)
      this.updateClockFace(countDown)
    }, 1000)
  }

  clearInterval() {
    clearInterval(this.selector)

    this.updateClockFace({days: '00', hours: '00', mins: '00', secs: '00'})
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    
    return { days, hours, mins, secs }
  }

  pad(value) {
    return String(value).padStart(2, '0')
  }

  updateClockFace({ days, hours, mins, secs }) {
    this.daysEl.textContent = days
    this.hoursEl.textContent = hours
    this.minsEl.textContent = mins
    this.secsEl.textContent = secs
  }

  get date() {
    return this.targetDate
  }

  set date(newDate) {
    return this.targetDate = newDate
  }

}

const timer = new CountdownTimer({
  selector: '#timer-1',
});


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      startBtnEl.setAttribute('disabled', 'disabled')
      Notify.failure('Please choose a date in the future');
    } else {
      startBtnEl.removeAttribute('disabled')
      timer.date = selectedDates[0]
    }
    clearBtnEl.setAttribute('disabled', 'disabled')

  },
};
    
flatpickr(dataEl, options)

function startTimer() {
  timer.startInterval()
  disableElement(startBtnEl)
  enableElement(clearBtnEl)
}

function stopTimer() {
  timer.clearInterval()
  enableElement(startBtnEl)
  disableElement(clearBtnEl)
}

function disableElement(el) {
  el.setAttribute('disabled', 'disabled')
}

function enableElement(el) {
  el.removeAttribute('disabled')
}

startBtnEl.addEventListener('click', startTimer)
clearBtnEl.addEventListener('click', stopTimer)




