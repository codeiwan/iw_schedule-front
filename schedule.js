async function fetchSchedules() {
  const response = await fetch("http://127.0.0.1:8000/api/schedules");
  const data = await response.json();
  const scheduleList = document.getElementById("scheduleList");
  scheduleList.innerHTML = "";

  data.schedules.forEach(schedule => {
    const li = document.createElement("li");
    li.textContent = schedule.title;
    scheduleList.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  const monthYear = document.getElementById("month-year");
  const calendarDays = document.getElementById("calendar-days");

  const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

  function showCalendar(month, year) {
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = 32 - new Date(year, month, 32).getDate();

    calendarDays.innerHTML = "";

    monthYear.textContent = `${year}년 ${months[month]}`;

    let date = 1;
    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          const cell = document.createElement("td");
          const cellText = document.createTextNode("");
          cell.appendChild(cellText);
          row.appendChild(cell);
        } else if (date > daysInMonth) {
          break;
        } else {
          const cell = document.createElement("td");
          const cellText = document.createTextNode(date);
          if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
            cell.classList.add("bg-warning");
          }
          cell.appendChild(cellText);
          row.appendChild(cell);
          date++;
        }
      }

      calendarDays.appendChild(row);
    }
  }

  document.getElementById("prev-month").addEventListener("click", function() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
  });

  document.getElementById("next-month").addEventListener("click", function() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
  });

  showCalendar(currentMonth, currentYear);
});