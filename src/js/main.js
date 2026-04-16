// ============================
// 情緒風暴生存戰 - 主程式
// ============================

// ---- 遊戲狀態 ----
const state = {
  levelIndex: 0,
  score: 0,
  calm: 100,
  correctCount: 0,
  timerId: null,
  timeLeft: 0,
  locked: false // 防止重複點擊
};

// ---- DOM 捷徑 ----
const $ = (id) => document.getElementById(id);

const screens = {
  start: $('start-screen'),
  game: $('game-screen'),
  end: $('end-screen')
};

// ---- 畫面切換 ----
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ---- 天空變色（依情緒） ----
function setSkyMood(emotion) {
  const sky = $('sky');
  sky.className = 'sky';
  const moodMap = {
    '焦慮': 'mood-anxious',
    '憤怒': 'mood-angry',
    '悲傷': 'mood-sad',
    '受傷': 'mood-sad',
    '挫折': 'mood-angry',
    '羞愧': 'mood-sad',
    '混亂': 'mood-chaos'
  };
  sky.classList.add(moodMap[emotion] || 'mood-anxious');
}

// ---- 重置遊戲狀態 ----
function resetGame() {
  state.levelIndex = 0;
  state.score = 0;
  state.calm = 100;
  state.correctCount = 0;
  state.locked = false;
  updateHUD();
}

// ---- 更新 HUD ----
function updateHUD() {
  $('level-value').textContent = `${state.levelIndex + 1} / 10`;
  $('score-value').textContent = state.score;

  const bar = $('calm-bar');
  bar.style.width = state.calm + '%';
  bar.classList.remove('warning', 'danger');
  if (state.calm <= 30) bar.classList.add('danger');
  else if (state.calm <= 60) bar.classList.add('warning');
}

// ---- 載入關卡 ----
function loadLevel(index) {
  const scenario = SCENARIOS[index];
  if (!scenario) {
    endGame(true);
    return;
  }

  state.locked = false;
  state.timeLeft = scenario.time;

  // 更新畫面
  setSkyMood(scenario.emotion);
  $('emotion-tag').textContent = scenario.emotion;
  $('situation-text').textContent = scenario.situation;
  $('storm-cloud').textContent = scenario.stormEmoji;
  $('storm-cloud').className = 'storm-cloud';

  // 選項（打亂順序）
  const shuffled = shuffleOptions(scenario.options);
  const optionBtns = document.querySelectorAll('.option-btn');
  optionBtns.forEach((btn, i) => {
    btn.textContent = shuffled[i].text;
    btn.dataset.correct = shuffled[i].correct ? 'true' : 'false';
    btn.className = 'option-btn';
    btn.disabled = false;
  });

  // 隱藏 feedback
  $('feedback').classList.add('hidden');

  // 啟動計時器
  startTimer(scenario.time);
  updateHUD();
}

// ---- 洗牌選項 ----
function shuffleOptions(options) {
  const arr = [...options];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ---- 計時器 ----
function startTimer(totalSeconds) {
  clearInterval(state.timerId);
  const bar = $('timer-bar');
  const text = $('timer-text');
  const startTime = Date.now();
  const totalMs = totalSeconds * 1000;

  state.timerId = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const remainMs = Math.max(0, totalMs - elapsed);
    const remainSec = remainMs / 1000;
    state.timeLeft = remainSec;

    const percent = (remainMs / totalMs) * 100;
    bar.style.width = percent + '%';
    text.textContent = remainSec.toFixed(1);

    if (percent <= 30) bar.classList.add('urgent');
    else bar.classList.remove('urgent');

    if (remainMs <= 0) {
      clearInterval(state.timerId);
      handleTimeout();
    }
  }, 50);
}

function stopTimer() {
  clearInterval(state.timerId);
}

// ---- 答對處理 ----
function handleCorrect(btn, scenario) {
  if (state.locked) return;
  state.locked = true;
  stopTimer();

  // 標示按鈕
  btn.classList.add('correct');
  document.querySelectorAll('.option-btn').forEach(b => {
    b.disabled = true;
    if (b !== btn) b.classList.add('fade');
  });

  // 計分（基礎分 + 時間加成）
  const timeBonus = Math.floor(state.timeLeft * 10);
  const gained = 100 + timeBonus;
  state.score += gained;
  state.correctCount += 1;

  // 風暴消散動畫
  $('storm-cloud').classList.add('defeated');
  spawnSparkles();

  updateHUD();

  // 顯示回饋
  showFeedback(true, scenario.tip, `+${gained} 分`);

  setTimeout(nextLevel, 2000);
}

