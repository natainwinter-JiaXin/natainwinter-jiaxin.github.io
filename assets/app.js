const siteConfig = {
  head: {
    title: "Natasha Tian (Jiaxin Tian)",
    description: "Personal homepage",
  },
  intro: {
    title: "Natasha Tian",
    subtitle: "Designing resilient systems and delightful interfaces.",
    enterLabel: "Enter",
  },
  main: {
    name: "Natasha Tian (Jiaxin Tian)",
    signature: "Build. Ship. Iterate.",
    avatarText: "NT",
    links: [
      { label: "Portfolio", href: "#portfolio", action: "portfolio" },
      { label: "Email", href: "mailto:you@example.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/jiaxin-natasha" },
      {
        label: "Instagram",
        href: "https://www.instagram.com/nata.nashnaaa?igsh=NTc4MTIwNjQ2YQ==",
      },
    ],
  },
  portfolio: [
    {
      title: "白日梦",
      meta: "TXT",
      file: "assets/portfolio/白日梦.txt",
      type: "txt",
      size: "wide",
      icon: "assets/3d icon/3D Glass Bookmark Icon.png",
    },
    {
      title: "Poetry",
      meta: "PDF",
      file: "assets/portfolio/Poetry.pdf",
      type: "pdf",
      size: "wide",
      icon: "assets/3d icon/Blue Heart in Cube.png",
    },
    {
      title: "新生",
      meta: "TXT",
      file: "assets/portfolio/新生.txt",
      type: "txt",
      icon: "assets/3d icon/3D Glass Bookmark Icon.png",
    },
    {
      title: "无感",
      meta: "TXT",
      file: "assets/portfolio/无感.txt",
      type: "txt",
      icon: "assets/3d icon/3D Glass Bookmark Icon.png",
    },
    {
      title: "退",
      meta: "TXT",
      file: "assets/portfolio/退.txt",
      type: "txt",
      icon: "assets/3d icon/3D Glass Bookmark Icon.png",
    },
    {
      title: "人设",
      meta: "TXT",
      file: "assets/portfolio/人设.txt",
      type: "txt",
      icon: "assets/3d icon/3D Glass Bookmark Icon.png",
    },
    {
      title: "最失落的诗",
      meta: "TXT",
      file: "assets/portfolio/最失落的诗.txt",
      type: "txt",
      icon: "assets/3d icon/3D Glass Bookmark Icon.png",
    },
    {
      title: "潮湿",
      meta: "TXT",
      file: "assets/portfolio/潮湿.txt",
      type: "txt",
      icon: "assets/3d icon/3D Glass Bookmark Icon.png",
    },
    {
      title: "打牌",
      meta: "TXT",
      file: "assets/portfolio/打牌.txt",
      type: "txt",
      icon: "assets/3d icon/3D Glass Bookmark Icon.png",
    },
    {
      title: "Dating App",
      meta: "TXT",
      file: "assets/portfolio/Dating App.txt",
      type: "txt",
      icon: "assets/3d icon/3D Glass Bookmark Icon.png",
    },
    {
      title: "十月",
      meta: "TXT",
      file: "assets/portfolio/十月.txt",
      type: "txt",
      icon: "assets/3d icon/3D Glass Bookmark Icon.png",
    },
    {
      title: "她",
      meta: "TXT",
      file: "assets/portfolio/她.txt",
      type: "txt",
      icon: "assets/3d icon/3D Glass Bookmark Icon.png",
    },
    {
      title: "熬",
      meta: "TXT",
      file: "assets/portfolio/熬.txt",
      type: "txt",
      icon: "assets/3d icon/3D Glass Bookmark Icon.png",
    },
    {
      title: "系统",
      meta: "TXT",
      file: "assets/portfolio/系统.txt",
      type: "txt",
      icon: "assets/3d icon/3D Glass Bookmark Icon.png",
    },
    {
      title: "Shy lover",
      meta: "TXT",
      file: "assets/portfolio/Shy lover.txt",
      type: "txt",
      icon: "assets/3d icon/3D Glass Bookmark Icon.png",
    },
    {
      title: "你想找刺激吗",
      meta: "TXT",
      file: "assets/portfolio/你想找刺激吗.txt",
      type: "txt",
      icon: "assets/3d icon/3D Glass Bookmark Icon.png",
    },
    {
      title: "ta",
      meta: "TXT",
      file: "assets/portfolio/ta.txt",
      type: "txt",
      icon: "assets/3d icon/3D Glass Bookmark Icon.png",
    },
    {
      title: "生辰",
      meta: "TXT",
      file: "assets/portfolio/生辰.txt",
      type: "txt",
      icon: "assets/3d icon/3D Glass Bookmark Icon.png",
    },
    {
      title: "古树",
      meta: "TXT",
      file: "assets/portfolio/古树.txt",
      type: "txt",
      icon: "assets/3d icon/3D Glass Bookmark Icon.png",
    },
  ],
};

