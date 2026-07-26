(() => {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  const canvas = document.getElementById("readerOctopus");
  const reader = document.querySelector(".reader");
  const body = document.getElementById("readerBody");

  if (!canvas || !reader || type === "pdf") return;

  const ctx = canvas.getContext("2d");
  let time = 0;
  let frameId = 0;
  let position = { x: 0, y: 0 };
  let velocity = { x: 0, y: 0 };

  const resize = () => {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(window.innerWidth * pixelRatio));
    canvas.height = Math.max(1, Math.round(window.innerHeight * pixelRatio));
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const randomSpeed = () => {
    const speed = 0.28 + Math.random() * 0.48;
    return Math.random() < 0.5 ? -speed : speed;
  };

  const getRandomOpenSpot = (size) => {
    const margin = size * 0.58 + 12;
    return {
      x: margin + Math.random() * Math.max(1, window.innerWidth - margin * 2),
      y: margin + Math.random() * Math.max(1, window.innerHeight - margin * 2),
    };
  };

  const keepInBounds = (point, size) => {
    const margin = size * 0.58 + 12;
    return {
      x: Math.min(Math.max(point.x, margin), window.innerWidth - margin),
      y: Math.min(Math.max(point.y, margin), window.innerHeight - margin),
    };
  };

  const wander = (size) => {
    if (!position.x || !position.y) {
      position = getRandomOpenSpot(size);
    }

    if (!velocity.x || !velocity.y) {
      velocity = { x: randomSpeed(), y: randomSpeed() };
    }

    if (Math.random() < 0.012) {
      velocity.x += (Math.random() - 0.5) * 0.08;
      velocity.y += (Math.random() - 0.5) * 0.08;
    }

    const maxSpeed = 0.9;
    velocity.x = Math.min(Math.max(velocity.x, -maxSpeed), maxSpeed);
    velocity.y = Math.min(Math.max(velocity.y, -maxSpeed), maxSpeed);

    const margin = size * 0.58 + 12;
    const nextPosition = {
      x: position.x + velocity.x,
      y: position.y + velocity.y,
    };

    if (nextPosition.x <= margin || nextPosition.x >= window.innerWidth - margin) {
      velocity.x *= -1;
      nextPosition.x = Math.min(Math.max(nextPosition.x, margin), window.innerWidth - margin);
    }

    if (nextPosition.y <= margin || nextPosition.y >= window.innerHeight - margin) {
      velocity.y *= -1;
      nextPosition.y = Math.min(Math.max(nextPosition.y, margin), window.innerHeight - margin);
    }

    position = keepInBounds(nextPosition, size);

    return {
      x: position.x + Math.sin(time / 15) * size * 0.08,
      y: position.y + Math.cos(time / 19) * size * 0.07,
    };
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
    const width = window.innerWidth;
    const height = window.innerHeight;
    const octopusSize = Math.min(Math.max(width * 0.12, 124), 220);
    time += Math.PI / 45;

    ctx.clearRect(0, 0, width, height);

    const spot = wander(octopusSize);
    const swimX = Math.sin(time / 18) * octopusSize * 0.12;
    const swimY = Math.cos(time / 25) * octopusSize * 0.1;
    const originX = spot.x - octopusSize / 2 + swimX;
    const originY = spot.y - octopusSize / 2 + swimY;
    const scale = octopusSize / 400;
    const glow = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, octopusSize * 0.68);

    glow.addColorStop(0, "rgba(247, 244, 234, 0.74)");
    glow.addColorStop(0.32, "rgba(222, 217, 226, 0.44)");
    glow.addColorStop(0.58, "rgba(192, 185, 221, 0.34)");
    glow.addColorStop(0.82, "rgba(117, 201, 200, 0.24)");
    glow.addColorStop(1, "rgba(128, 161, 212, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(spot.x, spot.y, octopusSize * 0.68, 0, Math.PI * 2);
    ctx.fill();

    const colors = [
      "rgba(247, 244, 234, 0.86)",
      "rgba(222, 217, 226, 0.84)",
      "rgba(192, 185, 221, 0.82)",
      "rgba(128, 161, 212, 0.82)",
      "rgba(117, 201, 200, 0.84)",
    ];

    for (let i = 10000; i > 0; i -= 1) {
      if (i % 2500 === 0) ctx.fillStyle = colors[(i / 2500) % colors.length];
      drawPoint(i % 200, i / 55, time, scale, originX, originY);
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
