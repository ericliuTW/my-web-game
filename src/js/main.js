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
  locked: false,
  // 玩家資訊
  player: { className: '', name: '', seat: 0 },
  // 當前難度
  difficulty: 'normal',
  // 當前使用的題組（依難度選）
  activeScenarios: SCENARIOS_NORMAL,
  // 排行榜當前顯示的難度分頁
  leaderboardTab: 'easy',
  // 這位玩家已挑戰過的難度（從 Supabase 查）
  playedDifficulties: [],
  // 遊戲開始時的時間戳（毫秒），用來計算總遊玩時間
  gameStartTime: 0
};

// ---- DOM 捷徑 ----
const $ = (id) => document.getElementById(id);

const screens = {
  start: $('start-screen'),
  info: $('info-screen'),
  difficulty: $('difficulty-screen'),
  game: $('game-screen'),
  end: $('end-screen'),
  leaderboard: $('leaderboard-screen'),
  history: $('history-screen')
};

// ---- 畫面切換 ----
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
  window.scrollTo(0, 0);
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
  const scenario = state.activeScenarios[index];
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

  btn.classList.add('correct');
  document.querySelectorAll('.option-btn').forEach(b => {
    b.disabled = true;
    if (b !== btn) b.classList.add('fade');
  });

  // 難度加成：簡單 x1 / 普通 x1.5 / 困難 x2
  const diffMultiplier = { easy: 1, normal: 1.5, hard: 2 }[state.difficulty] || 1;
  const timeBonus = Math.floor(state.timeLeft * 10);
  const baseGain = 100 + timeBonus;
  const gained = Math.round(baseGain * diffMultiplier);
  state.score += gained;
  state.correctCount += 1;

  $('storm-cloud').classList.add('defeated');
  spawnSparkles();

  updateHUD();
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

  state.calm = Math.max(0, state.calm - 20);

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

  const scenario = state.activeScenarios[state.levelIndex];
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
  if (state.levelIndex >= state.activeScenarios.length) {
    endGame(true);
  } else {
    loadLevel(state.levelIndex);
  }
}

// ---- 遊戲結束 ----
async function endGame(completed) {
  stopTimer();

  // 計算遊戲總時長（秒，保留 2 位小數）
  const durationSec = state.gameStartTime
    ? Math.round((Date.now() - state.gameStartTime) / 10) / 100
    : 0;

  // 計算最大可能分數（含難度加成）
  const diffMultiplier = { easy: 1, normal: 1.5, hard: 2 }[state.difficulty] || 1;
  const maxPossible = state.activeScenarios.reduce(
    (sum, s) => sum + Math.round((100 + s.time * 10) * diffMultiplier), 0
  );
  const percent = Math.round((state.score / maxPossible) * 100);
  const report = REPORTS.find(r => percent >= r.minPercent) || REPORTS[REPORTS.length - 1];

  $('report-weather').textContent = report.weather;
  $('report-title').textContent = report.title;
  $('report-message').textContent = completed
    ? report.message
    : `冷靜值被風暴擊穿了，但沒關係！${report.message}`;
  $('final-score').textContent = state.score;
  $('final-calm').textContent = state.calm;
  $('final-correct').textContent = `${state.correctCount} / 10`;

  // 顯示玩家摘要
  $('player-summary').textContent =
    `🎓 ${state.player.className} | ${state.player.seat}號 ${state.player.name}`;

  // 顯示難度徽章
  const diffInfo = DIFFICULTY_LABELS[state.difficulty];
  $('difficulty-badge').textContent = `${diffInfo.emoji} ${diffInfo.name}模式`;

  showScreen('end');

  // 上傳成績（含總時長）
  await submitScore(completed, report.title, durationSec);
}

// ---- 上傳成績到 Supabase ----
async function submitScore(completed, weatherTitle, durationSec = 0) {
  const status = $('submit-status');
  status.className = 'submit-status';
  status.textContent = '📤 成績上傳中...';

  try {
    const { error } = await supabaseClient
      .from(LEADERBOARD_TABLE)
      .insert({
        class_name: state.player.className,
        student_name: state.player.name,
        seat_number: state.player.seat,
        difficulty: state.difficulty,
        score: state.score,
        calm_remaining: state.calm,
        correct_count: state.correctCount,
        completed: completed,
        weather_title: weatherTitle,
        duration_seconds: durationSec
      });

    if (error) throw error;

    const diffName = DIFFICULTY_LABELS[state.difficulty].name;
    status.className = 'submit-status success';
    status.textContent = `✅ 成績已上傳到「${diffName}」排行榜！`;
  } catch (err) {
    console.error('上傳失敗：', err);
    status.className = 'submit-status error';
    status.textContent = '⚠️ 上傳失敗，請檢查網路';
  }
}