const qs = (selector) => document.querySelector(selector);

const applyConfig = () => {
  document.title = siteConfig.head.title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", siteConfig.head.description);

  qs("#introTitle").textContent = siteConfig.intro.title;
  qs("#introSubtitle").textContent = siteConfig.intro.subtitle;
  qs("#enterBtn").textContent = siteConfig.intro.enterLabel;

  qs("#mainName").textContent = siteConfig.main.name;
  qs("#mainSignature").textContent = siteConfig.main.signature;
  qs("#avatar").textContent = siteConfig.main.avatarText;

  const linksEl = qs("#links");
  linksEl.innerHTML = "";
  siteConfig.main.links.forEach((link) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = link.href;
    a.target = "_blank";
    a.rel = "noreferrer";
    if (link.action === "portfolio") {
      a.target = "_self";
      a.rel = "";
      a.dataset.action = "portfolio";
    }
    const icon = document.createElement("span");
    icon.className = "link-icon";
    const iconKey = (link.label || "").toLowerCase();
    const iconMap = {
      portfolio: "assets/3d icon/3D Glass Bookmark Icon.png",
      email: "assets/3d icon/3D Blue Envelope Icon.png",
      linkedin: "assets/3d icon/Translucent L Object.png",
      instagram: "assets/3d icon/Blue Heart in Cube.png",
    };
    const iconSrc = iconMap[iconKey];
    if (iconSrc) {
      const img = document.createElement("img");
      img.src = iconSrc;
      img.alt = link.label;
      img.decoding = "async";
      icon.appendChild(img);
    } else {
      icon.textContent = (link.label || "?").slice(0, 2);
    }
    const label = document.createElement("span");
    label.textContent = link.label;
    a.append(icon, label);
    li.append(a);
    linksEl.append(li);
  });
};

const initTransitions = () => {
  const enterBtn = qs("#enterBtn");
  const backBtn = qs("#backBtn");
  const portfolioBackBtn = qs("#portfolioBackBtn");
  let smokeyInitialized = false;
  const tryInitSmokey = () => {
    if (smokeyInitialized) return;
    const ok = initSmokeyFluidCursor();
    if (ok) smokeyInitialized = true;
  };

  // Enable smokey effect on the intro screen too.
  tryInitSmokey();

  enterBtn.addEventListener("click", () => {
    document.body.classList.add("view-main");
    if (!smokeyInitialized) {
      const ok = initSmokeyFluidCursor();
      if (!ok) {
        let tries = 0;
        const retry = setInterval(() => {
          tries += 1;
          if (initSmokeyFluidCursor() || tries > 10) {
            clearInterval(retry);
          }
        }, 200);
      }
      smokeyInitialized = true;
    }
  });
  const goBack = () => {
    if (history.length > 1) {
      history.back();
      return;
    }
    document.body.classList.remove("view-portfolio");
    document.body.classList.remove("view-main");
  };

  backBtn.addEventListener("click", goBack);
  if (portfolioBackBtn) {
    portfolioBackBtn.addEventListener("click", goBack);
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const actionEl = target.closest("[data-action='portfolio']");
    if (!actionEl) return;
    event.preventDefault();
    document.body.classList.add("view-portfolio");
  });
};

