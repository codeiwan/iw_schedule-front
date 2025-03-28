document.addEventListener("DOMContentLoaded", () => {
  let isRecording = false;  // 현재 녹음 상태
  const startBtn = document.querySelector("button[onclick='startRecording()']");
  const stopBtn = document.querySelector("button[onclick='stopRecording()']");

  // 녹음 시작
  startBtn.addEventListener('click', async () => {
    if (!isRecording) {
      try {
        const response = await fetch('http://127.0.0.1:8000/start_record', {
          method: 'POST',
        });

        if (response.ok) {
          alert('녹음이 시작되었습니다.');
          isRecording = true;
        } else {
          alert('녹음 시작 실패');
        }
      } catch (error) {
        console.error("녹음 시작 실패:", error);
        alert('녹음 시작 중 오류가 발생했습니다.');
      }
    }
  });

  // 녹음 종료
  stopBtn.addEventListener('click', async () => {
    if (isRecording) {
      try {
        const response = await fetch('http://127.0.0.1:8000/stop_record', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: "output_audio.wav" })
        });

        if (response.ok) {
          alert('녹음이 종료되었습니다.');
          isRecording = false;
        } else {
          alert('녹음 종료 실패');
        }
      } catch (error) {
        console.error("녹음 종료 실패:", error);
        alert('녹음 종료 중 오류가 발생했습니다.');
      }
    }
  });
});
