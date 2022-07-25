const g = selector => {
  return document.querySelector(selector)
}

const gs = selector => {
  return document.querySelectorAll(selector)
}

const time = g('#time')
const days = g('#days')

const now = new Date(2022, 8, 1)
const year = now.getFullYear()
const month = now.getMonth() + 1

time.textContent = `${year}年${month}月`

const firstDayOfCurrentMonth = new Date(year, month - 1, 1)
const weekdayOfFirstDayOfCurrentMonth = firstDayOfCurrentMonth.getDay()
const lastDayOfCurrentMonth = new Date(new Date(year, month - 1 + 1, 1) - 86400 * 1000)

const daysOfCurrentMonth = lastDayOfCurrentMonth.getDate()

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

console.log(lastDayOfCurrentMonth.getDay())

for (let i = lastDayOfCurrentMonth.getDay() + 1; i <= 7; i++) {
  const li = document.createElement('li')
  li.textContent = (i - lastDayOfCurrentMonth.getDay()).toString()
  days.append(li)
}