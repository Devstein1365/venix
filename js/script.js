/**
 * Turnaj Platform Main JavaScript
 * Contains all non-auth related functionality for the website
 */

// DOM Elements
const hamburgerMenu = document.querySelector(".hamburger-menu");
const mobileNav = document.querySelector(".mobile-nav");
const mobileNavOverlay = document.querySelector(".mobile-nav-overlay");
const dropdownItems = document.querySelectorAll(".dropdown-toggle");
const tabButtons = document.querySelectorAll(".tab-btn");
const countdownElements = document.querySelectorAll("#countdown, .countdown");
const joinTournamentBtn = document.getElementById("joinTournament");
const inviteFriendsBtn = document.getElementById("inviteFriends");
const settingsForm = document.getElementById("settingsForm");
const profileMenu = document.querySelector(".profile");
const settingsBtn = document.getElementById("settings");
const logoutBtn = document.getElementById("logout");
const mobileLogoutBtn = document.getElementById("mobileLogout");
const mobileSettingsBtn = document.getElementById("mobileSettings");



//profile dropdown menu
profileMenu.addEventListener('click', ()=> {
  document.querySelector(".dropdown").classList.toggle("active")
})

/**
 * Handle logout
 */
function initLogout() {
  [logoutBtn, mobileLogoutBtn].forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
      });
    }
  });

  if (mobileSettingsBtn) {
    mobileSettingsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "settings.html";
    });
  }
}

/**
 * Toggle mobile navigation menu
 */
function toggleMobileNav() {
  hamburgerMenu.classList.toggle("active");
  mobileNav.classList.toggle("active");
  mobileNavOverlay.classList.toggle("active");

  // Prevent scrolling when menu is open
  if (mobileNav.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

/**
 * Initialize countdown timers
 */
function initCountdowns() {
  countdownElements.forEach((countdownEl) => {
    if (!countdownEl) return;

    // Get the countdown date from data attribute or set a default
    let countdownTime = countdownEl.dataset.countdown;

    if (!countdownTime) {
      // Default to 24 hours from now if no data attribute
      const defaultTime = new Date();
      defaultTime.setHours(defaultTime.getHours() + 24);
      countdownTime = defaultTime.toISOString();
      countdownEl.dataset.countdown = countdownTime;
    }

    updateCountdown(countdownEl, countdownTime);

    // Update every second
    setInterval(() => {
      updateCountdown(countdownEl, countdownTime);
    }, 1000);
  });
}

/**
 * Update countdown timer display
 */
function updateCountdown(element, targetDate) {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const timeLeft = target - now;

  if (timeLeft <= 0) {
    element.innerHTML = "Time's up!";
    return;
  }

  // Calculate time components
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Format the countdown display
  if (days > 0) {
    element.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  } else {
    element.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
  }
}

/**
 * Handle tab switching
 */
function initTabs() {
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all tab buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Switch tab content
      const tabId = button.dataset.tab;
      if (tabId) {
        // Hide all tab contents
        document
          .querySelectorAll(".matches-list")
          .forEach((list) => list.classList.remove("active"));
        // Show the selected tab content
        const activeList = document.getElementById(tabId + "-matches");
        if (activeList) {
          activeList.classList.add("active");
        }
      }
    });
  });
}

/**
 * Set up notification actions
 */
function initNotifications() {
  const notificationBell = document.querySelector(".notifications .bell");
  if (!notificationBell) return;

  notificationBell.addEventListener("click", () => {
    // Here you would implement notification popup logic
    console.log("Notifications clicked");
  });
}

/**
 * Handle predict button clicks
 */
function initPredictButtons() {
  const predictButtons = document.querySelectorAll(".predict-btn");

  predictButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const matchCard = e.target.closest(".match-card");
      const teams = matchCard.querySelector(".teams");

      // Get team names
      const teamNames = Array.from(
        matchCard.querySelectorAll(".team-name")
      ).map((team) => team.textContent);

      // Show prediction modal or form (to be implemented)
      showPredictionForm(teamNames[0], teamNames[1]);
    });
  });
}

