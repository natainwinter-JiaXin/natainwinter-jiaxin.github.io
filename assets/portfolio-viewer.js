const syncViewportHeight = () => {
  document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
};

const initViewer = async () => {
  syncViewportHeight();
  window.addEventListener("resize", syncViewportHeight);
  window.addEventListener("orientationchange", syncViewportHeight);
  window.scrollTo(0, 0);

  const params = new URLSearchParams(location.search);
  const file = params.get("file");
  const type = params.get("type");
  const title = params.get("title");

  const titleEl = document.getElementById("readerTitle");
  const bodyEl = document.getElementById("readerBody");

  if (!bodyEl) return;
  if (title && titleEl) titleEl.textContent = title;

  const backBtn = document.getElementById("readerBackBtn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (history.length > 1) {
        history.back();
      } else {
        location.href = "index.html#portfolio";
      }
    });
  }

  const showError = (msg) => {
    bodyEl.innerHTML = `<p class="reader-error">${msg}</p>`;
  };

  const stripRtf = (rtf) => {
    let text = rtf;
    text = text.replace(/\\par[d]?/g, "\n");
    text = text.replace(/\\'[0-9a-fA-F]{2}/g, (match) => {
      const hex = match.slice(2);
      const code = parseInt(hex, 16);
      return String.fromCharCode(code);
    });
    text = text.replace(/\\[a-zA-Z]+-?\d* ?/g, "");
    text = text.replace(/[{}]/g, "");
    text = text.replace(/\n{3,}/g, "\n\n");
    return text.trim();
  };

  const cacheBustedUrl = (path) => {
    const url = new URL(encodeURI(path), window.location.href);
    url.searchParams.set("_", Date.now());
    return url.href;
  };

  const renderText = (content) => {
    const pre = document.createElement("pre");
    pre.className = "reader-text";
    pre.textContent = content;
    bodyEl.appendChild(pre);
  };

  const fileUrl = file ? cacheBustedUrl(file) : "";
  const prefersNativePdfViewer =
    window.matchMedia("(pointer: coarse)").matches || window.innerWidth <= 600;

  if (!file || !type) {
    showError("未找到作品文件。");
    return;
  }

  if (type === "pdf") {
    if (prefersNativePdfViewer) {
      location.replace(fileUrl);
    } else {
      const embed = document.createElement("embed");
      embed.className = "reader-embed";
      embed.src = fileUrl;
      embed.type = "application/pdf";
      bodyEl.appendChild(embed);
    }
  } else if (type === "txt") {
    try {
      const res = await fetch(fileUrl);
      const text = await res.text();
      renderText(text);
    } catch (error) {
      const frame = document.createElement("iframe");
      frame.className = "reader-embed";
      frame.src = fileUrl;
      bodyEl.appendChild(frame);
    }
  } else if (type === "rtf") {
    try {
      const res = await fetch(fileUrl);
      const rtf = await res.text();
      renderText(stripRtf(rtf));
    } catch (error) {
      const frame = document.createElement("iframe");
      frame.className = "reader-embed";
      frame.src = fileUrl;
      bodyEl.appendChild(frame);
    }
  } else {
    showError("不支持的文件类型。");
    return;
  }

  const progressBar = document.getElementById("scrollProgress");
  if (progressBar) {
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = scrollPercent + "%";
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    requestAnimationFrame(updateProgress);
  }
};

if (document.readyState === "complete") {
  initViewer();
} else {
  window.addEventListener("load", initViewer);
}
