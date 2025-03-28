document.getElementById("signupBtn").addEventListener("click", async () => {
  event.preventDefault();  // 폼 제출을 막고 비동기 요청만 처리하도록 함
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://127.0.0.1:8000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const result = await response.json();
    
    if (response.ok) {
      alert(result.message); // 회원가입 성공 메시지 출력
      window.location.href = "/login.html"; // 로그인 화면으로 이동
    } else {
      alert("회원가입 실패: " + result.detail);
    }
  } catch (error) {
    console.error("회원가입 요청 실패:", error);
  }
});