// ---- 載入排行榜（依當前難度分頁） ----
async function loadLeaderboard() {
  const list = $('leaderboard-list');
  list.innerHTML = '<div class="loading">📊 載入中...</div>';

  try {
    const { data, error } = await supabaseClient
      .from(LEADERBOARD_TABLE)
      .select('*')
      .eq('difficulty', state.leaderboardTab)
      .order('score', { ascending: false })
      .order('calm_remaining', { ascending: false })
      .limit(50);

    if (error) throw error;

    if (!data || data.length === 0) {
      const diffName = DIFFICULTY_LABELS[state.leaderboardTab].name;
      list.innerHTML = `<div class="empty-board">「${diffName}」難度還沒有人挑戰！<br>你可以成為第一人 🎮</div>`;
      return;
    }

    list.innerHTML = '';
    data.forEach((row, idx) => {
      const rank = idx + 1;
      const isMe = state.player.name &&
                   row.student_name === state.player.name &&
                   row.class_name === state.player.className;

      const medalText =
        rank === 1 ? '🥇' :
        rank === 2 ? '🥈' :
        rank === 3 ? '🥉' : rank;

      const medalClass =
        rank === 1 ? 'gold' :
        rank === 2 ? 'silver' :
        rank === 3 ? 'bronze' : '';

      const div = document.createElement('div');
      div.className = `rank-row ${medalClass} ${isMe ? 'me' : ''}`;
      div.innerHTML = `
        <div class="rank-medal">${medalText}</div>
        <div class="rank-info">
          <div class="rank-name">${escapeHTML(row.student_name)}${isMe ? ' (你)' : ''}</div>
          <div class="rank-class">${escapeHTML(row.class_name)} · ${row.seat_number}號 · ${row.weather_title || ''} · 冷靜值 ${row.calm_remaining}</div>
        </div>
        <div class="rank-score">
          <div class="rank-score-value">${row.score}</div>
          <div class="rank-score-label">分</div>
        </div>
      `;
      list.appendChild(div);
    });
  } catch (err) {
    console.error('讀取排行榜失敗：', err);
    list.innerHTML = '<div class="empty-board">⚠️ 無法載入排行榜<br>請檢查網路連線</div>';
  }
}

// ---- 防 XSS：跳脫 HTML ----
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ---- 查詢此玩家已玩過的難度 ----
async function fetchPlayedDifficulties(className, name, seat) {
  try {
    const { data, error } = await supabaseClient
      .from(LEADERBOARD_TABLE)
      .select('difficulty')
      .eq('class_name', className)
      .eq('student_name', name)
      .eq('seat_number', seat);
    if (error) throw error;
    // 去重，回傳陣列 e.g. ['easy', 'hard']
    return [...new Set((data || []).map(r => r.difficulty))];
  } catch (err) {
    console.error('查詢紀錄失敗：', err);
    // 查失敗 → 當作沒玩過，不擋遊戲（避免網路問題卡住同學）
    return [];
  }
}

