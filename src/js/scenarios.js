// ==========================================================
// 情緒風暴生存戰 - 關卡資料庫（三種難度 x 30 題）
// 每次遊戲會從中隨機抽 10 題、隨機排序
// ==========================================================

// --------------------------------------------
// 🟢 簡單 EASY - 錯誤選項明顯，答案一眼看出
// --------------------------------------------
const SCENARIOS_EASY = [
  {
    situation: '明天要考試，我好緊張睡不著！',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '深呼吸 5 次，複習重點就好', correct: true },
      { text: '整晚狂看手機直到天亮' },
      { text: '直接放棄，明天擺爛' }
    ],
    tip: '焦慮時做「深呼吸 + 列重點」最有效。'
  },
  {
    situation: '朋友答應要一起看電影，結果沒來！',
    emotion: '憤怒', stormType: 'lightning', stormEmoji: '⚡', time: 15,
    options: [
      { text: '冷靜傳訊息問他原因', correct: true },
      { text: '去學校當眾羞辱他' },
      { text: '從此絕交，永遠不講話' }
    ],
    tip: '先了解原因，再決定怎麼回應。'
  },
  {
    situation: '數學考試成績很差，好想哭...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '允許自己難過，再找老師討論怎麼進步', correct: true },
      { text: '把考卷丟掉假裝沒考' },
      { text: '從此放棄數學這科' }
    ],
    tip: '難過是正常的，但後面要有行動。'
  },
  {
    situation: '上台報告前心跳超快、手在抖！',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '深呼吸，告訴自己「記得三個重點就好」', correct: true },
      { text: '直接裝病翹課逃跑' },
      { text: '一直想像自己被嘲笑的畫面' }
    ],
    tip: '報告前只要記得「關鍵三點」就很夠了。'
  },
  {
    situation: '聽到同學在背後說我壞話，好難過！',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '先冷靜，找信任的人聊聊', correct: true },
      { text: '衝過去推他 / 跟他打架' },
      { text: '躲起來哭一整天，不跟任何人說' }
    ],
    tip: '受傷時，找「安全的人」聊比硬撐重要。'
  },
  {
    situation: '爸媽又因為手機問題唸我，超煩！',
    emotion: '憤怒', stormType: 'tornado', stormEmoji: '🌪️', time: 15,
    options: [
      { text: '先聽完，冷靜後再好好談', correct: true },
      { text: '甩門大吼「你們不懂啦！」' },
      { text: '把手機用力砸在地上' }
    ],
    tip: '頂嘴贏不了戰爭，冷靜才能改規則。'
  },
  {
    situation: '打遊戲輸了，隊友一直罵我！',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '關掉語音，下一局再努力', correct: true },
      { text: '回罵回去，然後摔手機' },
      { text: '整晚睡不著，一直想那一局' }
    ],
    tip: '一場遊戲不代表你。關掉螢幕就好。'
  },
  {
    situation: '傳訊息給喜歡的人，他已讀不回！',
    emotion: '焦慮', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '放下手機，去做別的事', correct: true },
      { text: '連發 20 封訊息逼他回' },
      { text: '在限動發酸文暗示他' }
    ],
    tip: '越追問越嚇跑，給空間才有空間。'
  },
  {
    situation: '體育課被同學笑「你跑很慢」，好丟臉！',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '笑一笑，設自己的小目標慢慢練', correct: true },
      { text: '當場哭回教室，明天請假' },
      { text: '從此逃避所有體育課' }
    ],
    tip: '別人的嘴管不住，但你能決定要不要被影響。'
  },
  {
    situation: '今天什麼都不順——考試爛、跟朋友吵架、爸媽罵我，我要崩潰了！',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '先照顧自己：喝水、睡覺、明天再處理', correct: true },
      { text: '全部壓抑下來假裝沒事' },
      { text: '在社群崩潰發文大哭' }
    ],
    tip: '情緒滿出來時，先照顧身體最有效。'
  },
  {
    situation: '早上發現課本忘了帶，第一節就要用！',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '誠實跟老師說，借同學的看', correct: true },
      { text: '躲廁所不去上課' },
      { text: '在教室大哭到被送保健室' }
    ],
    tip: '坦白處理，比逃避快 100 倍結束。'
  },
  {
    situation: '被老師點名回答問題，我完全答不出來！',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '老實說「我不太確定，可以再想想嗎？」', correct: true },
      { text: '全班面前開始哭' },
      { text: '直接趴下裝睡'}
    ],
    tip: '不會答很正常，誠實比硬拗好。'
  },
  {
    situation: '朋友把我借他的漫畫弄髒了，還不道歉！',
    emotion: '憤怒', stormType: 'lightning', stormEmoji: '⚡', time: 15,
    options: [
      { text: '冷靜告訴他：「我希望你跟我道歉」', correct: true },
      { text: '把他的書包丟到走廊' },
      { text: '從今天起都不跟他說話' }
    ],
    tip: '說出感受，比報復更有力量。'
  },
  {
    situation: '被分配到不想要的組員，感覺很衰！',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '給對方機會，試著合作看看', correct: true },
      { text: '拜託老師重分組，否則擺爛' },
      { text: '在組員面前翻白眼表示不爽' }
    ],
    tip: '有時候看起來最衰的人，合作後會意外地不錯。'
  },
  {
    situation: '看到同學在考試作弊，心裡好亂！',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '專注寫自己的考卷，考後再想怎麼處理', correct: true },
      { text: '當場大叫「老師他作弊！」' },
      { text: '自己也跟著偷看答案' }
    ],
    tip: '別人的選擇不代表你也要這樣做。'
  },
  {
    situation: '搭錯公車離學校越來越遠，要遲到了！',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '下一站下車，打電話給家人或老師說明', correct: true },
      { text: '在公車上大哭給司機看' },
      { text: '乾脆今天不去學校了' }
    ],
    tip: '遇到突發狀況，求助比崩潰有效。'
  },
  {
    situation: '弟弟又把我書桌上的東西翻亂，超氣！',
    emotion: '憤怒', stormType: 'tornado', stormEmoji: '🌪️', time: 15,
    options: [
      { text: '深呼吸，再跟他說「這些東西不要亂碰」', correct: true },
      { text: '直接把他的玩具丟出窗外' },
      { text: '大吼大叫讓全家都聽到' }
    ],
    tip: '跟家人生氣時，冷靜 1 分鐘再開口。'
  },
  {
    situation: '喜歡的人好像跟別人走很近，我好難過！',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '把心思先放回自己的生活和興趣', correct: true },
      { text: '偷跟蹤他們看會不會在交往' },
      { text: '在限動發文攻擊那個人' }
    ],
    tip: '喜歡不等於擁有，顧好自己才是贏家。'
  },
  {
    situation: '被老師誤會是我講話，我明明沒有！',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '下課禮貌地跟老師解釋', correct: true },
      { text: '當場頂嘴「你根本沒看到」' },
      { text: '一整天都不講話用沉默抗議' }
    ],
    tip: '解釋要挑對時間，下課比當場有效。'
  },
  {
    situation: '體育課跑步跌倒，大家都在笑我！',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '自己先笑說「太誇張了」，站起來繼續跑', correct: true },
      { text: '躺在地上不起來，假裝受傷很嚴重' },
      { text: '衝回教室再也不上體育課' }
    ],
    tip: '你先笑自己，別人就笑不出來了。'
  },
  {
    situation: '忘了寫作業，早自習老師要收了！',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '誠實說「我忘記了，能補交嗎？」', correct: true },
      { text: '借同學的抄一抄' },
      { text: '假裝生病請假躲掉今天' }
    ],
    tip: '誠實被罵一次，作弊可能失去信任一輩子。'
  },
  {
    situation: '午餐吃一半整碗打翻，全班看我！',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '冷靜拿衛生紙清理，跟同學借東西吃', correct: true },
      { text: '氣到把剩下的便當全部丟掉' },
      { text: '趴在桌上哭一整個中午' }
    ],
    tip: '事情已經發生了，快速處理比生氣重要。'
  },
  {
    situation: '朋友忘了我生日，連一句祝福都沒有！',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '直接告訴他「我今天生日耶」', correct: true },
      { text: '從此不再祝他生日當報復' },
      { text: '整天擺臭臉讓他自己猜' }
    ],
    tip: '期待不說出口，永遠不會實現。'
  },
  {
    situation: '網路卡住，打到一半輸掉重要遊戲！',
    emotion: '憤怒', stormType: 'lightning', stormEmoji: '⚡', time: 15,
    options: [
      { text: '關掉遊戲深呼吸，去做其他事', correct: true },
      { text: '用力摔鍵盤發洩' },
      { text: '在遊戲裡噴所有人' }
    ],
    tip: '對機器生氣沒用，換件事做最實在。'
  },
  {
    situation: '有人當面說「你最近是不是變胖了？」',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '淡淡地說「OK 那是我的身體」，走開', correct: true },
      { text: '今晚開始節食餓肚子' },
      { text: '在家偷偷大哭又狂吃' }
    ],
    tip: '別人的嘴管不住，身體是你自己的。'
  },
  {
    situation: '半夜聽到爸媽又在大聲吵架，睡不著！',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '戴耳機聽輕音樂，明天再跟他們聊', correct: true },
      { text: '衝出去大吼要他們閉嘴' },
      { text: '躲在棉被裡哭到天亮' }
    ],
    tip: '爸媽的事是他們的，你先照顧自己的情緒。'
  },
  {
    situation: '要轉學了，捨不得現在的朋友...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '好好道別，約好用 IG 聯絡', correct: true },
      { text: '乾脆先把大家封鎖，免得更難過' },
      { text: '整天悶悶不樂什麼都不講' }
    ],
    tip: '好好告別，才是對這段友情最溫柔的方式。'
  },
  {
    situation: '養了好久的寵物生病了，我好害怕...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '跟家人討論帶去看醫生，陪牠就好', correct: true },
      { text: '上網自己亂搜資料嚇自己' },
      { text: '躲起來不敢看牠' }
    ],
    tip: '害怕的時候，陪伴比逃避更重要。'
  },
  {
    situation: '段考前一天，我腦中一片空白什麼都記不起來！',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '閉眼深呼吸 1 分鐘，挑最熟的章節先複習', correct: true },
      { text: '喝提神飲料熬夜狂念所有科目' },
      { text: '乾脆睡一整天明天看運氣' }
    ],
    tip: '大腦空白時，「一小塊」比「全部」有效。'
  },
  {
    situation: '朋友問我「你還好嗎？」其實我很不好...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '誠實說「其實我最近不太好，可以聊聊嗎？」', correct: true },
      { text: '硬笑說「沒事啊我很好」，憋回去' },
      { text: '直接走開不理他' }
    ],
    tip: '願意問的人，多半願意聽。給自己機會被接住。'
  }
];

