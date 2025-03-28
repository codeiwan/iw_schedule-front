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
  