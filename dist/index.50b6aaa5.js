let currentTime = new Date();
render(currentTime);
g("#prevMonth").onclick = ()=>{
    const firstDayOfCurrentMonth = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1);
    render(new Date(firstDayOfCurrentMonth - 86400000));
};
g("#nextMonth").onclick = ()=>{
    const firstDayOfNextMonth = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 1);
    render(firstDayOfNextMonth);
};
g("#today").onclick = ()=>{
    render(new Date());
};
function render(time1) {
    const year1 = time1.getFullYear();
    const month1 = time1.getMonth() + 1;
    initialTime();
    generateDays(year1, month1);
    currentTime = time1;
    function initialTime() {
        const time = g("#time");
        time.textContent = `${year1}年${month1}月`;
    }
    function generateDays(year, month) {
        const days = g("#days");
        const firstDayOfCurrentMonth = new Date(year, month - 1, 1);
        let weekdayOfFirstDayOfCurrentMonth = firstDayOfCurrentMonth.getDay();
        const lastDayOfCurrentMonth = new Date(new Date(year, month - 1 + 1, 1) - 86400000);
        const daysOfCurrentMonth = lastDayOfCurrentMonth.getDate();
        days.innerHTML = "";
        const fragment = document.createDocumentFragment();
        const now = new Date();
        let selectedLi;
        days.addEventListener("click", (e)=>{
            if (selectedLi) selectedLi.classList.remove("calender-days-selected");
            e.target.classList.add("calender-days-selected");
            selectedLi = e.target;
            if (e.target.classList.contains("calender-days-hasEvents")) {
                const key = `${year}-${month}-${e.target.textContent}`;
                const events = window.data[key];
                const eventFragment = document.createDocumentFragment();
                events.map((event)=>{
                    const div = document.createElement("div");
                    div.classList.add("events-item");
                    div.textContent = event;
                    eventFragment.append(div);
                });
                g("#events").innerHTML = "";
                g("#events").append(eventFragment);
            } else g("#events").innerHTML = "<div>\u65E0</div>";
        });
        if (weekdayOfFirstDayOfCurrentMonth === 0) weekdayOfFirstDayOfCurrentMonth = 7;
        for(let i = 1; i < weekdayOfFirstDayOfCurrentMonth; i++){
            const li = document.createElement("li");
            const d = new Date(firstDayOfCurrentMonth - 86400000 * i);
            li.textContent = d.getDate().toString();
            li.classList.add("calender-days-disabled");
            fragment.prepend(li);
        }
        for(let i1 = 1; i1 <= daysOfCurrentMonth; i1++){
            const li = document.createElement("li");
            li.textContent = i1.toString();
            if (i1 === now.getDate() && month === now.getMonth() + 1 && year === now.getFullYear()) li.classList.add("calender-days-today");
            const key = `${year}-${month}-${i1}`;
            const events = window.data[key];
            if (events) li.classList.add("calender-days-hasEvents");
            fragment.append(li);
        }
        for(let i2 = lastDayOfCurrentMonth.getDay() + 1; i2 <= 7; i2++){
            if (i2 === 1) break;
            const li = document.createElement("li");
            li.textContent = (i2 - lastDayOfCurrentMonth.getDay()).toString();
            li.classList.add("calender-days-disabled");
            fragment.append(li);
        }
        days.append(fragment);
    }
}
function g(selector) {
    return document.querySelector(selector);
}

//# sourceMappingURL=index.50b6aaa5.js.map
