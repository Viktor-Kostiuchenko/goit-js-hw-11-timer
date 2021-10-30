import { CountdownTimer } from './countdownTimer'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

class CountdownPicker extends CountdownTimer {
  constructor({ selector, targetDate, options }) {
    super({ selector, targetDate })
    this.dataEl = document.getElementById('datetime-picker')
    this.startBtnEl = document.querySelector('[data-start]')
    this.clearBtnEl = document.querySelector('[data-clear]')
    this.options = options
  }
   
  disableElements(...args) {
    args.forEach(el => el.setAttribute('disabled', 'disabled'))
  }

  enableElements(...args) {
    args.forEach(el => el.removeAttribute('disabled', 'disabled'))
  }
  
  dataset() {
    flatpickr(this.dataEl, this.options)
  }

  startTimer() {
    super.startInterval()
    this.enableElements(this.clearBtnEl)
    this.disableElements(this.startBtnEl, document.querySelector('.flatpickr-mobile') )
  }

  stopTimer() {
    super.clearInterval()
    this.enableElements(this.startBtnEl, document.querySelector('.flatpickr-mobile') )
    this.disableElements(this.clearBtnEl)
  }
  
  activateTimer() {
    this.startBtnEl.addEventListener('click', () => this.startTimer())
    this.clearBtnEl.addEventListener('click', () => this.stopTimer())
    this.dataset()
  }
}
const timer = new CountdownPicker({
  selector: '#timer-1',
  options: {
      enableTime: true,
      time_24hr: true,
      defaultDate: Date.now(),
      minuteIncrement: 1,
      onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      timer.startBtnEl.setAttribute('disabled', 'disabled')
      Notify.failure('Please choose a date in the future');
    } else {
      timer.startBtnEl.removeAttribute('disabled')
      timer.date = selectedDates[0]
    }
    timer.clearBtnEl.setAttribute('disabled', 'disabled')
  }
  }
})

timer.activateTimer()