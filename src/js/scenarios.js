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
  },
  {
    situation: '早自習小考，我完全忘了要考！',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '深呼吸，把會的先寫完', correct: true },
      { text: '整張空白直接交' },
      { text: '在桌上大哭讓老師算了' }
    ],
    tip: '能寫多少算多少，盡力就好。'
  },
  {
    situation: '排隊打飯被插隊，好氣！',
    emotion: '憤怒', stormType: 'lightning', stormEmoji: '⚡', time: 15,
    options: [
      { text: '冷靜跟對方說「我排在前面喔」', correct: true },
      { text: '把他的餐盤打翻' },
      { text: '大罵三字經給全班聽' }
    ],
    tip: '講一句比動手有效 100 倍。'
  },
  {
    situation: '好朋友突然不跟我坐在一起了！',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '直接問他「你還好嗎？」', correct: true },
      { text: '偷看他的 IG 限動找答案' },
      { text: '當著他的面大哭讓他內疚' }
    ],
    tip: '直接問一句，勝過猜一整天。'
  },
  {
    situation: '理化實驗做錯了，試管破掉！',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '馬上告訴老師，小心清理', correct: true },
      { text: '偷偷把碎片掃到桌底下' },
      { text: '假裝沒看到走掉' }
    ],
    tip: '誠實講比隱瞞安全多了。'
  },
  {
    situation: '發育慢同學笑我矮，超難受！',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '說「我還在長啊」，笑著走開', correct: true },
      { text: '當場推他摔倒' },
      { text: '回家把鏡子摔破' }
    ],
    tip: '你的身體有自己的時間表。'
  },
  {
    situation: '作業交出去被老師退回來重寫！',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '問老師哪裡要改，重新寫一次', correct: true },
      { text: '把作業本摔在地上' },
      { text: '乾脆不交了' }
    ],
    tip: '被退回是機會，不是懲罰。'
  },
  {
    situation: '在班上舉手卻被老師跳過，好丟臉！',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '下次再舉，老師會看到的', correct: true },
      { text: '整節課都不講話抗議' },
      { text: '下課去嗆老師偏心' }
    ],
    tip: '一次沒看到不代表你不重要。'
  },
  {
    situation: '爺爺奶奶住院了，我好擔心...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '跟家人一起去探望，多陪他', correct: true },
      { text: '躲起來不敢面對' },
      { text: '在房間哭一整天不出門' }
    ],
    tip: '陪伴就是最好的禮物。'
  },
  {
    situation: '被同學笑我的便當「好奇怪」！',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '笑說「我媽的愛心特別版」', correct: true },
      { text: '當場把便當丟掉不吃' },
      { text: '明天帶便當去罵回去' }
    ],
    tip: '自己先笑，別人就沒戲唱。'
  },
  {
    situation: '考前一晚爸媽一直叫我「要加油」，壓力好大！',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '跟爸媽說「我知道了，先讓我靜一下」', correct: true },
      { text: '摔門大吼「你們好煩」' },
      { text: '乾脆書本一推說不念了' }
    ],
    tip: '好好說一句比頂嘴有效。'
  },
  {
    situation: '限動發了 5 小時都沒人看，心情好差！',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '關掉 APP 去做別的事', correct: true },
      { text: '刪掉限動再發一次' },
      { text: '發第二篇抱怨沒人看' }
    ],
    tip: '讚數不代表你的價值。'
  },
  {
    situation: '同學問我借錢卻一直不還！',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '直接說「下週五之前還我喔」', correct: true },
      { text: '算了不要再借他' },
      { text: '去跟所有人說他欠錢不還' }
    ],
    tip: '講清楚期限，對方才會記得。'
  },
  {
    situation: '組員全都擺爛，只剩我一個在做報告！',
    emotion: '憤怒', stormType: 'lightning', stormEmoji: '⚡', time: 15,
    options: [
      { text: '在群組說「請大家這週五前交你們的部分」', correct: true },
      { text: '乾脆全部自己做，做完恨他們一輩子' },
      { text: '擺爛不做，一起死' }
    ],
    tip: '分工要講清楚，不是默默苦撐。'
  },
  {
    situation: '補習班老師當眾罵我笨！',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '回家跟爸媽說老師罵人的事', correct: true },
      { text: '從此上課都不講話' },
      { text: '偷偷在課本上畫老師醜臉' }
    ],
    tip: '大人的不當行為要被大人知道。'
  },
  {
    situation: '手機快沒電但我還在找回家的路！',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '跟店家借充電或借電話給家人', correct: true },
      { text: '在路邊大哭等人發現' },
      { text: '亂走碰運氣' }
    ],
    tip: '遇到問題第一步：找人幫忙。'
  },
  {
    situation: '段考考砸，不敢跟爸媽說！',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '誠實給他們看，說下次會努力', correct: true },
      { text: '偷改成績單' },
      { text: '說學校還沒發考卷' }
    ],
    tip: '誠實被罵一次，說謊會被罵很多次。'
  },
  {
    situation: '被爸媽罰不能用手機一週！',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '接受處罰，用這週做別的事', correct: true },
      { text: '偷偷把手機藏起來繼續用' },
      { text: '擺臉給爸媽看一整週' }
    ],
    tip: '接受懲罰反而比較快過。'
  },
  {
    situation: '下課鐘響了老師還在講，好煩！',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '專心聽完，下課立刻去上廁所', correct: true },
      { text: '在下面翻白眼給老師看' },
      { text: '直接收書包要走' }
    ],
    tip: '有時候忍 5 分鐘就過了。'
  },
  {
    situation: '午休睡不著，全班都在睡！',
    emotion: '焦慮', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '閉上眼放鬆，不睡也是在休息', correct: true },
      { text: '一直煩惱為什麼睡不著' },
      { text: '偷偷玩手機結果被抓包' }
    ],
    tip: '不睡不等於白費，閉眼也是休息。'
  },
  {
    situation: '朋友一直要我幫他抄作業！',
    emotion: '挫折', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '說「我不行，這樣你也學不會」', correct: true },
      { text: '不好意思拒絕，全部給他抄' },
      { text: '答應他但故意寫錯讓他被罵' }
    ],
    tip: '拒絕不等於不是朋友。'
  },
  {
    situation: '看到喜歡的人在跟別人笑鬧，心好酸！',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '把心思放回自己的事情', correct: true },
      { text: '過去插話破壞氣氛' },
      { text: '回家發限動罵他們' }
    ],
    tip: '喜歡不代表能控制對方的朋友。'
  },
  {
    situation: '被老師叫去辦公室，心跳超快！',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '深呼吸，誠實回答老師的問題', correct: true },
      { text: '一路上編謊話準備騙老師' },
      { text: '故意拖時間不去' }
    ],
    tip: '誠實是最簡單的武器。'
  },
  {
    situation: '第一次段考得到第一名，好怕下次退步！',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '告訴自己「退步也沒關係」，繼續用原本的方法念', correct: true },
      { text: '熬夜加倍念書才不會退步' },
      { text: '假裝這次是運氣，不敢高興' }
    ],
    tip: '享受好成績，但別被它綁架。'
  },
  {
    situation: '社團比賽我們輸了，隊長一直罵大家！',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '聽一下有道理的部分，過分的不要吸收', correct: true },
      { text: '退出社團再也不回來' },
      { text: '回嗆隊長也表現沒多好' }
    ],
    tip: '批評也要篩選，不是全部照收。'
  },
  {
    situation: '好朋友跟別人走很近，感覺被取代！',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '直接約他「我們好久沒單獨出去了」', correct: true },
      { text: '跟其他人說他是爛朋友' },
      { text: '從此不再理他' }
    ],
    tip: '朋友變遠時，主動約比賭氣有效。'
  },
  {
    situation: '發表會前緊張到肚子痛！',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '深呼吸 + 喝溫水，告訴自己「緊張是正常的」', correct: true },
      { text: '衝去廁所裝病請假' },
      { text: '一直想像自己搞砸的畫面' }
    ],
    tip: '會緊張代表你在乎，很正常。'
  },
  {
    situation: '爸媽說我「整天只會玩」，超委屈！',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '冷靜說「我今天念了 2 小時，可以看一下嗎？」', correct: true },
      { text: '大吼「你們根本不了解我」' },
      { text: '砰地關門回房' }
    ],
    tip: '拿事實講比吵架有力。'
  },
  {
    situation: '放學看到下雨，我沒帶傘！',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '等雨小一點，或打給家人送傘', correct: true },
      { text: '淋雨衝回家然後感冒' },
      { text: '在校門口發脾氣罵老天' }
    ],
    tip: '小問題用小辦法，別用大情緒。'
  },
  {
    situation: '我說話太小聲，老師叫我大聲再說一次！',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '深呼吸一次，用大一點的聲音說', correct: true },
      { text: '索性不講了趴在桌上' },
      { text: '紅著臉說「我不會」' }
    ],
    tip: '聲音大小可以練習，沒人天生很敢講。'
  },
  {
    situation: '看到班上有人在欺負新同學！',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '下課跟新同學說「我陪你吃午餐」', correct: true },
      { text: '跟著大家一起笑不然下一個是我' },
      { text: '假裝沒看到比較安全' }
    ],
    tip: '有一個朋友就足夠改變一個人。'
  },
  {
    situation: '寵物過世了，家人還叫我「別太難過」！',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '允許自己難過，需要多久就多久', correct: true },
      { text: '強迫自己假裝沒事' },
      { text: '從此不再喜歡任何動物' }
    ],
    tip: '失去寵物是真的傷心，不用急著好。'
  },
  {
    situation: '被暗戀的人發好人卡，好難過！',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '謝謝他誠實，給自己時間療傷', correct: true },
      { text: '發限動說他眼光差' },
      { text: '繼續糾纏不放棄' }
    ],
    tip: '喜歡過就不虧，勇敢已經很厲害。'
  },
  {
    situation: '臉上長了好大的痘痘，不想上學！',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '正常去上學，青春期長痘很正常', correct: true },
      { text: '戴口罩遮一整天' },
      { text: '請假不敢見人' }
    ],
    tip: '你自己在意的別人根本沒在看。'
  },
  {
    situation: '參加比賽沒得名次，好丟臉！',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '恭喜自己有勇氣參加，下次再挑戰', correct: true },
      { text: '從此不再參加任何比賽' },
      { text: '在 IG 發文酸評審眼光差' }
    ],
    tip: '敢參加就贏過 99% 的人了。'
  },
  {
    situation: '想要買一個東西，但零用錢不夠！',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '存錢或幫忙家事賺錢', correct: true },
      { text: '跟爸媽大吵要他們買' },
      { text: '跟同學借錢去買' }
    ],
    tip: '努力來的東西最有感覺。'
  },
  {
    situation: '跟最好的朋友吵架，兩天沒講話！',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '主動傳一句「我們聊聊好嗎？」', correct: true },
      { text: '繼續等他先道歉' },
      { text: '找共同朋友幫忙傳話' }
    ],
    tip: '先開口不是輸，是真的在乎。'
  },
  {
    situation: '明明很努力念書，分數還是很差！',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '問老師「我哪裡可以改進？」', correct: true },
      { text: '覺得自己就是笨，放棄' },
      { text: '念更多更多時間逼自己' }
    ],
    tip: '方法不對，再努力也是白費。'
  },
  {
    situation: '看到朋友開生日趴沒約我！',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '直接問他「我是不是漏掉了？」', correct: true },
      { text: '從此跟他冷戰' },
      { text: '發限動酸他沒把我當朋友' }
    ],
    tip: '搞不好真的是漏了，問一下就知道。'
  },
  {
    situation: '上體育課分組最後一個才被選！',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '不在意排序，認真打就好', correct: true },
      { text: '從此拒絕參加所有體育活動' },
      { text: '在場邊擺爛不認真打' }
    ],
    tip: '排序無關你的價值。'
  },
  {
    situation: '朋友把我的秘密說出去！',
    emotion: '憤怒', stormType: 'lightning', stormEmoji: '⚡', time: 15,
    options: [
      { text: '冷靜跟他說「我很失望，下次不要了」', correct: true },
      { text: '把他的秘密也講出去報復' },
      { text: '絕交不給解釋的機會' }
    ],
    tip: '講出感受比報復有用 10 倍。'
  },
  {
    situation: '自己一個人吃午餐，感覺好孤單！',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '主動找一個看起來也獨自的人一起吃', correct: true },
      { text: '躲在廁所吃' },
      { text: '裝沒事低頭滑手機裝忙' }
    ],
    tip: '踏出一步，孤單就破了一半。'
  },
  {
    situation: '不小心說錯話傷到朋友！',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '馬上說「對不起，我不是那個意思」', correct: true },
      { text: '假裝沒發生繼續講下去' },
      { text: '講更多話想蓋過去' }
    ],
    tip: '立刻道歉，傷害不會擴散。'
  },
  {
    situation: '作業一堆不知道從哪開始！',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '先挑最簡單的一項開始做', correct: true },
      { text: '盯著清單發呆 1 小時' },
      { text: '乾脆都不做去打電動' }
    ],
    tip: '開始比完美重要。'
  },
  {
    situation: '被同學取了很難聽的綽號！',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '認真跟他說「我不喜歡這個叫法」', correct: true },
      { text: '裝作沒聽到反正之後會忘' },
      { text: '也取他更難聽的綽號回敬' }
    ],
    tip: '第一次不反應，就會變成日常。'
  },
  {
    situation: '段考前才發現根本看錯範圍！',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '馬上抓正確範圍的重點先讀', correct: true },
      { text: '邊哭邊念沒用的範圍' },
      { text: '擺爛說反正念不完了' }
    ],
    tip: '還剩多少就念多少，別浪費時間哭。'
  },
  {
    situation: '班上只有我沒被邀請加入小群組！',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '去找別的朋友或發展自己的興趣', correct: true },
      { text: '拜託他們把我加進去' },
      { text: '在 IG 發文攻擊那群人' }
    ],
    tip: '不是所有圈子你都需要進。'
  },
  {
    situation: '家人又在比較我跟表哥的成績！',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '說「我是我，請看我的進步」', correct: true },
      { text: '默默吞下不說什麼' },
      { text: '在家族聚餐亂發脾氣' }
    ],
    tip: '說出感受，大人才知道要收斂。'
  },
  {
    situation: '弟妹把我心愛的東西弄壞了！',
    emotion: '憤怒', stormType: 'tornado', stormEmoji: '🌪️', time: 15,
    options: [
      { text: '先深呼吸，再跟他和爸媽處理', correct: true },
      { text: '把他的玩具也弄壞' },
      { text: '大吼到整棟樓都聽到' }
    ],
    tip: '冷靜處理，爸媽才會站你這邊。'
  },
  {
    situation: '很想找人聊但大家好像都在忙！',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '把想說的寫下來，之後再慢慢講', correct: true },
      { text: '連發 10 個人逼人馬上回', correct: false },
      { text: '假裝沒事一直憋著' }
    ],
    tip: '寫下來也是一種消化情緒的方法。'
  },
  {
    situation: '老師誤會是我把教室弄亂的！',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '下課冷靜跟老師解釋清楚', correct: true },
      { text: '當場大哭讓大家看' },
      { text: '之後都不理那個老師' }
    ],
    tip: '時機對，說明才會被聽見。'
  },
  {
    situation: '想跟爸媽說想學畫畫，但怕他們反對！',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '選他們心情好的時候好好講', correct: true },
      { text: '偷偷自己去報名' },
      { text: '算了放棄就好' }
    ],
    tip: '時機對，話才會被聽進去。'
  },
  {
    situation: '看到喜歡的人交女 / 男朋友了！',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '祝福他，也祝福自己能遇到更好的', correct: true },
      { text: '狂看他的限動痛苦' },
      { text: '去攻擊那個對象' }
    ],
    tip: '祝福別人，運氣才不會卡住。'
  },
  {
    situation: '朋友一直找我借筆記但自己從不讀！',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '說「這次給你，但你也要自己念」', correct: true },
      { text: '不好意思拒絕繼續借' },
      { text: '故意給他錯的筆記' }
    ],
    tip: '幫忙要有界線，不然會被吃死。'
  },
  {
    situation: '英文單字怎麼背都忘光！',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '改用造句或貼便利貼的方式背', correct: true },
      { text: '硬背 100 次' },
      { text: '放棄英文這科' }
    ],
    tip: '換方法，不是換腦袋。'
  },
  {
    situation: '想加入社團但都沒熟人！',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '勇敢報名，一起的人就會變熟', correct: true },
      { text: '等朋友陪才去' },
      { text: '算了不要加入' }
    ],
    tip: '所有熟人一開始都是陌生人。'
  },
  {
    situation: '手機突然摔破螢幕，爸媽會罵！',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '誠實告訴爸媽，想辦法修', correct: true },
      { text: '把手機藏起來裝失蹤' },
      { text: '說是別人弄壞的' }
    ],
    tip: '誠實挨罵一次，說謊要被罵好幾輪。'
  },
  {
    situation: '要上台唱歌，我超害怕走音！',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '深呼吸，專心唱就好', correct: true },
      { text: '故意走音假裝搞笑' },
      { text: '直接請假不唱了' }
    ],
    tip: '走音沒人會記得，勇氣會。'
  },
  {
    situation: '我想剪一個新髮型，怕被笑！',
    emotion: '焦慮', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '勇敢剪，不適合再留回來就好', correct: true },
      { text: '因為怕被笑不敢嘗試' },
      { text: '剪了又立刻後悔戴帽子' }
    ],
    tip: '頭髮會長回來，嘗試才會留下。'
  },
  {
    situation: '我覺得自己長得不好看，不敢拍照！',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '勇敢拍，紀念比完美重要', correct: true },
      { text: '一直躲在朋友後面' },
      { text: '發文說自己很醜討拍' }
    ],
    tip: '未來的你會感謝現在有拍照的你。'
  },
  {
    situation: '輔導老師約我談話，好緊張！',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '放輕鬆去聊，老師是來幫你的', correct: true },
      { text: '緊張到裝病不去' },
      { text: '去了什麼都不講' }
    ],
    tip: '輔導老師是隊友，不是考官。'
  },
  {
    situation: '我好羨慕別人什麼都會！',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '想想自己這學期進步的 3 件事', correct: true },
      { text: '一直滑 IG 看別人多棒' },
      { text: '躺在床上發呆一整晚' }
    ],
    tip: '跟昨天的自己比，最公平。'
  },
  {
    situation: '一早起床就覺得心情很沉！',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '先吃早餐、出門曬太陽', correct: true },
      { text: '躺回去繼續睡整天' },
      { text: '滑社群讓心情更沉' }
    ],
    tip: '身體先動，心情就會跟著動。'
  },
  {
    situation: '想跟老師說我聽不懂，但怕被笑！',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '下課禮貌問老師「這題可以再講一次嗎？」', correct: true },
      { text: '假裝懂了繼續抄' },
      { text: '考試再來怪老師講太快' }
    ],
    tip: '問問題的人才會真的學會。'
  },
  {
    situation: '冷戰中，爸媽故意不跟我說話！',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '主動說「我想跟你們好好聊」', correct: true },
      { text: '也冷戰給他們看' },
      { text: '大吼一陣破僵局' }
    ],
    tip: '先開口的人，不是輸家是贏家。'
  },
  {
    situation: '同學在 IG 酸我的穿搭！',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '不理他，繼續穿你喜歡的', correct: true },
      { text: '秒刪照片發誓不再發' },
      { text: '回嗆他的穿搭更慘' }
    ],
    tip: '你的身體你的衣服你決定。'
  },
  {
    situation: '考試緊張到一直想上廁所！',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '深呼吸，告訴自己身體反應很正常', correct: true },
      { text: '狂喝水讓自己更想去' },
      { text: '整節都忍著什麼都不想' }
    ],
    tip: '身體的反應 = 你很在乎，不是壞事。'
  },
  {
    situation: '朋友送我禮物，但不是我喜歡的！',
    emotion: '混亂', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '真誠說「謝謝你，我很開心你想到我」', correct: true },
      { text: '臉變很臭讓他知道我不喜歡' },
      { text: '直接說「這個我不要」丟回去' }
    ],
    tip: '心意比禮物本身更珍貴。'
  },
  {
    situation: '電梯裡只有我跟一個很兇的學長！',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '看自己的手機，不跟他對視就好', correct: true },
      { text: '衝出電梯走樓梯' },
      { text: '一直偷看他怕他生氣' }
    ],
    tip: '不熟的人不用互動，保持距離就好。'
  },
  {
    situation: '老師宣布下週大考試，我還一堆沒念！',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '馬上列讀書計畫，從最不熟的開始', correct: true },
      { text: '先玩一下再說反正時間還有' },
      { text: '擔心到吃不下飯也念不了書' }
    ],
    tip: '焦慮的時間拿去念書，最有用。'
  },
  {
    situation: '好朋友搬家到很遠的地方，以後不常見！',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '約好用 IG 或電話保持聯絡', correct: true },
      { text: '從現在開始冷掉免得以後更難過' },
      { text: '每天傳 100 封訊息黏著他' }
    ],
    tip: '距離不是結束，保持聯絡就好。'
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
  },
  {
    situation: '模擬考前三天，你發現自己數學還差一大截，但國英也沒準備好，時間完全不夠用...',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '把最拉分的科目排前面，其餘科目顧基本題', correct: true },
      { text: '全部平均分配時間，每科都念一點' },
      { text: '只念最弱的數學，其他放棄' }
    ],
    tip: '考前策略是「減法」，不是「加法」。'
  },
  {
    situation: '你跟朋友討論作業到很晚，結果你做的比較多，他卻只在群組貼一句「感謝」...',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '私訊他：「這次我做比較多，下次我們要平均一點」', correct: true },
      { text: '算了不計較，下次繼續自己扛' },
      { text: '跟其他人抱怨他多廢' }
    ],
    tip: '「算了」會變習慣，講出期望才會被對待。'
  },
  {
    situation: '你想告白，但又擔心被拒絕以後連朋友都當不成...',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '先誠實表達自己的感覺，接受對方任何回應', correct: true },
      { text: '繼續當朋友假裝沒事，等他先喜歡你' },
      { text: '先問共同朋友套對方底，再決定' }
    ],
    tip: '壓抑感覺比被拒絕更痛，說出口才是真正的自由。'
  },
  {
    situation: '好朋友每次見面都在抱怨別人，你開始覺得跟他在一起很累，但怕說了會破壞友誼...',
    emotion: '挫折', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '溫和表達：「聽你抱怨我也會累，我們聊點別的好嗎？」', correct: true },
      { text: '繼續忍耐當垃圾桶，不然失去朋友' },
      { text: '默默保持距離，慢慢淡出' }
    ],
    tip: '健康的友情是可以談「真實感受」的。'
  },
  {
    situation: '你發現交往對象偷看你手機，他解釋是「在乎」，你心裡卻很不舒服...',
    emotion: '憤怒', stormType: 'lightning', stormEmoji: '⚡', time: 15,
    options: [
      { text: '堅定說「在乎不等於侵犯隱私」，要求他道歉', correct: true },
      { text: '算了，至少證明他在乎我' },
      { text: '也偷看他的手機「公平」一下' }
    ],
    tip: '界線被踩一次沒守，以後會被踩十次。'
  },
  {
    situation: '老師指派你當幹部，但你真的不想做，怕同學說你「愛現」或「假掰」...',
    emotion: '焦慮', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '認真評估自己想不想做，再決定接或拒', correct: true },
      { text: '怕被酸所以拒絕，雖然其實有點想做' },
      { text: '怕老師失望所以接，但之後擺爛' }
    ],
    tip: '重要決定要聽「自己的」，不是「別人可能的」。'
  },
  {
    situation: '你很喜歡的網紅突然被爆出黑歷史，你開始懷疑自己追星的判斷力...',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '允許自己失望，重新評估什麼才是你真正認同的', correct: true },
      { text: '硬撐著繼續追，不然承認自己看錯人很丟臉' },
      { text: '從此不敢再喜歡任何偶像' }
    ],
    tip: '被失望是成長的一部分，不代表你判斷力不好。'
  },
  {
    situation: '段考後你考得不錯，但全班平均很低，老師決定全部加分，你反而覺得自己的努力被稀釋...',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '承認自己有點不甘心，但記住真正的實力是自己知道的', correct: true },
      { text: '跟老師抗議這樣不公平' },
      { text: '從此念書都念比較少，反正會被拉平' }
    ],
    tip: '實力是內在的，不是分數排名。'
  },
  {
    situation: '你最好的朋友交男 / 女友後就很少找你，你覺得被冷落又不想講出來顯得小氣...',
    emotion: '受傷', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '誠實跟他說「我有點想你，我們找天出來」', correct: true },
      { text: '也去交一個男 / 女友分散注意力' },
      { text: '一直留言酸「看來我不重要了」' }
    ],
    tip: '說出「我想你」，比賭氣更成熟。'
  },
  {
    situation: '你發現自己常在社群上假裝過得很好，但其實很累，還得維持人設...',
    emotion: '挫折', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '降低社群使用頻率，寫日記面對真實情緒', correct: true },
      { text: '繼續演下去，不然追蹤者會跑掉' },
      { text: '突然 po 崩潰文讓大家關心' }
    ],
    tip: '社群的形象不等於你，拉開距離才看得清楚。'
  },
  {
    situation: '你想拒絕朋友借錢，但他上次有幫你，你覺得不還人情過意不去...',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '坦白說「我最近也有點緊，這次沒辦法」', correct: true },
      { text: '硬借給他，之後自己緊巴巴' },
      { text: '說「我忘記帶錢」一直拖' }
    ],
    tip: '金錢的人情，誠實最重要。'
  },
  {
    situation: '你喜歡的同學有女 / 男友了，但他還常找你聊天，你心跳好快又覺得罪惡...',
    emotion: '混亂', stormType: 'tornado', stormEmoji: '🌪️', time: 15,
    options: [
      { text: '保持適度距離，把自己的心思放回自己的生活', correct: true },
      { text: '繼續每天聊，反正只是朋友' },
      { text: '故意說對方壞話希望他們分手' }
    ],
    tip: '界線是為了保護自己，不是對他殘忍。'
  },
  {
    situation: '你交了一份很認真的報告，結果老師打的分數很低，給的評語還很主觀...',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '冷靜寫下具體問題，下課禮貌地請老師解釋', correct: true },
      { text: '從此不再認真做這科報告' },
      { text: '在社群上罵老師眼光差' }
    ],
    tip: '不同意老師，要用具體問題挑戰，不是情緒反擊。'
  },
  {
    situation: '班上要選班長，你很想做但怕沒人投你會很丟臉...',
    emotion: '焦慮', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '提名自己，準備簡短的政見講清楚', correct: true },
      { text: '等別人提名你才勉強接受' },
      { text: '假裝不想當，實際很想當' }
    ],
    tip: '想要的東西要敢爭取，不被選也沒損失。'
  },
  {
    situation: '你的好友常當眾開你玩笑，大家都笑了，但你知道他講的是你的痛處...',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '私下跟他說「那個話題讓我不舒服，拜託不要再提」', correct: true },
      { text: '下次他被開玩笑時，也用他的痛處反擊' },
      { text: '繼續假裝笑一笑，其實越來越討厭他' }
    ],
    tip: '玩笑有邊界，好朋友應該願意收斂。'
  },
  {
    situation: '你想跟爸媽要新手機，但他們說「你手機沒壞幹嘛換」，你跟他們解釋不通...',
    emotion: '挫折', stormType: 'lightning', stormEmoji: '⚡', time: 15,
    options: [
      { text: '寫下具體理由（電池、記憶體）+ 自己負擔部分費用', correct: true },
      { text: '大吵「你們都不懂我的需要」' },
      { text: '故意把舊手機摔壞逼他們換' }
    ],
    tip: '爭取資源要用「數據 + 誠意」，不是情緒。'
  },
  {
    situation: '你發現自己每次壓力大就狂吃零食，吃完又很後悔...',
    emotion: '羞愧', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '把零食換成水或水果，找別的紓壓方式', correct: true },
      { text: '逼自己完全戒掉，不准吃' },
      { text: '吃就吃，至少還有一件讓我開心的事' }
    ],
    tip: '用情緒吃東西不是錯，但要找到根源。'
  },
  {
    situation: '你考上了第一志願，但心裡竟然有點空虛，不知道接下來要追什麼目標...',
    emotion: '混亂', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '允許自己「沒目標」一陣子，探索新的興趣', correct: true },
      { text: '馬上設下一個超遠大目標拼命念' },
      { text: '假裝自己超開心，掩飾空虛' }
    ],
    tip: '達成目標後的空虛，是在告訴你該重新找方向。'
  },
  {
    situation: '你最好的朋友有憂鬱傾向，常傳長長的訊息，你想幫他但覺得被拖進去了...',
    emotion: '混亂', stormType: 'tornado', stormEmoji: '🌪️', time: 15,
    options: [
      { text: '告訴他「我會陪你，但我需要請輔導老師一起幫忙」', correct: true },
      { text: '自己扛起來，繼續聽他傾訴到自己也崩潰' },
      { text: '慢慢不回訊息讓他自己放棄你' }
    ],
    tip: '真正幫忙是「加入專業」，不是一個人硬撐。'
  },
  {
    situation: '你想學音樂，但爸媽說「那不能當飯吃」要你專心念書...',
    emotion: '挫折', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '答應維持課業，用課餘時間爭取學習空間', correct: true },
      { text: '直接反抗「我就是要學音樂」' },
      { text: '放棄音樂，但心裡恨爸媽一輩子' }
    ],
    tip: '跟父母談判：先給他們安全感，再爭取空間。'
  },
  {
    situation: '你生日當天完全沒人記得，連家人也沒提，你假裝沒事但心裡超難過...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '直接跟家人說「今天是我生日」，給自己買份蛋糕', correct: true },
      { text: '裝無所謂，但整晚擺臭臉' },
      { text: '在限動發酸文讓朋友自己發現' }
    ],
    tip: '期待如果不說，永遠不會被滿足。'
  },
  {
    situation: '你一直想跟媽媽聊你的壓力，但她總是說「你還小哪有什麼壓力」...',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '找其他信任的大人（輔導老師、親戚）聊', correct: true },
      { text: '之後都不再跟媽媽說任何事' },
      { text: '等媽媽主動問，再一次全部爆發' }
    ],
    tip: '不是所有大人都能接住你，找對的人比較重要。'
  },
  {
    situation: '你班上有個人總是嗆你，你忍了半學期，今天他又在大家面前笑你...',
    emotion: '憤怒', stormType: 'tornado', stormEmoji: '🌪️', time: 15,
    options: [
      { text: '冷靜當眾回應：「我不喜歡被這樣說」，態度平穩', correct: true },
      { text: '爆發大吼回去，讓他知道你不好惹' },
      { text: '繼續忍，以後盡量不要讓他注意到我' }
    ],
    tip: '冷靜設界線，比發火或忍耐都有效。'
  },
  {
    situation: '你發現自己花太多時間在 IG 上，一打開就停不下來，念書時間被吃光...',
    emotion: '挫折', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '設定限時 30 分 / 天，把 APP 移出首頁', correct: true },
      { text: '意志力硬撐不碰，下週又破功' },
      { text: '直接刪掉帳號斷聯' }
    ],
    tip: '用「環境設計」勝過「意志力」。'
  },
  {
    situation: '老師在班上暗示某個人作弊，雖然沒指名，但你知道他在說你...',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '下課直接找老師私下談清楚', correct: true },
      { text: '當場站起來大聲否認' },
      { text: '默默被誤解一輩子' }
    ],
    tip: '被誤解不處理，會變成真的。'
  },
  {
    situation: '你交了新朋友，但舊朋友開始冷冷的說「你變了」...',
    emotion: '受傷', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '跟舊朋友說「你對我一樣重要，我們約時間」', correct: true },
      { text: '疏遠新朋友以免舊朋友不開心' },
      { text: '也冷漠回應舊朋友「那隨便你」' }
    ],
    tip: '友誼不是競爭，你可以同時珍惜新舊。'
  },
  {
    situation: '你不小心打破了媽媽很珍惜的花瓶，她還沒發現你要不要坦白？',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '主動跟媽媽說，承擔責任並提議賠償', correct: true },
      { text: '偷偷修好或丟掉，假裝沒事' },
      { text: '等媽媽發現再說，看運氣' }
    ],
    tip: '主動坦白比被抓包罰得輕。'
  },
  {
    situation: '你想參加很貴的夏令營，家裡負擔不起，爸媽含糊其辭讓你很難受...',
    emotion: '受傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '理解家裡狀況，找其他免費替代方案', correct: true },
      { text: '一直吵到爸媽勉強掏錢讓你去' },
      { text: '恨爸媽一輩子為什麼家裡窮' }
    ],
    tip: '接納現實 + 找替代方案，是成熟的表現。'
  },
  {
    situation: '同學在群組轉了不實的八卦說是你講的，朋友們半信半疑...',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '在群組澄清「這不是我說的」，再私下找信任的朋友談', correct: true },
      { text: '忽略它，讓時間證明一切' },
      { text: '馬上反擊抖出傳謠者的秘密' }
    ],
    tip: '澄清要快，但不用變戰爭。'
  },
  {
    situation: '你覺得自己身材不好，每天花很久在鏡子前不喜歡自己...',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '設定健康的目標（運動 / 飲食），不以外表為唯一指標', correct: true },
      { text: '節食到很餓很難過' },
      { text: '從此不照鏡子' }
    ],
    tip: '健康第一，外表自然會改善。'
  },
  {
    situation: '你發現朋友在網路上被酸民攻擊，還有人在底下起鬨...',
    emotion: '混亂', stormType: 'tornado', stormEmoji: '🌪️', time: 15,
    options: [
      { text: '私訊關心他，並在留言下支持他一句', correct: true },
      { text: '衝去跟酸民對罵到他們刪文' },
      { text: '裝沒看到，不想被牽連' }
    ],
    tip: '一句支持比 10 句對戰有用。'
  },
  {
    situation: '你其實對選組很迷茫，但爸媽和老師都說「你念二類比較有前途」...',
    emotion: '混亂', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '做性向測驗 + 多看各科業界資訊，再自己決定', correct: true },
      { text: '跟著大人的建議走，不然怎麼辦' },
      { text: '故意選他們反對的組別反抗' }
    ],
    tip: '決定要「有資料」才負責，不是「憑反應」。'
  },
  {
    situation: '你跟好友一起被邀請出去玩，但你那天其實很累想休息...',
    emotion: '挫折', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '誠實說「我太累了，下次」，推薦好友還是去', correct: true },
      { text: '勉強去，但整天擺臭臉' },
      { text: '拒絕，但暗示好友也應該留下來陪你' }
    ],
    tip: '對自己誠實，是最成熟的社交。'
  },
  {
    situation: '你把暗戀的人當成學習榜樣，結果發現他其實沒那麼好...',
    emotion: '混亂', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '拿回「為自己學習」的動力，不再綁在他身上', correct: true },
      { text: '從此對他幻滅，連朋友都不當' },
      { text: '硬撐著繼續喜歡，至少還有目標' }
    ],
    tip: '動力要來自你自己，不是別人的光環。'
  },
  {
    situation: '這次段考你錯了一題其實「有答對」但老師算錯，分數因此輸掉第一名...',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '禮貌跟老師指出，請他重改', correct: true },
      { text: '算了不計較，反正第二也不錯' },
      { text: '大吵要老師公開道歉' }
    ],
    tip: '爭取自己的權益，也是照顧自己。'
  },
  {
    situation: '你發現自己在朋友面前總是配合、附和，變得不敢說真正的想法...',
    emotion: '挫折', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '從「小事」開始練習說真話，觀察會不會真的失去朋友', correct: true },
      { text: '下次直接全部爆發，讓朋友嚇一跳' },
      { text: '算了繼續配合，做自己太累' }
    ],
    tip: '真實的關係，是可以承受你做自己的。'
  },
  {
    situation: '你其實對哥哥 / 姊姊被稱讚又羨慕又嫉妒，但不敢讓家人發現...',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '承認自己的嫉妒，專注發展自己的長處', correct: true },
      { text: '故意拆台讓他被稱讚的事黯然失色' },
      { text: '壓抑下去，假裝超崇拜哥姊' }
    ],
    tip: '嫉妒是訊號，告訴你「你也想要」。'
  },
  {
    situation: '你被朋友要求幫忙作弊（傳答案），不給怕失去朋友...',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '拒絕：「這會害到你跟我，考後我教你」', correct: true },
      { text: '傳給他，不然他會討厭我' },
      { text: '假裝沒看到他的訊息' }
    ],
    tip: '真朋友不會逼你做傷害自己的事。'
  },
  {
    situation: '你跟爸媽吵架後把房門鎖上，兩天沒出來，他們也沒來叫你...',
    emotion: '受傷', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '主動開門，寫張紙條或當面說「我想聊聊」', correct: true },
      { text: '繼續鎖著，看誰先低頭' },
      { text: '大吵大鬧吸引他們注意' }
    ],
    tip: '家人冷戰沒有贏家，先走出房門的才是大人。'
  },
  {
    situation: '你準備了好久的才藝表演，當天忘詞停在台上...',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '深呼吸，跳到下一段繼續表演', correct: true },
      { text: '衝下台躲起來哭' },
      { text: '硬站著直到老師來接你' }
    ],
    tip: '忘詞沒人會記得，你的勇氣會。'
  },
  {
    situation: '你第一次跟喜歡的人吵架，兩個人都不敢先開口...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '先傳一句「我有在想這件事，我們聊聊？」', correct: true },
      { text: '繼續等他先道歉' },
      { text: '故意在他面前跟別人笑鬧讓他吃醋' }
    ],
    tip: '關係中「先主動」的人，通常更成熟。'
  },
  {
    situation: '你突然收到暗戀的人的告白，但你現在很忙真的沒心情談戀愛...',
    emotion: '混亂', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '溫和誠實說「我很開心，但我現在想專心在其他事」', correct: true },
      { text: '勉強答應在一起，之後再說' },
      { text: '直接已讀不回' }
    ],
    tip: '尊重感情，也尊重時機。'
  },
  {
    situation: '你加入社團後發現氛圍很糟、學長姐很嚴，但中途退出怕被說做事不耐...',
    emotion: '混亂', stormType: 'tornado', stormEmoji: '🌪️', time: 15,
    options: [
      { text: '評估是否真的不適合，該退就禮貌退', correct: true },
      { text: '硬撐到學期結束，浪費時間' },
      { text: '擺爛讓學長姐主動趕你' }
    ],
    tip: '「中途退出」不是失敗，是重新選擇。'
  },
  {
    situation: '你看到同學在廁所偷哭，你跟他不熟，不知道要不要上前關心...',
    emotion: '混亂', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '遞一張衛生紙輕聲問「你還好嗎？需要幫忙嗎？」', correct: true },
      { text: '假裝沒看到，尊重他' },
      { text: '出去跟朋友討論那個人在哭' }
    ],
    tip: '一張衛生紙，可能是那天他得到的唯一溫暖。'
  },
  {
    situation: '你收到成績單發現被父母看到會失望，但你又不想作弊或說謊...',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '主動拿給他們，並準備改進計畫', correct: true },
      { text: '藏起來希望他們忘記這件事' },
      { text: '先哭給他們看博取同情' }
    ],
    tip: '主動 + 計畫，能把壞消息變成機會。'
  },
  {
    situation: '你越來越不想去學校，早上起床就覺得很沉，但又不知道具體為什麼...',
    emotion: '悲傷', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '去找輔導老師聊，看是什麼累積造成的', correct: true },
      { text: '逼自己每天正常去，壓抑感覺' },
      { text: '直接開始裝病請假' }
    ],
    tip: '身體的抗拒是訊號，不是偷懶。'
  },
  {
    situation: '你想嘗試新髮型但朋友都說「不適合你」，打擊了你的信心...',
    emotion: '受傷', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '勇敢剪，試過再說，反正頭髮會長', correct: true },
      { text: '算了聽朋友的，別冒險' },
      { text: '剪了又立刻弄回來後悔' }
    ],
    tip: '別人的意見是參考，不是你的決定權。'
  },
  {
    situation: '你朋友的爸爸過世，你想安慰他但不知道怎麼開口...',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '傳訊息說「我有在想你，隨時找我都可以」', correct: true },
      { text: '裝沒事不提這件事' },
      { text: '一直問他「感覺怎樣？」讓他重複' }
    ],
    tip: '在場 > 說對話。陪伴本身就是安慰。'
  },
  {
    situation: '你參加了小考小組得獎，但領獎時老師只提了組長的名字，沒提你...',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '跟老師私下說「希望大家都能被看到」', correct: true },
      { text: '當場臉很臭讓大家注意到' },
      { text: '算了，反正我知道就好' }
    ],
    tip: '默默付出會默默消失，適度發聲很重要。'
  },
  {
    situation: '你不想參加家族聚餐因為親戚總愛比較成績，但媽媽堅持要你去...',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '跟媽媽說「我去，但請幫我擋那些比較的話」', correct: true },
      { text: '答應去但當天裝病逃避' },
      { text: '直接拒絕大吵一架' }
    ],
    tip: '跟家人結盟，比單獨對抗整個家族有效。'
  },
  {
    situation: '你一直為了討好班上一個受歡迎的人而改變自己，現在累到不知道自己是誰...',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '暫停刻意迎合，找回自己真正喜歡的東西', correct: true },
      { text: '繼續演下去，已經投資這麼多' },
      { text: '突然翻臉讓那個人嚇一跳' }
    ],
    tip: '要為「真實的你」建立圈子，不是「演出的你」。'
  },
  {
    situation: '你發現自己看見朋友難過反而有點開心，覺得自己是不是太壞了...',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '承認這情緒，問自己「是否感覺被比下去太久了？」', correct: true },
      { text: '逼自己不准有這感覺，強迫正能量' },
      { text: '假裝自己不是那種人，裝作完全理解朋友' }
    ],
    tip: '情緒沒有好壞，只有訊號。承認才能處理。'
  },
  {
    situation: '你的分組同學中有一個人很難合作，你想跟老師反映但怕被說愛告狀...',
    emotion: '挫折', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '先跟他直接溝通 1 次，不行再帶具體事實找老師', correct: true },
      { text: '一直忍，自己扛下全部工作' },
      { text: '直接去跟老師告狀' }
    ],
    tip: '溝通要先直接，失敗再升級。'
  },
  {
    situation: '你在交往中，開始懷疑自己是不是喜歡錯了人，又不敢跟朋友說...',
    emotion: '混亂', stormType: 'tornado', stormEmoji: '🌪️', time: 15,
    options: [
      { text: '誠實面對自己的感覺，找信任的人聊', correct: true },
      { text: '壓下感覺繼續，不然浪費之前的時間' },
      { text: '故意找碴逼對方先提分手' }
    ],
    tip: '感情誠實，對自己也對對方公平。'
  },
  {
    situation: '你看到班上有一個人常一個人吃飯，想邀他一起但又怕自己圈子的人不開心...',
    emotion: '焦慮', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '直接邀請他一起，讓自己圈子接納或溝通', correct: true },
      { text: '等圈子同意再行動' },
      { text: '偷偷跟他在別的地方吃' }
    ],
    tip: '善意不需要別人批准。'
  },
  {
    situation: '你很認真回答老師問題卻答錯，全班笑了，你臉超紅...',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '自己也笑一下「差點對欸」，繼續上課', correct: true },
      { text: '從此再也不舉手' },
      { text: '下課去嗆笑你的人' }
    ],
    tip: '敢答比答對重要，真的。'
  },
  {
    situation: '你家經濟狀況突然變差，爸媽叫你別跟同學說，但你覺得越藏越難受...',
    emotion: '受傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '尊重爸媽的決定，但找輔導老師或親戚傾訴', correct: true },
      { text: '偷偷跟最好的朋友全部說出來' },
      { text: '在網路上匿名爆料發洩' }
    ],
    tip: '家人隱私要守，但你也需要被接住。'
  },
  {
    situation: '你看到同學欺負小動物，他還叫你「不要多管閒事」...',
    emotion: '憤怒', stormType: 'lightning', stormEmoji: '⚡', time: 15,
    options: [
      { text: '堅定說「這是不對的」，並通報大人', correct: true },
      { text: '算了不管，不想惹麻煩' },
      { text: '當場跟他打起來' }
    ],
    tip: '勇敢不等於動手，「通報」也是勇敢。'
  },
  {
    situation: '你開始對自己以前喜歡的興趣失去熱情，擔心自己是不是怪怪的...',
    emotion: '混亂', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '允許自己暫時沒動力，不強迫一定要熱情', correct: true },
      { text: '逼自己繼續，不然之前的努力白費' },
      { text: '完全放棄，從此不碰' }
    ],
    tip: '興趣也有休耕期，不代表你壞了。'
  },
  {
    situation: '你發現爸媽最近吵架變多，家裡氣氛很糟，你很想問但又怕他們說「大人的事不用你管」...',
    emotion: '焦慮', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '跟爸媽說「我有感覺到，我只想關心你們」', correct: true },
      { text: '裝沒事，躲在房間戴耳機' },
      { text: '逼他們講清楚，「你們是不是要離婚？」' }
    ],
    tip: '你不用解決大人的問題，但你有權關心。'
  },
  {
    situation: '你在 IG 追蹤的某個網紅突然取關你，你一直想是不是哪裡得罪他...',
    emotion: '焦慮', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '告訴自己「別人的取關不代表我的價值」', correct: true },
      { text: '私訊問他「我哪裡做錯了？」' },
      { text: '發限動酸他很假' }
    ],
    tip: '別人的選擇 ≠ 對你的評價。'
  },
  {
    situation: '你很想改變自己變得外向一點，但每次硬去社交都超累...',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '承認自己是內向者，找能量補充的社交方式', correct: true },
      { text: '逼自己每天社交直到習慣' },
      { text: '放棄完全不出門' }
    ],
    tip: '內向不是缺陷，是一種能量模式。'
  },
  {
    situation: '你跟朋友吵架冷戰中，你用限動暗示他，他也用限動回擊...',
    emotion: '挫折', stormType: 'tornado', stormEmoji: '🌪️', time: 15,
    options: [
      { text: '停下限動大戰，私訊他「我們面對面說吧」', correct: true },
      { text: '繼續發更嗆的限動贏他' },
      { text: '封鎖他眼不見為淨' }
    ],
    tip: '社群不是吵架的地方，當面才是真解。'
  },
  {
    situation: '你有興趣的系跟分數門檻差一點，爸媽叫你「填比較穩的」放棄夢想科系...',
    emotion: '挫折', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '跟爸媽討論風險，用數據說明自己願意承擔', correct: true },
      { text: '放棄夢想系照爸媽的意思填' },
      { text: '偷偷把志願表改回夢想系' }
    ],
    tip: '為自己爭取，但要有「承擔後果」的準備。'
  },
  {
    situation: '你最近發現自己常失眠，躺在床上想一堆有的沒的...',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '睡前寫「擔心清單」清空大腦，再做呼吸練習', correct: true },
      { text: '滑手機直到睡著' },
      { text: '逼自己不要想，越逼越睡不著' }
    ],
    tip: '大腦的擔心，要先放到紙上才會放過你。'
  },
  {
    situation: '你喜歡的人跟別人在一起了，你還要在班上天天看到他們...',
    emotion: '悲傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '允許自己難過一陣子，轉移注意力到自己的目標', correct: true },
      { text: '逼自己立刻放下，不准再想' },
      { text: '一直刷他們的社群折磨自己' }
    ],
    tip: '心痛是真的痛，但會過。不要催自己。'
  },
  {
    situation: '你跟家教老師處得不好，上課都很痛苦，但爸媽花了錢...',
    emotion: '挫折', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '跟爸媽誠實說明狀況，提議換老師', correct: true },
      { text: '硬撐完不讓爸媽的錢白花' },
      { text: '擺爛讓老師自己不想教' }
    ],
    tip: '爸媽花錢是要你學會，不是要你受折磨。'
  },
  {
    situation: '你發現朋友偷偷在看你女 / 男友的 IG，還私訊他...',
    emotion: '混亂', stormType: 'tornado', stormEmoji: '🌪️', time: 15,
    options: [
      { text: '直接找朋友私下問清楚，態度冷靜', correct: true },
      { text: '在社群公審他' },
      { text: '當作沒看到，自己默默懷疑' }
    ],
    tip: '懷疑要直接問，才能真正解開或結束。'
  },
  {
    situation: '你第一次喝酒，同學起鬨要你多喝，你其實已經不舒服...',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '直接說「我不喝了」，找信任的人陪你離開', correct: true },
      { text: '勉強喝，不然顯得不合群' },
      { text: '偷偷把酒倒掉裝喝' }
    ],
    tip: '身體的界線，比任何合群都重要。'
  },
  {
    situation: '你好不容易鼓起勇氣上台發言，講到一半結巴，觀眾表情很尷尬...',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '停 3 秒喝水，再繼續講下去', correct: true },
      { text: '直接衝下台說不幹了' },
      { text: '草草結尾快點下台' }
    ],
    tip: '停 3 秒比慌張衝過去更專業。'
  },
  {
    situation: '你答應同學要幫他的事，後來發現會違反規定，又怕食言失信於他...',
    emotion: '混亂', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '誠實告訴他「我發現這樣不行，我們想別的辦法」', correct: true },
      { text: '硬著頭皮幫他，反正答應了' },
      { text: '不告而別失聯讓他自己想辦法' }
    ],
    tip: '重新評估不是失信，是負責。'
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
  },
  {
    situation: '這次小考沒考好，你腦中立刻冒出「段考一定也會爛 → 整學期完蛋 → 高中進不了好學校 → 人生毀了」...',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '捕捉到這個「災難鏈」，寫下來後問自己「最壞情況真的這麼嚴重嗎？」', correct: true },
      { text: '把這當警訊，現在開始瘋狂補救所有科目' },
      { text: '告訴自己不要想太多，振作就好' }
    ],
    tip: '【災難化思考】大腦會自動把小事連成大災難。「外化」這個思考鏈是 CBT 核心技巧。'
  },
  {
    situation: '朋友最近忘了你的生日，你心裡浮出「他根本不在乎我，我們的友情是假的」...',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '提醒自己「忘記生日 ≠ 不在乎」，想想他平時做過的事', correct: true },
      { text: '完全否定這段友情，從此疏遠他' },
      { text: '假裝不在乎，等他自己發現' }
    ],
    tip: '【二分法思考】大腦在受傷時會極端化，「全好或全壞」是扭曲。找中間證據才客觀。'
  },
  {
    situation: '你在走廊絆了一下，感覺全校都在看你、都在笑你很蠢...',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '提醒自己「大家其實都在想自己的事，沒那麼在意我」', correct: true },
      { text: '低頭快跑離開現場，以後走路都超小心' },
      { text: '回家查有沒有人在社群 po 你的影片' }
    ],
    tip: '【聚光燈效應】心理學：你以為的「大家都在看」，實際只有 5% 的人注意到。'
  },
  {
    situation: '報告中一句話講錯了，你一整週都在懊惱「我真的好糟」、「我以後不敢再報告」...',
    emotion: '挫折', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '把「這次講錯 = 這次，不等於我以後都會錯」寫下來', correct: true },
      { text: '以後所有報告前都練習 50 次才敢上台' },
      { text: '要求老師以後不要點你報告' }
    ],
    tip: '【過度類化】把單一事件變成永恆規律是認知扭曲。每個「這次」都是獨立事件。'
  },
  {
    situation: '你心情不好一整天，卻一直想「我不應該難過、我應該更堅強、我不應該這樣」...',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '把「應該」換成「可以」：「我可以難過，這是正常情緒」', correct: true },
      { text: '用意志力壓下情緒，告訴自己沒事' },
      { text: '找朋友玩轉移注意力，暫時不去想' }
    ],
    tip: '【該化思考】「應該」是內在批判，讓情緒更糟。「可以」是自我接納，讓情緒流動。'
  },
  {
    situation: '你今天感覺很糟，然後就直接下結論「我就是個糟糕的人」...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '分辨：「我現在感覺糟 ≠ 我是糟糕的」，情緒不是事實', correct: true },
      { text: '檢討自己最近做錯什麼，讓自己感覺這麼糟' },
      { text: '接受這個結論，反正也改不了' }
    ],
    tip: '【情緒推理】「我感覺所以就是」是認知陷阱。感覺會變，身份不會被情緒定義。'
  },
  {
    situation: '一個考不好，你直接對自己說「我就是個廢物」、「我根本不配讀這間學校」...',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '把「我是廢物」改成「我這次考試沒考好」', correct: true },
      { text: '默認這個標籤，以後不要太期待自己' },
      { text: '發誓要把自己變「不廢」，熬夜念書到病倒' }
    ],
    tip: '【貼標籤】把行為等於人格是嚴重扭曲。改成「描述行為」而非「定義自己」就能跳脫。'
  },
  {
    situation: '朋友說了你 10 個優點 1 個缺點，你整天都在想那 1 個缺點...',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '刻意重讀那 10 個優點 3 次，讓大腦重新平衡', correct: true },
      { text: '專心改那 1 個缺點，其他再說' },
      { text: '覺得朋友是在客套，那 10 個優點都是假的' }
    ],
    tip: '【負向偏誤】大腦對負面資訊的記憶是正面的 5 倍。要「刻意」回看正面才能平衡。'
  },
  {
    situation: '同學在走廊笑，你覺得「一定是在笑我」，整天心情不好...',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '問自己「有任何證據嗎？」，沒有證據就不採信', correct: true },
      { text: '直接衝過去問他們在笑什麼' },
      { text: '從此避開那幾個同學' }
    ],
    tip: '【個人化】把不相關的事歸給自己是認知扭曲。「有證據再相信」是破解關鍵。'
  },
  {
    situation: '你很怕上台，所以這學期每次報告都找人代替或請病假...',
    emotion: '焦慮', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '從小型上台開始練習（先對 3 個人講），逐步暴露', correct: true },
      { text: '繼續避開，等長大有自信了再說' },
      { text: '強迫自己下次直接上台大型報告' }
    ],
    tip: '【安全行為】越迴避焦慮越加強。「漸進式暴露」才是解方，從小的挑戰開始。'
  },
  {
    situation: '每次情緒湧上來你就立刻滑手機、打遊戲、吃東西轉移注意力...',
    emotion: '混亂', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '刻意停 3 分鐘，先感受情緒「我現在是什麼感覺？」', correct: true },
      { text: '繼續用這些方法，反正也過得去' },
      { text: '強迫自己不許做這些事' }
    ],
    tip: '【情緒迴避】長期迴避讓情緒不會被處理。先「感受 3 分鐘」比立刻逃更健康。'
  },
  {
    situation: '媽媽一難過你就全身緊繃，好像她的情緒就是你的情緒...',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '練習分辨：「這是媽媽的情緒，不是我的。我可以關心但不用承擔」', correct: true },
      { text: '馬上想辦法哄她開心，讓自己也好過' },
      { text: '躲進房間不管她' }
    ],
    tip: '【自我分化】家庭中分不清「誰的情緒」會讓人窒息。練習「同情但不融合」是關鍵。'
  },
  {
    situation: '爸爸常說「你很自私」，你現在每次想做自己喜歡的事都覺得「我好自私」...',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '問自己「這真的是我的想法嗎？還是爸爸的？」', correct: true },
      { text: '為了不自私，都先滿足別人的需求' },
      { text: '乾脆接受「我就是自私」這個標籤' }
    ],
    tip: '【內攝】別人的批評被吞進去變成內在聲音。辨識「這不是我」才能丟掉它。'
  },
  {
    situation: '你討厭某個同學「很愛炫耀」，但其實你自己最近也常這樣...',
    emotion: '混亂', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '誠實問自己「我討厭他是不是因為看到自己？」', correct: true },
      { text: '繼續討厭他，反正他更嚴重' },
      { text: '告訴大家他很愛炫耀' }
    ],
    tip: '【投射】我們最討厭別人的特質，往往是自己壓抑的部分。看見才能整合。'
  },
  {
    situation: '你在班上什麼都追求完美，其實內心超沒自信...',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '練習「允許做到 80 分就好」，讓大腦習慣不完美也 OK', correct: true },
      { text: '繼續努力，至少外在看起來很好' },
      { text: '突然放棄所有努力，擺爛到底' }
    ],
    tip: '【過度補償】用完美表現蓋住自卑會越來越累。「允許 80 分」是鬆綁的開始。'
  },
  {
    situation: '連續幾次爭取機會都沒成功，你開始覺得「試也沒用」、連新的機會都不想爭取...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '刻意挑一件「結果不重要」的小事試試，重新建立掌控感', correct: true },
      { text: '繼續擺爛，反正也不會成功' },
      { text: '強迫自己硬上，這次一定要成功' }
    ],
    tip: '【習得無助】反覆失敗會讓大腦關機。從「小而可控」的事重建能動性是解方。'
  },
  {
    situation: '第一次段考全班倒數，之後每次考試都覺得「我就是倒數的人」...',
    emotion: '挫折', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '刻意回想「我以前也考過好成績」的例子，不被單次定義', correct: true },
      { text: '繼續這樣想，至少期待低就不會失望' },
      { text: '徹夜讀書要證明自己不是倒數' }
    ],
    tip: '【錨定效應】大腦會被「第一個數字」錨住。主動找「反例」才能鬆動錨點。'
  },
  {
    situation: '為了融入團體，你開始跟他們一起嘲笑某個同學，笑完心裡很不舒服但又告訴自己「這沒什麼」...',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '承認這個矛盾，下次練習不附和，即使不舒服', correct: true },
      { text: '繼續說服自己沒事，融入比較重要' },
      { text: '以後都不跟這個團體來往' }
    ],
    tip: '【認知失調】行為和價值觀不一致會心痛。不是改信念，是改行為才能真一致。'
  },
  {
    situation: '班上都在傳某個謠言，你心裡不信但也跟著傳，事後很後悔...',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '下次練習「不附和」，可以沉默或轉話題', correct: true },
      { text: '繼續跟著傳，反正大家都在傳' },
      { text: '去澄清那個謠言，即使跟大家對立' }
    ],
    tip: '【從眾壓力】即使不同意，80% 的人仍會從眾。有意識的「不附和」是練習來的。'
  },
  {
    situation: '最好的朋友最近很憂鬱，你發現自己也開始莫名低落、對什麼都沒興趣...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '陪伴朋友之餘也保留「自己的時間」，避免被情緒淹沒', correct: true },
      { text: '覺得陪他是義務，再累也要每天陪' },
      { text: '疏遠他免得自己也憂鬱' }
    ],
    tip: '【情緒傳染】透過鏡像神經元，憂鬱會傳染。陪伴需要界線，你不能被拖下水。'
  },
  {
    situation: '腦中總有個聲音在罵「你好爛、你什麼都做不好、大家都在看你出糗」...',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '把這個聲音「命名」（例如「批評先生」），跟它分開', correct: true },
      { text: '相信這個聲音，它是在提醒我進步' },
      { text: '強迫它閉嘴，越壓越大聲' }
    ],
    tip: '【內在批判者】大腦內化了外在批評。「命名」能把它從「我」變成「它」。'
  },
  {
    situation: '跟男 / 女朋友在一起超焦慮，怕做錯什麼被甩，開始過度討好、壓抑自己...',
    emotion: '焦慮', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '練習說出真實感受，讓對方認識「真的你」', correct: true },
      { text: '繼續討好，至少關係能維持' },
      { text: '故意冷淡，先讓對方害怕失去你' }
    ],
    tip: '【焦慮依附】討好來的關係不穩定。真實展現後還被愛，才是安全的愛。'
  },
  {
    situation: '你每次都說「我就是不爽」，但其實不確定那是失望、難過、還是恐懼...',
    emotion: '混亂', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '每天寫下 3 種情緒名稱，練習分辨細微差異', correct: true },
      { text: '用「不爽」概括就好，反正都差不多' },
      { text: '去心理諮商才能分辨情緒' }
    ],
    tip: '【情緒粒度】能分辨細緻情緒的人，情緒調節能力高 2 倍。這是可以練的。'
  },
  {
    situation: '媽媽生重病你崩潰大哭，之後你強迫自己每天「正能量、加油」，一個月後身體反而垮了...',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '允許自己脆弱、哭、找人支持，不用一直堅強', correct: true },
      { text: '再更正能量，一定要撐住' },
      { text: '什麼情緒都不要有，麻木就好' }
    ],
    tip: '【防衛性樂觀】假正向會引發身體壓力反應。允許脆弱反而是復原的開始。'
  },
  {
    situation: '重大考試前你突然「沒感覺」，不緊張也不期待，像在看別人考試...',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '不逼自己「要有感覺」，告訴身邊大人你的狀態', correct: true },
      { text: '假裝很有鬥志，免得被說沒動力' },
      { text: '放棄考試，反正沒感覺' }
    ],
    tip: '【情緒凍結】大壓力下情緒會暫時關機保護你。找人陪伴比強迫激活更安全。'
  },
  {
    situation: '明明很喜歡某個同學，但你每次遇到他就故意擺臭臉說他很煩...',
    emotion: '混亂', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '觀察這個矛盾：「我是不是怕被拒絕所以先推開？」', correct: true },
      { text: '繼續冷淡，至少不會被笑' },
      { text: '突然大轉彎超熱情，讓對方嚇到' }
    ],
    tip: '【反向形成】害怕情感受傷會用相反方式防衛。看見才能改寫。'
  },
  {
    situation: '上週開始蹺一節課，這週蹺兩節，你想「反正都爛掉了」索性整週都擺爛...',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '今天先做一件「最小的對的事」重新開始，不等「完美復活」', correct: true },
      { text: '等下禮拜重新開始，今天繼續爛' },
      { text: '自責一整天，什麼都不做' }
    ],
    tip: '【破窗效應】一個破口會引發全面崩壞。修補「一個小窗」就能擋住連鎖反應。'
  },
  {
    situation: '考試前一直滑手機看小說，你腦中想「反正考不好，滑手機至少開心」...',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '承認是大腦在逃避焦慮，用 5 分鐘念書試著打破循環', correct: true },
      { text: '繼續滑，至少現在不焦慮' },
      { text: '強迫自己不看手機 6 小時，結果更焦慮' }
    ],
    tip: '【延遲享樂】大腦偏好短期快樂。「5 分鐘原則」能繞過拖延機制。'
  },
  {
    situation: '你只看最近一次失敗，忘記之前其實進步很多...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '翻開舊作業或照片，刻意回看「以前的你 vs 現在的你」', correct: true },
      { text: '只看這次失敗，警惕自己不能鬆懈' },
      { text: '刪掉所有紀錄，重新開始' }
    ],
    tip: '【近期偏誤】大腦對最近的事記得最清楚。主動「回看過去」能恢復自我判斷。'
  },
  {
    situation: '一個同學長得好看，你自動覺得他「聰明、有品味、什麼都好」，但其實不了解他...',
    emotion: '混亂', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '提醒自己「好看 ≠ 其他能力」，實際相處再判斷', correct: true },
      { text: '既然看起來好就跟他深交' },
      { text: '暗戀他一整年不主動認識' }
    ],
    tip: '【月暈效應】單一優點會光環化整個人。拆開評估能避免判斷錯誤。'
  },
  {
    situation: '同學遲到你想「他好懶」，你遲到時卻想「今天路上塞車」...',
    emotion: '憤怒', stormType: 'lightning', stormEmoji: '⚡', time: 15,
    options: [
      { text: '問自己：「如果是我遲到，我會怎麼解釋？」試著同理對方', correct: true },
      { text: '堅信他就是懶，自己有特殊理由' },
      { text: '不管為什麼，遲到就是不對' }
    ],
    tip: '【基本歸因謬誤】別人做錯歸因個性，自己做錯歸因情境。換位思考能破解。'
  },
  {
    situation: 'IG 上每次點開追蹤名單，你就想「他們都好優秀，我是最差的」...',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '意識到「我只看到他們的精選」，跟自己的日常不可比', correct: true },
      { text: '取消追蹤他們，眼不見為淨' },
      { text: '努力讓自己也看起來一樣優秀' }
    ],
    tip: '【選擇性注意】社群是精選集不是日常。比較本身就是不公平的運動。'
  },
  {
    situation: '朋友說「我們都不讀書了吧！」你明明有計畫也跟著說「對啊」，結果一起擺爛...',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '練習說「你們擺爛沒關係，但我今天想念書」', correct: true },
      { text: '繼續跟著，不然被排擠' },
      { text: '邊跟他們玩邊偷偷念書' }
    ],
    tip: '【社會認同】「大家都這樣」是強大的壓力。保留個人軌道需要明確發聲。'
  },
  {
    situation: '朋友幫過你大忙，現在他借錢你明明沒有，卻覺得「欠他不能拒絕」...',
    emotion: '焦慮', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '分辨：「幫忙是他的選擇，借錢是我的能力範圍」', correct: true },
      { text: '硬擠出錢借他，不然不知感恩' },
      { text: '借了再跟爸媽要，反正會還' }
    ],
    tip: '【互惠原則】過度互惠讓人被綁架。「感恩 ≠ 無限配合」。'
  },
  {
    situation: '跟某人交往半年很不合，但你想「我已經付出這麼多，分手太可惜」...',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '問自己：「如果今天才認識他，我會選擇在一起嗎？」', correct: true },
      { text: '再努力一陣子，反正都付出了' },
      { text: '立刻分手，不要再浪費時間' }
    ],
    tip: '【沉沒成本】已付出的無法收回。未來的決定只該依「未來價值」判斷。'
  },
  {
    situation: '某個人你傳訊息從不秒回，你反而覺得他「很神秘、很吸引」、越想接近...',
    emotion: '焦慮', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '意識到是「稀缺」在操控你，先冷靜看他其他特質', correct: true },
      { text: '乾脆追求看看，反正喜歡' },
      { text: '用同樣方式冷淡他讓他也喜歡我' }
    ],
    tip: '【稀缺原理】越得不到越想要，這是本能不是愛。分辨情感 vs 渴求很重要。'
  },
  {
    situation: '班上有個人很優秀，你跟他比就覺得自己什麼都做不到...',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '刻意跟「3 個月前的自己」比，而不是他', correct: true },
      { text: '繼續跟他比，當作鞭策自己' },
      { text: '盡量不要看到他，眼不見為淨' }
    ],
    tip: '【對比效應】跟極端優秀者比會扭曲自我評價。縱向比較（跟過去的自己）才公平。'
  },
  {
    situation: '老師說「這次題目偏難」，你聽完後所有題目都覺得寫不出來、比想像中難很多...',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '先跳過「感覺難」的印象，一題一題看實際難度', correct: true },
      { text: '相信老師，放鬆心情反正大家都難' },
      { text: '提早交卷，反正會考爛' }
    ],
    tip: '【框架效應】同一件事用不同方式描述感受天差地別。「拿掉框架」才看到真實。'
  },
  {
    situation: '你想考 100 分，但每次模擬只有 80，就越想越焦慮「怎麼辦永遠達不到」...',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '把「100 分」拆成「先練到 85」的中繼目標，一步一步走', correct: true },
      { text: '繼續逼自己，總有一天會到' },
      { text: '降低期待到 60 分，就不會焦慮' }
    ],
    tip: '【心理對比】遙遠目標會引發無力感。「小而近」的目標啟動執行動力。'
  },
  {
    situation: '一題數學題怎麼算都錯，你氣到把整張考卷撕了...',
    emotion: '憤怒', stormType: 'lightning', stormEmoji: '⚡', time: 15,
    options: [
      { text: '深呼吸，跳過這題去寫下一題，不讓一題毀了全局', correct: true },
      { text: '死磕到底，這題不會其他都不寫' },
      { text: '乾脆交白卷，反正都撕了' }
    ],
    tip: '【完成偏誤】大腦討厭「未完成」會反覆卡住。跳過讓大腦解套才能前進。'
  },
  {
    situation: '要報名新社團你就害怕，覺得「我不認識任何人、我會很孤單」，連嘗試都不敢...',
    emotion: '焦慮', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '先報名觀摩一次，只答應自己「試 1 次就好」', correct: true },
      { text: '繼續待在熟悉的圈子，安全比較重要' },
      { text: '逼自己一口氣報 3 個社團' }
    ],
    tip: '【熟悉度偏誤】大腦偏好熟悉的東西。「只試 1 次」能騙過防衛機制。'
  },
  {
    situation: '你很樂觀覺得「這次段考不用念應該也能考 80 分」，結果考 40 分...',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '承認「樂觀 ≠ 準備」，下次用「想像失敗」來激勵準備', correct: true },
      { text: '繼續樂觀，這次只是意外' },
      { text: '從此變超悲觀，永不樂觀了' }
    ],
    tip: '【正向錯覺】過度樂觀會降低備戰。「心理對比」（同時想好與壞）才能真的行動。'
  },
  {
    situation: '你認定某個老師討厭你，每次互動都只記得他對你不好的那些事...',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '刻意記 3 件「他對你中性或好」的事，打破確認循環', correct: true },
      { text: '繼續相信他討厭你，保持距離' },
      { text: '直接跟老師對質「你是不是討厭我」' }
    ],
    tip: '【確認偏誤】大腦只找符合信念的證據。刻意找反例才能打破扭曲。'
  },
  {
    situation: '你只追蹤跟你意見一樣的人，久了覺得「整個世界都這樣想」...',
    emotion: '混亂', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '刻意追蹤 3 個「不同意見但有理」的人，訓練大腦彈性', correct: true },
      { text: '繼續維持，不要被雜音干擾' },
      { text: '取消所有追蹤，不看社群了' }
    ],
    tip: '【同溫層】演算法會強化偏見。主動「跨界」才能維持認知彈性。'
  },
  {
    situation: '重要考試前你突然各種「準備不好」：熬夜追劇、手機沉迷，事後好像是故意的...',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '意識到「我在為失敗先準備藉口」，面對是怕失敗，不是懶', correct: true },
      { text: '下次意志力要更強才能拼過' },
      { text: '接受自己就是懶，考爛也正常' }
    ],
    tip: '【自我設限】故意破壞能力是因為怕「盡全力還失敗」。直接面對恐懼是解方。'
  },
  {
    situation: '每次爸媽說話你就不自覺頂嘴、翻白眼，事後才發現「啊我又來了」...',
    emotion: '憤怒', stormType: 'tornado', stormEmoji: '🌪️', time: 15,
    options: [
      { text: '察覺「這是自動化反應」，深呼吸 3 秒再開口', correct: true },
      { text: '繼續頂嘴，反正是他們先挑釁' },
      { text: '從此不跟爸媽說話' }
    ],
    tip: '【習慣性反應】大腦走捷徑變自動化。「暫停 3 秒」是打斷的關鍵。'
  },
  {
    situation: '在家很累，一到學校就要擺出開朗的樣子跟大家聊天，久了好疲倦...',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '允許自己偶爾「安靜一天」，不用每天都活力滿滿', correct: true },
      { text: '繼續演下去，朋友才不會離開' },
      { text: '從此不跟任何人互動' }
    ],
    tip: '【情緒勞動】長期壓抑真實情緒會燒盡。允許「表情休假」才能持續。'
  },
  {
    situation: '做錯事被老師講，你超羞愧 → 想躲起來 → 躲了反而被老師誤會 → 更羞愧...',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '反向操作：主動去找老師說明，反而中斷羞愧迴路', correct: true },
      { text: '繼續躲，時間會淡化' },
      { text: '更嚴厲自責逼自己進步' }
    ],
    tip: '【羞愧迴路】羞愧 → 退縮 → 更羞愧。主動行動（跟羞愧相反）才能中斷。'
  },
  {
    situation: '好朋友搬走你一直不想承認他離開，常常忘記他已經走了...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '允許自己經歷悲傷的各個階段，不急著「走出來」', correct: true },
      { text: '強迫自己認清事實，不要再想' },
      { text: '馬上找新朋友替代，不要卡在過去' }
    ],
    tip: '【悲傷五階段】否認、憤怒、討價還價、沮喪、接納。每個階段都是過程。'
  },
  {
    situation: '被朋友背叛你整個人垮掉，但你強迫自己「快點站起來，不能軟弱」...',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '允許自己「垮」一週，好好休息比強迫堅強更快復原', correct: true },
      { text: '逼自己 3 天就振作，時間就是金錢' },
      { text: '完全放棄，以後都不信人' }
    ],
    tip: '【心理韌性】韌性不是「不倒」，是「倒了能再站起來」。允許垮反而是關鍵。'
  },
  {
    situation: '考前超焦慮，你有兩個選項：「深呼吸接受這種感覺」 vs 「壓抑不要想」...',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '深呼吸重新解讀「焦慮 = 身體在幫我準備，不是壞事」', correct: true },
      { text: '努力壓抑「不要想焦慮」，反而更焦慮' },
      { text: '喝咖啡把焦慮感硬壓下來' }
    ],
    tip: '【情緒調節】重評（重新解讀）比壓抑有效太多。同樣身體感覺，意義不同就差天地。'
  },
  {
    situation: '你這次考很爛，腦中全是「我好爛、我怎麼這麼差」的自我批評...',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '用「對好朋友的語氣」對自己說話：「沒關係，這次盡力了」', correct: true },
      { text: '罵自己才能進步，下次才不會鬆懈' },
      { text: '完全不想，去玩手遊轉移' }
    ],
    tip: '【自我疼惜】自我批評降低學習力，自我疼惜提升。像對待朋友一樣對待自己。'
  },
  {
    situation: '你常常在腦中重播昨天的事、擔心明天，很少真正在「現在」...',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '每天花 5 分鐘練習「此刻我看到什麼 / 聽到什麼」', correct: true },
      { text: '繼續多想，才不會忘東忘西' },
      { text: '等長大有空再練習正念' }
    ],
    tip: '【正念】大腦預設模式是亂想過去未來。回到當下需要刻意練習。'
  },
  {
    situation: '你挑了難度剛剛好的題目做，做得超專注，連時間都忘了，這就是最棒的狀態...',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '刻意找「不太難也不太簡單」的事做，製造更多這種專注狀態', correct: true },
      { text: '找最難的事挑戰，才有成就感' },
      { text: '只做簡單的事，不要為難自己' }
    ],
    tip: '【心流】能力與挑戰匹配時最快樂。刻意設計「剛剛好」的事可以召喚心流。'
  },
  {
    situation: '班上有個同學不講心事，你覺得他不信任你，但其實他是怕被評價...',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '先分享自己的脆弱，讓他感到「說真話也安全」', correct: true },
      { text: '直接問他「你是不是不信任我」' },
      { text: '放棄當他的好朋友，找肯說的人' }
    ],
    tip: '【心理安全感】人只有在「不會被批評」的環境才敢脆弱。先示範安全才能共振。'
  },
  {
    situation: '你痛苦到快崩潰，有人叫你「接受痛苦繼續往前」，你覺得這根本是風涼話...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '試著「不趕痛苦走」但也「做今天能做的一件小事」', correct: true },
      { text: '先消除痛苦再繼續，不然做什麼都沒意義' },
      { text: '承認自己做不到，直接放棄一切' }
    ],
    tip: '【ACT】接納承諾療法：不消除痛苦，帶著痛苦行動。這是現代心理學核心。'
  },
  {
    situation: '你跟阿嬤沒講完的話她就過世了，你一直卡在這件事走不出來...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '寫一封信對她說出沒說的話，或在墓前念出來', correct: true },
      { text: '不要想，時間會沖淡一切' },
      { text: '強迫自己每天想，當作忠於她' }
    ],
    tip: '【未竟之事】未完成的表達會卡在心裡。用象徵性方式「說完」能釋放。'
  },
  {
    situation: '家人有事就焦慮的是你，其他人反而沒事。你常搞不清「這是他的事還是我的」...',
    emotion: '混亂', stormType: 'tornado', stormEmoji: '🌪️', time: 15,
    options: [
      { text: '問自己：「這件事的結果會直接影響我的人生嗎？」不是就放下', correct: true },
      { text: '繼續替他擔心，這才是家人的義務' },
      { text: '從此不管家人的事' }
    ],
    tip: '【邊界感】家人的情緒入侵是隱性暴力。「分辨誰的事」是成人化的起點。'
  },
  {
    situation: '壓力大時你就想買東西，買完開心 1 小時，之後空虛更嚴重還花光零用錢...',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '找出「購物前那 10 秒」的真正情緒，用其他方式回應（散步、聊天）', correct: true },
      { text: '繼續買，至少開心那 1 小時' },
      { text: '強迫自己永遠不能買任何東西' }
    ],
    tip: '【情緒性消費】購物快感是補償空虛。捕捉「購物前 10 秒」的情緒才能中斷。'
  },
  {
    situation: '你從小爸媽說「不要哭」、「不要生氣」，長大後你也不太會表達情緒，常說不出感受...',
    emotion: '混亂', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '每天寫 1 個情緒日記，練習用文字說出感受', correct: true },
      { text: '反正我就是這樣，沒辦法改' },
      { text: '強迫自己在所有人面前表達' }
    ],
    tip: '【情感忽視】童年情緒被忽略會導致「不會感受」。從「寫」開始是最低門檻練習。'
  },
  {
    situation: '你感覺「怪怪的、悶悶的、說不出來」，朋友問你「你怎麼了」，你真的答不出來...',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '用身體開始：「我胸口緊 / 肚子熱 / 喉嚨卡」，身體是情緒的線索', correct: true },
      { text: '隨便講個理由讓朋友滿意' },
      { text: '說「不知道」然後逃走' }
    ],
    tip: '【述情障礙】感受不到情緒名稱是常見的。先從身體感覺開始命名是突破口。'
  },
  {
    situation: '手機離開 5 分鐘你就恐慌，感覺像丟了身體的一部分...',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '每天刻意 10 分鐘不碰手機，觀察自己的不適然後放下', correct: true },
      { text: '繼續黏著，反正現代人都這樣' },
      { text: '直接丟手機 7 天戒斷' }
    ],
    tip: '【數位依附】手機變成情緒調節工具會弱化內在調節力。漸進式脫離才可持續。'
  },
  {
    situation: '你以為你害怕的是考試，但其實真正怕的是「考不好爸媽就不愛我」...',
    emotion: '焦慮', stormType: 'thunder', stormEmoji: '⛈️', time: 15,
    options: [
      { text: '跟爸媽聊：「如果我考不好，你們還會愛我嗎？」', correct: true },
      { text: '繼續努力考好，愛就會留下' },
      { text: '乾脆考爛，測試爸媽到底愛不愛我' }
    ],
    tip: '【焦慮錯位】外層焦慮常蓋著深層恐懼。找到「真正怕什麼」才能真正解決。'
  },
  {
    situation: '你習慣身邊都有人，一獨處就焦慮覺得自己沒朋友、很孤單...',
    emotion: '焦慮', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '每天刻意獨處 15 分鐘，練習「一個人也 OK」的感覺', correct: true },
      { text: '多找朋友填滿時間，不要讓自己獨處' },
      { text: '確認「我真的很孤單」這個想法是事實' }
    ],
    tip: '【孤獨耐受】獨處能力是心理健康指標。短時間刻意練習可以重建。'
  },
  {
    situation: '你被霸凌後反覆想「是不是我穿太奇怪 / 講話太怪所以活該」...',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '分辨：「別人選擇攻擊我 = 他的問題，不是我的責任」', correct: true },
      { text: '檢討自己改掉「奇怪」的地方，就不會再被欺負' },
      { text: '從此躲起來不跟任何人互動' }
    ],
    tip: '【責備受害者】把他人暴力歸咎自己是創傷反應。霸凌 100% 是加害者的責任。'
  },
  {
    situation: '一件小事你想了整晚：「他為什麼這樣說？他是不是討厭我？我是不是做錯什麼？」',
    emotion: '焦慮', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '設「只能想 20 分鐘」的限時，結束就刻意做別的事', correct: true },
      { text: '繼續想，想通了就解脫' },
      { text: '強迫自己不要想，越不想越想' }
    ],
    tip: '【反芻思考】無限迴圈是焦慮的溫床。「限時擔心法」能給思緒一個出口。'
  },
  {
    situation: '聞到某個味道你突然回到被罵的那個場景，身體整個僵住，不知道為什麼...',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '用「5-4-3-2-1 接地技巧」把自己拉回當下（看 5 物、聽 4 聲...）', correct: true },
      { text: '硬是讓自己別再想那件事' },
      { text: '避開所有會聞到這味道的地方' }
    ],
    tip: '【創傷閃回】身體記得比意識早。接地技巧能快速回到當下，是 PTSD 核心工具。'
  },
  {
    situation: '朋友心情不好你就覺得「我也要心情不好」，好像一起痛才算在乎他...',
    emotion: '混亂', stormType: 'chaos', stormEmoji: '🌀', time: 15,
    options: [
      { text: '告訴自己：「他的痛不是我的責任。我可以穩定，他才有靠山」', correct: true },
      { text: '繼續一起痛，這才是真朋友' },
      { text: '疏遠他，不要被拖下水' }
    ],
    tip: '【情感責任】把別人的情緒扛在身上會雙輸。保持穩定反而是最深的支持。'
  },
  {
    situation: '你覺得「只要我夠好，爸媽就會相愛」，所以從小超認真扮演好孩子...',
    emotion: '混亂', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '認知：「爸媽的關係不是我的責任」，放下這個重擔', correct: true },
      { text: '繼續當好孩子，總有一天會成功' },
      { text: '索性擺爛，反正怎麼做也沒用' }
    ],
    tip: '【親職化】小孩背負父母關係是創傷。成長第一步是「把不屬於我的還回去」。'
  },
  {
    situation: '你跟朋友冷戰了，兩週都沒互動。你心裡很想和好但想「他應該先道歉」...',
    emotion: '挫折', stormType: 'snow', stormEmoji: '❄️', time: 15,
    options: [
      { text: '先傳「我想我們」，放下「誰先」的執念', correct: true },
      { text: '繼續等他，先道歉的就輸了' },
      { text: '找共同朋友打聽他的想法' }
    ],
    tip: '【自我價值感】越在意「誰先」的人通常安全感越低。想修復 ≠ 認輸。'
  },
  {
    situation: '你終於學會拒絕別人，但每次拒絕完都超罪惡感、失眠...',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '告訴自己「拒絕不會讓我變壞人，只是還沒習慣」，接受不舒服', correct: true },
      { text: '收回拒絕，答應對方就不會罪惡感' },
      { text: '以後都不拒絕，免得難受' }
    ],
    tip: '【討好型復原】拒絕時的罪惡感是戒斷反應。熬過 2 週就會變習慣。'
  },
  {
    situation: '你對未來迷惘：不知道要讀什麼、做什麼、喜歡什麼，每件事都提不起勁...',
    emotion: '混亂', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '不急著找答案，每天記錄「哪些小事讓我好奇 / 充電」', correct: true },
      { text: '趕快做職涯測驗，找到正確答案' },
      { text: '跟爸媽說的方向走，反正不知道' }
    ],
    tip: '【自我探索】志向不是「想出來的」是「試出來的」。從興趣線索慢慢收集。'
  },
  {
    situation: '你生日爸媽都沒空，你假裝沒事但其實心很碎...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '直接告訴爸媽：「我很失望，生日這天對我很重要」', correct: true },
      { text: '假裝沒事，他們一定也不好過' },
      { text: '用冷戰讓他們自己意識到' }
    ],
    tip: '【情感表達】沉默不能教會別人愛你的方式。說出來才有機會被聽見。'
  },
  {
    situation: '好友做了一件你很介意的事，你沒說破，但之後看他就不舒服、關係越冷...',
    emotion: '受傷', stormType: 'hail', stormEmoji: '💔', time: 15,
    options: [
      { text: '誠實說：「那件事讓我介意，我們可以聊聊嗎？」', correct: true },
      { text: '繼續忍，友誼會自己修復' },
      { text: '慢慢減少聯絡，淡出這段友誼' }
    ],
    tip: '【情感壓抑】沒說出口的不滿會腐蝕關係。及早表達比慢性毒藥好。'
  },
  {
    situation: '你明明超累想睡，但躺下就滑手機到半夜 2 點，隔天後悔但又重複...',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '把手機放房間外面，降低「伸手可得」的門檻', correct: true },
      { text: '用意志力忍住，好好克制' },
      { text: '接受這就是我，擺爛到底' }
    ],
    tip: '【環境設計】意志力有限。「改變環境」比「改變自己」便宜太多。'
  },
  {
    situation: '被老師點名你超緊張，心想「等等一定會結巴被笑」，結果真的結巴了...',
    emotion: '羞愧', stormType: 'blizzard', stormEmoji: '🌨️', time: 15,
    options: [
      { text: '下次刻意換想法：「即使結巴也沒人會記得」，大腦會真的放鬆', correct: true },
      { text: '以後每次都假裝不會被點到' },
      { text: '每天練習發音 1 小時' }
    ],
    tip: '【自我實現預言】擔心什麼就真的發生。換個預期能改變大腦準備狀態。'
  },
  {
    situation: '朋友做什麼都很強，你想學又怕學不來，乾脆說「我就是沒才能」不努力...',
    emotion: '挫折', stormType: 'heat', stormEmoji: '🔥', time: 15,
    options: [
      { text: '重新解讀：「我現在還不會」（固定 → 成長思維）', correct: true },
      { text: '承認沒才能，不要浪費時間嘗試' },
      { text: '逼自己超過他，證明有才能' }
    ],
    tip: '【成長思維】「還不會」比「沒才能」多了可能性。這一個字改寫大腦的可塑性。'
  },
  {
    situation: '你每天都裝得很開心，偶爾想哭也趕快抹掉眼淚說「沒事」...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '允許自己找 1 個安全的人，對他說「我其實不太好」', correct: true },
      { text: '繼續演下去，不要讓人擔心' },
      { text: '躲起來大哭到沒眼淚' }
    ],
    tip: '【情感壓抑】壓抑眼淚會變身體症狀（頭痛胃痛）。找 1 個安全對象是第一步。'
  },
  {
    situation: '你的「內在聲音」一直很嚴厲，你開始想「如果它是朋友，我會跟他當朋友嗎？」',
    emotion: '混亂', stormType: 'fog', stormEmoji: '🌫️', time: 15,
    options: [
      { text: '刻意練習對自己說「沒關係、會過去的」等溫柔話', correct: true },
      { text: '嚴厲的聲音才能鞭策進步，留著它' },
      { text: '關掉所有情緒，什麼都不想' }
    ],
    tip: '【自我對話】內在對話會重塑大腦。刻意溫柔是科學上最有效的心理練習之一。'
  },
  {
    situation: '分手後你不斷重播兩人回憶，停不下來、睡不著、吃不下...',
    emotion: '悲傷', stormType: 'rain', stormEmoji: '🌧️', time: 15,
    options: [
      { text: '允許哀悼 + 每天做 1 件「舊生活」的事（運動、念書）', correct: true },
      { text: '立刻交新對象，轉移注意力' },
      { text: '封閉自己不見任何人 1 個月' }
    ],
    tip: '【悲傷 vs 憂鬱】分手會經歷幾週悲傷是正常的。「悲傷+日常」並行是復原模式。'
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
