document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");
  
    if (loginBtn) {
      loginBtn.addEventListener("click", async () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
  
        try {
          const response = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
  
          const result = await response.json();
  
          if (response.ok) {
            alert(result.message); // 로그인 성공 메시지 출력
            window.location.href = "/schedule.html"; // 일정 관리 페이지로 이동
          } else {
            alert("로그인 실패: " + result.detail);
          }
        } catch (error) {
          console.error("로그인 요청 실패:", error);
        }
      });
    }
  });