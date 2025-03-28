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

let isRecording = false;

function toggleRecordingButton() {
  const startButton = document.querySelector("button[onclick='startRecording()']");
  if (isRecording) {
    startButton.textContent = '녹음 취소';
    startButton.onclick = cancelRecording;
  } else {
    startButton.textContent = '녹음 시작';
    startButton.onclick = startRecording;
  }
}

async function cancelRecording() {
  console.log('Cancel recording triggered');
  try {
    const response = await fetch('http://localhost:8000/cancel_record', {
      method: 'POST'
    });
    console.log('Cancel recording response:', response);
    const data = await response.json();
    alert(data.message);
    isRecording = false;
    toggleRecordingButton();
    document.getElementById('startBtn').style.display = 'inline';
    document.getElementById('cancelBtn').style.display = 'none';
    document.getElementById('stopBtn').style.display = 'none';
  } catch (error) {
    console.error('녹음 취소 오류:', error);
    alert('녹음 취소 오류: ' + error.message);
  }
}

async function startRecording() {
  console.log('Start recording triggered');
  try {
    const response = await fetch('http://localhost:8000/start_record', {
      method: 'POST'
    });
    console.log('Start recording response:', response);
    const data = await response.json();
    alert(data.message);
    isRecording = true;
    toggleRecordingButton();
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('cancelBtn').style.display = 'inline';
    document.getElementById('stopBtn').style.display = 'inline';
  } catch (error) {
    console.error('녹음 시작 오류:', error);
    alert('녹음 시작 오류: ' + error.message);
  }
}

async function stopRecording() {
  console.log('Stop recording triggered');
  try {
    const response = await fetch('http://localhost:8000/stop_record', {
      method: 'POST'
    });
    console.log('Stop recording response:', response);
    const data = await response.json();
    alert(data.message);
    isRecording = false;
    toggleRecordingButton();
    document.getElementById('startBtn').style.display = 'inline';
    document.getElementById('cancelBtn').style.display = 'none';
    document.getElementById('stopBtn').style.display = 'none';
  } catch (error) {
    console.error('녹음 종료 오류:', error);
    alert('녹음 종료 오류: ' + error.message);
  }
}

function showRecordingModal() {
  const overlay = document.createElement('div');
  overlay.classList.add('modal-overlay');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.zIndex = '999';
  document.body.appendChild(overlay);

  const recordingModal = document.createElement('div');
  recordingModal.classList.add('recording-modal');
  recordingModal.style.position = 'fixed';
  recordingModal.style.top = '50%';
  recordingModal.style.left = '50%';
  recordingModal.style.transform = 'translate(-50%, -50%)';
  recordingModal.style.backgroundColor = 'white';
  recordingModal.style.padding = '20px';
  recordingModal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
  recordingModal.style.zIndex = '1000';
  recordingModal.innerHTML = `
    <button onclick="closeRecordingModal()" style="position: absolute; top: 5px; right: 5px;">&times;</button>
    <h3>녹음</h3>
    <button id="startBtn" onclick="startRecording()">녹음 시작</button>
    <button id="cancelBtn" onclick="cancelRecording()" style="display: none;">녹음 취소</button>
    <button id="stopBtn" onclick="stopRecording()" style="display: none;">녹음 종료</button>
  `;
  document.body.appendChild(recordingModal);
}

async function closeRecordingModal() {
  if (isRecording) {
    await cancelRecording();  // 녹음 중이면 취소
  }
  const modal = document.querySelector('.recording-modal');
  const overlay = document.querySelector('.modal-overlay');
  if (modal) {
    document.body.removeChild(modal);
  }
  if (overlay) {
    document.body.removeChild(overlay);
  }
}