/**
 * Display prediction form for selected match
 */
function showPredictionForm(team1, team2) {
  // This would be implemented with a modal
  console.log(`Make prediction for ${team1} vs ${team2}`);
  alert(`Coming soon: Make your prediction for ${team1} vs ${team2}`);
}

/**
 * Handle newsletter form submission
 */
function initNewsletterForm() {
  const newsletterForm = document.querySelector(".newsletter-form");
  if (!newsletterForm) return;

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');

    if (emailInput.value.trim() && isValidEmail(emailInput.value)) {
      // Save to localStorage for demo purposes
      const subscribers = JSON.parse(
        localStorage.getItem("subscribers") || "[]"
      );
      subscribers.push({
        email: emailInput.value,
        date: new Date().toISOString(),
      });
      localStorage.setItem("subscribers", JSON.stringify(subscribers));

      // Show success message with custom toast
      showToast("Thanks for subscribing to our newsletter!", "success");
      emailInput.value = "";
    } else {
      showToast("Please enter a valid email address", "error");
    }
  });
}

/**
 * Create and show toast notification
 */
function showToast(message, type = "info") {
  // Create toast container if it doesn't exist
  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);

    // Add style for toast container if not in CSS
    const style = document.createElement("style");
    style.textContent = `
      .toast-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
      }
      .toast {
        padding: 12px 20px;
        margin: 10px 0;
        min-width: 250px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s, fadeOut 0.5s 3s forwards;
        color: white;
      }
      .toast.success {
        background: #4caf50;
      }
      .toast.error {
        background: #f44336;
      }
      .toast.info {
        background: #2196F3;
      }
      .toast.warning {
        background: #ff9800;
      }
      @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
      }
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // Create toast element
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    ${message}
    <span class="toast-close" style="margin-left: 15px; cursor: pointer;">×</span>
  `;
  toastContainer.appendChild(toast);

  // Add close functionality
  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", () => {
    toast.remove();
  });

  // Auto remove after 3.5 seconds
  setTimeout(() => {
    toast.remove();
  }, 3500);
}

/**
 * Simple email validation
 */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Add scroll animations
 */
