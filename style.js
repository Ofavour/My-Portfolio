(function () {
  // Loader
  window.addEventListener("load", function () {
    setTimeout(function () {
      document.getElementById("loader").classList.add("hide");
    }, 700);
  });

  // Theme toggle — always starts on light, in-memory only
  var root = document.documentElement;
  var themeBtn = document.getElementById("theme-toggle");
  themeBtn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    themeBtn.setAttribute("aria-pressed", next === "dark");
  });

  // Header scroll state
  var header = document.getElementById("site-header");
  window.addEventListener(
    "scroll",
    function () {
      header.classList.toggle("scrolled", window.scrollY > 40);
    },
    { passive: true },
  );

  // Mobile menu
  var toggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("main-nav");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", false);
    });
  });

  // Floating particles
  var hero = document.getElementById("hero");
  var count = window.innerWidth < 600 ? 10 : 22;
  for (var i = 0; i < count; i++) {
    var p = document.createElement("div");
    p.className = "particle";
    var size = (Math.random() * 3.5 + 1.5).toFixed(1);
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.left = Math.random() * 100 + "%";
    p.style.bottom = -10 - Math.random() * 20 + "px";
    p.style.setProperty("--dx", Math.random() * 80 - 40 + "px");
    p.style.animationDuration = 10 + Math.random() * 10 + "s";
    p.style.animationDelay = Math.random() * 10 + "s";
    hero.appendChild(p);
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll(".reveal");
  revealEls.forEach(function (el) {
    el.querySelectorAll(":scope > *").forEach(function (child, i) {
      child.style.setProperty("--i", i);
    });
  });
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  revealEls.forEach(function (el) {
    io.observe(el);
  });

  // Project card glow follows cursor
  document.querySelectorAll(".project-card").forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - rect.left + "px");
      card.style.setProperty("--my", e.clientY - rect.top + "px");
    });
  });

  // Scroll-spy rail
  var railBtns = document.querySelectorAll("#rail button");
  var sections = Array.prototype.map.call(railBtns, function (b) {
    return document.getElementById(b.getAttribute("data-target"));
  });
  railBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      document
        .getElementById(btn.getAttribute("data-target"))
        .scrollIntoView({ behavior: "smooth" });
    });
  });
  var spyIo = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          railBtns.forEach(function (b) {
            b.classList.toggle("active", b.getAttribute("data-target") === id);
          });
        }
      });
    },
    { threshold: 0.5 },
  );
  sections.forEach(function (s) {
    if (s) spyIo.observe(s);
  });
})();
