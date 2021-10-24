import { CountdownTimer } from './timer'
import { refs } from './refs'
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const { dataEl, startBtnEl, clearBtnEl, flatpickrEl } = refs

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
  }
}
    
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