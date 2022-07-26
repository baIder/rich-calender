let currentTime = new Date()

render(currentTime)

g('#prevMonth').onclick = () => {
  const firstDayOfCurrentMonth = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1)
  render(new Date(firstDayOfCurrentMonth - 86400 * 1000))
}

g('#nextMonth').onclick = () => {
  const firstDayOfNextMonth = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 1)
  render(firstDayOfNextMonth)
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
      li.classList.add('calender-days-disabled')
      days.prepend(li)
    }

    const now = new Date()
    let selectedLi

    days.addEventListener('click', (e) => {
      if (selectedLi) {
        selectedLi.classList.remove('calender-days-selected')
      }
      e.target.classList.add('calender-days-selected')
      selectedLi = e.target
      if (e.target.classList.contains('calender-days-hasEvents')) {
        const key = `${year}-${month}-${e.target.textContent}`
        const events = window.data[key]
        const eventFragment = document.createDocumentFragment()
        events.map(event => {
          const div = document.createElement('div')
          div.classList.add('events-item')
          div.textContent = event
          eventFragment.append(div)
        })
        g('#events').innerHTML = ""
        g('#events').append(eventFragment)
      } else {
        g('#events').innerHTML = "<div>无</div>"
      }
    })

    for (let i = 1; i <= daysOfCurrentMonth; i++) {
      const li = document.createElement('li')
      li.textContent = i.toString()
      if (i === now.getDate() && month === now.getMonth() + 1 && year === now.getFullYear()) {
        li.classList.add("calender-days-today")
      }
      const key = `${year}-${month}-${i}`
      const events = window.data[key]
      if (events) {
        li.classList.add('calender-days-hasEvents')
      }
      days.append(li)
    }

    for (let i = lastDayOfCurrentMonth.getDay() + 1; i <= 7; i++) {
      if (i === 1) {
        return
      }
      const li = document.createElement('li')
      li.textContent = (i - lastDayOfCurrentMonth.getDay()).toString()
      li.classList.add('calender-days-disabled')
      days.append(li)
    }
  }
}

function g(selector) {
  return document.querySelector(selector)
}

