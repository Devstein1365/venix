// auth.js - Handles authentication and dashboard logic

document.addEventListener("DOMContentLoaded", function () {
  // Registration
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];
      if (
        users.find((user) => user.username === username || user.email === email)
      ) {
        alert("Username or email already exists");
        return;
      }

      users.push({
        email,
        firstName,
        lastName,
        username,
        password,
        points: 0,
        rank: users.length + 1,
        tournaments: 0,
      });
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", username);

      alert("Successfully registered!");
      window.location.href = "login.html";
    });
  }

  // Login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailOrUsername = document.getElementById("emailOrUsername").value;
      const password = document.getElementById("password").value;

      let users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) =>
          (u.username === emailOrUsername || u.email === emailOrUsername) &&
          u.password === password
      );

      if (user) {
        localStorage.setItem("currentUser", user.username);
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid credentials");
      }
    });
  }

  // Forgot Password
  const forgotForm = document.getElementById("forgotForm");
  if (forgotForm) {
    forgotForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const newPassword = document.getElementById("newPassword").value;
      const confirmNewPassword =
        document.getElementById("confirmNewPassword").value;

      if (newPassword !== confirmNewPassword) {
        alert("Passwords do not match");
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = users.findIndex((u) => u.email === email);
      if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));
        alert("Password reset successfully!");
        window.location.href = "login.html";
      } else {
        alert("Email not found");
      }
    });
  }

  // Dashboard
  if (window.location.pathname.includes("dashboard.html")) {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      window.location.href = "login.html";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.username === currentUser);

    if (user) {
      document.getElementById(
        "welcomeMessage"
      ).textContent = `Welcome back, ${user.firstName}!`;
      document.getElementById("userName").textContent = user.firstName;
      document.getElementById("totalPoints").textContent = user.points;
      document.getElementById("rank").textContent = `#${user.rank}`;
      document.getElementById("tournaments").textContent = user.tournaments;
    }

    // Logout
    document.getElementById("logout").addEventListener("click", function () {
      localStorage.removeItem("currentUser");
      window.location.href = "index.html";
    });

    // Mock countdown for next match
    function updateCountdown() {
      const now = new Date();
      const matchTime = new Date("2025-10-01T15:00:00");
      const diff = matchTime - now;
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById("countdown").textContent = `${hours
          .toString()
          .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
      } else {
        document.getElementById("countdown").textContent = "Match Started";
      }
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();
  }
});
