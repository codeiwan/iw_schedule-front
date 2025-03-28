document.getElementById("fetchData").addEventListener("click", async () => {
  try {
    let response = await fetch("http://127.0.0.1:8000/test"); // 백엔드 API 호출
    let data = await response.json(); // JSON 변환
    document.getElementById("result").innerText = data.message; // 화면에 출력
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("result").innerText = "연결 실패!";
  }
});

// Firebase 연결 확인 API 호출
document.addEventListener("DOMContentLoaded", function () {
  const checkFirebaseButton = document.getElementById("checkFirebase");

  checkFirebaseButton.addEventListener("click", async function () {
      try {
          const response = await fetch("http://127.0.0.1:8000/firebase-test");
          const data = await response.json();
          alert(data.message || data.error);
      } catch (error) {
          alert("API 요청 실패: " + error);
      }
  });
});

// 시작하기 버튼 클릭 시 login.html로 리디렉션
document.getElementById("startBtn").addEventListener("click", function() {
  window.location.href = "login.html";
});