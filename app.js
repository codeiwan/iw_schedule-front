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