let currentTime = new Date(2022, 4, 1)

render(currentTime)

g('#prevMonth').onclick = () => {
  render(new Date(currentTime - 86400 * 1000 * 30))
}

g('#nextMonth').onclick = () => {
  render(new Date(currentTime - 0 + 86400 * 1000 * 30))
}

g('#today').onclick = () => {
  render(new Date())
}

function render(time) {
  const year = time.getFullYear()
  const month = time.getMonth() + 1

  initialTime()
  generateDays(year, month)
  currentTime = time

  function initialTime() {
    const time = g('#time')
    time.textContent = `${year}年${month}月`
  }

  function generateDays(year, month) {
    const days = g('#days')
    const firstDayOfCurrentMonth = new Date(year, month - 1, 1)
    let weekdayOfFirstDayOfCurrentMonth = firstDayOfCurrentMonth.getDay()
    const lastDayOfCurrentMonth = new Date(new Date(year, month - 1 + 1, 1) - 86400 * 1000)

    const daysOfCurrentMonth = lastDayOfCurrentMonth.getDate()

    days.innerHTML = ''

    if (weekdayOfFirstDayOfCurrentMonth === 0) {
      weekdayOfFirstDayOfCurrentMonth = 7
    }
    
    for (let i = 1; i < weekdayOfFirstDayOfCurrentMonth; i++) {
      const li = document.createElement('li')
      const d = new Date(firstDayOfCurrentMonth - 86400 * 1000 * i)
      li.textContent = d.getDate().toString()
      days.prepend(li)
    }

    for (let i = 1; i <= daysOfCurrentMonth; i++) {
      const li = document.createElement('li')
      li.textContent = i.toString()
      days.append(li)
    }
    for (let i = lastDayOfCurrentMonth.getDay() + 1; i <= 7; i++) {
      if (i === 1) {
        return
      }
      const li = document.createElement('li')
      li.textContent = (i - lastDayOfCurrentMonth.getDay()).toString()
      days.append(li)
    }
  }
}

function g(selector) {
  return document.querySelector(selector)
}

function gs(selector) {
  return document.querySelectorAll(selector)
}