// --------------------------------------------
// 🟡 普通 NORMAL - 錯誤選項看似合理，有副作用
// --------------------------------------------
const SCENARIOS_NORMAL = [
  {
    situation: '明天就要期中考了，你已經念了 4 小時，還有兩章沒看，身體很累但停不下來...',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '深呼吸 5 次，把最重要的兩章挑出來念', correct: true },
      { text: '喝一杯咖啡，熬夜把所有章節念完' },
      { text: '乾脆放棄，明天看運氣' }
    ],
    tip: '當念不完時，「挑重點」比「全部念」更有效。'
  },
  {
    situation: '朋友答應要一起去看電影，結果臨時放你鴿子，還沒解釋原因，超氣！',
    emotion: '憤怒', stormType: 'lightning', stormEmoji: '⚡', time: 15,
    options: [
      { text: '冷靜後傳訊息告訴他你的感受，希望下次早點說', correct: true },
      { text: '馬上在 IG 發限動說他沒信用' },
      { text: '從此當路人，再也不當朋友' }
    ],
    tip: '表達感受 ≠ 指責。說「我覺得...」比「你很爛」有效。'
  },
  {
    situation: '數學考卷發下來，比想像中差很多，你以為這次會更好...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '允許自己難過一下，再找老師討論哪裡可以加強', correct: true },
      { text: '把考卷揉掉丟掉，假裝沒看到' },
      { text: '跟爸媽撒謊說這次沒考' }
    ],
    tip: '面對難過，先接納再行動。'
  },
  {
    situation: '再 5 分鐘就要上台報告，心跳超快、手抖個不停！',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '做 4-7-8 呼吸法，告訴自己「記得三個重點」', correct: true },
      { text: '直接裝病請假逃避上台' },
      { text: '一直想像自己搞砸的畫面' }
    ],
    tip: '4-7-8 呼吸：吸 4 秒、憋 7 秒、吐 8 秒，超有效！'
  },
  {
    situation: '聽到同學在背後說你壞話，胸口像被冰雹打到...',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '先深呼吸，找信任的人聊聊再決定回應', correct: true },
      { text: '衝過去當場跟他吵架' },
      { text: '自己躲起來哭一整天，不跟任何人說' }
    ],
    tip: '受傷時找「安全基地」（家人、好友、老師）比硬撐重要。'
  },
  {
    situation: '爸媽又因為你用手機太久在唸你，你覺得他們根本不了解...',
    emotion: '憤怒', stormType: 'tornado', stormEmoji: '🌪️', time: 15,
    options: [
      { text: '先聽完，等情緒平靜後約時間好好談需求', correct: true },
      { text: '把門甩上，大聲吼「你們不懂啦！」' },
      { text: '偷偷把手機藏起來繼續用' }
    ],
    tip: '頂嘴贏不了戰爭。冷靜溝通才能真正改變規則。'
  },
  {
    situation: '最後一場排名戰輸了，隊友一直在頻道罵你送頭！',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '承認這局的失誤，關掉語音，下局再練', correct: true },
      { text: '回罵回去，然後退出遊戲摔手機' },
      { text: '整晚一直重播那一局，越想越氣睡不著' }
    ],
    tip: '關掉螢幕，明天又是新的一天。'
  },
  {
    situation: '傳訊息給喜歡的人 3 小時了，已讀不回...',
    emotion: '焦慮', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '放下手機，去做別的事，給彼此空間', correct: true },
      { text: '連發 20 封訊息追問到底為什麼' },
      { text: '在限動發酸文暗示他' }
    ],
    tip: '越焦慮的追問，越會把人推走。'
  },
  {
    situation: '體育課跑步被同學笑「你也太慢了吧」，全班都在看你...',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '笑一笑回他，然後設定自己的目標慢慢練', correct: true },
      { text: '當場哭出來衝回教室' },
      { text: '從此以後都逃避體育課' }
    ],
    tip: '別人的嘴管不住，但你決定要不要被影響。'
  },
  {
    situation: '今天什麼都不順——考試爛、跟朋友吵架、爸媽罵我，快崩潰了！',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '一件一件來，先照顧自己：喝水、睡覺、明天再處理', correct: true },
      { text: '全部壓抑下來假裝沒事，繼續滑手機' },
      { text: '在社群發崩潰文討拍' }
    ],
    tip: '情緒滿出來時，最有效的是「先照顧身體」。'
  },
  {
    situation: '同學借你的筆記已經一週了，每次問他都說「明天還」，你越來越不爽...',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '明確告訴他：「這週五之前一定要還我」', correct: true },
      { text: '算了不計較，以後都不借他' },
      { text: '去跟其他同學抱怨他很爛' }
    ],
    tip: '不說清楚期限，對方永遠不會主動還。'
  },
  {
    situation: '分組報告被分到兩個不熟的同學，完全不知道怎麼開口...',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '先在群組發一句「大家好！我先分工如下：」主動破冰', correct: true },
      { text: '等別人先開口，他們不講我就擺爛' },
      { text: '直接跟老師說想換組，不然做不下去' }
    ],
    tip: '陌生感只會越等越冷。主動跨一步，氣氛就變了。'
  },
  {
    situation: '社團徵選結果公布，你落選了，看到好友選上反而心裡酸酸的...',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '真心恭喜他，再跟學長姐問改善方向明年再試', correct: true },
      { text: '嘴上恭喜，心裡暗爽希望他之後做不好' },
      { text: '從此覺得自己就是沒才能，放棄這個興趣' }
    ],
    tip: '羨慕是正常的，但把精力放回「下一步」才走得動。'
  },
  {
    situation: '喜歡的人跟其他人單獨出去玩，他跟你解釋「只是朋友」，你還是很不舒服...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '承認自己吃醋，再想想這是「關係」還是「自己的安全感」問題', correct: true },
      { text: '質問他「到底喜不喜歡我？」逼他表態' },
      { text: '裝作沒事，但之後每次見面都冷冷的' }
    ],
    tip: '吃醋不可恥，但把情緒丟給對方負責會毀掉關係。'
  },
  {
    situation: '你發現媽媽偷看你手機，超沒被信任感，氣到想砸東西！',
    emotion: '憤怒', stormType: 'tornado', stormEmoji: '🌪️', time: 15,
    options: [
      { text: '冷靜後跟媽媽說：「這讓我很受傷，希望你先問我」', correct: true },
      { text: '以後出門手機密碼改更難，徹底防她' },
      { text: '當場大吼「你根本不尊重我！」摔門進房' }
    ],
    tip: '隱私界線要溝通，不是防堵。防得住手機，防不住她的擔心。'
  },
  {
    situation: '老師在班上當眾指責你作弊，可是你真的沒有！',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '下課後私下找老師，冷靜說明你的立場並請他查證', correct: true },
      { text: '當場大吼「我沒有！你憑什麼？」和老師對嗆' },
      { text: '默默接受，反正講了也沒人信' }
    ],
    tip: '被誤解時，冷靜 + 私下溝通，比當場翻臉更容易翻盤。'
  },
  {
    situation: '考試時旁邊同學都已經翻到下一面，你才寫一半，焦慮到字都在抖...',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '眼睛拉回自己的考卷，跳過卡住的題目先寫會的', correct: true },
      { text: '偷看旁邊同學的答案，至少不要空白' },
      { text: '直接放棄後半，趴下等下課' }
    ],
    tip: '考場焦慮時的黃金法則：「比較別人」=「放棄自己」。'
  },
  {
    situation: '你在 IG 發了一張自拍，有人留酸言「這角度太勉強了吧」，心情炸開...',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '不回、不刪照片，如果太困擾就封鎖對方', correct: true },
      { text: '立刻回嗆讓他下不了台' },
      { text: '秒刪照片，之後再也不敢 po 任何自拍' }
    ],
    tip: '回嘴給酸民舞台，刪貼則讓他們贏。冷處理最乾淨。'
  },
  {
    situation: '英文單字怎麼背都背不起來，你覺得自己根本沒天分...',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '改方法：一次只背 5 個，造句寫入生活句子', correct: true },
      { text: '繼續硬背，背 100 次總會記住' },
      { text: '告訴自己英文就是學不好，放棄算了' }
    ],
    tip: '沒進步 ≠ 沒天分。方法錯，再努力也是原地轉圈。'
  },
  {
    situation: '最好的朋友最近變得冷冷的，約吃飯說沒空，你不知道自己做錯什麼...',
    emotion: '受傷', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '直接問他：「我最近感覺你有點遠，是我做了什麼嗎？」', correct: true },
      { text: '自己腦補是不是他討厭你了，先疏遠他' },
      { text: '在共同朋友那裡打聽他到底在想什麼' }
    ],
    tip: '猜比問累 10 倍。直接問不一定破裂，不問才會真的破裂。'
  },
  {
    situation: '你答應陪好友過生日，結果忙到完全忘記，他貼文標你「等一個沒來的人」...',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '馬上私訊道歉 + 提出具體補償，不辯解', correct: true },
      { text: '編一個理由說你家裡有急事' },
      { text: '裝沒看到貼文，等時間淡化就好' }
    ],
    tip: '犯錯時「解釋」只會火上加油，「承認 + 補償」才滅火。'
  },
  {
    situation: '弟弟一直故意惹你，你氣到想打他，但打了會被媽媽罵...',
    emotion: '憤怒', stormType: 'tornado', stormEmoji: '🌪️', time: 15,
    options: [
      { text: '先離開現場冷靜，再去跟媽媽說你的感受', correct: true },
      { text: '忍住不打，但之後都擺臭臉不理他' },
      { text: '趁媽媽沒看到偷偷打一下' }
    ],
    tip: '家人衝突的關鍵是「抽離現場」，不是「壓抑情緒」。'
  },
  {
    situation: '你有件很難開口的事想跟爸媽說，但怕他們反應太激烈...',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '挑他們心情好的時段，用「我需要你們聽我說」開場', correct: true },
      { text: '一直猶豫等「最完美的時機」，結果一直沒說' },
      { text: '直接丟一張紙條就跑回房間' }
    ],
    tip: '難開口的事，「時機 + 開場」決定爸媽 50% 的反應。'
  },
  {
    situation: '班上每個人好像都有擅長的事，你卻覺得自己什麼都不會...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '寫下自己今年「有進步」的 3 件小事，即使別人看不到', correct: true },
      { text: '拼命學別人的強項，想趕快有一個能拿得出手的' },
      { text: '默默覺得自己就是平庸，再努力也沒用' }
    ],
    tip: '自我懷疑時，跟「昨天的自己」比，比跟別人比更準。'
  },
  {
    situation: '老師這週一口氣出了 5 項作業，你看著清單就想哭...',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '列出 deadline，先做花時間最短的那一項', correct: true },
      { text: '從最難的開始，結果卡在第一項好幾小時' },
      { text: '全部打開一起做，結果每項都只完成一點' }
    ],
    tip: '多工不是效率，「先結束一項」能重啟大腦動力。'
  },
  {
    situation: '段考成績出來你是全班倒數，看著名單上的名字覺得丟臉到不行...',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '誠實跟自己說「這次沒準備好」，找 1 科重點來救', correct: true },
      { text: '乾脆跟爸媽說「考卷還沒發」先躲過這關' },
      { text: '在心裡一直重複「我就是爛」整晚睡不著' }
    ],
    tip: '羞愧感會放大到事實的 10 倍。「一次一科」才能救回主控權。'
  },
  {
    situation: '你很累只想休息，但一閒下來就有罪惡感，覺得自己「不夠努力」...',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '告訴自己「休息也是努力的一部分」，刻意排 30 分鐘不做事', correct: true },
      { text: '勉強自己去念書，結果效率超低還是沒進度' },
      { text: '用滑手機當「休息」，但越滑越焦慮' }
    ],
    tip: '真正的休息 = 大腦空檔。滑手機不是休息，是另一種消耗。'
  },
  {
    situation: '你跟好友因為一件小事大吵一架，冷戰了三天，你們都不先道歉...',
    emotion: '挫折', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '先傳一句「我想我們可以聊聊」，不用先認錯', correct: true },
      { text: '繼續等他先道歉，看誰比較拗得住' },
      { text: '找共同朋友傳話，避免直接面對' }
    ],
    tip: '先開口 ≠ 認輸。「想修復」才是真正的強者行為。'
  },
  {
    situation: '你想參加校外比賽，但媽媽說「沒時間做這個，先顧功課」...',
    emotion: '挫折', stormType: 'lightning', stormEmoji: '⚡', time: 15,
    options: [
      { text: '準備一份「時間規劃表」證明可以兼顧，再去跟媽媽談', correct: true },
      { text: '跟她大吵一架說她不支持你' },
      { text: '算了，放棄參加，但心裡偷偷怨她' }
    ],
    tip: '跟爸媽爭取權益，拿「計畫」比拿「情緒」有效 10 倍。'
  },
  {
    situation: '你發現自己對某個同性同學心動，嚇到不知道怎麼面對...',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '告訴自己「感覺不用急著定義」，先當一般情緒觀察', correct: true },
      { text: '拼命跟異性互動，逼自己「正常」' },
      { text: '從此迴避那個同學，當作什麼都沒發生' }
    ],
    tip: '青春期的情感是探索期。不急著貼標籤，觀察比下定義健康。'
  }
];

