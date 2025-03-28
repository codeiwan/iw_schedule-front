// login.js (프론트엔드)

document.getElementById("loginBtn").addEventListener("click", async (event) => {
  event.preventDefault();  // 기본 폼 제출을 막고, Ajax 방식으로 요청을 보냄

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const result = await response.json();
    
    if (response.ok) {
      alert("로그인 성공");
      localStorage.setItem("id_token", result.id_token); // 로그인 성공 시 토큰 저장
      window.location.href = "/schedule.html"; // 일정 페이지로 이동
    } else {
      alert("로그인 실패: " + result.detail);
    }
  } catch (error) {
    console.error("로그인 요청 실패:", error);
  }
});