function initScrollAnimations() {
  const elementsToAnimate = document.querySelectorAll(
    ".feat-box, .step, .stat, .match-card, .leader-item, .notification-card"
  );

  // Simple scroll detection
  window.addEventListener("scroll", () => {
    elementsToAnimate.forEach((element) => {
      const elementPosition = element.getBoundingClientRect();

      // If element is visible in viewport
      if (
        elementPosition.top < window.innerHeight * 0.8 &&
        elementPosition.bottom > 0
      ) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  });

  // Initialize styles
  elementsToAnimate.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // Trigger initial check
  window.dispatchEvent(new Event("scroll"));
}

/**
 * Check if current page is dashboard
 */
function isDashboard() {
  return window.location.pathname.includes("dashboard");
}

/**
 * Sync user name between desktop and mobile views
 */
function syncUserNames() {
  if (isDashboard()) {
    const desktopUserName = document.getElementById("userName");
    const mobileUserName = document.getElementById("mobileUserName");
    const logoutBtn = document.getElementById("logout");
    const mobileLogoutBtn = document.getElementById("mobileLogout");

    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("currentUser")) || {
      firstName: "User",
    };
    const displayName = userData.firstName || userData.username || "User";

    // Update user names in both views
    if (desktopUserName) desktopUserName.textContent = displayName;
    if (mobileUserName) mobileUserName.textContent = displayName;

    // Setup logout functionality
    if (logoutBtn) {
      logoutBtn.addEventListener("click", handleLogout);
    }

    if (mobileLogoutBtn) {
      mobileLogoutBtn.addEventListener("click", handleLogout);
    }
  }
}

/**
 * Handle logout action
 */
function handleLogout(e) {
  e.preventDefault();
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

/**
 * Add dark/light theme toggle functionality
 */
function initThemeToggle() {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";

  // Set initial theme
  if (isDarkTheme) {
    document.body.classList.add("dark-theme");
  }

  // Add theme toggle button to settings in dashboard if on dashboard page
  if (isDashboard()) {
    const settingsLink = document.querySelector(".dropdown a:first-child");
    if (settingsLink) {
      settingsLink.addEventListener("click", function (e) {
        e.preventDefault();
        document.body.classList.toggle("dark-theme");
        localStorage.setItem(
          "darkTheme",
          document.body.classList.contains("dark-theme")
        );

        // Notify user
        alert("Theme has been changed! Your preference has been saved.");
      });
    }
  }
}

/**
 * Handle join tournament button
 */
function initJoinTournament() {
  if (joinTournamentBtn) {
    joinTournamentBtn.addEventListener("click", () => {
      alert("You have successfully joined the tournament!");
      // Here you could redirect to a tournament page or update UI
    });
  }
}

/**
 * Handle invite friends button
 */
function initInviteFriends() {
  if (inviteFriendsBtn) {
    inviteFriendsBtn.addEventListener("click", () => {
      const shareUrl = window.location.origin;
      if (navigator.share) {
        navigator.share({
          title: "Join Turnaj Fantasy Football",
          text: "Check out this amazing fantasy football platform!",
          url: shareUrl,
        });
      } else {
        navigator.clipboard.writeText(shareUrl).then(() => {
          alert("Link copied to clipboard! Share with your friends.");
        });
      }
    });
  }
}

/**
 * Check login status and adjust UI accordingly
 */
function checkLoginStatus() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const authLinks = document.querySelectorAll(".auth-links");
  const userMenus = document.querySelectorAll(".user-menu");

  if (currentUser) {
    // User is logged in, hide auth links, show user menu
    authLinks.forEach((link) => (link.style.display = "none"));
    userMenus.forEach((menu) => (menu.style.display = "flex"));
  } else {
    // User not logged in, show auth links, hide user menu
    authLinks.forEach((link) => (link.style.display = "flex"));
    userMenus.forEach((menu) => (menu.style.display = "none"));
  }
}

/**
 * Handle settings form submission
 */
function initSettingsForm() {
  if (settingsForm) {
    settingsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Here you would update the user data in localStorage
      alert("Profile updated successfully!");
      // For demo, just show alert
    });
  }
}

/**
 * Handle profile dropdown toggle (delegated, reliable across pages)
 */
function initProfileDropdown() {
  const closeAll = () => {
    document.querySelectorAll(".dropdown.active").forEach((dd) => {
      dd.classList.remove("active");
    });
  };

  // Single delegated handler to manage all interactions
  document.addEventListener("click", (e) => {
    const inDropdown = e.target.closest(".dropdown");
    const profile = e.target.closest(".profile");

    // If clicked inside an open dropdown, do nothing (let links work)
    if (inDropdown) return;

    // If click is on/inside a .profile, toggle its dropdown
    if (profile) {
      const dropdown = profile.querySelector(".dropdown");
      if (!dropdown) return;
      const isOpen = dropdown.classList.contains("active");
      closeAll();
      if (!isOpen) dropdown.classList.add("active");
      return;
    }

    // Otherwise, clicked outside → close all
    closeAll();
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAll();
    }
  });
}

/**
 * Handle logout
 */
function initLogout() {
  [logoutBtn, mobileLogoutBtn].forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
      });
    }
  });
}

/**
 * Initialize all website functionality
 */
function initWebsite() {
  // Only setup mobile menu event listeners if elements exist
  if (hamburgerMenu && mobileNav && mobileNavOverlay) {
    hamburgerMenu.addEventListener("click", toggleMobileNav);
    mobileNavOverlay.addEventListener("click", toggleMobileNav);
  }

  // Initialize all components
  initCountdowns();
  initTabs();
  initNotifications();
  initPredictButtons();
  initNewsletterForm();
  initScrollAnimations();
  syncUserNames();
  initThemeToggle();
  initJoinTournament();
  initInviteFriends();
  initSettingsForm();
  initProfileDropdown();
  initLogout();
  checkLoginStatus();

  console.log("Turnaj website initialized");
}

// Start everything when DOM is fully loaded
document.addEventListener("DOMContentLoaded", initWebsite);
