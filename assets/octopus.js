(() => {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  const canvas = document.getElementById("readerOctopus");
  const reader = document.querySelector(".reader");

  if (!canvas || !reader || type === "pdf") return;

  const ctx = canvas.getContext("2d");
  let time = 0;
  let frameId = 0;

  const resize = () => {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(window.innerWidth * pixelRatio));
    canvas.height = Math.max(1, Math.round(window.innerHeight * pixelRatio));
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const drawPoint = (x, y, t, centerX, centerY) => {
    const k = 9 * Math.cos(x / 8);
    const e = y / 8 - 12.5;
    const d = Math.hypot(k, e) ** 2 / 99 + Math.sin(t) / 6 + 0.5;
    const c = d / 2 + e / 69 - t / 16;
    const q = 99 - (e * Math.sin(Math.atan2(k, e) * 7)) / d + k * (3 + Math.cos(d * d - t) * 2);
    const pointX = q * Math.sin(c) + centerX;
    const pointY = (q + 19 * d) * Math.cos(c) + centerY;
    ctx.fillRect(pointX, pointY, 1.15, 1.15);
  };

  const draw = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    time += Math.PI / 45;

    ctx.clearRect(0, 0, width, height);

    const colors = [
      "rgba(247, 244, 234, 0.86)",
      "rgba(222, 217, 226, 0.84)",
      "rgba(192, 185, 221, 0.82)",
      "rgba(128, 161, 212, 0.82)",
      "rgba(117, 201, 200, 0.84)",
    ];

    for (let i = 10000; i > 0; i -= 1) {
      if (i % 2500 === 0) ctx.fillStyle = colors[(i / 2500) % colors.length];
      drawPoint(i % 200, i / 55, time, width / 2, height / 2);
    }

    frameId = requestAnimationFrame(draw);
  };

  const start = () => {
    cancelAnimationFrame(frameId);
    resize();
    draw();
  };

  window.addEventListener("resize", start);
  start();
})();
