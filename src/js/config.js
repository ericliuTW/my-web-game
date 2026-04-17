// Supabase 連線設定（evolution-game 專案）
const SUPABASE_URL = 'https://sitpdtvutggsoowhxrqy.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_8Yt1fFIG8FrTEypOG353ew_IYBlAJgS';
const LEADERBOARD_TABLE = 'emotion_storm_scores';

// 初始化 Supabase 客戶端
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
