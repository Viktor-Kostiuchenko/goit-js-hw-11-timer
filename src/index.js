import './css/styles.css';

const refs = {
  timerEl: document.querySelector('#timer-1'),
  daysEl: document.querySelector('[data-value="days"]'),
  hoursEl: document.querySelector('[data-value="hours"]'),
  minsEl: document.querySelector('[data-value="mins"]'),
  secsEl: document.querySelector('[data-value="secs"]'),
}

const {timerEl, daysEl, hoursEl, minsEl, secsEl } = refs

class CountdownTimer {
  constructor({ selector, targetDate, onTick }) {
    this.intervalId = null
    this.selector = selector
    this.targetDate = targetDate
    this.onTick = onTick
    
    this.init()
  }

  init() {
    const formatedTime = this.getTimeComponents(0)
    this.onTick(formatedTime)
  }

  startInterval() {
    this.selector = setInterval(() => {
      console.log()
      const currentTime = Date.now()
      const deltaTime = this.targetDate - currentTime
      const time = this.getTimeComponents(deltaTime)
      this.onTick(time)
  }, 1000)
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    
    return { days, hours, mins, secs}
  }

  pad(value) {
    return String(value).padStart(2, '0')
  }
}


const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Nov 08, 2021'),
  onTick: updateClockFace,
});

function updateClockFace({ days, hours, mins, secs }) {
  //  console.log(secs)
    daysEl.textContent = `${days}`
    hoursEl.textContent = hours
    minsEl.textContent = mins
    secsEl.textContent = `${secs}`
   
  }

timer.startInterval()


