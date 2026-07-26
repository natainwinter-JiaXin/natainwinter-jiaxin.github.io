(() => {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  const canvas = document.getElementById("readerOctopus");

  if (!canvas || type === "pdf") return;

  const ctx = canvas.getContext("2d");
  let time = 0;
  let frameId = 0;

  const resize = () => {
    const size = Math.max(120, Math.round(canvas.clientWidth || 180));
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * pixelRatio;
    canvas.height = size * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const drawPoint = (x, y, t, scale, offsetX, offsetY) => {
    const k = 9 * Math.cos(x / 8);
    const e = y / 8 - 12.5;
    const d = Math.hypot(k, e) ** 2 / 99 + Math.sin(t) / 6 + 0.5;
    const c = d / 2 + e / 69 - t / 16;
    const q = 99 - (e * Math.sin(Math.atan2(k, e) * 7)) / d + k * (3 + Math.cos(d * d - t) * 2);
    const pointX = (q * Math.sin(c) + 200) * scale + offsetX;
    const pointY = ((q + 19 * d) * Math.cos(c) + 200) * scale + offsetY;
    ctx.fillRect(pointX, pointY, 1.15, 1.15);
  };

  const draw = () => {
    const size = canvas.clientWidth || 180;
    time += Math.PI / 45;

    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = "rgba(31, 43, 58, 0.24)";

    const scale = size / 400;
    const swimX = Math.sin(time / 24) * size * 0.08;
    const swimY = Math.cos(time / 31) * size * 0.06;

    for (let i = 10000; i > 0; i -= 1) {
      drawPoint(i % 200, i / 55, time, scale, swimX, swimY);
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