// --------------------------------------------
// 🔴 困難 HARD - 三選項都看似合理，需心理學邏輯
// --------------------------------------------
const SCENARIOS_HARD = [
  {
    situation: '段考前一週，同學們都在群組裡瘋狂說「完蛋了、念不完了」。你本來有計畫，但聽多了也開始焦慮到沒辦法進入狀況...',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '暫時離開討論群組，回到自己原本的讀書計畫', correct: true },
      { text: '加入群組一起唸書，互相打氣應該比較不孤單' },
      { text: '花時間安慰焦慮的朋友，自己的進度晚點趕' }
    ],
    tip: '【情緒傳染】心理學證實焦慮會互相感染。有時候設立「情緒界線」比合群重要。'
  },
  {
    situation: '最好的朋友最近常說「你最近變了耶」、「你都不理我了」。你問他怎麼了他都說「沒事啊」...',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '直接問：「我感覺你對我有些不滿，可以直接告訴我嗎？」', correct: true },
      { text: '順著他說的話改變自己，讓他滿意' },
      { text: '當作他真的沒事，繼續做自己' }
    ],
    tip: '【被動攻擊】對方說「沒事」但語氣有事，要用直接溝通破解，不是配合或忽略。'
  },
  {
    situation: 'IG 上同學都在 po 補習班滿分、甄選上名校，你看了覺得自己超廢，但其實你也有自己的目標和步調...',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '關掉社群一陣子，專注在自己的進度', correct: true },
      { text: '把他們當動力，更努力追上他們' },
      { text: '跟其他朋友一起酸炫耀的人，心裡比較平衡' }
    ],
    tip: '【社會比較陷阱】研究顯示長期比較會降低自我價值感。暫停曝光比「追上」更有效。'
  },
  {
    situation: '你花了 5 小時做美術作業，但總覺得某個角度不夠完美，已經半夜 1 點了，明天 7 點要上學...',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '現在就停，接受 85 分的作品，先睡覺', correct: true },
      { text: '再花 30 分鐘修到自己滿意為止' },
      { text: '熬夜做到完美，這樣才對得起自己的努力' }
    ],
    tip: '【完美主義陷阱】追求完美反而降低整體表現。睡眠不足對隔天的影響 > 多修的 5% 完美。'
  },
  {
    situation: '你最近兩週心情一直很低落，睡不好也沒食慾。朋友叫你「去運動就好」，爸媽說「你想太多」...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '找學校輔導老師或信任的大人談談', correct: true },
      { text: '聽朋友的話，強迫自己去運動試試看' },
      { text: '告訴自己「再撐一下」，應該會自己好起來' }
    ],
    tip: '【持續性症狀】低落超過兩週 + 睡眠食慾改變是警訊，需要專業協助，不是「想太多」。'
  },
  {
    situation: '班上分組報告，組員甲跟乙吵起來，兩邊都來找你抱怨對方。選任何一邊另一邊都會覺得你偏袒...',
    emotion: '混亂', stormType: 'tornado', stormEmoji: '🌪️', time: 15,
    options: [
      { text: '請兩人一起坐下來，你協助他們直接對話', correct: true },
      { text: '兩邊都同意他們的抱怨，當好心的和事佬' },
      { text: '避開兩人，讓他們自己解決，你只管自己的部分' }
    ],
    tip: '【三角化陷阱】當「情緒轉送站」會被夾殺。幫助他們直接溝通才是真解決。'
  },
  {
    situation: '喜歡的人問你「週末有沒有空一起出去？」但你那天跟家人有約，又怕拒絕他會沒下次...',
    emotion: '焦慮', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '誠實說有約，並主動提另一個時間', correct: true },
      { text: '取消跟家人的約，答應他' },
      { text: '編個藉口委婉拒絕，不要提下次' }
    ],
    tip: '【健康界線】犧牲自己的約定不會讓關係更穩定，誠實+主動提議才會。'
  },
  {
    situation: '朋友群組一直在瘋狂聊天、邀你出去玩，但你最近很累只想一個人。不回又怕他們以為你不在乎...',
    emotion: '受傷', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '誠實說「我最近需要休息，不是不在乎你們」', correct: true },
      { text: '勉強自己去，去了再說，總比失去朋友好' },
      { text: '已讀不回，慢慢他們應該就會懂' }
    ],
    tip: '【社交倦怠】內向者需要恢復時間。誠實說明比「硬撐」或「冷處理」健康太多。'
  },
  {
    situation: '媽媽常說「我為你做這麼多，你怎麼可以這樣對我」讓你很內疚。但她的要求常常是不合理的...',
    emotion: '憤怒', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '肯定她的付出，但也表達自己的想法和界線', correct: true },
      { text: '每次都照她的做，不要讓她傷心' },
      { text: '直接反擊「你根本在情緒勒索我」' }
    ],
    tip: '【情緒勒索】回應關鍵是「承認感受 + 守住界線」，不是全盤接受或直接對抗。'
  },
  {
    situation: '這週：報告 deadline + 段考 + 跟朋友冷戰 + 家裡氣氛不好 + 每天只睡 5 小時。你快要崩潰但還有一堆事要做...',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '按重要性排序，一次只專注一件事，其他暫時放下', correct: true },
      { text: '全部同時進行，反正時間有限只能硬拼' },
      { text: '請假一天什麼都不做，讓自己完全重置' }
    ],
    tip: '【執行功能超載】同時多工會癱瘓大腦。單點聚焦是最有效的「抗崩潰」策略。'
  },
  {
    situation: '班上出現小圈圈，他們開始一起排擠另一個同學。你跟他不熟，但隱約覺得跟著笑比較安全...',
    emotion: '混亂', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '不加入嘲笑，私下找機會問那個同學「你還好嗎？」', correct: true },
      { text: '跟著笑就好，不然下一個被排擠的會是你' },
      { text: '直接跟圈圈領頭的人翻臉，叫他們別這樣' }
    ],
    tip: '【從眾效應 vs 旁觀者效應】研究顯示「一個私下支持者」就能改變被霸凌者的自殺風險。你不用當英雄，但能當那一個。'
  },
  {
    situation: '好朋友考上第一志願你沒考上，他一直跟你分享學校多好，你心裡又羨慕又嫉妒，討厭這樣的自己...',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '承認「我現在嫉妒」，允許自己有這情緒，並觀察它', correct: true },
      { text: '告訴自己不該嫉妒好朋友，努力壓下這個感覺' },
      { text: '刻意疏遠他一陣子，等自己情緒過了再聯絡' }
    ],
    tip: '【情緒接納】壓抑嫉妒會讓它變成怨恨。「承認」反而讓情緒快速退場，這是 ACT 療法核心。'
  },
  {
    situation: '你跟一個同學發生誤會，老師找你們去辦公室，明顯偏袒對方。你覺得超不公平...',
    emotion: '憤怒', stormType: 'lightning', stormEmoji: '⚡', time: 15,
    options: [
      { text: '當下先不反駁，事後準備具體事實再找老師私下談', correct: true },
      { text: '當場嗆老師「你根本在偏心」' },
      { text: '吞下去算了，講了也沒用' }
    ],
    tip: '【情緒洪水】大腦被憤怒淹沒時，前額葉會當機。延遲 24 小時再表達，勝率提高 70%。'
  },
  {
    situation: '老師指派你當小老師，但你其實不想要，覺得要管同學很累。拒絕又怕被貼「不合群」的標籤...',
    emotion: '焦慮', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '誠實跟老師說「我想把時間留給自己念書」，具體說明', correct: true },
      { text: '不好意思拒絕，勉強接下，之後敷衍做就好' },
      { text: '答應老師但私下跟同學抱怨老師亂指派' }
    ],
    tip: '【自主性剝奪】被迫答應會導致「被動攻擊」——外表配合、內心憤怒，傷害關係更深。'
  },
  {
    situation: '媽媽總是跟別人比較：「你看某某考 98」、「你表妹多乖」。你知道她沒惡意，但聽久了真的受傷...',
    emotion: '受傷', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '直接告訴媽媽：「被比較會讓我失去動力，我希望你看到我的努力」', correct: true },
      { text: '乾脆表現更好來證明自己，讓她無話可說' },
      { text: '不理她，她講她的，你關心你的' }
    ],
    tip: '【比較型養育】沉默會讓對方以為你「OK」。清楚說出感受 + 需求，才可能改變動力。'
  },
  {
    situation: '好友最近很低潮，幾乎每天深夜傳訊息跟你吐苦水。你很想幫他，但你自己也累到快撐不住...',
    emotion: '混亂', stormType: 'tornado', stormEmoji: '🌪️', time: 15,
    options: [
      { text: '告訴他「我想陪你，但我需要先照顧自己」，並建議他找輔導老師', correct: true },
      { text: '繼續聽他講，朋友低潮不應該離開他' },
      { text: '慢慢不回訊息，讓他自己學會獨立' }
    ],
    tip: '【代理創傷】長期接收他人痛苦會被「共感燒盡」。設界線不是拋棄，是讓陪伴可持續。'
  },
  {
    situation: 'IG 滑到朋友在限動炫耀出國、名牌、高分，你上床後一直無法入睡，越滑越覺得自己的人生好平凡...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '設定「睡前 1 小時不碰社群」，改寫三件今天的小感謝', correct: true },
      { text: '取消追蹤那些讓你難過的人，但繼續滑其他的' },
      { text: '告訴自己「我知道那都是假象」，然後繼續滑' }
    ],
    tip: '【向上比較憂鬱】研究：睡前滑 IG 30 分鐘，憂鬱分數顯著上升。移除「時機」比「對象」有效。'
  },
  {
    situation: '爸媽最近常為錢吵架，家裡氣氛很差。你夾在中間被迫聽雙方抱怨對方，身體開始胃痛...',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '溫和說「我愛你們，但我沒辦法當你們的轉達者」', correct: true },
      { text: '幫爸爸轉達給媽媽，或反過來，希望能緩解' },
      { text: '躲在房間戴耳機，假裝一切都跟你無關' }
    ],
    tip: '【親職化小孩】孩子承接父母衝突會造成長期焦慮。設界線保護自己，不是背叛家庭。'
  },
  {
    situation: '你想跟大家不一樣（髮型、興趣、意見），但怕被討論。最後總是選擇跟大家一樣，然後討厭這樣的自己...',
    emotion: '挫折', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '從「小地方」開始做自己，觀察會不會真的被討厭', correct: true },
      { text: '一口氣大改變，讓大家知道你是誰' },
      { text: '繼續配合，等離開這個環境再做自己' }
    ],
    tip: '【討好型人格】用「小實驗」測試安全感，比「全面革命」或「永遠配合」都有效。'
  },
  {
    situation: '交往對象要求你手機密碼、隨時回訊息、不能跟異性朋友出去。你覺得怪怪的，但他說這是「在乎」...',
    emotion: '混亂', stormType: 'tornado', stormEmoji: '🌪️', time: 15,
    options: [
      { text: '告訴他「這不是在乎，是控制」，明確說出底線', correct: true },
      { text: '配合他，維持關係最重要，他應該會慢慢不那麼緊張' },
      { text: '表面答應，私下繼續保持自己的生活空間' }
    ],
    tip: '【關係控制】被美化成「愛」的控制是家暴前兆。越早設界線，脫離成本越低。'
  },
  {
    situation: '你常常覺得人生好累、沒意義，但不敢跟任何人說，怕被當成在演憂鬱...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '撥安心專線 1925 匿名聊，或主動找輔導老師', correct: true },
      { text: '暫時不說，先觀察自己會不會好起來' },
      { text: '在社群匿名發文測試大家的反應' }
    ],
    tip: '【存在焦慮】「有意義感」需要被聽見才能重建。匿名資源就是設計給「不敢說」的人用的。'
  },
  {
    situation: '爸媽從小就希望你當醫生，但你最近發現自己真正熱愛的是畫畫。說出來一定會讓他們失望...',
    emotion: '混亂', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '先花時間蒐集資料 + 具體規劃，再跟爸媽認真談一次', correct: true },
      { text: '先按他們的意思讀醫學院，晚點再說' },
      { text: '直接宣布「我要當畫家」，讓他們接受事實' }
    ],
    tip: '【自我認同衝突】用「資料 + 計畫」讓父母從情緒模式切換到理性模式，最容易爭取空間。'
  },
  {
    situation: '作文題目很簡單但你寫了 40 分鐘只寫出半頁。你一直覺得每個句子都不夠好，反覆刪掉重寫...',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '強迫自己 5 分鐘內「先寫完」一個爛版本，之後再修', correct: true },
      { text: '繼續慢慢修，反正要交出去就要寫好的' },
      { text: '整張擦掉重寫，可能是剛剛的思路有問題' }
    ],
    tip: '【完美主義拖延】大腦在「無法完成」時會分泌焦慮激素。「爛草稿 → 修改」是唯一的解法。'
  },
  {
    situation: '好朋友傳訊息說他想傷害自己。你很擔心，但他叫你不要告訴任何人...',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '告訴信任的大人（家長、老師、輔導室），這比守密重要', correct: true },
      { text: '守住秘密陪他聊，讓他感受到被接住' },
      { text: '勸他自己告訴老師，你只當聽眾' }
    ],
    tip: '【求救訊號】自傷意念 = 緊急狀況，不是秘密。打破承諾是在救命，不是背叛。'
  },
  {
    situation: '你看到一個同學被霸凌。你想幫忙但怕自己變下一個目標。已經看了一週，心裡越來越不舒服...',
    emotion: '混亂', stormType: 'tornado', stormEmoji: '🌪️', time: 15,
    options: [
      { text: '匿名向輔導室或信任的老師通報，不需要你親自對抗霸凌者', correct: true },
      { text: '自己直接去制止霸凌，這才叫勇敢' },
      { text: '裝作沒看到，至少保護自己不捲入' }
    ],
    tip: '【旁觀者效應】心理學：一個人通報，下一個人更敢。你不用當英雄，只需要「啟動系統」。'
  },
  {
    situation: '這次考超好進班排前 5。大家都恭喜你，但你心裡只想著「下次一定退步，大家會失望」...',
    emotion: '焦慮', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '承認「害怕退步」是正常的，寫下自己「真的做對的 3 件事」', correct: true },
      { text: '更努力念書，確保下次不會退步讓大家失望' },
      { text: '心裡貶低自己：「這次只是運氣」，讓期待變低' }
    ],
    tip: '【冒牌者症候群】把成功歸因於運氣會讓焦慮變永久。「具體化努力」才能把自信內化。'
  },
  {
    situation: '你一直回想上週報告時說錯的一句話，睡前想、洗澡想、上課也想，越想越覺得丟臉...',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '問自己「7 天後還有人記得嗎？」用「時間濾鏡」縮小這件事', correct: true },
      { text: '反覆練習下次怎麼講，避免再犯同樣錯誤' },
      { text: '避開所有提醒你那件事的場景或人' }
    ],
    tip: '【反芻思考】大腦在「錯誤」上會自動重播。心理學證實「時間距離法」比「強化修正」更有效。'
  },
  {
    situation: '喜歡你很久的同學突然當面告白，你對他完全沒感覺但又不想傷他。他就站在你面前等答案...',
    emotion: '混亂', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '溫和但明確：「謝謝你，但我沒有同樣的感覺」', correct: true },
      { text: '說「再給我一點時間想想」，拖到他知難而退' },
      { text: '為了不傷他，勉強說「也許可以先試試看」' }
    ],
    tip: '【誠實拒絕 vs 溫柔欺騙】曖昧回應比直接拒絕傷更深。明確 + 溫和才是真正的尊重。'
  },
  {
    situation: '最近壓力很大，你發現自己每天半夜都吃一堆零食，事後又很自責，但下次還是忍不住...',
    emotion: '羞愧', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '不罵自己，把「吃」當情緒訊號，去找真正的壓力源頭', correct: true },
      { text: '強迫自己不准吃，把零食全部丟掉' },
      { text: '吃就吃，至少還有一件事能讓自己開心' }
    ],
    tip: '【情緒性進食】自責會啟動「壓力 → 吃 → 自責 → 壓力」的循環。觀察情緒比限制食物有效。'
  },
  {
    situation: '你很努力但還是沒考好，朋友說「沒關係啦你已經盡力了」。你笑著點頭，但心裡其實覺得更難過...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '允許自己真的難過 10 分鐘，不急著「好起來」', correct: true },
      { text: '告訴朋友「你說得對」，快點擺脫這個話題' },
      { text: '馬上開始規劃下次怎麼做更好' }
    ],
    tip: '【有毒的正能量】「你盡力了」會壓抑真實情緒。允許哭 10 分鐘，比強迫振作更快好起來。'
  }
];

