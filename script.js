/**
 * ==========================================================================
 * MIDNIGHT APOLOGY — FULL CUSTOMIZATION ENGINE & iPHONE OPTIMIZED
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- STATE & DEFAULT TEMPLATE SETTINGS ---
  let currentStep = 1;
  let selectedCoupon = {
    code: 'LDR-SURVIVOR-01',
    title: 'Surat Rahasia 💌',
    desc: 'Buatin aku surat panjang buat dibaca pas aman & kangen'
  };

  const DEFAULT_CONFIG = {
    waNumber: '6281234567890',
    partnerName: 'Sayang',
    senderName: 'Cowokmu',
    salutation: 'Maafin aku ya, Sayang...',
    mainMessage: 'Aku telat peka. Pas kamu lagi butuh ditenangin, aku malah mikir kejauhan dan lupa buat sekadar hadir sepenuhnya buat kamu.\n\nMalam ini, biar aku yang nanggung semua overthinking-nya. Kamu cukup istirahat, peluk gulingmu, dan izinkan aku tetap menemani kamu dengan cara yang paling membuatmu nyaman.',
    customNote: ''
  };

  const config = { ...DEFAULT_CONFIG };

  // Load URL parameters or LocalStorage
  function loadConfig() {
    const params = new URLSearchParams(window.location.search);
    config.partnerName = params.get('name') || localStorage.getItem('apology_partner_name') || DEFAULT_CONFIG.partnerName;
    config.senderName = params.get('sender') || localStorage.getItem('apology_sender_name') || DEFAULT_CONFIG.senderName;
    config.waNumber = params.get('wa') || localStorage.getItem('apology_wa_number') || DEFAULT_CONFIG.waNumber;
    config.salutation = params.get('salut') || localStorage.getItem('apology_salutation') || DEFAULT_CONFIG.salutation;
    config.mainMessage = params.get('msg') || localStorage.getItem('apology_main_message') || DEFAULT_CONFIG.mainMessage;
    config.customNote = params.get('note') || localStorage.getItem('apology_custom_note') || DEFAULT_CONFIG.customNote;

    applyConfigToUI();
    populateModalInputs();
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // Apply config to visible DOM elements dynamically
  function applyConfigToUI() {
    // 1. Greeting in State 1
    const displayGreeting = document.getElementById('display-greeting');
    if (displayGreeting) {
      displayGreeting.innerHTML = `Halo ${escapeHTML(config.partnerName)}, <br><span class="accent-text">Tarik Napas Sebentar Ya...</span>`;
    }

    // 2. Sender Name in State 2 letter
    const displaySender = document.getElementById('display-sender-name');
    if (displaySender) {
      displaySender.textContent = config.senderName;
    }

    // 3. Salutation in State 2 letter
    const letterSalutation = document.getElementById('letter-salutation-text');
    if (letterSalutation) {
      letterSalutation.textContent = config.salutation || `Maafin aku ya, ${config.partnerName}...`;
    }

    // 4. Main Apology Body in State 2 letter
    const letterMainBody = document.getElementById('letter-main-body');
    if (letterMainBody && config.mainMessage) {
      const paragraphs = config.mainMessage.split(/\n+/).filter(p => p.trim());
      letterMainBody.innerHTML = paragraphs.map(p => `<p class="letter-body">${escapeHTML(p.trim())}</p>`).join('');
    }

    // 5. Custom Note Box in State 2 letter
    const customNoteBox = document.getElementById('custom-note-box');
    const customNoteText = document.getElementById('custom-note-text');
    if (customNoteBox && customNoteText) {
      if (config.customNote && config.customNote.trim()) {
        customNoteText.textContent = `"${config.customNote.trim()}"`;
        customNoteBox.style.display = 'block';
      } else {
        customNoteBox.style.display = 'none';
      }
    }

    updateShareLink();
  }

  function populateModalInputs() {
    const inputWa = document.getElementById('input-wa');
    const inputPartner = document.getElementById('input-partner-name');
    const inputSender = document.getElementById('input-sender-name');
    const inputSalutation = document.getElementById('input-salutation');
    const inputMainMessage = document.getElementById('input-main-message');
    const inputNote = document.getElementById('input-custom-note');

    if (inputWa) inputWa.value = config.waNumber;
    if (inputPartner) inputPartner.value = config.partnerName;
    if (inputSender) inputSender.value = config.senderName;
    if (inputSalutation) inputSalutation.value = config.salutation;
    if (inputMainMessage) inputMainMessage.value = config.mainMessage;
    if (inputNote) inputNote.value = config.customNote;
  }

  function updateShareLink() {
    const shareInput = document.getElementById('share-url-input');
    if (!shareInput) return;
    const url = new URL(window.location.href.split('?')[0]);
    url.searchParams.set('name', config.partnerName);
    url.searchParams.set('sender', config.senderName);
    url.searchParams.set('wa', config.waNumber);
    if (config.salutation && config.salutation !== DEFAULT_CONFIG.salutation) {
      url.searchParams.set('salut', config.salutation.trim());
    }
    if (config.mainMessage && config.mainMessage !== DEFAULT_CONFIG.mainMessage) {
      url.searchParams.set('msg', config.mainMessage.trim());
    }
    if (config.customNote && config.customNote.trim()) {
      url.searchParams.set('note', config.customNote.trim());
    }
    shareInput.value = url.toString();
  }

  loadConfig();

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
    '"Satu napas lagi, sayangku yang paling berharga..."'
  ];
  const exhaleQuotes = [
    '"Hembuskan rasa sakit dan cemasmu pelan-pelan..."',
    '"Biar aku yang memeluk erat semua bebanmu malam ini..."',
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
      breatheInstruction.textContent = `Lepaskan sakitnya (${secondsLeft}s)`;
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
      breatheInstruction.textContent = 'Tubuhmu sudah rileks 💖';
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
      'Satu siklus lagi, lepaskan semua ketegangan di perutmu...',
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
  const constellationCounter = document.getElementById('constellation-counter');
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

    if (constellationPoints.length > 1) {
      drawConstellationLines();
    }

    if (constellationPoints.length >= 3 && constellationCounter) {
      constellationCounter.innerHTML = `<span>💖 Rasi Bintang Cinta Kita Terhubung!</span>`;
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
    '"Kamu adalah satu-satunya rumah terindah untuk pulang."',
    '"Aku janji akan lebih peka dan selalu ada saat kamu butuh."',
    '"Senyummu selalu jadi penyemangat terbesarku setiap hari."',
    '"Nyeri perutmu biar aku yang doain hilang malam ini ya sayangku."',
    '"Kamu perempuan terkuat, tercantik, dan paling berharga buatku."'
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

  // Final WhatsApp Sending CTA
  const btnSendWa = document.getElementById('btn-send-wa');
  if (btnSendWa) {
    btnSendWa.addEventListener('click', () => {
      const cleanNumber = config.waNumber.replace(/[^0-9]/g, '');
      const message = `Halo ${config.partnerName}, aku udah buka web permintaan maaf dari kamu (${config.senderName}) 🥺💖\n\nAku pilih kupon ini:\n🎁 *${selectedCoupon.title}*\n🔑 Kode: ${selectedCoupon.code}\n📝 "${selectedCoupon.desc}"\n\nMakasih ya udah peduli sama perutku dan pikiranku malam ini. Aku sayang kamu!`;
      
      const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
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

  // --- SETTINGS MODAL INTERACTION ---
  const settingsModal = document.getElementById('settings-modal');
  const btnOpenSettings = document.getElementById('btn-open-settings');
  const btnCloseSettings = document.getElementById('btn-close-settings');
  const btnSaveSettings = document.getElementById('btn-save-settings');
  const btnResetSettings = document.getElementById('btn-reset-settings');
  const btnCopyLink = document.getElementById('btn-copy-link');
  const copyFeedbackText = document.getElementById('copy-feedback-text');
  const settingsToast = document.getElementById('settings-toast');

  if (btnOpenSettings) {
    btnOpenSettings.addEventListener('click', () => {
      populateModalInputs();
      updateShareLink();
      settingsModal.classList.add('active');
      settingsModal.setAttribute('aria-hidden', 'false');
    });
  }

  function closeModal() {
    settingsModal.classList.remove('active');
    settingsModal.setAttribute('aria-hidden', 'true');
  }

  if (btnCloseSettings) btnCloseSettings.addEventListener('click', closeModal);

  if (btnSaveSettings) {
    btnSaveSettings.addEventListener('click', () => {
      const inputWa = document.getElementById('input-wa').value.trim();
      const inputPartner = document.getElementById('input-partner-name').value.trim();
      const inputSender = document.getElementById('input-sender-name').value.trim();
      const inputSalutation = document.getElementById('input-salutation').value.trim();
      const inputMainMessage = document.getElementById('input-main-message').value.trim();
      const inputNote = document.getElementById('input-custom-note').value.trim();

      config.waNumber = inputWa || DEFAULT_CONFIG.waNumber;
      config.partnerName = inputPartner || DEFAULT_CONFIG.partnerName;
      config.senderName = inputSender || DEFAULT_CONFIG.senderName;
      config.salutation = inputSalutation || DEFAULT_CONFIG.salutation;
      config.mainMessage = inputMainMessage || DEFAULT_CONFIG.mainMessage;
      config.customNote = inputNote;

      localStorage.setItem('apology_wa_number', config.waNumber);
      localStorage.setItem('apology_partner_name', config.partnerName);
      localStorage.setItem('apology_sender_name', config.senderName);
      localStorage.setItem('apology_salutation', config.salutation);
      localStorage.setItem('apology_main_message', config.mainMessage);
      localStorage.setItem('apology_custom_note', config.customNote);

      applyConfigToUI();

      if (settingsToast) {
        settingsToast.textContent = '✅ Berhasil! Surat & pesan di halaman 1 dan 2 langsung terperbarui.';
        settingsToast.style.display = 'block';
        setTimeout(() => {
          settingsToast.style.display = 'none';
          closeModal();
        }, 1600);
      } else {
        closeModal();
      }
    });
  }

  if (btnResetSettings) {
    btnResetSettings.addEventListener('click', () => {
      localStorage.removeItem('apology_wa_number');
      localStorage.removeItem('apology_partner_name');
      localStorage.removeItem('apology_sender_name');
      localStorage.removeItem('apology_salutation');
      localStorage.removeItem('apology_main_message');
      localStorage.removeItem('apology_custom_note');

      Object.assign(config, DEFAULT_CONFIG);
      populateModalInputs();
      applyConfigToUI();

      if (settingsToast) {
        settingsToast.textContent = '🔄 Berhasil direset ke template default!';
        settingsToast.style.display = 'block';
        setTimeout(() => {
          settingsToast.style.display = 'none';
        }, 2000);
      }
    });
  }

  if (btnCopyLink) {
    btnCopyLink.addEventListener('click', () => {
      const shareInput = document.getElementById('share-url-input');
      if (!shareInput) return;
      shareInput.select();
      navigator.clipboard.writeText(shareInput.value).then(() => {
        copyFeedbackText.textContent = '✓ Link khusus berhasil disalin! Kirimkan ke pacarmu sekarang.';
        setTimeout(() => {
          copyFeedbackText.textContent = '';
        }, 3500);
      });
    });
  }

  stepDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const step = parseInt(dot.getAttribute('data-step'), 10);
      goToState(step);
    });
  });
});