// ---- 答錯處理 ----
function handleWrong(btn, scenario) {
  if (state.locked) return;
  state.locked = true;
  stopTimer();

  btn.classList.add('wrong');
  document.querySelectorAll('.option-btn').forEach(b => {
    b.disabled = true;
    if (b.dataset.correct === 'true') b.classList.add('correct');
    else if (b !== btn) b.classList.add('fade');
  });

  // 扣冷靜值
  state.calm = Math.max(0, state.calm - 20);

  // 風暴攻擊動畫 + 螢幕震動
  $('storm-cloud').classList.add('attack');
  document.body.classList.add('shake');
  setTimeout(() => document.body.classList.remove('shake'), 400);

  updateHUD();

  showFeedback(false, scenario.tip, '冷靜值 -20');

  if (state.calm <= 0) {
    setTimeout(() => endGame(false), 2000);
  } else {
    setTimeout(nextLevel, 2500);
  }
}

// ---- 超時處理 ----
function handleTimeout() {
  if (state.locked) return;
  state.locked = true;

  const scenario = SCENARIOS[state.levelIndex];
  document.querySelectorAll('.option-btn').forEach(b => {
    b.disabled = true;
    if (b.dataset.correct === 'true') b.classList.add('correct');
    else b.classList.add('fade');
  });

  state.calm = Math.max(0, state.calm - 15);

  $('storm-cloud').classList.add('attack');
  document.body.classList.add('shake');
  setTimeout(() => document.body.classList.remove('shake'), 400);

  updateHUD();
  showFeedback(false, scenario.tip, '超時！冷靜值 -15');

  if (state.calm <= 0) {
    setTimeout(() => endGame(false), 2000);
  } else {
    setTimeout(nextLevel, 2500);
  }
}

// ---- 回饋彈窗 ----
function showFeedback(isCorrect, tip, scoreText) {
  const fb = $('feedback');
  const icon = $('feedback-icon');
  const title = $('feedback-title');
  const tipEl = $('feedback-tip');

  if (isCorrect) {
    icon.textContent = '✨';
    title.textContent = '風暴被吹散！';
    title.className = 'feedback-title correct';
  } else {
    icon.textContent = '💥';
    title.textContent = '被風暴打到...';
    title.className = 'feedback-title wrong';
  }

  tipEl.innerHTML = `<strong>💡 ${scoreText}</strong><br><br>${tip}`;
  fb.classList.remove('hidden');
}

// ---- 粒子特效 ----
function spawnSparkles() {
  const container = $('particles');
  container.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle sparkle';
    const angle = (Math.PI * 2 * i) / 20;
    const distance = 80 + Math.random() * 60;
    p.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
    p.style.setProperty('--dy', Math.sin(angle) * distance + 'px');
    p.style.left = '50%';
    p.style.top = '50%';
    container.appendChild(p);
    setTimeout(() => p.remove(), 800);
  }
}

// ---- 下一關 ----
function nextLevel() {
  state.levelIndex += 1;
  if (state.levelIndex >= SCENARIOS.length) {
    endGame(true);
  } else {
    loadLevel(state.levelIndex);
  }
}

// ---- 遊戲結束 ----
function endGame(completed) {
  stopTimer();

  // 計算最大可能分數（用來算百分比）
  const maxPossible = SCENARIOS.reduce((sum, s) => sum + 100 + s.time * 10, 0);
  const percent = Math.round((state.score / maxPossible) * 100);

  // 找對應報告
  const report = REPORTS.find(r => percent >= r.minPercent) || REPORTS[REPORTS.length - 1];

  $('report-weather').textContent = report.weather;
  $('report-title').textContent = report.title;
  $('report-message').textContent = completed
    ? report.message
    : `冷靜值被風暴擊穿了，但沒關係！${report.message}`;
  $('final-score').textContent = state.score;
  $('final-calm').textContent = state.calm;
  $('final-correct').textContent = `${state.correctCount} / 10`;

  showScreen('end');
}

// ---- 事件綁定 ----
document.addEventListener('DOMContentLoaded', () => {
  // 開始按鈕
  $('start-btn').addEventListener('click', () => {
    resetGame();
    showScreen('game');
    loadLevel(0);
  });

  // 重玩按鈕
  $('restart-btn').addEventListener('click', () => {
    resetGame();
    showScreen('game');
    loadLevel(0);
  });

  // 選項點擊
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (state.locked) return;
      const scenario = SCENARIOS[state.levelIndex];
      if (btn.dataset.correct === 'true') {
        handleCorrect(btn, scenario);
      } else {
        handleWrong(btn, scenario);
      }
    });
  });
});