// --------------------------------------------
// 難度對應表
// --------------------------------------------
const SCENARIOS_BY_DIFFICULTY = {
  easy:   SCENARIOS_EASY,
  normal: SCENARIOS_NORMAL,
  hard:   SCENARIOS_HARD
};

const DIFFICULTY_LABELS = {
  easy:   { name: '簡單', emoji: '🟢', sub: '答案很明顯，適合熱身' },
  normal: { name: '普通', emoji: '🟡', sub: '需要基本情緒知識' },
  hard:   { name: '困難', emoji: '🔴', sub: '需要心理學邏輯思考' }
};

// 每個難度的單題思考時間（秒）
const DIFFICULTY_TIME = {
  easy:   10,
  normal: 15,
  hard:   20
};

// --------------------------------------------
// 🔀 隨機抽題工具：從題庫中隨機選 count 題並打亂順序
// --------------------------------------------
function pickRandomScenarios(difficulty, count = 10) {
  const pool = SCENARIOS_BY_DIFFICULTY[difficulty] || SCENARIOS_NORMAL;
  // 單題秒數：依難度決定（簡單 10、普通 15、困難 20）
  const timePerQ = DIFFICULTY_TIME[difficulty] || 15;
  // 複製一份題庫，避免影響原陣列
  const arr = [...pool];
  // Fisher-Yates 洗牌
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // 取前 count 題，補上 level 編號與難度對應的秒數
  return arr.slice(0, count).map((s, idx) => ({
    ...s,
    level: idx + 1,
    time: timePerQ
  }));
}

// 預設（相容舊程式）
const SCENARIOS = SCENARIOS_NORMAL;

// 最終天氣報告（共用）
const REPORTS = [
  { minPercent: 90, weather: '☀️', title: '晴朗萬里', message: '哇！你根本是情緒管理大師！在風暴中也能保持冷靜，太厲害了。' },
  { minPercent: 70, weather: '🌤️', title: '多雲偶陽', message: '你很會處理情緒！偶爾被風暴打到，但都能很快恢復。' },
  { minPercent: 50, weather: '⛅', title: '多雲時晴', message: '還有進步空間！記住：情緒管理是可以練習的技能，加油！' },
  { minPercent: 30, weather: '🌧️', title: '陰雨綿綿', message: '今天辛苦了。試著多練習深呼吸和找人聊聊，下次會更好！' },
  { minPercent: 0,  weather: '⛈️', title: '暴風雨天', message: '別擔心！每個人都在學習面對情緒。記得：求助不是軟弱。' }
];
