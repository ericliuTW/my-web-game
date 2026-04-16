// 遊戲情境資料：10 關，每關包含情境、情緒類型、選項、正確答案、時間
const SCENARIOS = [
  {
    level: 1,
    situation: '明天就要期中考了，我心跳好快、一直想到會考不好...',
    emotion: '焦慮',
    stormType: 'thunder',
    stormEmoji: '⛈️',
    time: 10,
    options: [
      { text: '深呼吸5次，把擔心的事寫下來，專注複習重點', correct: true },
      { text: '整晚熬夜狂念，越緊張越睡不著' },
      { text: '假裝沒考試，先打遊戲逃避一下' }
    ],
    tip: '焦慮時，把擔心寫下來可以幫助大腦整理思緒。'
  },
  {
    level: 2,
    situation: '朋友答應要一起去看電影，結果臨時放我鴿子，超氣！',
    emotion: '憤怒',
    stormType: 'lightning',
    stormEmoji: '⚡',
    time: 9,
    options: [
      { text: '馬上在 IG 發限動罵他超沒信用' },
      { text: '冷靜後傳訊息告訴他我的感受，下次希望早點說', correct: true },
      { text: '從此不理他，再也不當朋友' }
    ],
    tip: '表達感受 ≠ 指責。說「我覺得...」比「你很爛...」有效多了。'
  },
  {
    level: 3,
    situation: '數學考卷發下來，比想像中還差很多，好想哭...',
    emotion: '悲傷',
    stormType: 'rain',
    stormEmoji: '🌧️',
    time: 9,
    options: [
      { text: '把考卷揉掉丟進垃圾桶假裝沒看到' },
      { text: '允許自己難過一下，然後找老師討論哪裡可以加強', correct: true },
      { text: '跟爸媽撒謊說這次沒考' }
    ],
    tip: '難過是正常的！哭一下沒關係，重要的是接下來怎麼做。'
  },
  {
    level: 4,
    situation: '再 5 分鐘就要上台報告了，我心跳超快、手一直抖！',
    emotion: '焦慮',
    stormType: 'fog',
    stormEmoji: '🌫️',
    time: 8,
    options: [
      { text: '直接裝病請假逃避上台' },
      { text: '做 4-7-8 呼吸法，告訴自己「記得三個重點就好」', correct: true },
      { text: '一直想像自己搞砸的畫面' }
    ],
    tip: '4-7-8 呼吸：吸氣4秒、憋氣7秒、吐氣8秒，超有效！'
  },
  {
    level: 5,
    situation: '聽到同學在背後說我壞話，胸口像被冰雹打到...',
    emotion: '受傷',
    stormType: 'hail',
    stormEmoji: '💔',
    time: 7,
    options: [
      { text: '衝過去當場跟他吵架' },
      { text: '先深呼吸，找信任的人聊聊，再決定要不要回應', correct: true },
      { text: '自己躲起來哭一整天，不跟任何人說' }
    ],
    tip: '受傷時先找「安全基地」（家人、好友、老師）比硬撐重要。'
  },
  {
    level: 6,
    situation: '爸媽又因為我用手機太久在唸我，超煩！',
    emotion: '憤怒',
    stormType: 'tornado',
    stormEmoji: '🌪️',
    time: 7,
    options: [
      { text: '把門甩上，大聲吼「你們不懂啦！」' },
      { text: '先聽完，等情緒平靜後，約時間好好談需求', correct: true },
      { text: '偷偷把手機藏起來繼續用' }
    ],
    tip: '頂嘴贏不了戰爭。冷靜溝通才能真正改變規則。'
  },
  {
    level: 7,
    situation: '最後一場排名戰輸了，隊友一直在頻道罵我！',
    emotion: '挫折',
    stormType: 'heat',
    stormEmoji: '🔥',
    time: 6,
    options: [
      { text: '回罵回去，然後退出遊戲摔手機' },
      { text: '承認這局的失誤，關掉語音，下局再練', correct: true },
      { text: '整晚一直重播那一局，越想越氣睡不著' }
    ],
    tip: '一場遊戲不代表你。關掉螢幕，明天又是新的一天。'
  },
  {
    level: 8,
    situation: '傳訊息給喜歡的人 3 小時了，已讀不回...',
    emotion: '焦慮',
    stormType: 'snow',
    stormEmoji: '❄️',
    time: 5,
    options: [
      { text: '連發 20 封訊息追問到底為什麼' },
      { text: '放下手機，去做別的事，給彼此空間', correct: true },
      { text: '在限動發酸文暗示他' }
    ],
    tip: '越焦慮的追問，越會把人推走。給空間才有空間發酵。'
  },
  {
    level: 9,
    situation: '體育課跑步被同學笑「你也太慢了吧」，好丟臉...',
    emotion: '羞愧',
    stormType: 'blizzard',
    stormEmoji: '🌨️',
    time: 5,
    options: [
      { text: '當場哭出來衝回教室' },
      { text: '笑一笑回他，然後設定自己的小目標慢慢練', correct: true },
      { text: '從此以後都逃避體育課' }
    ],
    tip: '別人的嘴管不住，但你可以決定要不要被影響。'
  },
  {
    level: 10,
    situation: '今天什麼都不順——考試爛、跟朋友吵架、爸媽罵我，我要崩潰了！',
    emotion: '混亂',
    stormType: 'chaos',
    stormEmoji: '🌀',
    time: 4,
    options: [
      { text: '全部壓抑下來假裝沒事，繼續滑手機' },
      { text: '一件一件來，先照顧自己：喝水、睡覺、明天再處理', correct: true },
      { text: '在社群發崩潰文討拍，越發越氣' }
    ],
    tip: '情緒滿出來時，最有效的是「先照顧身體」——吃飯、睡覺、喝水。'
  }
];

// 最終天氣報告
const REPORTS = [
  {
    minPercent: 90,
    weather: '☀️',
    title: '晴朗萬里',
    message: '哇！你根本是情緒管理大師！在風暴中也能保持冷靜，太厲害了。',
    color: '#FFD700'
  },
  {
    minPercent: 70,
    weather: '🌤️',
    title: '多雲偶陽',
    message: '你很會處理情緒！偶爾被風暴打到，但都能很快恢復。',
    color: '#87CEEB'
  },
  {
    minPercent: 50,
    weather: '⛅',
    title: '多雲時晴',
    message: '還有進步空間！記住：情緒管理是可以練習的技能，加油！',
    color: '#B0C4DE'
  },
  {
    minPercent: 30,
    weather: '🌧️',
    title: '陰雨綿綿',
    message: '今天辛苦了。試著多練習深呼吸和找人聊聊，下次會更好！',
    color: '#708090'
  },
  {
    minPercent: 0,
    weather: '⛈️',
    title: '暴風雨天',
    message: '別擔心！每個人都在學習面對情緒。記得：求助不是軟弱。',
    color: '#4B5563'
  }
];
