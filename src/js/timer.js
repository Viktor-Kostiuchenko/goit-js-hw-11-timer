export class CountdownTimer {
  constructor({ selector, targetDate }) {
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

      if (deltaTime < 0) {
        this.clearInterval()
      }
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