/**
 * CineMate - Core Application Engine
 * Handles State, Netflix-style Carousel Rows, Video Player, Modals, Search & Watchlist
 */

document.addEventListener("DOMContentLoaded", () => {
  CineApp.init();
});

const CineApp = {
  // Local storage keys
  STORAGE_WATCHLIST: "cinemate_watchlist_v1",
  STORAGE_CONTINUE: "cinemate_continue_watching_v1",
  STORAGE_RATED: "cinemate_rated_v1",
  STORAGE_USER: "cinemate_user_session_v1",
  STORAGE_SETTINGS: "cinemate_settings_v1",

  // State
  watchlist: [],
  continueWatching: [],
  ratedMovies: {},
  currentUser: null,
  activeMovie: null,
  activeFilter: { query: "", genre: "All", year: "All", type: "All", sort: "trending" },
  currentHeroIndex: 0,
  heroAutoPlayTimer: null,
  playerState: {
    isPlaying: false,
    mode: "trailer", // 'trailer' | 'stream'
    currentMovie: null
  },

  init() {
    this.loadState();
    this.initNavbar();
    this.initAuth();
    this.initHero();
    this.renderCarousels();
    this.initSearch();
    this.initModals();
    this.initHelpModals();
    this.initSettings();
    this.initPlayer();
    this.initShortcuts();
    this.updateWatchlistBadges();
    
    // Check URL parameters (e.g. ?search=..., ?watch=..., ?genre=...)
    this.handleUrlParams();
  },

  /* -------------------------------------------------------------
   * STATE & STORAGE
   * ----------------------------------------------------------- */
  loadState() {
    try {
      this.watchlist = JSON.parse(localStorage.getItem(this.STORAGE_WATCHLIST)) || ["interstellar", "dune-part-two", "arcane"];
      this.continueWatching = JSON.parse(localStorage.getItem(this.STORAGE_CONTINUE)) || [
        { id: "dune-part-two", progress: 68, lastWatched: Date.now() - 3600000 },
        { id: "stranger-things", progress: 42, lastWatched: Date.now() - 86400000 }
      ];
      this.ratedMovies = JSON.parse(localStorage.getItem(this.STORAGE_RATED)) || {};

      const storedUser = localStorage.getItem(this.STORAGE_USER);
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      } else {
        this.currentUser = {
          name: "Samadhi",
          email: "samadhi@cinemate.io",
          plan: "Ultra HD 4K",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
        };
      }
    } catch (e) {
      this.watchlist = ["interstellar", "dune-part-two"];
      this.continueWatching = [];
      this.ratedMovies = {};
      this.currentUser = {
        name: "Samadhi",
        email: "samadhi@cinemate.io",
        plan: "Ultra HD 4K",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
      };
    }
  },

  saveWatchlist() {
    localStorage.setItem(this.STORAGE_WATCHLIST, JSON.stringify(this.watchlist));
    this.updateWatchlistBadges();
  },

  saveContinueWatching(movieId, progress) {
    const existing = this.continueWatching.findIndex(item => item.id === movieId);
    if (existing >= 0) {
      this.continueWatching[existing].progress = progress;
      this.continueWatching[existing].lastWatched = Date.now();
    } else {
      this.continueWatching.unshift({ id: movieId, progress: progress, lastWatched: Date.now() });
    }
    // Limit to 10
    this.continueWatching = this.continueWatching.slice(0, 10);
    localStorage.setItem(this.STORAGE_CONTINUE, JSON.stringify(this.continueWatching));
  },

  toggleWatchlist(movieId) {
    const movie = CineDB.getById(movieId);
    if (!movie) return;

    const index = this.watchlist.indexOf(movieId);
    let added = false;
    if (index > -1) {
      this.watchlist.splice(index, 1);
      this.showToast(`Removed "${movie.title}" from My List`);
    } else {
      this.watchlist.push(movieId);
      this.showToast(`Added "${movie.title}" to My List!`, "success");
      added = true;
    }
    this.saveWatchlist();
    this.updateAllWatchlistButtons(movieId, added);

    // If we're on the Favourites / My List view, re-render
    const myListPage = document.getElementById("my-list-grid");
    if (myListPage) {
      this.renderMyListPage();
    }
  },

  isInWatchlist(movieId) {
    return this.watchlist.includes(movieId);
  },

  updateWatchlistBadges() {
    const badges = document.querySelectorAll(".watchlist-counter");
    badges.forEach(b => {
      b.textContent = this.watchlist.length;
      b.style.display = this.watchlist.length > 0 ? "inline-flex" : "none";
    });
  },

  updateAllWatchlistButtons(movieId, isAdded) {
    const buttons = document.querySelectorAll(`[data-watchlist-id="${movieId}"]`);
    buttons.forEach(btn => {
      if (btn.classList.contains("hero-btn") || btn.classList.contains("modal-btn")) {
        btn.innerHTML = isAdded 
          ? `<span class="btn-icon">✓</span> In My List` 
          : `<span class="btn-icon">+</span> My List`;
        btn.classList.toggle("in-list", isAdded);
      } else {
        btn.innerHTML = isAdded ? `✓` : `+`;
        btn.title = isAdded ? `Remove from My List` : `Add to My List`;
        btn.classList.toggle("in-list", isAdded);
      }
    });
  },

  /* -------------------------------------------------------------
   * NAVBAR & HEADER BEHAVIORS
   * ----------------------------------------------------------- */
  initNavbar() {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      });
    }

    // Mobile menu toggle
    const mobileBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");
    if (mobileBtn && navLinks) {
      mobileBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        mobileBtn.classList.toggle("active");
      });
    }

    // Profile Dropdown
    const profileBtn = document.querySelector(".profile-trigger");
    const profileMenu = document.querySelector(".profile-menu");
    if (profileBtn && profileMenu) {
      profileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        profileMenu.classList.toggle("show");
      });
      document.addEventListener("click", () => {
        profileMenu.classList.remove("show");
      });
    }

    // Notifications Dropdown
    const notifBtn = document.querySelector(".notif-trigger");
    const notifMenu = document.querySelector(".notif-menu");
    if (notifBtn && notifMenu) {
      notifBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        notifMenu.classList.toggle("show");
        const dot = document.querySelector(".notif-dot");
        if (dot) dot.style.display = "none";
      });
      document.addEventListener("click", () => {
        notifMenu.classList.remove("show");
      });
    }

    // Quick Search Input in Navbar
    const navSearchInput = document.getElementById("nav-search-input");
    const navSearchBtn = document.getElementById("nav-search-btn");
    const navSearchBox = document.querySelector(".nav-search-box");

    if (navSearchBtn && navSearchBox) {
      navSearchBtn.addEventListener("click", () => {
        navSearchBox.classList.toggle("expanded");
        if (navSearchBox.classList.contains("expanded") && navSearchInput) {
          navSearchInput.focus();
        }
      });
    }

    if (navSearchInput) {
      navSearchInput.addEventListener("input", (e) => {
        this.performLiveSearch(e.target.value);
      });
    }

    // Sign In & Sign Up Buttons in Navbar
    const navSignInBtn = document.getElementById("nav-signin-btn");
    if (navSignInBtn) {
      navSignInBtn.addEventListener("click", () => this.openAuthModal("signin"));
    }
    const navSignUpBtn = document.getElementById("nav-signup-btn");
    if (navSignUpBtn) {
      navSignUpBtn.addEventListener("click", () => this.openAuthModal("signup"));
    }
  },

  /* -------------------------------------------------------------
   * AUTHENTICATION & USER PROFILE
   * ----------------------------------------------------------- */
  initAuth() {
    this.updateAuthUI();

    // Tab buttons in Auth Modal
    const tabSignIn = document.getElementById("auth-tab-signin");
    const tabSignUp = document.getElementById("auth-tab-signup");
    const formSignIn = document.getElementById("auth-form-signin");
    const formSignUp = document.getElementById("auth-form-signup");

    if (tabSignIn && tabSignUp && formSignIn && formSignUp) {
      tabSignIn.addEventListener("click", () => {
        tabSignIn.classList.add("active");
        tabSignUp.classList.remove("active");
        formSignIn.style.display = "block";
        formSignUp.style.display = "none";
      });

      tabSignUp.addEventListener("click", () => {
        tabSignUp.classList.add("active");
        tabSignIn.classList.remove("active");
        formSignUp.style.display = "block";
        formSignIn.style.display = "none";
      });
    }

    // Sign in form submit
    if (formSignIn) {
      formSignIn.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("auth-signin-email")?.value.trim();
        const password = document.getElementById("auth-signin-pwd")?.value;
        const remember = document.getElementById("auth-remember")?.checked;
        this.login(email, password, remember);
      });
    }

    // Sign up form submit
    if (formSignUp) {
      formSignUp.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("auth-signup-name")?.value.trim();
        const email = document.getElementById("auth-signup-email")?.value.trim();
        const password = document.getElementById("auth-signup-pwd")?.value;
        this.register(name, email, password);
      });
    }

    // Demo 1-Click login
    const demoBtn = document.getElementById("auth-demo-btn");
    if (demoBtn) {
      demoBtn.addEventListener("click", () => this.demoLogin());
    }

    // Password visibility toggle
    document.querySelectorAll(".auth-pwd-toggle").forEach(btn => {
      btn.addEventListener("click", () => {
        const input = btn.previousElementSibling;
        if (input && input.tagName === "INPUT") {
          input.type = input.type === "password" ? "text" : "password";
          btn.textContent = input.type === "password" ? "👁️" : "🙈";
        }
      });
    });

    // Close auth modal
    const closeBtn = document.getElementById("auth-modal-close");
    const authModal = document.getElementById("auth-modal");
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeAuthModal());
    if (authModal) {
      authModal.addEventListener("click", (e) => {
        if (e.target === authModal) this.closeAuthModal();
      });
    }

    // Sign Out in profile dropdown
    const signoutBtn = document.getElementById("profile-signout-btn");
    if (signoutBtn) {
      signoutBtn.addEventListener("click", () => this.logout());
    }
  },

  updateAuthUI() {
    const profileContainer = document.querySelector(".profile-container");
    const navAuthButtons = document.getElementById("nav-auth-buttons");
    const navSignInBtn = document.getElementById("nav-signin-btn");
    const navSignUpBtn = document.getElementById("nav-signup-btn");
    const profileNameEl = document.getElementById("profile-user-name");
    const profileEmailEl = document.getElementById("profile-user-email");
    const profileAvatarEl = document.getElementById("profile-user-avatar");

    if (this.currentUser) {
      if (profileContainer) profileContainer.style.display = "block";
      if (navAuthButtons) navAuthButtons.style.display = "none";
      if (navSignInBtn) navSignInBtn.style.display = "none";
      if (navSignUpBtn) navSignUpBtn.style.display = "none";
      if (profileNameEl) profileNameEl.textContent = this.currentUser.name;
      if (profileEmailEl) profileEmailEl.textContent = this.currentUser.email || "samadhi@cinemate.io";
      if (profileAvatarEl && this.currentUser.avatar) profileAvatarEl.src = this.currentUser.avatar;
    } else {
      if (profileContainer) profileContainer.style.display = "none";
      if (navAuthButtons) navAuthButtons.style.display = "inline-flex";
      if (navSignInBtn) navSignInBtn.style.display = "inline-flex";
      if (navSignUpBtn) navSignUpBtn.style.display = "inline-flex";
    }
  },

  openAuthModal(tab = "signin") {
    const modal = document.getElementById("auth-modal");
    if (!modal) return;

    const tabSignIn = document.getElementById("auth-tab-signin");
    const tabSignUp = document.getElementById("auth-tab-signup");

    if (tab === "signin") {
      tabSignIn?.click();
    } else {
      tabSignUp?.click();
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  },

  closeAuthModal() {
    const modal = document.getElementById("auth-modal");
    if (modal) modal.classList.remove("active");
    document.body.style.overflow = "";
  },

  login(email, password, remember = true) {
    if (!email) {
      this.showToast("Please enter your email or username", "error");
      return;
    }

    let username = email.split("@")[0];
    username = username.charAt(0).toUpperCase() + username.slice(1);
    if (!username || username.toLowerCase() === "samadhi") username = "Samadhi";

    this.currentUser = {
      name: username,
      email: email.includes("@") ? email : `${email}@cinemate.io`,
      plan: "Ultra HD 4K",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
    };

    if (remember) {
      localStorage.setItem(this.STORAGE_USER, JSON.stringify(this.currentUser));
    }
    this.updateAuthUI();
    this.closeAuthModal();
    this.showToast(`Welcome back, ${this.currentUser.name}!`, "success");
  },

  register(name, email, password) {
    if (!name || !email) {
      this.showToast("Please provide your name and email", "error");
      return;
    }

    this.currentUser = {
      name: name,
      email: email,
      plan: "Ultra HD 4K",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
    };

    localStorage.setItem(this.STORAGE_USER, JSON.stringify(this.currentUser));
    this.updateAuthUI();
    this.closeAuthModal();
    this.showToast(`Welcome to CineMate, ${name}! Your account is active.`, "success");
  },

  demoLogin() {
    this.currentUser = {
      name: "Samadhi",
      email: "samadhi@cinemate.io",
      plan: "Ultra HD 4K (Premium)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
    };
    localStorage.setItem(this.STORAGE_USER, JSON.stringify(this.currentUser));
    this.updateAuthUI();
    this.closeAuthModal();
    this.showToast("Logged in with Demo VIP Account!", "success");
  },

  logout() {
    this.currentUser = null;
    localStorage.removeItem(this.STORAGE_USER);
    this.updateAuthUI();
    this.showToast("Signed out successfully. See you soon!");
  },

  switchProfile(profileName) {
    if (!this.currentUser) return;
    this.currentUser.name = profileName;
    localStorage.setItem(this.STORAGE_USER, JSON.stringify(this.currentUser));
    this.updateAuthUI();
    this.showToast(`Switched active profile to ${profileName}`, "info");
  },

  /* -------------------------------------------------------------
   * HELP CENTER & RESOURCE MODALS
   * ----------------------------------------------------------- */
  initHelpModals() {
    // FAQ Accordion click
    document.querySelectorAll(".faq-accordion-item").forEach(item => {
      const q = item.querySelector(".faq-question");
      if (q) {
        q.addEventListener("click", () => {
          const wasActive = item.classList.contains("active");
          document.querySelectorAll(".faq-accordion-item").forEach(i => i.classList.remove("active"));
          if (!wasActive) item.classList.add("active");
        });
      }
    });

    // FAQ Live Filter
    const faqInput = document.getElementById("faq-search-input");
    if (faqInput) {
      faqInput.addEventListener("input", (e) => {
        const val = e.target.value.toLowerCase().trim();
        document.querySelectorAll(".faq-accordion-item").forEach(item => {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(val) ? "block" : "none";
        });
      });
    }

    // Modal close buttons
    ["help-modal", "devices-modal", "terms-modal"].forEach(modalId => {
      const modal = document.getElementById(modalId);
      if (!modal) return;
      const closeBtn = modal.querySelector(".modal-close-btn");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          modal.classList.remove("active");
          document.body.style.overflow = "";
        });
      }
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("active");
          document.body.style.overflow = "";
        }
      });
    });
  },

  openHelpModal() {
    const modal = document.getElementById("help-modal");
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  },

  openDevicesModal() {
    const modal = document.getElementById("devices-modal");
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  },

  openTermsModal(tab = "terms") {
    const modal = document.getElementById("terms-modal");
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  },

  /* -------------------------------------------------------------
   * SETTINGS & PREFERENCES BAR
   * ----------------------------------------------------------- */
  initSettings() {
    // Settings tabs
    const tabBtns = document.querySelectorAll(".settings-tab-btn");
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        document.querySelectorAll(".settings-pane").forEach(p => p.classList.remove("active"));
        const pane = document.getElementById(`settings-pane-${target}`);
        if (pane) pane.classList.add("active");
      });
    });

    // Avatar selection
    document.querySelectorAll(".avatar-option").forEach(img => {
      img.addEventListener("click", () => {
        document.querySelectorAll(".avatar-option").forEach(i => i.classList.remove("selected"));
        img.classList.add("selected");
      });
    });

    // Save Settings button
    const saveBtn = document.getElementById("settings-save-btn");
    if (saveBtn) {
      saveBtn.addEventListener("click", () => this.saveSettings());
    }

    // Cancel Settings button & Close
    const closeBtn = document.getElementById("settings-modal-close");
    const cancelBtn = document.getElementById("settings-cancel-btn");
    const modal = document.getElementById("settings-modal");
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeSettingsModal());
    if (cancelBtn) cancelBtn.addEventListener("click", () => this.closeSettingsModal());
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) this.closeSettingsModal();
      });
    }

    // Home CTA Email Form
    const homeCtaForm = document.getElementById("home-cta-form");
    if (homeCtaForm) {
      homeCtaForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailInput = document.getElementById("home-cta-email");
        const email = emailInput ? emailInput.value.trim() : "";
        this.openAuthModal("signup");
        const signupEmail = document.getElementById("auth-signup-email");
        if (signupEmail && email) {
          signupEmail.value = email;
          signupEmail.focus();
        }
      });
    }
  },

  openSettingsModal() {
    const modal = document.getElementById("settings-modal");
    if (!modal) return;

    if (this.currentUser) {
      const nameInput = document.getElementById("settings-display-name");
      const emailInput = document.getElementById("settings-email");
      if (nameInput) nameInput.value = this.currentUser.name || "";
      if (emailInput) emailInput.value = this.currentUser.email || "";

      document.querySelectorAll(".avatar-option").forEach(img => {
        if (img.src === this.currentUser.avatar) {
          img.classList.add("selected");
        } else {
          img.classList.remove("selected");
        }
      });
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  },

  closeSettingsModal() {
    const modal = document.getElementById("settings-modal");
    if (modal) modal.classList.remove("active");
    document.body.style.overflow = "";
  },

  saveSettings() {
    const nameInput = document.getElementById("settings-display-name");
    const emailInput = document.getElementById("settings-email");
    const selectedAvatar = document.querySelector(".avatar-option.selected");
    const qualitySelect = document.getElementById("settings-quality");
    const themeSelect = document.getElementById("settings-theme");

    if (nameInput && nameInput.value.trim() !== "") {
      if (!this.currentUser) {
        this.currentUser = { name: "Samadhi", email: "samadhi@cinemate.io", plan: "Ultra HD 4K", avatar: "" };
      }
      this.currentUser.name = nameInput.value.trim();
    }

    if (emailInput && emailInput.value.trim() !== "" && this.currentUser) {
      this.currentUser.email = emailInput.value.trim();
    }

    if (selectedAvatar && this.currentUser) {
      this.currentUser.avatar = selectedAvatar.src;
    }

    if (this.currentUser) {
      localStorage.setItem(this.STORAGE_USER, JSON.stringify(this.currentUser));
      this.updateAuthUI();
    }

    const settings = {
      quality: qualitySelect ? qualitySelect.value : "4k",
      theme: themeSelect ? themeSelect.value : "cyan"
    };
    localStorage.setItem(this.STORAGE_SETTINGS, JSON.stringify(settings));

    this.closeSettingsModal();
    this.showToast("Settings updated successfully!", "success");
  },

  clearWatchlistData() {
    if (confirm("Are you sure you want to clear your entire Watchlist?")) {
      this.watchlist = [];
      this.saveWatchlist();
      this.renderWatchlistRow();
      this.showToast("Watchlist cleared", "info");
      const myListPage = document.getElementById("my-list-grid");
      if (myListPage && typeof renderMyListPage === "function") {
        renderMyListPage();
      }
    }
  },

  clearContinueWatchingData() {
    if (confirm("Clear your viewing history?")) {
      this.continueWatching = [];
      localStorage.removeItem(this.STORAGE_CONTINUE);
      this.renderContinueWatchingRow();
      this.showToast("Continue Watching history cleared", "info");
    }
  },

  /* -------------------------------------------------------------
   * HERO BILLBOARD COMPONENT
   * ----------------------------------------------------------- */
  initHero() {
    const heroSection = document.getElementById("main-hero-billboard");
    if (!heroSection) return;

    const featuredList = MOVIES_DATABASE.filter(m => m.featured || m.trending).slice(0, 5);
    if (!featuredList.length) return;

    this.renderHeroBillboard(featuredList[this.currentHeroIndex]);

    // Setup hero switcher buttons / indicators
    const prevBtn = document.getElementById("hero-prev");
    const nextBtn = document.getElementById("hero-next");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        this.currentHeroIndex = (this.currentHeroIndex - 1 + featuredList.length) % featuredList.length;
        this.renderHeroBillboard(featuredList[this.currentHeroIndex]);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        this.currentHeroIndex = (this.currentHeroIndex + 1) % featuredList.length;
        this.renderHeroBillboard(featuredList[this.currentHeroIndex]);
      });
    }
  },

  renderHeroBillboard(movie) {
    if (!movie) return;

    const heroSection = document.getElementById("main-hero-billboard");
    if (!heroSection) return;

    const inList = this.isInWatchlist(movie.id);

    heroSection.style.backgroundImage = `
      linear-gradient(to top, #141414 5%, rgba(20, 20, 20, 0.6) 40%, rgba(20, 20, 20, 0.2) 80%, rgba(20, 20, 20, 0.8) 100%),
      linear-gradient(to right, #141414 10%, rgba(20, 20, 20, 0.7) 40%, transparent 80%),
      url('${movie.backdrop || movie.poster}')
    `;

    const titleEl = document.getElementById("hero-title");
    const descEl = document.getElementById("hero-desc");
    const matchEl = document.getElementById("hero-match");
    const ageEl = document.getElementById("hero-age");
    const durEl = document.getElementById("hero-duration");
    const qualityEl = document.getElementById("hero-quality");
    const genreEl = document.getElementById("hero-genres");
    const playBtn = document.getElementById("hero-play-btn");
    const infoBtn = document.getElementById("hero-info-btn");
    const listBtn = document.getElementById("hero-list-btn");

    if (titleEl) titleEl.textContent = movie.title;
    if (descEl) descEl.textContent = movie.description;
    if (matchEl) matchEl.textContent = movie.match || "98% Match";
    if (ageEl) ageEl.textContent = movie.ageRating || "16+";
    if (durEl) durEl.textContent = movie.duration;
    if (qualityEl) qualityEl.textContent = movie.quality || "4K Ultra HD";
    if (genreEl) {
      genreEl.innerHTML = movie.genres.map(g => `<span class="genre-pill">${g}</span>`).join(" ");
    }

    if (playBtn) {
      playBtn.onclick = () => this.openPlayer(movie);
    }
    if (infoBtn) {
      infoBtn.onclick = () => this.openMovieModal(movie);
    }
    if (listBtn) {
      listBtn.setAttribute("data-watchlist-id", movie.id);
      listBtn.innerHTML = inList 
        ? `<span class="btn-icon">✓</span> In My List` 
        : `<span class="btn-icon">+</span> My List`;
      listBtn.classList.toggle("in-list", inList);
      listBtn.onclick = () => this.toggleWatchlist(movie.id);
    }
  },

  /* -------------------------------------------------------------
   * ROW CAROUSELS & MOVIE CARDS
   * ----------------------------------------------------------- */
  renderCarousels() {
    this.renderContinueWatchingRow();
    this.renderRow("row-trending", CineDB.getTrending());
    this.renderTop10Row("row-top10", CineDB.getTop10());
    this.renderRow("row-scifi", CineDB.getByGenre("Sci-Fi"));
    this.renderRow("row-action", CineDB.getByGenre("Action"));
    this.renderRow("row-thrillers", CineDB.getByGenre("Horror").concat(CineDB.getByGenre("Thriller")).slice(0, 8));
    this.renderRow("row-tv", CineDB.getByType("tv"));
    this.renderWatchlistRow();
    this.setupCarouselScrollControls();
  },

  renderContinueWatchingRow() {
    const container = document.getElementById("row-continue");
    const section = document.getElementById("section-continue");
    if (!container || !section) return;

    if (!this.continueWatching || this.continueWatching.length === 0) {
      section.style.display = "none";
      return;
    }

    section.style.display = "block";
    container.innerHTML = "";

    this.continueWatching.forEach(item => {
      const movie = CineDB.getById(item.id);
      if (!movie) return;

      const card = document.createElement("div");
      card.className = "continue-card";
      card.innerHTML = `
        <div class="continue-poster">
          <img src="${movie.backdrop || movie.poster}" alt="${movie.title}" loading="lazy" onerror="this.src='${movie.poster}'">
          <div class="continue-play-overlay" onclick="CineApp.openPlayer(CineDB.getById('${movie.id}'))">
            <div class="circle-play-btn">▶</div>
          </div>
          <div class="continue-progress-bar">
            <div class="continue-progress-fill" style="width: ${item.progress}%"></div>
          </div>
        </div>
        <div class="continue-info">
          <div class="continue-title-row">
            <h4>${movie.title}</h4>
            <button class="icon-btn-minimal" title="More Info" onclick="CineApp.openMovieModal(CineDB.getById('${movie.id}'))">ℹ</button>
          </div>
          <p class="continue-meta">${item.progress}% watched · ${movie.duration}</p>
        </div>
      `;
      container.appendChild(card);
    });
  },

  renderWatchlistRow() {
    const container = document.getElementById("row-watchlist");
    const section = document.getElementById("section-watchlist");
    if (!container || !section) return;

    const movies = this.watchlist.map(id => CineDB.getById(id)).filter(Boolean);
    if (movies.length === 0) {
      section.style.display = "none";
      return;
    }

    section.style.display = "block";
    this.renderRow("row-watchlist", movies);
  },

  renderRow(containerId, movies) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";
    if (!movies || movies.length === 0) {
      container.innerHTML = `<div class="empty-row-msg">No titles available in this category.</div>`;
      return;
    }

    movies.forEach(movie => {
      const card = this.createMovieCard(movie);
      container.appendChild(card);
    });
  },

  renderTop10Row(containerId, movies) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";
    movies.forEach((movie, idx) => {
      const rank = idx + 1;
      const card = document.createElement("div");
      card.className = "top10-card";
      card.innerHTML = `
        <div class="top10-rank-num">${rank}</div>
        <div class="top10-poster-wrap" onclick="CineApp.openMovieModal(CineDB.getById('${movie.id}'))">
          <img src="${movie.poster}" alt="${movie.title}" loading="lazy"           onerror="this.src='assets/images/search-pannel.jpg'">
          <div class="card-hover-overlay">
            <div class="hover-btn-group">
              <button class="hover-btn play" title="Play" onclick="event.stopPropagation(); CineApp.openPlayer(CineDB.getById('${movie.id}'))">▶</button>
              <button class="hover-btn add ${this.isInWatchlist(movie.id) ? 'in-list' : ''}" data-watchlist-id="${movie.id}" title="My List" onclick="event.stopPropagation(); CineApp.toggleWatchlist('${movie.id}')">
                ${this.isInWatchlist(movie.id) ? '✓' : '+'}
              </button>
              <button class="hover-btn info" title="Details" onclick="event.stopPropagation(); CineApp.openMovieModal(CineDB.getById('${movie.id}'))">ℹ</button>
            </div>
            <div class="hover-title">${movie.title}</div>
            <div class="hover-meta">
              <span class="match">${movie.match}</span>
              <span class="badge-age">${movie.ageRating}</span>
              <span class="badge-qual">${movie.quality}</span>
            </div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  },

  createMovieCard(movie) {
    const card = document.createElement("div");
    card.className = "movie-card";
    const inList = this.isInWatchlist(movie.id);

    card.innerHTML = `
      <div class="card-inner" onclick="CineApp.openMovieModal(CineDB.getById('${movie.id}'))">
        <div class="poster-container">
          <img src="${movie.poster}" alt="${movie.title}" loading="lazy"           onerror="this.src='assets/images/search-pannel.jpg'">
          ${movie.badges && movie.badges[0] ? `<span class="card-badge">${movie.badges[0]}</span>` : ""}
        </div>
        <div class="card-preview">
          <div class="preview-backdrop" style="background-image: url('${movie.backdrop || movie.poster}')">
            <button class="preview-quick-play" title="Play Now" onclick="event.stopPropagation(); CineApp.openPlayer(CineDB.getById('${movie.id}'))">▶</button>
          </div>
          <div class="preview-body">
            <div class="preview-actions">
              <div class="left-actions">
                <button class="action-circle play" title="Play" onclick="event.stopPropagation(); CineApp.openPlayer(CineDB.getById('${movie.id}'))">▶</button>
                <button class="action-circle add ${inList ? 'in-list' : ''}" data-watchlist-id="${movie.id}" title="Watchlist" onclick="event.stopPropagation(); CineApp.toggleWatchlist('${movie.id}')">
                  ${inList ? '✓' : '+'}
                </button>
                <button class="action-circle like" title="Like" onclick="event.stopPropagation(); CineApp.rateMovie('${movie.id}')">👍</button>
              </div>
              <button class="action-circle more" title="More Info" onclick="event.stopPropagation(); CineApp.openMovieModal(CineDB.getById('${movie.id}'))">∨</button>
            </div>
            <h4 class="preview-title">${movie.title}</h4>
            <div class="preview-meta">
              <span class="match-rate">${movie.match}</span>
              <span class="meta-pill">${movie.ageRating}</span>
              <span class="meta-pill">${movie.duration}</span>
              <span class="hd-pill">${movie.quality}</span>
            </div>
            <div class="preview-genres">
              ${movie.genres.slice(0, 3).map(g => `<span>${g}</span>`).join(" • ")}
            </div>
          </div>
        </div>
      </div>
    `;
    return card;
  },

  setupCarouselScrollControls() {
    const rows = document.querySelectorAll(".carousel-wrapper");
    rows.forEach(wrapper => {
      const row = wrapper.querySelector(".carousel-row");
      const leftBtn = wrapper.querySelector(".carousel-arrow.left");
      const rightBtn = wrapper.querySelector(".carousel-arrow.right");

      if (!row || !leftBtn || !rightBtn) return;

      const updateArrows = () => {
        leftBtn.style.opacity = row.scrollLeft > 20 ? "1" : "0.2";
        leftBtn.style.pointerEvents = row.scrollLeft > 20 ? "auto" : "none";
        const maxScroll = row.scrollWidth - row.clientWidth - 20;
        rightBtn.style.opacity = row.scrollLeft < maxScroll ? "1" : "0.2";
      };

      leftBtn.addEventListener("click", () => {
        row.scrollBy({ left: -row.clientWidth * 0.75, behavior: "smooth" });
      });

      rightBtn.addEventListener("click", () => {
        row.scrollBy({ left: row.clientWidth * 0.75, behavior: "smooth" });
      });

      row.addEventListener("scroll", updateArrows);
      setTimeout(updateArrows, 100);
    });
  },

  /* -------------------------------------------------------------
   * SEARCH & FILTER ENGINE
   * ----------------------------------------------------------- */
  initSearch() {
    const searchForm = document.querySelector(".search-form");
    const searchInput = document.getElementById("search-input");
    const genreSelect = document.getElementById("genre-select");
    const yearSelect = document.getElementById("year-select");
    const typeSelect = document.getElementById("type-select");
    const sortSelect = document.getElementById("sort-select");
    const resetBtn = document.getElementById("search-reset-btn");

    const triggerSearch = () => {
      const q = searchInput ? searchInput.value : "";
      const genre = genreSelect ? genreSelect.value : "All Genres";
      const year = yearSelect ? yearSelect.value : "All Years";
      const type = typeSelect ? typeSelect.value : "All";
      const sort = sortSelect ? sortSelect.value : "trending";

      this.activeFilter = { query: q, genre, year, type, sort };
      this.executeFilteredSearch();
    };

    if (searchForm) {
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        triggerSearch();
      });
    }

    if (searchInput) {
      let debounceTimer;
      searchInput.addEventListener("input", (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          triggerSearch();
        }, 250);
      });
    }

    [genreSelect, yearSelect, typeSelect, sortSelect].forEach(select => {
      if (select) {
        select.addEventListener("change", triggerSearch);
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        if (genreSelect) genreSelect.value = "All Genres";
        if (yearSelect) yearSelect.value = "All Years";
        if (typeSelect) typeSelect.value = "All";
        if (sortSelect) sortSelect.value = "trending";
        this.activeFilter = { query: "", genre: "All", year: "All", type: "All", sort: "trending" };
        this.hideSearchResults();
      });
    }
  },

  performLiveSearch(query) {
    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.value = query;
    this.activeFilter.query = query;
    this.executeFilteredSearch();
  },

  executeFilteredSearch() {
    const { query, genre, year, type, sort } = this.activeFilter;
    const isFiltered = (query && query.trim() !== "") || 
                       (genre && genre !== "All Genres" && genre !== "All") ||
                       (year && year !== "All Years" && year !== "All") ||
                       (type && type !== "All");

    const searchSection = document.getElementById("search-results-section");
    const carouselsSection = document.getElementById("browse-carousels-container");

    if (!isFiltered) {
      this.hideSearchResults();
      return;
    }

    let results = CineDB.search(query, genre, year, type);

    // Sorting
    if (sort === "rating") {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sort === "year") {
      results.sort((a, b) => b.year - a.year);
    } else if (sort === "title") {
      results.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (carouselsSection) carouselsSection.style.display = "none";
    if (searchSection) {
      searchSection.style.display = "block";
      const countEl = document.getElementById("search-results-count");
      const grid = document.getElementById("search-results-grid");

      if (countEl) {
        countEl.innerHTML = `Showing <strong>${results.length}</strong> title${results.length === 1 ? '' : 's'} matching your search`;
      }

      if (grid) {
        grid.innerHTML = "";
        if (results.length === 0) {
          grid.innerHTML = `
            <div class="search-empty-state">
              <div class="empty-icon">🔍</div>
              <h3>No titles found</h3>
              <p>We couldn't find anything matching "${query || genre}". Try checking for spelling errors, adjusting filters, or browse trending titles.</p>
              <button class="primary-btn" onclick="document.getElementById('search-reset-btn').click()">Reset Filters</button>
            </div>
          `;
        } else {
          results.forEach(movie => {
            grid.appendChild(this.createMovieCard(movie));
          });
        }
      }

      // Smooth scroll to results
      searchSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  },

  hideSearchResults() {
    const searchSection = document.getElementById("search-results-section");
    const carouselsSection = document.getElementById("browse-carousels-container");
    if (searchSection) searchSection.style.display = "none";
    if (carouselsSection) carouselsSection.style.display = "block";
  },

  /* -------------------------------------------------------------
   * MOVIE DETAILS MODAL
   * ----------------------------------------------------------- */
  initModals() {
    const modal = document.getElementById("movie-modal");
    const closeBtn = document.getElementById("modal-close-btn");

    if (modal && closeBtn) {
      closeBtn.addEventListener("click", () => this.closeMovieModal());
      modal.addEventListener("click", (e) => {
        if (e.target === modal) this.closeMovieModal();
      });
    }
  },

  openMovieModal(movie) {
    if (!movie) return;
    this.activeMovie = movie;

    const modal = document.getElementById("movie-modal");
    if (!modal) return;

    const inList = this.isInWatchlist(movie.id);

    // Modal elements
    const backdropEl = document.getElementById("modal-backdrop");
    const titleEl = document.getElementById("modal-title");
    const matchEl = document.getElementById("modal-match");
    const yearEl = document.getElementById("modal-year");
    const ageEl = document.getElementById("modal-age");
    const durationEl = document.getElementById("modal-duration");
    const qualityEl = document.getElementById("modal-quality");
    const audioEl = document.getElementById("modal-audio");
    const descEl = document.getElementById("modal-description");
    const castEl = document.getElementById("modal-cast");
    const directorEl = document.getElementById("modal-director");
    const genresEl = document.getElementById("modal-genres");
    const playBtn = document.getElementById("modal-play-btn");
    const listBtn = document.getElementById("modal-list-btn");
    const tvEpisodesSection = document.getElementById("modal-episodes-section");
    const relatedGrid = document.getElementById("modal-related-grid");

    if (backdropEl) {
      backdropEl.style.backgroundImage = `
        linear-gradient(to top, #181818 5%, rgba(24, 24, 24, 0.4) 60%, transparent 100%),
        url('${movie.backdrop || movie.poster}')
      `;
    }

    if (titleEl) titleEl.textContent = movie.title;
    if (matchEl) matchEl.textContent = movie.match || "98% Match";
    if (yearEl) yearEl.textContent = movie.year;
    if (ageEl) ageEl.textContent = movie.ageRating;
    if (durationEl) durationEl.textContent = movie.duration;
    if (qualityEl) qualityEl.textContent = movie.quality || "4K Ultra HD";
    if (audioEl) audioEl.textContent = movie.audio || "Dolby Atmos";
    if (descEl) descEl.textContent = movie.description;
    if (castEl) castEl.textContent = movie.cast || "Ensemble Cast";
    if (directorEl) directorEl.textContent = movie.director || "Various";
    if (genresEl) genresEl.textContent = movie.genres.join(", ");

    if (playBtn) {
      playBtn.onclick = () => {
        this.closeMovieModal();
        this.openPlayer(movie);
      };
    }

    if (listBtn) {
      listBtn.setAttribute("data-watchlist-id", movie.id);
      listBtn.innerHTML = inList ? `<span class="btn-icon">✓</span> In My List` : `<span class="btn-icon">+</span> My List`;
      listBtn.classList.toggle("in-list", inList);
      listBtn.onclick = () => this.toggleWatchlist(movie.id);
    }

    // TV Show Episodes
    if (tvEpisodesSection) {
      if (movie.type === "tv" && movie.episodes && movie.episodes.length > 0) {
        tvEpisodesSection.style.display = "block";
        const epList = document.getElementById("modal-episodes-list");
        if (epList) {
          epList.innerHTML = movie.episodes.map(ep => `
            <div class="episode-row" onclick="CineApp.openPlayer(CineDB.getById('${movie.id}'))">
              <div class="ep-num">${ep.ep}</div>
              <div class="ep-thumb" style="background-image: url('${movie.backdrop || movie.poster}')">
                <span class="ep-play-icon">▶</span>
              </div>
              <div class="ep-info">
                <div class="ep-header">
                  <h5>${ep.title}</h5>
                  <span class="ep-duration">${ep.duration}</span>
                </div>
                <p class="ep-desc">${ep.desc}</p>
              </div>
            </div>
          `).join("");
        }
      } else {
        tvEpisodesSection.style.display = "none";
      }
    }

    // Related / More Like This
    if (relatedGrid) {
      const related = CineDB.getRelated(movie, 6);
      relatedGrid.innerHTML = "";
      related.forEach(item => {
        const inRelList = this.isInWatchlist(item.id);
        const card = document.createElement("div");
        card.className = "related-card";
        card.innerHTML = `
          <div class="related-img-wrap" onclick="CineApp.openPlayer(CineDB.getById('${item.id}'))">
            <img src="${item.backdrop || item.poster}" alt="${item.title}" loading="lazy">
            <span class="related-duration">${item.duration}</span>
            <div class="related-play-badge">▶</div>
          </div>
          <div class="related-info">
            <div class="related-top">
              <span class="related-match">${item.match}</span>
              <span class="related-age">${item.ageRating}</span>
              <button class="action-circle add ${inRelList ? 'in-list' : ''}" data-watchlist-id="${item.id}" title="Watchlist" onclick="event.stopPropagation(); CineApp.toggleWatchlist('${item.id}')">
                ${inRelList ? '✓' : '+'}
              </button>
            </div>
            <h5>${item.title}</h5>
            <p class="related-desc">${item.description.substring(0, 85)}...</p>
          </div>
        `;
        relatedGrid.appendChild(card);
      });
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  },

  closeMovieModal() {
    const modal = document.getElementById("movie-modal");
    if (modal) modal.classList.remove("active");
    document.body.style.overflow = "";
    this.activeMovie = null;
  },

  /* -------------------------------------------------------------
   * VIDEO PLAYER SYSTEM (NETFLIX THEATER MODE)
   * ----------------------------------------------------------- */
  initPlayer() {
    const playerModal = document.getElementById("video-player-modal");
    const closeBtn = document.getElementById("player-close-btn");
    const switchModeBtn = document.getElementById("player-mode-switch");
    const playPauseBtn = document.getElementById("player-play-pause");
    const volumeBtn = document.getElementById("player-volume-btn");
    const volumeSlider = document.getElementById("player-volume-slider");
    const fullscreenBtn = document.getElementById("player-fullscreen-btn");
    const rewindBtn = document.getElementById("player-rewind-btn");
    const forwardBtn = document.getElementById("player-forward-btn");
    const progressBar = document.getElementById("player-progress-bar");
    const video = document.getElementById("player-html5-video");

    if (closeBtn) closeBtn.addEventListener("click", () => this.closePlayer());
    
    if (switchModeBtn) {
      switchModeBtn.addEventListener("click", () => {
        this.playerState.mode = (this.playerState.mode === "trailer") ? "stream" : "trailer";
        this.updatePlayerMode();
      });
    }

    if (video) {
      video.addEventListener("timeupdate", () => {
        if (!video.duration) return;
        const pct = (video.currentTime / video.duration) * 100;
        const progressFill = document.getElementById("player-progress-fill");
        const currTime = document.getElementById("player-current-time");
        const totalTime = document.getElementById("player-total-time");

        if (progressFill) progressFill.style.width = `${pct}%`;
        if (currTime) currTime.textContent = this.formatTime(video.currentTime);
        if (totalTime) totalTime.textContent = this.formatTime(video.duration);

        // Record continue watching
        if (this.playerState.currentMovie && pct > 2) {
          this.saveContinueWatching(this.playerState.currentMovie.id, Math.round(pct));
        }
      });

      video.addEventListener("play", () => {
        this.playerState.isPlaying = true;
        if (playPauseBtn) playPauseBtn.innerHTML = "❚❚";
      });

      video.addEventListener("pause", () => {
        this.playerState.isPlaying = false;
        if (playPauseBtn) playPauseBtn.innerHTML = "▶";
      });
    }

    if (playPauseBtn && video) {
      playPauseBtn.addEventListener("click", () => {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      });
    }

    if (rewindBtn && video) {
      rewindBtn.addEventListener("click", () => {
        video.currentTime = Math.max(0, video.currentTime - 10);
      });
    }

    if (forwardBtn && video) {
      forwardBtn.addEventListener("click", () => {
        video.currentTime = Math.min(video.duration, video.currentTime + 10);
      });
    }

    if (volumeSlider && video) {
      volumeSlider.addEventListener("input", (e) => {
        video.volume = e.target.value;
        if (volumeBtn) {
          volumeBtn.textContent = video.volume == 0 ? "🔇" : (video.volume < 0.5 ? "🔉" : "🔊");
        }
      });
    }

    if (volumeBtn && video) {
      volumeBtn.addEventListener("click", () => {
        video.muted = !video.muted;
        volumeBtn.textContent = video.muted ? "🔇" : "🔊";
      });
    }

    if (fullscreenBtn && playerModal) {
      fullscreenBtn.addEventListener("click", () => {
        if (!document.fullscreenElement) {
          playerModal.requestFullscreen().catch(err => console.log(err));
        } else {
          document.exitFullscreen();
        }
      });
    }

    if (progressBar && video) {
      progressBar.addEventListener("click", (e) => {
        const rect = progressBar.getBoundingClientRect();
        const clickPos = (e.clientX - rect.left) / rect.width;
        video.currentTime = clickPos * video.duration;
      });
    }
  },

  openPlayer(movie, mode = "trailer") {
    if (!movie) return;
    this.playerState.currentMovie = movie;
    this.playerState.mode = mode;

    const modal = document.getElementById("video-player-modal");
    const titleEl = document.getElementById("player-movie-title");
    const metaEl = document.getElementById("player-movie-meta");

    if (titleEl) titleEl.textContent = movie.title;
    if (metaEl) metaEl.textContent = `${movie.year} · ${movie.ageRating} · ${movie.duration} · ${movie.quality}`;

    this.updatePlayerMode();

    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    this.showToast(`Starting playback: ${movie.title}`, "info");
  },

  updatePlayerMode() {
    const movie = this.playerState.currentMovie;
    if (!movie) return;

    const youtubeWrap = document.getElementById("player-youtube-wrap");
    const html5Wrap = document.getElementById("player-html5-wrap");
    const switchBtn = document.getElementById("player-mode-switch");
    const video = document.getElementById("player-html5-video");
    const iframe = document.getElementById("player-youtube-iframe");

    if (this.playerState.mode === "trailer") {
      // Show YouTube Trailer
      if (youtubeWrap) youtubeWrap.style.display = "block";
      if (html5Wrap) html5Wrap.style.display = "none";
      if (video) video.pause();
      if (iframe && movie.trailerYoutubeId) {
        iframe.src = `https://www.youtube-nocookie.com/embed/${movie.trailerYoutubeId}?autoplay=1&rel=0&modestbranding=1&controls=1`;
      }
      if (switchBtn) switchBtn.innerHTML = `🍿 Switch to Full Stream Movie`;
    } else {
      // Show HTML5 Video Stream
      if (youtubeWrap) youtubeWrap.style.display = "none";
      if (iframe) iframe.src = "";
      if (html5Wrap) html5Wrap.style.display = "block";
      if (video && movie.videoUrl) {
        video.src = movie.videoUrl;
        video.play().catch(e => console.log("Autoplay blocked:", e));
      }
      if (switchBtn) switchBtn.innerHTML = `🎬 Switch to Official Trailer`;
    }
  },

  closePlayer() {
    const modal = document.getElementById("video-player-modal");
    const video = document.getElementById("player-html5-video");
    const iframe = document.getElementById("player-youtube-iframe");

    if (video) {
      video.pause();
      video.src = "";
    }
    if (iframe) {
      iframe.src = "";
    }
    if (modal) {
      modal.classList.remove("active");
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(e => {});
      }
    }
    document.body.style.overflow = "";
    this.renderContinueWatchingRow();
  },

  /* -------------------------------------------------------------
   * UTILITIES & SHORTCUTS
   * ----------------------------------------------------------- */
  initShortcuts() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const playerModal = document.getElementById("video-player-modal");
        const movieModal = document.getElementById("movie-modal");
        if (playerModal && playerModal.classList.contains("active")) {
          this.closePlayer();
        } else if (movieModal && movieModal.classList.contains("active")) {
          this.closeMovieModal();
        }
      } else if (e.code === "Space") {
        const playerModal = document.getElementById("video-player-modal");
        const video = document.getElementById("player-html5-video");
        if (playerModal && playerModal.classList.contains("active") && video) {
          if (this.playerState.mode === "stream") {
            e.preventDefault();
            if (video.paused) video.play(); else video.pause();
          }
        }
      }
    });
  },

  rateMovie(movieId) {
    const movie = CineDB.getById(movieId);
    if (!movie) return;
    this.ratedMovies[movieId] = !this.ratedMovies[movieId];
    localStorage.setItem(this.STORAGE_RATED, JSON.stringify(this.ratedMovies));
    if (this.ratedMovies[movieId]) {
      this.showToast(`Rated "${movie.title}" - Thank you!`, "success");
    } else {
      this.showToast(`Removed rating for "${movie.title}"`);
    }
  },

  formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  },

  showToast(message, type = "info") {
    let container = document.getElementById("toast-notifications-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-notifications-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `cinemate-toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✓' : (type === 'error' ? '⚠' : 'ℹ')}</span>
      <span class="toast-msg">${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("visible");
    }, 10);

    setTimeout(() => {
      toast.classList.remove("visible");
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  },

  handleUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const watchId = params.get("watch");
    const searchVal = params.get("search");
    const genreVal = params.get("genre");

    if (watchId) {
      const movie = CineDB.getById(watchId);
      if (movie) setTimeout(() => this.openPlayer(movie), 400);
    } else if (searchVal) {
      const searchInput = document.getElementById("search-input");
      if (searchInput) {
        searchInput.value = searchVal;
        this.performLiveSearch(searchVal);
      }
    } else if (genreVal) {
      const genreSelect = document.getElementById("genre-select");
      if (genreSelect) {
        genreSelect.value = genreVal;
        this.activeFilter.genre = genreVal;
        this.executeFilteredSearch();
      }
    }
  }
};
