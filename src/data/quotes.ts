export type Category = 'spor' | 'disiplin' | 'hatirlat' | 'yaz' | 'bilgelik'
/** Kullanıcının oluşturduğu kategorilerin kimliği. */
export type CustomCategoryId = `c-${string}`

export interface Quote {
  id: string
  /** Sözün kendisi (özgün dilinde). */
  text: string
  /** Söz İngilizceyse Türkçe karşılığı. */
  tr?: string
  author?: string
  /** Söz kime ait olduğu kesin değilse "atfedilir" gibi kısa bir not. */
  note?: string
  cat: Category | CustomCategoryId
  /** Sabit bir fotoğraf istenirse photos.ts'deki id. */
  photo?: string
  /** Kullanıcının eklediği söz mü? */
  mine?: boolean
  createdAt?: number
}

export const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: 'spor', label: 'Spor & Güç', emoji: '🔥' },
  { id: 'disiplin', label: 'Disiplin', emoji: '⏳' },
  { id: 'hatirlat', label: 'Kendine Hatırlat', emoji: '💛' },
  { id: 'yaz', label: 'Yaz Ruhu', emoji: '☀️' },
  { id: 'bilgelik', label: 'Bilgelik', emoji: '🌿' },
]

export const QUOTES: Quote[] = [
  // ——— Spor & Güç ———
  { id: 's1', cat: 'spor', text: 'Practice makes perfect.', tr: 'Pratik, mükemmelleştirir.', author: 'İngiliz atasözü' },
  { id: 's2', cat: 'spor', text: 'Hard work beats talent when talent doesn’t work hard.', tr: 'Yetenek çalışmadığında, çok çalışmak yeteneği yener.', author: 'Tim Notke' },
  { id: 's3', cat: 'spor', text: 'You miss 100% of the shots you don’t take.', tr: 'Atmadığın şutların %100’ünü kaçırırsın.', author: 'Wayne Gretzky' },
  { id: 's4', cat: 'spor', text: 'I’ve failed over and over and over again in my life. And that is why I succeed.', tr: 'Hayatımda defalarca, defalarca başarısız oldum. Başarılı olmamın sebebi de bu.', author: 'Michael Jordan' },
  { id: 's5', cat: 'spor', text: 'It ain’t about how hard you hit. It’s about how hard you can get hit and keep moving forward.', tr: 'Mesele ne kadar sert vurduğun değil; ne kadar sert darbe alıp yine de ilerleyebildiğin.', author: 'Rocky Balboa', note: 'Rocky Balboa (2006) filminden' },
  { id: 's6', cat: 'spor', text: 'No pain, no gain.', tr: 'Emek yoksa kazanç da yok.', author: 'Spor salonlarının klasiği' },
  { id: 's7', cat: 'spor', text: 'Ter, yağların ağlamasıdır.', author: 'Salon esprisi' },
  { id: 's8', cat: 'spor', text: 'Strength does not come from physical capacity. It comes from an indomitable will.', tr: 'Güç, fiziksel kapasiteden gelmez. Boyun eğmeyen bir iradeden gelir.', author: 'Mahatma Gandhi' },
  { id: 's9', cat: 'spor', text: 'I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.', tr: '10.000 farklı tekmeyi birer kez çalışandan korkmam; tek bir tekmeyi 10.000 kez çalışandan korkarım.', author: 'Bruce Lee', note: 'Bruce Lee’ye atfedilir' },
  { id: 's10', cat: 'spor', text: 'Champions keep playing until they get it right.', tr: 'Şampiyonlar doğru yapana kadar oynamaya devam eder.', author: 'Billie Jean King' },
  { id: 's11', cat: 'spor', text: 'Vücudun, zihninin inandığını başarır.', author: 'Anonim' },
  { id: 's12', cat: 'spor', text: 'Bugün hissettiğin acı, yarın hissedeceğin güçtür.', author: 'Anonim' },
  { id: 's13', cat: 'spor', text: 'Son iki tekrar, seti sen yapar.', author: 'Anonim' },
  { id: 's14', cat: 'spor', text: 'Champions aren’t made in gyms. Champions are made from something they have deep inside them: a desire, a dream, a vision.', tr: 'Şampiyonlar salonlarda yapılmaz. İçlerinin derinindeki bir şeyden yapılırlar: bir istek, bir hayal, bir vizyon.', author: 'Muhammad Ali' },
  { id: 's15', cat: 'spor', text: 'Don’t count the days, make the days count.', tr: 'Günleri sayma; günleri saymaya değer kıl.', author: 'Muhammad Ali', note: 'Muhammad Ali’ye atfedilir' },
  { id: 's16', cat: 'spor', text: 'Yavaş ilerlemek, hiç ilerlememekten iyidir.', author: 'Anonim' },
  { id: 's17', cat: 'spor', text: 'Ağırlık değişmez. Değişen sensin.', author: 'Anonim' },

  // ——— Disiplin ———
  { id: 'd1', cat: 'disiplin', text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', tr: 'Biz, tekrar tekrar yaptığımız şeyiz. Mükemmellik bir eylem değil, bir alışkanlıktır.', author: 'Will Durant', note: 'Aristoteles’i özetlerken; sık sık Aristoteles’e mal edilir' },
  { id: 'd2', cat: 'disiplin', text: 'Motivation is what gets you started. Habit is what keeps you going.', tr: 'Motivasyon seni başlatır. Alışkanlık seni devam ettirir.', author: 'Jim Ryun' },
  { id: 'd3', cat: 'disiplin', text: 'Hard choices, easy life. Easy choices, hard life.', tr: 'Zor seçimler, kolay hayat. Kolay seçimler, zor hayat.', author: 'Jerzy Gregorek' },
  { id: 'd4', cat: 'disiplin', text: 'Success is the sum of small efforts, repeated day in and day out.', tr: 'Başarı, her gün tekrarlanan küçük çabaların toplamıdır.', author: 'Robert Collier' },
  { id: 'd5', cat: 'disiplin', text: 'Damlaya damlaya göl olur.', author: 'Türk atasözü' },
  { id: 'd6', cat: 'disiplin', text: 'Rome wasn’t built in a day.', tr: 'Roma bir günde kurulmadı.', author: 'Atasözü' },
  { id: 'd7', cat: 'disiplin', text: 'Disiplin, şu an istediğinle en çok istediğin arasında seçim yapmaktır.', author: 'Anonim' },
  { id: 'd8', cat: 'disiplin', text: 'Canın istemediği günler, aslında en çok sayılan günlerdir.', author: 'Anonim' },
  { id: 'd9', cat: 'disiplin', text: 'Mükemmel günü bekleme. Sıradan bir günde başla.', author: 'Anonim' },
  { id: 'd10', cat: 'disiplin', text: 'Start where you are. Use what you have. Do what you can.', tr: 'Olduğun yerden başla. Elindekini kullan. Yapabildiğini yap.', author: 'Arthur Ashe' },
  { id: 'd11', cat: 'disiplin', text: 'Do something today that your future self will thank you for.', tr: 'Bugün, gelecekteki halinin sana teşekkür edeceği bir şey yap.', author: 'Anonim' },
  { id: 'd12', cat: 'disiplin', text: 'Sabır ile koruk helva olur, dut yaprağı atlas olur.', author: 'Türk atasözü' },
  { id: 'd13', cat: 'disiplin', text: 'Slow and steady wins the race.', tr: 'Yavaş ama istikrarlı olan yarışı kazanır.', author: 'Ezop, Tavşan ile Kaplumbağa' },
  { id: 'd14', cat: 'disiplin', text: 'Kendine verdiğin sözü tutmak, en güzel özgüven antrenmanıdır.', author: 'Anonim' },
  { id: 'd15', cat: 'disiplin', text: 'Emek olmadan yemek olmaz.', author: 'Türk atasözü' },

  // ——— Kendine Hatırlat ———
  { id: 'h1', cat: 'hatirlat', text: 'O gömleği giyip aynaya baktığın anı hatırla. O hissi sen kazandın.' },
  { id: 'h2', cat: 'hatirlat', text: 'Antrenmandan sonra hiç pişman olmadın. Bir kez bile.' },
  { id: 'h3', cat: 'hatirlat', text: 'Canın istemiyorsa sadece ayakkabılarını giy. Gerisi kendiliğinden gelir.' },
  { id: 'h4', cat: 'hatirlat', text: 'Bir zamanlar zorlandığın ağırlık, şimdi ısınma setin.' },
  { id: 'h5', cat: 'hatirlat', text: 'Formun bir günde gelmedi, bir günde de gitmez. Bugün sadece devam et.' },
  { id: 'h6', cat: 'hatirlat', text: 'Yorgunluk geçer. Gurur kalır.' },
  { id: 'h7', cat: 'hatirlat', text: 'Kimse izlemiyorken yaptığın tekrarlar, herkesin göreceği farkı yaratır.' },
  { id: 'h8', cat: 'hatirlat', text: 'Antrenman sonrası o hafiflik, o sıcak duş… Onun için git.' },
  { id: 'h9', cat: 'hatirlat', text: 'Motivasyon gelir gider. Sen alışkanlığına sadık kal.' },
  { id: 'h10', cat: 'hatirlat', text: 'Bu yaz o tişört sana çok yakışacak. Onu şimdi kazanıyorsun.' },
  { id: 'h11', cat: 'hatirlat', text: 'Kötü bir gün, kötü bir hafta demek değil. Kalk ve devam et.' },
  { id: 'h12', cat: 'hatirlat', text: '“Çok iyi görünüyorsun, ne yapıyorsun?” diye sorduklarında vereceğin cevap: Bırakmadım.' },
  { id: 'h13', cat: 'hatirlat', text: 'Dinlenmek de antrenmanın parçası. Vazgeçmek değil.' },
  { id: 'h14', cat: 'hatirlat', text: 'Sadece 20 dakika. Başla, sonra karar ver.' },
  { id: 'h15', cat: 'hatirlat', text: 'Geçen yılki sen, bugünkü seni görse gurur duyardı.' },
  { id: 'h16', cat: 'hatirlat', text: 'Kendine iyi bakmak bencillik değil, bir saygı biçimi.' },

  // ——— Yaz Ruhu ———
  { id: 'y1', cat: 'yaz', text: 'Güneş her sabah yeniden doğuyor. Sen de doğabilirsin.' },
  { id: 'y2', cat: 'yaz', text: 'En güzel anılar, “hadi gidelim” dediğin günlerden çıkar.' },
  { id: 'y3', cat: 'yaz', text: 'Tuzlu saçlar, yanık omuzlar, bitmeyen kahkahalar. İşte hepsi bunun için.' },
  { id: 'y4', cat: 'yaz', text: 'Gülen arkadaşlar, uzun akşamlar, ılık rüzgâr. Hayat bunlardan ibaret.' },
  { id: 'y5', cat: 'yaz', text: 'Bugün kendine güzel bir an hediye et.' },
  { id: 'y6', cat: 'yaz', text: 'Collect moments, not things.', tr: 'Eşya değil, an biriktir.', author: 'Anonim' },
  { id: 'y7', cat: 'yaz', text: 'Gün batımını izlemek için hiçbir zaman çok meşgul olma.' },
  { id: 'y8', cat: 'yaz', text: 'Denize ilk giriş gibi: önce ürperirsin, sonra çıkmak istemezsin. Başlamak da böyle.' },
  { id: 'y9', cat: 'yaz', text: 'Seni güldüren insanlarla daha çok vakit geçir.' },
  { id: 'y10', cat: 'yaz', text: 'İyi şeyler, harekete geçenlerin başına gelir.' },
  { id: 'y11', cat: 'yaz', text: 'Hayat kısa, yaz daha da kısa. Bugünü kaçırma.' },
  { id: 'y12', cat: 'yaz', text: 'Here comes the sun.', tr: 'İşte güneş geliyor.', author: 'The Beatles' },

  // ——— Bilgelik ———
  { id: 'b1', cat: 'bilgelik', text: 'A journey of a thousand miles begins with a single step.', tr: 'Bin millik yolculuk tek bir adımla başlar.', author: 'Lao Tzu', note: 'Tao Te Ching, 64. bölüm' },
  { id: 'b2', cat: 'bilgelik', text: 'Fall seven times, stand up eight.', tr: 'Yedi kez düş, sekiz kez kalk.', author: 'Japon atasözü' },
  { id: 'b3', cat: 'bilgelik', text: 'What stands in the way becomes the way.', tr: 'Yolunu kesen şey, yolun kendisi olur.', author: 'Marcus Aurelius', note: 'Düşünceler (Meditations), 5.20’den uyarlama' },
  { id: 'b4', cat: 'bilgelik', text: 'That which does not kill us makes us stronger.', tr: 'Bizi öldürmeyen şey güçlendirir.', author: 'Friedrich Nietzsche', note: 'Putların Alacakaranlığı (1888)' },
  { id: 'b5', cat: 'bilgelik', text: 'He who has a why to live can bear almost any how.', tr: 'Yaşamak için bir “neden”i olan, hemen her “nasıl”a katlanabilir.', author: 'Friedrich Nietzsche' },
  { id: 'b6', cat: 'bilgelik', text: 'The best time to plant a tree was 20 years ago. The second best time is now.', tr: 'Ağaç dikmenin en iyi zamanı 20 yıl önceydi. İkinci en iyi zamanı şimdi.', author: 'Çin atasözü olarak bilinir' },
  { id: 'b7', cat: 'bilgelik', text: 'Whether you think you can, or you think you can’t, you’re right.', tr: 'Yapabileceğini de düşünsen yapamayacağını da, haklısın.', author: 'Henry Ford', note: 'Henry Ford’a atfedilir' },
  { id: 'b8', cat: 'bilgelik', text: 'It does not matter how slowly you go as long as you do not stop.', tr: 'Durmadığın sürece ne kadar yavaş gittiğinin önemi yok.', author: 'Konfüçyüs', note: 'Konfüçyüs’e atfedilir' },
  { id: 'b9', cat: 'bilgelik', text: 'Stay hungry. Stay foolish.', tr: 'Aç kal. Deli kal.', author: 'Steve Jobs', note: 'Whole Earth Catalog’dan alıntılayarak, 2005' },
  { id: 'b10', cat: 'bilgelik', text: 'Ne ekersen onu biçersin.', author: 'Türk atasözü' },
  { id: 'b11', cat: 'bilgelik', text: 'Kendini başkalarıyla değil, dünkü halinle kıyasla.', author: 'Anonim' },
  { id: 'b12', cat: 'bilgelik', text: 'Luck is what happens when preparation meets opportunity.', tr: 'Şans, hazırlığın fırsatla buluştuğu andır.', author: 'Seneca', note: 'Seneca’ya atfedilir; birebir alıntı değil' },

  // ——— Spor & Güç (devam) ———
  { id: 's18', cat: 'spor', text: 'The only bad workout is the one that didn’t happen.', tr: 'Tek kötü antrenman, hiç yapılmayandır.', author: 'Anonim' },
  { id: 's19', cat: 'spor', text: 'Ter bugün akar, gurur yıllarca kalır.', author: 'Anonim' },
  { id: 's20', cat: 'spor', text: 'Kas salonda yorulur, mutfakta beslenir, uykuda büyür.', author: 'Salon sözü' },
  { id: 's21', cat: 'spor', text: 'If you want something you’ve never had, you must be willing to do something you’ve never done.', tr: 'Hiç sahip olmadığın bir şeyi istiyorsan, hiç yapmadığın bir şeyi yapmayı göze almalısın.', author: 'Anonim', note: 'Sık sık Thomas Jefferson’a mal edilir; kaynağı belirsiz' },
  { id: 's22', cat: 'spor', text: 'Your body can stand almost anything. It’s your mind that you have to convince.', tr: 'Bedenin neredeyse her şeye dayanır. İkna etmen gereken zihnin.', author: 'Anonim' },
  { id: 's23', cat: 'spor', text: 'Float like a butterfly, sting like a bee.', tr: 'Kelebek gibi uç, arı gibi sok.', author: 'Muhammad Ali', note: 'Sözü köşe antrenörü Drew Bundini Brown’la birlikte bulmuştu' },
  { id: 's24', cat: 'spor', text: 'Success isn’t always about greatness. It’s about consistency.', tr: 'Başarı her zaman büyüklükle ilgili değildir. İstikrarla ilgilidir.', author: 'Dwayne “The Rock” Johnson', note: 'Dwayne Johnson’a atfedilir' },
  { id: 's25', cat: 'spor', text: 'Push yourself, because no one else is going to do it for you.', tr: 'Kendini zorla; çünkü bunu senin yerine kimse yapmayacak.', author: 'Anonim' },
  { id: 's26', cat: 'spor', text: 'Bir set daha. Her zaman bir set daha vardır.', author: 'Anonim' },
  { id: 's27', cat: 'spor', text: 'Spora pazartesi başlanmaz. Bugün başlanır.', author: 'Anonim' },
  { id: 's28', cat: 'spor', text: 'Gold medals aren’t really made of gold. They’re made of sweat, determination, and a hard-to-find alloy called guts.', tr: 'Altın madalyalar aslında altından yapılmaz. Ter, kararlılık ve zor bulunan bir alaşımdan yapılır: cesaret.', author: 'Dan Gable' },
  { id: 's29', cat: 'spor', text: 'It never gets easier. You just get better.', tr: 'Hiçbir zaman kolaylaşmaz. Sen daha iyi olursun.', author: 'Anonim' },
  { id: 's30', cat: 'spor', text: 'Take care of your body. It’s the only place you have to live.', tr: 'Bedenine iyi bak. Yaşamak zorunda olduğun tek yer orası.', author: 'Jim Rohn' },
  { id: 's31', cat: 'spor', text: 'Hard in training, easy in battle.', tr: 'Antrenmanda zorlanan, savaşta rahat eder.', author: 'Aleksandr Suvorov' },
  { id: 's32', cat: 'spor', text: 'The difference between the impossible and the possible lies in a person’s determination.', tr: 'İmkânsızla mümkün arasındaki fark, insanın kararlılığındadır.', author: 'Tommy Lasorda' },
  { id: 's33', cat: 'spor', text: 'Run when you can, walk if you have to, crawl if you must; just never give up.', tr: 'Koşabiliyorsan koş, gerekirse yürü, mecbursan sürün; ama asla bırakma.', author: 'Dean Karnazes' },
  { id: 's34', cat: 'spor', text: 'Ağırlığı kaldıran kol değil, “kalk” diyen kafadır.', author: 'Anonim' },
  { id: 's35', cat: 'spor', text: 'Isınmayı atlama, soğumayı unutma, vazgeçmeyi hiç düşünme.', author: 'Anonim' },
  { id: 's36', cat: 'spor', text: 'Şampiyonlar da yoruluyor. Farkları, yorgunken de devam etmeleri.', author: 'Anonim' },

  // ——— Disiplin (devam) ———
  { id: 'd16', cat: 'disiplin', text: 'Discipline equals freedom.', tr: 'Disiplin, özgürlüktür.', author: 'Jocko Willink' },
  { id: 'd17', cat: 'disiplin', text: 'Don’t wish it were easier. Wish you were better.', tr: 'Daha kolay olmasını dileme. Daha iyi olmayı dile.', author: 'Jim Rohn' },
  { id: 'd18', cat: 'disiplin', text: 'You do not rise to the level of your goals. You fall to the level of your systems.', tr: 'Hedeflerinin seviyesine yükselmezsin; sistemlerinin seviyesine düşersin.', author: 'James Clear', note: 'Atomik Alışkanlıklar (2018)' },
  { id: 'd19', cat: 'disiplin', text: 'Every action you take is a vote for the type of person you wish to become.', tr: 'Attığın her adım, olmak istediğin kişiye verilmiş bir oydur.', author: 'James Clear', note: 'Atomik Alışkanlıklar (2018)' },
  { id: 'd20', cat: 'disiplin', text: 'Never miss twice.', tr: 'Asla iki kez üst üste kaçırma.', author: 'James Clear' },
  { id: 'd21', cat: 'disiplin', text: 'Small daily improvements over time lead to stunning results.', tr: 'Her gün küçük gelişmeler, zamanla göz kamaştırıcı sonuçlar doğurur.', author: 'Robin Sharma' },
  { id: 'd22', cat: 'disiplin', text: 'Erken kalkan yol alır.', author: 'Türk atasözü' },
  { id: 'd23', cat: 'disiplin', text: 'İşleyen demir ışıldar.', author: 'Türk atasözü' },
  { id: 'd24', cat: 'disiplin', text: 'Bugünün işini yarına bırakma.', author: 'Türk atasözü' },
  { id: 'd25', cat: 'disiplin', text: 'Amateurs sit and wait for inspiration, the rest of us just get up and go to work.', tr: 'Amatörler oturup ilham bekler; geri kalanımız kalkıp işe koyulur.', author: 'Stephen King', note: 'Yazmak Üzerine (2000)' },
  { id: 'd26', cat: 'disiplin', text: 'The secret of getting ahead is getting started.', tr: 'İlerlemenin sırrı başlamaktır.', author: 'Mark Twain', note: 'Mark Twain’e atfedilir' },
  { id: 'd27', cat: 'disiplin', text: 'Well done is better than well said.', tr: 'İyi yapılmış, iyi söylenmişten iyidir.', author: 'Benjamin Franklin' },
  { id: 'd28', cat: 'disiplin', text: 'We must all suffer one of two things: the pain of discipline or the pain of regret.', tr: 'Hepimiz iki acıdan birini çekeriz: disiplinin acısını ya da pişmanlığın acısını.', author: 'Jim Rohn' },
  { id: 'd29', cat: 'disiplin', text: 'Don’t stop when you’re tired. Stop when you’re done.', tr: 'Yorulunca durma. İşin bitince dur.', author: 'David Goggins', note: 'David Goggins’e atfedilir' },
  { id: 'd30', cat: 'disiplin', text: 'Konfor alanı güzel bir yer; ama orada hiçbir şey büyümez.', author: 'Anonim' },
  { id: 'd31', cat: 'disiplin', text: 'Planını yap, planına uy, sonra sonuçlara şaşır.', author: 'Anonim' },
  { id: 'd32', cat: 'disiplin', text: 'İstikrar, yeteneğin en sessiz ama en güçlü hâlidir.', author: 'Anonim' },

  // ——— Kendine Hatırlat (devam) ———
  { id: 'h17', cat: 'hatirlat', text: 'Bugün de geldin. Bu bile yeter.' },
  { id: 'h18', cat: 'hatirlat', text: 'Hiç istemediğin günlerde gittiğin antrenmanlar seni sen yaptı.' },
  { id: 'h19', cat: 'hatirlat', text: 'Aynadaki değişimi her gün göremezsin. Ama fotoğraflar unutmaz.' },
  { id: 'h20', cat: 'hatirlat', text: 'Bir gün “nasıl bu kadar istikrarlısın?” diye soracaklar. Sadece gülümseyeceksin.' },
  { id: 'h21', cat: 'hatirlat', text: 'Uykunu al, suyunu iç, kendine kızma. Yarın yine buradasın.' },
  { id: 'h22', cat: 'hatirlat', text: 'Mükemmel olmak zorunda değilsin. Sadece bırakmamalısın.' },
  { id: 'h23', cat: 'hatirlat', text: 'Yaz geldiğinde “keşke başlasaydım” demeyeceksin. Çünkü başladın.' },
  { id: 'h24', cat: 'hatirlat', text: 'Bir gün kötü hissetmen, bütün emeğini silmez.' },
  { id: 'h25', cat: 'hatirlat', text: 'Kendini en iyi hissettiğin anı düşün. Oraya her gün biraz daha yaklaşıyorsun.' },
  { id: 'h26', cat: 'hatirlat', text: 'Telefonu bırak, ayakkabını bağla. Beş dakika sonra kendine teşekkür edeceksin.' },
  { id: 'h27', cat: 'hatirlat', text: 'Bugün sadece yüzde bir daha iyi ol. Yıl sonunda bambaşka biri olursun.' },
  { id: 'h28', cat: 'hatirlat', text: 'Bedenin seni her gün taşıyor. Ona iyi davran.' },
  { id: 'h29', cat: 'hatirlat', text: 'Kimseyle yarışmıyorsun. Sadece dünkü hâlini geride bırakıyorsun.' },
  { id: 'h30', cat: 'hatirlat', text: 'Başladığın günü hatırla. Ne kadar yol geldiğine bir bak.' },
  { id: 'h31', cat: 'hatirlat', text: 'Yorgunsan dinlen. Ama sonra mutlaka geri dön.' },
  { id: 'h32', cat: 'hatirlat', text: 'Gömleğin omuzlarını sardığı o an… Onun için bir set daha.' },

  // ——— Yaz Ruhu (devam) ———
  { id: 'y13', cat: 'yaz', text: 'Bu yaz, kendinle gurur duyacağın bir yaz olsun.' },
  { id: 'y14', cat: 'yaz', text: 'Kumda yalınayak, kulağında sevdiğin şarkı, yanında sevdiğin insanlar.' },
  { id: 'y15', cat: 'yaz', text: 'Some of the best memories are made in flip flops.', tr: 'En güzel anıların bazıları terliklerle yaşanır.', author: 'Anonim' },
  { id: 'y16', cat: 'yaz', text: 'Güneşi sırtına, rüzgârı yüzüne al. Bugün senin günün.' },
  { id: 'y17', cat: 'yaz', text: 'Gün batımı her akşam hatırlatır: bitişler de güzel olabilir.' },
  { id: 'y18', cat: 'yaz', text: 'Sevdiklerinle bir sofra, uzun bir sohbet, geç biten bir gece. Zenginlik bu.' },
  { id: 'y19', cat: 'yaz', text: 'Dalga gibi ol: geri çekil, güç topla, yeniden gel.' },
  { id: 'y20', cat: 'yaz', text: 'Keep your face always toward the sunshine, and shadows will fall behind you.', tr: 'Yüzünü hep güneşe dön; gölgeler arkanda kalsın.', author: 'Anonim', note: 'Walt Whitman’a atfedilir ama kaynağı belirsiz' },
  { id: 'y21', cat: 'yaz', text: 'Salt in the air, sand in my hair.', tr: 'Havada tuz, saçlarımda kum.', author: 'Anonim' },
  { id: 'y22', cat: 'yaz', text: 'Hayat ertelenen planlardan ibaret olmasın. Bu hafta sonu git.' },
  { id: 'y23', cat: 'yaz', text: 'Bazı anlar fotoğraflanmaz, sadece yaşanır.' },
  { id: 'y24', cat: 'yaz', text: 'Summertime, and the livin’ is easy.', tr: 'Yaz zamanı ve hayat kolay.', author: 'George Gershwin & DuBose Heyward', note: '“Summertime” şarkısı, Porgy and Bess (1935)' },
  { id: 'y25', cat: 'yaz', text: 'Bir dondurma, bir sahil yürüyüşü, bir gün batımı. Mutluluk büyük şeylerden yapılmaz.' },
  { id: 'y26', cat: 'yaz', text: 'Kahkahayla biten her gün, iyi geçmiş bir gündür.' },

  // ——— Bilgelik (devam) ———
  { id: 'b13', cat: 'bilgelik', text: 'Waste no more time arguing about what a good man should be. Be one.', tr: 'İyi bir insanın nasıl olması gerektiğini tartışarak daha fazla vakit kaybetme. Öyle biri ol.', author: 'Marcus Aurelius', note: 'Düşünceler (Meditations), 10.16' },
  { id: 'b14', cat: 'bilgelik', text: 'We suffer more often in imagination than in reality.', tr: 'Gerçekte olduğundan daha sık, hayalimizde acı çekeriz.', author: 'Seneca', note: 'Lucilius’a Mektuplar, 13' },
  { id: 'b15', cat: 'bilgelik', text: 'First say to yourself what you would be; and then do what you have to do.', tr: 'Önce kendine ne olmak istediğini söyle; sonra yapman gerekeni yap.', author: 'Epiktetos', note: 'Söylevler, 3.23' },
  { id: 'b16', cat: 'bilgelik', text: 'It’s not what happens to you, but how you react to it that matters.', tr: 'Önemli olan başına gelen değil, ona nasıl karşılık verdiğin.', author: 'Epiktetos', note: 'Öğretisinden serbest bir uyarlama' },
  { id: 'b17', cat: 'bilgelik', text: 'Bin bilsen de bir bilene danış.', author: 'Türk atasözü' },
  { id: 'b18', cat: 'bilgelik', text: 'Taşıma suyla değirmen dönmez.', author: 'Türk atasözü' },
  { id: 'b19', cat: 'bilgelik', text: 'The man who moves a mountain begins by carrying away small stones.', tr: 'Dağı yerinden oynatan kişi, işe küçük taşları taşıyarak başlar.', author: 'Konfüçyüs', note: 'Konfüçyüs’e atfedilir' },
  { id: 'b20', cat: 'bilgelik', text: 'In the middle of difficulty lies opportunity.', tr: 'Zorluğun ortasında fırsat yatar.', author: 'Albert Einstein', note: 'Albert Einstein’a atfedilir' },
  { id: 'b21', cat: 'bilgelik', text: 'Life is like riding a bicycle. To keep your balance, you must keep moving.', tr: 'Hayat bisiklete binmek gibidir. Dengede kalmak için hareket etmeye devam etmelisin.', author: 'Albert Einstein', note: 'Oğlu Eduard’a yazdığı mektup, 1930' },
  { id: 'b22', cat: 'bilgelik', text: 'An object in motion stays in motion.', tr: 'Hareket hâlindeki bir cisim, hareket etmeye devam eder.', author: 'Newton’un birinci yasası', note: 'Momentum’un ta kendisi: bir kez başla, gerisi gelir' },
  { id: 'b23', cat: 'bilgelik', text: 'Kendini bil.', author: 'Delfi’deki Apollon Tapınağı yazıtı' },
  { id: 'b24', cat: 'bilgelik', text: 'Knowing is not enough; we must apply. Willing is not enough; we must do.', tr: 'Bilmek yetmez, uygulamalıyız. İstemek yetmez, yapmalıyız.', author: 'Johann Wolfgang von Goethe' },
  { id: 'b25', cat: 'bilgelik', text: 'The best way out is always through.', tr: 'Çıkmanın en iyi yolu, her zaman içinden geçmektir.', author: 'Robert Frost' },
  { id: 'b26', cat: 'bilgelik', text: 'Nothing in life is to be feared, it is only to be understood.', tr: 'Hayatta hiçbir şeyden korkulmamalı; yalnızca anlaşılmalı.', author: 'Marie Curie', note: 'Marie Curie’ye atfedilir' },
]