// ---- 依據玩過紀錄更新難度卡狀態 ----
function updateDifficultyCards() {
  const played = state.playedDifficulties;
  const status = $('play-status');

  // 每張卡：如果玩過 → 加 played class、停用
  document.querySelectorAll('.diff-card').forEach(card => {
    const diff = card.dataset.difficulty;
    const isPlayed = played.includes(diff);
    card.classList.toggle('played', isPlayed);
    card.disabled = isPlayed;

    // 移除舊徽章，避免重複
    const oldBadge = card.querySelector('.played-badge');
    if (oldBadge) oldBadge.remove();

    if (isPlayed) {
      const badge = document.createElement('div');
      badge.className = 'played-badge';
      badge.textContent = '✅ 已挑戰';
      card.appendChild(badge);
    }
  });

  // 更新提示文字
  status.classList.remove('hidden');
  if (played.length === 0) {
    status.classList.add('hidden');
    status.classList.remove('limit-reached');
    status.textContent = '';
  } else if (played.length === 1) {
    const name = DIFFICULTY_LABELS[played[0]].name;
    status.classList.remove('limit-reached');
    status.innerHTML = `✨ 你已玩過「<strong>${name}</strong>」，還可以挑戰其他 <strong>2</strong> 個難度！`;
  } else if (played.length === 2) {
    const names = played.map(d => DIFFICULTY_LABELS[d].name).join('、');
    status.classList.remove('limit-reached');
    status.innerHTML = `🔥 你已玩過「<strong>${names}</strong>」，還剩最後 <strong>1</strong> 個難度！`;
  } else {
    status.classList.add('limit-reached');
    status.innerHTML = `🎉 你已經挑戰過全部 3 個難度囉！太厲害了！<br>想看成績請到排行榜～`;
  }
}

// ---- 載入遊玩紀錄（班級/姓名/座號/日期時間，不顯示分數） ----
async function loadPlayHistory() {
  const list = $('history-list');
  const summary = $('history-summary');
  list.innerHTML = '<div class="loading">📊 載入中...</div>';
  summary.textContent = '';

  try {
    const { data, error } = await supabaseClient
      .from(LEADERBOARD_TABLE)
      .select('class_name, student_name, seat_number, difficulty, created_at, duration_seconds')
      .order('created_at', { ascending: false })
      .limit(500);

    if (error) throw error;

    if (!data || data.length === 0) {
      list.innerHTML = '<div class="empty-board">還沒有人挑戰過～<br>你可以當第一個！ 🎮</div>';
      return;
    }

    // 顯示總場次 + 不重複人數
    const uniqueKeys = new Set(
      data.map(r => `${r.class_name}|${r.student_name}|${r.seat_number}`)
    );
    summary.textContent = `共 ${data.length} 場挑戰 · ${uniqueKeys.size} 位同學參與`;

    list.innerHTML = '';
    data.forEach((row, idx) => {
      const { dateStr, timeStr } = formatDateTime(row.created_at);
      const diffInfo = DIFFICULTY_LABELS[row.difficulty] || { emoji: '⚪', name: '?' };
      // 總遊玩秒數（保留 2 位小數）；舊資料可能為 null，顯示「—」
      const dur = (row.duration_seconds != null)
        ? `⏱️ ${Number(row.duration_seconds).toFixed(2)} 秒`
        : '⏱️ —';

      const div = document.createElement('div');
      div.className = 'history-row';
      div.innerHTML = `
        <div class="history-idx">${idx + 1}</div>
        <div class="history-main">
          <div class="history-name">
            ${escapeHTML(row.student_name)}
            <span class="history-diff">${diffInfo.emoji} ${diffInfo.name}</span>
          </div>
          <div class="history-sub">${escapeHTML(row.class_name)} · ${row.seat_number}號 · <span class="history-duration">${dur}</span></div>
        </div>
        <div class="history-time">
          <div class="history-date">${dateStr}</div>
          <div class="history-clock">${timeStr}</div>
        </div>
      `;
      list.appendChild(div);
    });
  } catch (err) {
    console.error('讀取遊玩紀錄失敗：', err);
    list.innerHTML = '<div class="empty-board">⚠️ 無法載入紀錄<br>請檢查網路連線</div>';
  }
}

// ---- 日期時間格式化（台灣時區） ----
function formatDateTime(isoStr) {
  const d = new Date(isoStr);
  const yy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  return {
    dateStr: `${yy}/${mm}/${dd}`,
    timeStr: `${hh}:${mi}`
  };
}

// ---- 退出遊戲（回首頁） ----
function exitGame() {
  stopTimer();
  state.locked = true;
  $('exit-modal').classList.add('hidden');
  $('feedback').classList.add('hidden');
  showScreen('start');
}