const initIntroVideo = () => {
  const introVideo = qs("#introVideo");
  if (!introVideo) return;
  introVideo.muted = true;
  introVideo.defaultMuted = true;
  introVideo.playsInline = true;
  introVideo.autoplay = true;
  introVideo.loop = true;
  introVideo.setAttribute("muted", "");
  introVideo.setAttribute("playsinline", "");
  introVideo.setAttribute("webkit-playsinline", "");
  introVideo.load();

  const tryPlay = () => introVideo.play().catch(() => {});
  tryPlay();
  introVideo.addEventListener("loadeddata", tryPlay, { once: true });
  window.addEventListener("click", tryPlay, { once: true });
};

const initFluid = () => {
  const canvas = qs("#fluid");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const blobs = [
    { x: 0.2, y: 0.3, r: 220, vx: 0.0008, vy: 0.0006, hue: 350 },
    { x: 0.7, y: 0.4, r: 260, vx: -0.0006, vy: 0.0005, hue: 355 },
    { x: 0.4, y: 0.75, r: 240, vx: 0.0005, vy: -0.0007, hue: 0 },
  ];

  const resize = () => {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";
    blobs.forEach((blob) => {
      blob.x += blob.vx;
      blob.y += blob.vy;
      if (blob.x < -0.2 || blob.x > 1.2) blob.vx *= -1;
      if (blob.y < -0.2 || blob.y > 1.2) blob.vy *= -1;

      const cx = blob.x * window.innerWidth;
      const cy = blob.y * window.innerHeight;
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, blob.r);
      gradient.addColorStop(0, `hsla(${blob.hue}, 78%, 60%, 0.4)`);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, blob.r, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalCompositeOperation = "source-over";
    requestAnimationFrame(draw);
  };

  resize();
  window.addEventListener("resize", resize);
  draw();
};

const initSmokeyFluidCursor = () => {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  if (!window.SmokyFluid || !window.SmokyFluid.initFluid) return false;

  window.SmokyFluid.initFluid({
    id: "smokey-fluid-canvas",
    transparent: true,
    shading: true,
    dyeResolution: 1024,
    splatRadius: 0.35,
    splatForce: 4500,
    colorUpdateSpeed: 4,
  });

  const canvas = document.getElementById("smokey-fluid-canvas");
  if (canvas) {
    canvas.style.zIndex = "2";
    canvas.style.pointerEvents = "none";
  }
  return true;
};

applyConfig();
initTransitions();
initFluid();
initIntroVideo();

const buildPortfolio = () => {
  const grid = qs("#portfolioGrid");
  if (!grid) return;
  grid.innerHTML = "";
  siteConfig.portfolio.forEach((item) => {
    const card = document.createElement("a");
    card.className = "bento-card";
    if (item.size === "wide") card.classList.add("bento-card--wide");
    const params = new URLSearchParams({
      file: item.file,
      type: item.type,
      title: item.title,
    });
    card.href = `portfolio.html?${params.toString()}`;
    card.target = "_self";
    card.rel = "";

    const icon = document.createElement("span");
    icon.className = "bento-icon";
    if (item.icon) {
      const img = document.createElement("img");
      img.src = item.icon;
      img.alt = item.title;
      img.decoding = "async";
      icon.appendChild(img);
    }

    const title = document.createElement("span");
    title.className = "bento-title";
    title.textContent = item.title;

    const meta = document.createElement("span");
    meta.className = "bento-meta";
    meta.textContent = item.meta;

    card.append(icon, title, meta);
    grid.appendChild(card);
  });
};

buildPortfolio();
