/**
 * ==========================================================================
 * MIDNIGHT APOLOGY — THE ULTIMATE ROMANTIC EDITION (HARDCODED FOR DEVELOPER)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- HARDCODED DEVELOPER CONFIG ---
  const WA_NUMBER = '6285742594985'; // 085742594985
  const MAX_STARS = 10; // 10 Constellation Stars (5 taps each = 50 taps total)

  let currentStep = 1;
  let selectedCoupon = {
    code: 'LDR-SURVIVOR-01',
    title: 'Surat Rahasia 💌',
    desc: 'Buatin aku surat panjang buat dibaca pas aman & kangen'
  };

  // --- AMBIENT COSMIC BACKGROUND CANVAS (Retina DPI Optimized) ---
  const ambientCanvas = document.getElementById('ambient-canvas');
  const ambientCtx = ambientCanvas.getContext('2d');
  let ambientParticles = [];

  function resizeAmbientCanvas() {
    const dpr = window.devicePixelRatio || 1;
    ambientCanvas.width = window.innerWidth * dpr;
    ambientCanvas.height = window.innerHeight * dpr;
    ambientCtx.scale(dpr, dpr);
    initAmbientParticles();
  }

  function initAmbientParticles() {
    ambientParticles = [];
    const count = Math.floor((window.innerWidth * window.innerHeight) / 11000);
    for (let i = 0; i < Math.min(count, 85); i++) {
      ambientParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.7 + 0.2,
        speedAlpha: (Math.random() * 0.015 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
        vy: -Math.random() * 0.25 - 0.05
      });
    }
  }

  function animateAmbient() {
    ambientCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let p of ambientParticles) {
      p.y += p.vy;
      if (p.y < 0) p.y = window.innerHeight;
      p.alpha += p.speedAlpha;
      if (p.alpha > 0.85) p.speedAlpha *= -1;
      if (p.alpha < 0.15) p.speedAlpha *= -1;

      ambientCtx.beginPath();
      ambientCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ambientCtx.fillStyle = `rgba(180, 220, 255, ${p.alpha})`;
      ambientCtx.fill();
    }
    requestAnimationFrame(animateAmbient);
  }

  window.addEventListener('resize', () => {
    resizeAmbientCanvas();
    initSkyCanvas();
  });
  resizeAmbientCanvas();
  animateAmbient();

  // --- STATE TRANSITION SYSTEM ---
  const screens = document.querySelectorAll('.state-screen');
  const stepDots = document.querySelectorAll('.step-dot');

  function goToState(targetStep) {
    if (targetStep === currentStep) return;
    
    screens.forEach(s => s.classList.remove('active'));
    
    const targetScreen = document.getElementById(`state-${targetStep}`);
    if (targetScreen) {
      targetScreen.classList.add('active');
    }

    stepDots.forEach(dot => {
      const stepNum = parseInt(dot.getAttribute('data-step'), 10);
      dot.classList.remove('active', 'completed');
      if (stepNum === targetStep) {
        dot.classList.add('active');
      } else if (stepNum < targetStep) {
        dot.classList.add('completed');
      }
    });

    currentStep = targetStep;

    if (targetStep === 2) {
      setTimeout(initFogCanvas, 150);
    }
    if (targetStep === 4) {
      setTimeout(() => {
        initSkyCanvas();
      }, 80);
    }
  }

  // --- STATE 1: THE CALMING BREATH ---
  const breatheOrb = document.getElementById('breathe-orb');
  const orbProgressCircle = document.getElementById('orb-progress-circle');
  const phaseLabel = document.getElementById('breathe-phase-label');
  const breatheInstruction = document.getElementById('breathe-instruction');
  const cycleStatusText = document.getElementById('cycle-status-text');
  const quoteText = document.getElementById('breathe-quote-text');

  let isPressing = false;
  let pressStartTime = 0;
  let breathAnimFrame = null;
  let completedCycles = 0;
  const INHALE_MS = 4000;
  const EXHALE_MS = 4000;
  const CYCLE_TOTAL_MS = INHALE_MS + EXHALE_MS;
  const CIRCUMFERENCE = 465;

  const inhaleQuotes = [
    '"Tarik napas perlahan... kamu aman di sini..."',
    '"Aku di sini menemani setiap detak napasmu sayang..."',
    '"Satu napas lagi, lepaskan semua sesak di dadamu..."'
  ];
  const exhaleQuotes = [
    '"Hembuskan rasa cemas dan kesalmu pelan-pelan..."',
    '"Biar aku yang memeluk erat dan bujuk kamu malam ini..."',
    '"Rileks... kamu berhak tenang dan bahagia..."'
  ];

  function startBreathing(e) {
    if (completedCycles >= 3) return;
    e.preventDefault();
    isPressing = true;
    pressStartTime = performance.now();
    breatheOrb.classList.add('inhaling');
    runBreathLoop();
  }

  function stopBreathing() {
    if (!isPressing) return;
    isPressing = false;
    if (breathAnimFrame) cancelAnimationFrame(breathAnimFrame);
    breatheOrb.classList.remove('inhaling', 'exhaling');
    orbProgressCircle.style.strokeDashoffset = CIRCUMFERENCE;

    if (completedCycles < 3) {
      phaseLabel.textContent = 'Sentuh & Tahan';
      breatheInstruction.textContent = 'Tekan & tahan layar';
      if (quoteText) quoteText.textContent = '"Sentuh dan tahan bola cahaya di bawah ini..."';
    }
  }

  function runBreathLoop() {
    if (!isPressing) return;

    const elapsed = performance.now() - pressStartTime;
    const cycleProgress = (elapsed % CYCLE_TOTAL_MS) / CYCLE_TOTAL_MS;
    const phaseElapsed = elapsed % CYCLE_TOTAL_MS;
    const cycleIdx = Math.min(2, completedCycles);

    if (phaseElapsed < INHALE_MS) {
      breatheOrb.classList.add('inhaling');
      breatheOrb.classList.remove('exhaling');
      const secondsLeft = Math.ceil((INHALE_MS - phaseElapsed) / 1000);
      phaseLabel.textContent = 'Tarik Napas...';
      breatheInstruction.textContent = `${secondsLeft} detik perlahan`;
      if (quoteText && inhaleQuotes[cycleIdx]) quoteText.textContent = inhaleQuotes[cycleIdx];
    } else {
      breatheOrb.classList.remove('inhaling');
      breatheOrb.classList.add('exhaling');
      const secondsLeft = Math.ceil((CYCLE_TOTAL_MS - phaseElapsed) / 1000);
      phaseLabel.textContent = 'Hembuskan...';
      breatheInstruction.textContent = `Lepaskan cemasmu (${secondsLeft}s)`;
      if (quoteText && exhaleQuotes[cycleIdx]) quoteText.textContent = exhaleQuotes[cycleIdx];
    }

    const offset = CIRCUMFERENCE - (cycleProgress * CIRCUMFERENCE);
    orbProgressCircle.style.strokeDashoffset = offset;

    const currentTotalCycles = Math.floor(elapsed / CYCLE_TOTAL_MS);
    if (currentTotalCycles > completedCycles && completedCycles < 3) {
      completedCycles = currentTotalCycles;
      markCycleCompleted(completedCycles);
    }

    if (completedCycles >= 3) {
      isPressing = false;
      breatheOrb.classList.remove('inhaling', 'exhaling');
      phaseLabel.textContent = 'Tenang & Rileks';
      breatheInstruction.textContent = 'Pikiranmu sudah lebih rileks 💖';
      if (quoteText) quoteText.textContent = '"Terima kasih sudah bertahan, sayangku."';
      if (navigator.vibrate) navigator.vibrate([40, 60, 40]);

      setTimeout(() => {
        goToState(2);
      }, 1200);
      return;
    }

    breathAnimFrame = requestAnimationFrame(runBreathLoop);
  }

  function markCycleCompleted(num) {
    const pill = document.getElementById(`cycle-${num}`);
    if (pill) {
      pill.classList.add('done');
    }
    if (navigator.vibrate) navigator.vibrate(30);

    const msgs = [
      'Bagus sekali sayang, rasakan napasmu tenang...',
      'Satu siklus lagi, lepaskan semua cemas dan overthinking di kepalamu...',
      'Sempurna sayangku... Bersiap melihat suratmu ✨'
    ];
    if (cycleStatusText && msgs[num - 1]) {
      cycleStatusText.textContent = msgs[num - 1];
    }
  }

  if (breatheOrb) {
    breatheOrb.addEventListener('mousedown', startBreathing);
    breatheOrb.addEventListener('touchstart', startBreathing, { passive: false });
    window.addEventListener('mouseup', stopBreathing);
    window.addEventListener('touchend', stopBreathing);
    window.addEventListener('touchcancel', stopBreathing);
  }

  const btnSkipState1 = document.getElementById('btn-skip-state-1');
  if (btnSkipState1) {
    btnSkipState1.addEventListener('click', () => goToState(2));
  }

  // --- STATE 2: THE FOGGY GLASS ---
  const fogCanvas = document.getElementById('fog-canvas');
  const fogWrapper = document.getElementById('foggy-wrapper');
  const wipeFill = document.getElementById('wipe-fill');
  const fogActionRow = document.getElementById('fog-action-row');
  const wipeHint = document.getElementById('wipe-hint');
  let fogCtx = null;
  let isWiping = false;
  let fogCleared = false;

  function initFogCanvas() {
    if (!fogCanvas || !fogWrapper || fogCleared) return;
    const rect = fogWrapper.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    fogCanvas.width = rect.width * dpr;
    fogCanvas.height = rect.height * dpr;
    fogCtx = fogCanvas.getContext('2d');
    fogCtx.scale(dpr, dpr);

    fogCtx.fillStyle = 'rgba(145, 175, 215, 0.9)';
    fogCtx.fillRect(0, 0, rect.width, rect.height);

    fogCtx.fillStyle = 'rgba(230, 245, 255, 0.45)';
    for (let i = 0; i < 110; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const r = Math.random() * 4 + 1;
      fogCtx.beginPath();
      fogCtx.arc(x, y, r, 0, Math.PI * 2);
      fogCtx.fill();
    }
  }

  function getCanvasPos(e) {
    const rect = fogCanvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
  }

  function eraseFogAt(x, y) {
    if (!fogCtx || fogCleared) return;
    fogCtx.globalCompositeOperation = 'destination-out';
    const grad = fogCtx.createRadialGradient(x, y, 6, x, y, 46);
    grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
    grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.85)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    fogCtx.fillStyle = grad;
    fogCtx.beginPath();
    fogCtx.arc(x, y, 46, 0, Math.PI * 2);
    fogCtx.fill();
  }

  let lastCheckTime = 0;
  function checkWipedPercentage() {
    const now = performance.now();
    if (now - lastCheckTime < 220) return;
    lastCheckTime = now;

    if (!fogCtx || fogCleared) return;
    const imageData = fogCtx.getImageData(0, 0, fogCanvas.width, fogCanvas.height);
    const pixels = imageData.data;
    let transparentCount = 0;
    const totalPixels = pixels.length / 4;

    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] < 128) {
        transparentCount++;
      }
    }

    const percentage = Math.min(100, Math.floor((transparentCount / (totalPixels / 4)) * 100));
    if (wipeFill) wipeFill.style.width = `${percentage}%`;

    if (percentage > 50) {
      clearAllFog();
    }
  }

  function clearAllFog() {
    if (fogCleared) return;
    fogCleared = true;
    fogCanvas.style.opacity = '0';
    if (wipeHint) wipeHint.style.opacity = '0';

    if (wipeFill) wipeFill.style.width = '100%';

    setTimeout(() => {
      fogCanvas.style.display = 'none';
      if (fogActionRow) {
        fogActionRow.style.opacity = '1';
        fogActionRow.style.pointerEvents = 'auto';
      }
    }, 650);
  }

  if (fogCanvas) {
    const startWipe = (e) => {
      if (fogCleared) return;
      e.preventDefault();
      isWiping = true;
      const pos = getCanvasPos(e);
      eraseFogAt(pos.x, pos.y);
      if (wipeHint) wipeHint.style.opacity = '0';
    };

    const moveWipe = (e) => {
      if (!isWiping || fogCleared) return;
      e.preventDefault();
      const pos = getCanvasPos(e);
      eraseFogAt(pos.x, pos.y);
      checkWipedPercentage();
    };

    const endWipe = () => {
      isWiping = false;
    };

    fogCanvas.addEventListener('mousedown', startWipe);
    fogCanvas.addEventListener('mousemove', moveWipe);
    window.addEventListener('mouseup', endWipe);

    fogCanvas.addEventListener('touchstart', startWipe, { passive: false });
    fogCanvas.addEventListener('touchmove', moveWipe, { passive: false });
    window.addEventListener('touchend', endWipe);
  }

  const btnToState3 = document.getElementById('btn-to-state-3');
  if (btnToState3) {
    btnToState3.addEventListener('click', () => goToState(3));
  }

  // --- STATE 3: THE SECRET VAULT ---
  const couponCards = document.querySelectorAll('.coupon-card');
  const couponFeedback = document.getElementById('coupon-feedback');

  couponCards.forEach(card => {
    card.addEventListener('click', () => {
      couponCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      selectedCoupon.code = card.getAttribute('data-code');
      selectedCoupon.title = card.getAttribute('data-title');
      selectedCoupon.desc = card.getAttribute('data-desc');

      if (couponFeedback) {
        function escapeHTML(str) {
          if (!str) return '';
          return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
        }
        couponFeedback.innerHTML = `<p style="color: var(--primary);">Kupon terpilih: <strong>${escapeHTML(selectedCoupon.title)}</strong> ✨</p>`;
      }

      const chosenTitle = document.getElementById('chosen-title');
      const chosenCode = document.getElementById('chosen-code');
      if (chosenTitle) chosenTitle.textContent = selectedCoupon.title;
      if (chosenCode) chosenCode.textContent = `KODE: ${selectedCoupon.code}`;

      if (navigator.vibrate) navigator.vibrate(40);

      setTimeout(() => {
        goToState(4);
      }, 650);
    });
  });

  // --- STATE 4: THE NIGHT SKY (10 STARS MINI-GAME — 5 TAPS PER STAR) ---
  const skyCanvas = document.getElementById('sky-canvas');
  const starsStage = document.getElementById('stars-stage');
  let skyCtx = null;
  const constellationStatusText = document.getElementById('constellation-status-text');
  const starCountNum = document.getElementById('star-count-num');
  const skyTouchPrompt = document.getElementById('sky-touch-prompt');
  
  let skyStars = [];
  let constellationNodes = [];
  let shootingStars = [];
  let tapSparkles = [];
  let skyAnimId = null;
  let skyTapCount = 0; // 5 taps per star node (up to MAX_STARS = 10)

  function initSkyCanvas() {
    if (!skyCanvas) return;
    skyCtx = skyCanvas.getContext('2d');
    const stage = document.getElementById('stars-stage');
    const dpr = window.devicePixelRatio || 1;
    const width = (stage && stage.clientWidth > 50 ? stage.clientWidth : 360);
    const height = (stage && stage.clientHeight > 50 ? stage.clientHeight : 260);

    skyCanvas.width = width * dpr;
    skyCanvas.height = height * dpr;
    skyCtx.scale(dpr, dpr);

    skyStars = [];
    for (let i = 0; i < 55; i++) {
      skyStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.5,
        alpha: Math.random() * 0.7 + 0.25,
        dAlpha: (Math.random() * 0.018 + 0.005) * (Math.random() < 0.5 ? 1 : -1)
      });
    }

    if (!skyAnimId) {
      animateSky();
    }
  }

  function animateSky() {
    if (!skyCtx || !skyCanvas) return;
    const dpr = window.devicePixelRatio || 1;
    const width = skyCanvas.width / dpr;
    const height = skyCanvas.height / dpr;

    skyCtx.clearRect(0, 0, width, height);

    // 1. Draw twinkling background stars
    for (let s of skyStars) {
      s.alpha += s.dAlpha;
      if (s.alpha > 0.88 || s.alpha < 0.15) s.dAlpha *= -1;
      skyCtx.beginPath();
      skyCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      skyCtx.fillStyle = `rgba(185, 220, 255, ${s.alpha})`;
      skyCtx.fill();
    }

    // 2. Draw constellation lines
    if (constellationNodes.length > 1) {
      skyCtx.strokeStyle = 'rgba(244, 211, 94, 0.75)';
      skyCtx.lineWidth = 2;
      skyCtx.setLineDash([5, 3]);
      skyCtx.beginPath();
      for (let i = 0; i < constellationNodes.length; i++) {
        const p = constellationNodes[i];
        if (i === 0) skyCtx.moveTo(p.x, p.y);
        else skyCtx.lineTo(p.x, p.y);
      }
      skyCtx.stroke();
      skyCtx.setLineDash([]);

      // Closing pink line when all 10 stars are completed
      if (constellationNodes.length >= MAX_STARS) {
        const first = constellationNodes[0];
        const last = constellationNodes[constellationNodes.length - 1];
        skyCtx.strokeStyle = 'rgba(255, 139, 167, 0.85)';
        skyCtx.lineWidth = 2.2;
        skyCtx.beginPath();
        skyCtx.moveTo(last.x, last.y);
        skyCtx.lineTo(first.x, first.y);
        skyCtx.stroke();
      }
    }

    // 3. Draw constellation nodes (glowing gold stars)
    for (let n of constellationNodes) {
      n.pulse = (n.pulse || 0) + 0.06;
      const glowR = 13 + Math.sin(n.pulse) * 3;

      const grad = skyCtx.createRadialGradient(n.x, n.y, 2, n.x, n.y, glowR);
      grad.addColorStop(0, 'rgba(244, 211, 94, 1)');
      grad.addColorStop(0.4, 'rgba(244, 211, 94, 0.45)');
      grad.addColorStop(1, 'rgba(244, 211, 94, 0)');

      skyCtx.fillStyle = grad;
      skyCtx.beginPath();
      skyCtx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
      skyCtx.fill();

      skyCtx.fillStyle = '#FFFFFF';
      skyCtx.beginPath();
      skyCtx.arc(n.x, n.y, 3, 0, Math.PI * 2);
      skyCtx.fill();
    }

    // 4. Draw touch burst sparkles
    for (let i = tapSparkles.length - 1; i >= 0; i--) {
      const sp = tapSparkles[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.alpha -= 0.035;

      if (sp.alpha <= 0) {
        tapSparkles.splice(i, 1);
        continue;
      }

      skyCtx.fillStyle = `rgba(${sp.color}, ${sp.alpha})`;
      skyCtx.beginPath();
      skyCtx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
      skyCtx.fill();
    }

    // 5. Draw falling shooting stars (DOWNWARDS diagonally)
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const sh = shootingStars[i];
      sh.x += sh.vx;
      sh.y += sh.vy;
      sh.alpha -= 0.022;

      if (sh.alpha <= 0) {
        shootingStars.splice(i, 1);
        continue;
      }

      const tailX = sh.x - sh.vx * 7;
      const tailY = sh.y - sh.vy * 7;

      const grad = skyCtx.createLinearGradient(sh.x, sh.y, tailX, tailY);
      grad.addColorStop(0, `rgba(255, 255, 255, ${sh.alpha})`);
      grad.addColorStop(0.3, `rgba(72, 202, 228, ${sh.alpha * 0.7})`);
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      skyCtx.strokeStyle = grad;
      skyCtx.lineWidth = 2.2;
      skyCtx.beginPath();
      skyCtx.moveTo(sh.x, sh.y);
      skyCtx.lineTo(tailX, tailY);
      skyCtx.stroke();

      skyCtx.fillStyle = `rgba(255, 255, 255, ${sh.alpha})`;
      skyCtx.beginPath();
      skyCtx.arc(sh.x, sh.y, 2, 0, Math.PI * 2);
      skyCtx.fill();
    }

    skyAnimId = requestAnimationFrame(animateSky);
  }

  let lastTapTime = 0;
  function handleSkyTap(e) {
    if (!skyCanvas) return;
    const now = performance.now();
    if (now - lastTapTime < 140) return; // Debounce Android/iOS multi-trigger
    lastTapTime = now;

    const stage = document.getElementById('stars-stage');
    const rect = (stage || skyCanvas).getBoundingClientRect();
    
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = Math.max(10, Math.min(rect.width - 10, clientX - rect.left));
    const y = Math.max(10, Math.min(rect.height - 10, clientY - rect.top));

    if (skyTouchPrompt) {
      skyTouchPrompt.style.opacity = '0';
    }

    // 1. Every tap launches a shooting star downwards
    shootingStars.push({
      x: x,
      y: y,
      vx: 4.5,
      vy: 4.5,
      alpha: 1.0
    });

    // 2. Spawn playful sparkles at touch point
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2.5 + 0.5;
      tapSparkles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: Math.random() * 2 + 1,
        alpha: 1.0,
        color: Math.random() < 0.5 ? '244, 211, 94' : '72, 202, 228'
      });
    }

    // 3. Increment tap counter & evaluate 5-tap rule up to MAX_STARS (10)
    if (constellationNodes.length < MAX_STARS) {
      skyTapCount++;

      if (skyTapCount % 5 === 0) {
        // Form a permanent constellation star point!
        constellationNodes.push({ x, y, pulse: 0 });
        if (navigator.vibrate) navigator.vibrate([30, 50, 30]);

        if (starCountNum) {
          starCountNum.textContent = `⭐ ${constellationNodes.length} / ${MAX_STARS}`;
        }

        if (constellationNodes.length < MAX_STARS && constellationStatusText) {
          constellationStatusText.innerHTML = `🌟 Bintang ke-${constellationNodes.length} Bersinar! Sentuh 5x lagi untuk Bintang ke-${constellationNodes.length + 1}`;
          constellationStatusText.style.color = 'var(--accent-gold)';
        } else if (constellationNodes.length === MAX_STARS && constellationStatusText) {
          constellationStatusText.innerHTML = `💖 Rasi ${MAX_STARS} Bintang Cinta Kita Terhubung Sempurna!`;
          constellationStatusText.style.color = 'var(--accent-gold)';
        }
      } else {
        // Progress toward next star
        const remaining = 5 - (skyTapCount % 5);
        const nextStarNumber = constellationNodes.length + 1;
        if (constellationStatusText) {
          constellationStatusText.innerHTML = `💫 ${remaining} sentuhan lagi untuk membentuk Bintang ke-${nextStarNumber}...`;
          constellationStatusText.style.color = 'var(--primary)';
        }
        if (navigator.vibrate) navigator.vibrate(12);
      }
    } else {
      // Extra celebratory shooting stars after all 10 stars are completed
      if (navigator.vibrate) navigator.vibrate(12);
    }
  }

  const targets = [starsStage, skyCanvas].filter(Boolean);
  targets.forEach(el => {
    el.addEventListener('click', handleSkyTap);
    el.addEventListener('touchstart', (e) => {
      e.preventDefault();
      handleSkyTap(e);
    }, { passive: false });
  });

  initSkyCanvas();

  // Star Wish Quote Generator
  const btnPickStar = document.getElementById('btn-pick-star');
  const starWishOutput = document.getElementById('star-wish-output');
  const romanticWishes = [
    '"Maafin aku yang kurang inisiatif ya sayang, aku janji bakal lebih peka."',
    '"Mulai sekarang, tiap kamu ngambek, aku yang akan pertama datang buat bujuk kamu."',
    '"Kamu adalah satu-satunya rumah terindah untuk pulang."',
    '"Senyummu selalu jadi penyemangat terbesarku setiap hari."',
    '"Kamu berhak dapet perhatian penuh dan kelembutan dariku setiap hari."'
  ];

  if (btnPickStar && starWishOutput) {
    btnPickStar.addEventListener('click', () => {
      const randomWish = romanticWishes[Math.floor(Math.random() * romanticWishes.length)];
      starWishOutput.style.opacity = '0';
      setTimeout(() => {
        starWishOutput.textContent = randomWish;
        starWishOutput.style.opacity = '1';
      }, 200);
    });
  }

  // Final WhatsApp Sending CTA (Hardcoded direct to 085742594985 -> 6285742594985)
  const btnSendWa = document.getElementById('btn-send-wa');
  if (btnSendWa) {
    btnSendWa.addEventListener('click', () => {
      const message = `Halo sayang, aku udah baca surat permintaan maafmu 🥺💖\n\nAku pilih kupon ini:\n🎁 *${selectedCoupon.title}* (${selectedCoupon.code})\n📝 "${selectedCoupon.desc}"\n\nMakasih ya udah mau minta maaf dengan tulus dan janji bakal lebih peka & inisiatif bujuk aku pas ngambek. Aku sayang kamu!`;
      
      const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
    });
  }

  const btnReplay = document.getElementById('btn-replay');
  if (btnReplay) {
    btnReplay.addEventListener('click', () => {
      constellationNodes = [];
      shootingStars = [];
      tapSparkles = [];
      skyTapCount = 0;
      if (starCountNum) starCountNum.textContent = `⭐ 0 / ${MAX_STARS}`;
      if (constellationStatusText) {
        constellationStatusText.textContent = '✨ Sentuh langit 5x untuk membentuk Bintang ke-1 dari 10';
        constellationStatusText.style.color = 'var(--text-main)';
      }
      if (skyTouchPrompt) {
        skyTouchPrompt.style.opacity = '1';
      }
      goToState(1);
    });
  }

  stepDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const step = parseInt(dot.getAttribute('data-step'), 10);
      goToState(step);
    });
  });
});