// ============================
// 事件綁定
// ============================
document.addEventListener('DOMContentLoaded', () => {

  // === 開始畫面 ===
  $('start-btn').addEventListener('click', () => {
    showScreen('info');
  });

  $('view-leaderboard-btn').addEventListener('click', () => {
    showScreen('leaderboard');
    loadLeaderboard();
  });

  $('view-history-btn').addEventListener('click', () => {
    showScreen('history');
    loadPlayHistory();
  });

  $('back-home-from-history-btn').addEventListener('click', () => {
    showScreen('start');
  });

  // === 輸入資訊畫面 ===
  $('info-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const className = $('input-class').value.trim();
    const name = $('input-name').value.trim();
    const seat = parseInt($('input-seat').value, 10);

    if (!className || !name || !seat || seat < 1) {
      const err = $('info-error');
      err.textContent = '請填寫完整資料！';
      err.classList.remove('hidden');
      setTimeout(() => err.classList.add('hidden'), 3000);
      return;
    }

    state.player = { className, name, seat };
    $('player-tag').textContent = `🎓 ${className} · ${seat}號 ${name}`;

    // 暫時把按鈕改成「查詢中」
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '⏳ 查詢挑戰紀錄中...';
    submitBtn.disabled = true;

    // 查詢這位玩家玩過哪些難度
    state.playedDifficulties = await fetchPlayedDifficulties(className, name, seat);

    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    // 進入難度選擇畫面
    $('difficulty-greeting').textContent = `${name} 同學，選好難度就開始！`;
    updateDifficultyCards();
    showScreen('difficulty');
  });

  $('info-back-btn').addEventListener('click', () => {
    showScreen('start');
  });

  // === 難度選擇畫面 ===
  document.querySelectorAll('.diff-card').forEach(card => {
    card.addEventListener('click', () => {
      const diff = card.dataset.difficulty;

      // 擋 1：此難度已經玩過
      if (state.playedDifficulties.includes(diff)) {
        const diffName = DIFFICULTY_LABELS[diff].name;
        alert(`你已經挑戰過「${diffName}」囉！請選其他難度～`);
        return;
      }
      // 擋 2：已經玩過全部 3 個難度（防呆，理論上卡片已全部灰掉）
      if (state.playedDifficulties.length >= 3) {
        alert('你已經挑戰過全部 3 個難度囉！無法再玩。');
        return;
      }

      state.difficulty = diff;
      // 從 30 題題庫中隨機抽 10 題、隨機排序
      state.activeScenarios = pickRandomScenarios(diff, 10);
      resetGame();
      // 記錄遊戲開始時間（毫秒），用來算總遊玩時間
      state.gameStartTime = Date.now();
      showScreen('game');
      loadLevel(0);
    });
  });

  $('difficulty-back-btn').addEventListener('click', () => {
    showScreen('info');
  });

  // === 遊戲畫面 ===
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (state.locked) return;
      // 修正：用當前難度的題庫，不再用預設 SCENARIOS
      const scenario = state.activeScenarios[state.levelIndex];
      if (btn.dataset.correct === 'true') {
        handleCorrect(btn, scenario);
      } else {
        handleWrong(btn, scenario);
      }
    });
  });

  // 退出按鈕
  $('exit-btn').addEventListener('click', () => {
    $('exit-modal').classList.remove('hidden');
  });

  $('exit-confirm-yes').addEventListener('click', () => {
    exitGame();
  });

  $('exit-confirm-no').addEventListener('click', () => {
    $('exit-modal').classList.add('hidden');
  });

  // === 結束畫面 ===
  $('view-rank-btn').addEventListener('click', () => {
    // 自動切換到剛玩的難度
    state.leaderboardTab = state.difficulty;
    document.querySelectorAll('.diff-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.difficulty === state.difficulty);
    });
    showScreen('leaderboard');
    loadLeaderboard();
  });

  $('restart-btn').addEventListener('click', async () => {
    // 把剛玩過的難度加進去（先樂觀更新）
    if (!state.playedDifficulties.includes(state.difficulty)) {
      state.playedDifficulties.push(state.difficulty);
    }
    // 再跟 DB 同步一次（確保資料正確）
    const fresh = await fetchPlayedDifficulties(
      state.player.className, state.player.name, state.player.seat
    );
    if (fresh.length > 0) state.playedDifficulties = fresh;

    updateDifficultyCards();
    showScreen('difficulty');
  });

  // === 排行榜畫面 ===
  $('back-home-btn').addEventListener('click', () => {
    showScreen('start');
  });

  // 排行榜難度分頁切換
  document.querySelectorAll('.diff-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.diff-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.leaderboardTab = tab.dataset.difficulty;
      loadLeaderboard();
    });
  });
});
