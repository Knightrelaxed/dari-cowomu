/**
 * ==========================================================================
 * MIDNIGHT APOLOGY — THE ULTIMATE ROMANTIC EDITION (HARDCODED FOR DEVELOPER)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- HARDCODED DEVELOPER CONFIG ---
  const WA_NUMBER = '6285742594985'; // 085742594985

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

  window.addEventListener('resize', resizeAmbientCanvas);
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
    '"Aku di sini menemani setiap detak napasmu..."',
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

  // --- STATE 4: THE NIGHT SKY ---
  const starsStage = document.getElementById('stars-stage');
  const constellationPrompt = document.getElementById('constellation-prompt');
  const starCountNum = document.getElementById('star-count-num');
  let constellationPoints = [];

  if (starsStage) {
    starsStage.addEventListener('click', (e) => {
      spawnShootingStarAndConstellation(e);
    });
  }

  function spawnShootingStarAndConstellation(e) {
    if (!starsStage) return;
    const rect = starsStage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    starsStage.appendChild(star);

    const node = document.createElement('div');
    node.className = 'constellation-star';
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    starsStage.appendChild(node);

    constellationPoints.push({ x, y });

    if (starCountNum) {
      starCountNum.textContent = Math.min(3, constellationPoints.length);
    }

    if (constellationPoints.length > 1) {
      drawConstellationLines();
    }

    if (constellationPoints.length >= 3 && constellationPrompt) {
      constellationPrompt.innerHTML = `<span>💖 Rasi Bintang Cinta Kita Telah Terhubung Sempurna!</span>`;
      constellationPrompt.style.background = 'linear-gradient(135deg, rgba(244, 211, 94, 0.25), rgba(255, 139, 167, 0.25))';
      constellationPrompt.style.borderColor = 'var(--accent-gold)';
    }

    if (navigator.vibrate) navigator.vibrate(15);

    setTimeout(() => {
      star.remove();
    }, 1000);
  }

  function drawConstellationLines() {
    let svg = starsStage.querySelector('svg.constellation-line');
    if (!svg) {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'constellation-line');
      starsStage.appendChild(svg);
    }

    svg.innerHTML = '';
    for (let i = 0; i < constellationPoints.length - 1; i++) {
      const p1 = constellationPoints[i];
      const p2 = constellationPoints[i + 1];
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', p1.x);
      line.setAttribute('y1', p1.y);
      line.setAttribute('x2', p2.x);
      line.setAttribute('y2', p2.y);
      line.setAttribute('stroke', 'rgba(244, 211, 94, 0.65)');
      line.setAttribute('stroke-width', '1.8');
      line.setAttribute('stroke-dasharray', '4 2');
      svg.appendChild(line);
    }

    if (constellationPoints.length >= 3) {
      const pFirst = constellationPoints[0];
      const pLast = constellationPoints[constellationPoints.length - 1];
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', pLast.x);
      line.setAttribute('y1', pLast.y);
      line.setAttribute('x2', pFirst.x);
      line.setAttribute('y2', pFirst.y);
      line.setAttribute('stroke', 'rgba(255, 139, 167, 0.65)');
      line.setAttribute('stroke-width', '1.8');
      svg.appendChild(line);
    }
  }

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
      const message = `Halo sayang, aku udah baca surat permintaan maafmu 🥺💖\n\nAku pilih kupon ini:\n🎁 *${selectedCoupon.title}*\n🔑 Kode: ${selectedCoupon.code}\n📝 "${selectedCoupon.desc}"\n\nMakasih ya udah mau minta maaf dan janji bakal lebih peka & inisiatif bujuk aku pas ngambek. Aku sayang kamu!`;
      
      const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
    });
  }

  const btnReplay = document.getElementById('btn-replay');
  if (btnReplay) {
    btnReplay.addEventListener('click', () => {
      constellationPoints = [];
      const svg = starsStage ? starsStage.querySelector('svg.constellation-line') : null;
      if (svg) svg.innerHTML = '';
      const existingStars = starsStage ? starsStage.querySelectorAll('.constellation-star') : [];
      existingStars.forEach(s => s.remove());
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
