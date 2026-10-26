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
  { id: 's6', cat: 'spor', text: 'No pain, no gain.', tr: 'Acı yoksa kazanç da yok.', author: 'Jane Fonda', note: 'Eski bir deyiş; 1980’lerde Fonda’nın aerobik videolarıyla dünyaca ünlendi' },
  { id: 's8', cat: 'spor', text: 'Strength does not come from physical capacity. It comes from an indomitable will.', tr: 'Güç, fiziksel kapasiteden gelmez. Boyun eğmeyen bir iradeden gelir.', author: 'Mahatma Gandhi' },
  { id: 's9', cat: 'spor', text: 'I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.', tr: '10.000 farklı tekmeyi birer kez çalışandan korkmam; tek bir tekmeyi 10.000 kez çalışandan korkarım.', author: 'Bruce Lee', note: 'Bruce Lee’ye atfedilir' },
  { id: 's10', cat: 'spor', text: 'Champions keep playing until they get it right.', tr: 'Şampiyonlar doğru yapana kadar oynamaya devam eder.', author: 'Billie Jean King' },
  { id: 's14', cat: 'spor', text: 'Champions aren’t made in gyms. Champions are made from something they have deep inside them: a desire, a dream, a vision.', tr: 'Şampiyonlar salonlarda yapılmaz. İçlerinin derinindeki bir şeyden yapılırlar: bir istek, bir hayal, bir vizyon.', author: 'Muhammad Ali' },
  { id: 's15', cat: 'spor', text: 'Don’t count the days, make the days count.', tr: 'Günleri sayma; günleri saymaya değer kıl.', author: 'Muhammad Ali', note: 'Muhammad Ali’ye atfedilir' },

  // ——— Disiplin ———
  { id: 'd1', cat: 'disiplin', text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', tr: 'Biz, tekrar tekrar yaptığımız şeyiz. Mükemmellik bir eylem değil, bir alışkanlıktır.', author: 'Will Durant', note: 'Aristoteles’i özetlerken; sık sık Aristoteles’e mal edilir' },
  { id: 'd2', cat: 'disiplin', text: 'Motivation is what gets you started. Habit is what keeps you going.', tr: 'Motivasyon seni başlatır. Alışkanlık seni devam ettirir.', author: 'Jim Ryun' },
  { id: 'd3', cat: 'disiplin', text: 'Hard choices, easy life. Easy choices, hard life.', tr: 'Zor seçimler, kolay hayat. Kolay seçimler, zor hayat.', author: 'Jerzy Gregorek' },
  { id: 'd4', cat: 'disiplin', text: 'Success is the sum of small efforts, repeated day in and day out.', tr: 'Başarı, her gün tekrarlanan küçük çabaların toplamıdır.', author: 'Robert Collier' },
  { id: 'd5', cat: 'disiplin', text: 'Damlaya damlaya göl olur.', author: 'Türk atasözü' },
  { id: 'd6', cat: 'disiplin', text: 'Rome wasn’t built in a day.', tr: 'Roma bir günde kurulmadı.', author: 'Atasözü' },
  { id: 'd10', cat: 'disiplin', text: 'Start where you are. Use what you have. Do what you can.', tr: 'Olduğun yerden başla. Elindekini kullan. Yapabildiğini yap.', author: 'Arthur Ashe' },
  { id: 'd12', cat: 'disiplin', text: 'Sabır ile koruk helva olur, dut yaprağı atlas olur.', author: 'Türk atasözü' },
  { id: 'd13', cat: 'disiplin', text: 'Slow and steady wins the race.', tr: 'Yavaş ama istikrarlı olan yarışı kazanır.', author: 'Ezop, Tavşan ile Kaplumbağa' },
  { id: 'd15', cat: 'disiplin', text: 'Emek olmadan yemek olmaz.', author: 'Türk atasözü' },

  // ——— Yaz Ruhu ———
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
  { id: 'b12', cat: 'bilgelik', text: 'Luck is what happens when preparation meets opportunity.', tr: 'Şans, hazırlığın fırsatla buluştuğu andır.', author: 'Seneca', note: 'Seneca’ya atfedilir; birebir alıntı değil' },

  // ——— Spor & Güç (devam) ———
  { id: 's23', cat: 'spor', text: 'Float like a butterfly, sting like a bee.', tr: 'Kelebek gibi uç, arı gibi sok.', author: 'Muhammad Ali', note: 'Sözü köşe antrenörü Drew Bundini Brown’la birlikte bulmuştu' },
  { id: 's24', cat: 'spor', text: 'Success isn’t always about greatness. It’s about consistency.', tr: 'Başarı her zaman büyüklükle ilgili değildir. İstikrarla ilgilidir.', author: 'Dwayne “The Rock” Johnson', note: 'Dwayne Johnson’a atfedilir' },
  { id: 's28', cat: 'spor', text: 'Gold medals aren’t really made of gold. They’re made of sweat, determination, and a hard-to-find alloy called guts.', tr: 'Altın madalyalar aslında altından yapılmaz. Ter, kararlılık ve zor bulunan bir alaşımdan yapılır: cesaret.', author: 'Dan Gable' },
  { id: 's30', cat: 'spor', text: 'Take care of your body. It’s the only place you have to live.', tr: 'Bedenine iyi bak. Yaşamak zorunda olduğun tek yer orası.', author: 'Jim Rohn' },
  { id: 's31', cat: 'spor', text: 'Hard in training, easy in battle.', tr: 'Antrenmanda zorlanan, savaşta rahat eder.', author: 'Aleksandr Suvorov' },
  { id: 's32', cat: 'spor', text: 'The difference between the impossible and the possible lies in a person’s determination.', tr: 'İmkânsızla mümkün arasındaki fark, insanın kararlılığındadır.', author: 'Tommy Lasorda' },
  { id: 's33', cat: 'spor', text: 'Run when you can, walk if you have to, crawl if you must; just never give up.', tr: 'Koşabiliyorsan koş, gerekirse yürü, mecbursan sürün; ama asla bırakma.', author: 'Dean Karnazes' },

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

  // ——— Yaz Ruhu (devam) ———
  { id: 'y24', cat: 'yaz', text: 'Summertime, and the livin’ is easy.', tr: 'Yaz zamanı ve hayat kolay.', author: 'George Gershwin & DuBose Heyward', note: '“Summertime” şarkısı, Porgy and Bess (1935)' },

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

  // ——— Gerçek sözler: Spor & Güç ———
  { id: 's40', cat: 'spor', text: 'The last three or four reps is what makes the muscle grow. This area of pain divides a champion from someone who is not a champion.', tr: 'Kası büyüten son üç dört tekrardır. Bu acı bölgesi, şampiyonu şampiyon olmayandan ayırır.', author: 'Arnold Schwarzenegger', note: 'Pumping Iron belgeseli (1977)' },
  { id: 's41', cat: 'spor', text: 'The mind is the limit. As long as the mind can envision the fact that you can do something, you can do it.', tr: 'Sınır zihindir. Zihnin bir şeyi yapabileceğini hayal edebildiği sürece, onu yapabilirsin.', author: 'Arnold Schwarzenegger', note: 'Pumping Iron belgeseli (1977)' },
  { id: 's42', cat: 'spor', text: 'I don’t count my sit-ups. I only start counting when it starts hurting, because they’re the only ones that count.', tr: 'Mekiklerimi saymam. Ancak acımaya başlayınca saymaya başlarım; çünkü asıl sayılanlar onlardır.', author: 'Muhammad Ali' },
  { id: 's43', cat: 'spor', text: 'I hated every minute of training, but I said, “Don’t quit. Suffer now and live the rest of your life as a champion.”', tr: 'Antrenmanın her dakikasından nefret ettim ama kendime şöyle dedim: “Bırakma. Şimdi acı çek, hayatının geri kalanını şampiyon olarak yaşa.”', author: 'Muhammad Ali', note: 'Muhammad Ali’ye atfedilir' },
  { id: 's44', cat: 'spor', text: 'Everything negative – pressure, challenges – is all an opportunity for me to rise.', tr: 'Olumsuz olan her şey, baskı da zorluk da, benim için yükselme fırsatıdır.', author: 'Kobe Bryant' },
  { id: 's45', cat: 'spor', text: 'Some people want it to happen, some wish it would happen, others make it happen.', tr: 'Bazıları olmasını ister, bazıları olsun diye dua eder; bazıları da olmasını sağlar.', author: 'Michael Jordan' },
  { id: 's46', cat: 'spor', text: 'It’s not whether you get knocked down; it’s whether you get up.', tr: 'Mesele yere düşüp düşmemen değil; kalkıp kalkmaman.', author: 'Vince Lombardi' },
  { id: 's47', cat: 'spor', text: 'Don’t give up. Don’t ever give up.', tr: 'Pes etme. Asla pes etme.', author: 'Jim Valvano', note: 'ESPY Ödülleri konuşması, 1993' },
  { id: 's48', cat: 'spor', text: 'Do not let what you cannot do interfere with what you can do.', tr: 'Yapamadıkların, yapabileceklerinin önüne geçmesin.', author: 'John Wooden' },
  { id: 's49', cat: 'spor', text: 'Make each day your masterpiece.', tr: 'Her günü başyapıtın yap.', author: 'John Wooden', note: 'Babasının ona verdiği yedi maddelik öğütten' },
  { id: 's50', cat: 'spor', text: 'Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing.', tr: 'Başarı tesadüf değildir. Sıkı çalışma, azim, öğrenme, emek, fedakârlık ve hepsinden önemlisi yaptığın işi sevmektir.', author: 'Pelé' },
  { id: 's51', cat: 'spor', text: 'You can’t put a limit on anything. The more you dream, the farther you get.', tr: 'Hiçbir şeye sınır koyamazsın. Ne kadar çok hayal edersen, o kadar uzağa gidersin.', author: 'Michael Phelps' },
  { id: 's52', cat: 'spor', text: 'I don’t run away from a challenge because I am afraid. Instead, I run toward it because the only way to escape fear is to trample it beneath your feet.', tr: 'Korktuğum için zorluktan kaçmam. Tam tersine ona koşarım; çünkü korkudan kurtulmanın tek yolu onu ayaklarının altında ezmektir.', author: 'Nadia Comăneci' },
  { id: 's53', cat: 'spor', text: 'Age is no barrier. It’s a limitation you put on your mind.', tr: 'Yaş bir engel değildir. Zihnine senin koyduğun bir sınırdır.', author: 'Jackie Joyner-Kersee' },
  { id: 's54', cat: 'spor', text: 'Ben sporcunun zeki, çevik ve aynı zamanda ahlaklısını severim.', author: 'Mustafa Kemal Atatürk' },

  // ——— Gerçek sözler: Disiplin ———
  { id: 'd40', cat: 'disiplin', text: 'Success is nothing more than a few simple disciplines, practiced every day.', tr: 'Başarı, her gün uygulanan birkaç basit disiplinden ibarettir.', author: 'Jim Rohn' },
  { id: 'd41', cat: 'disiplin', text: 'Discipline is the bridge between goals and accomplishment.', tr: 'Disiplin, hedeflerle başarı arasındaki köprüdür.', author: 'Jim Rohn' },
  { id: 'd42', cat: 'disiplin', text: 'Habits are the compound interest of self-improvement.', tr: 'Alışkanlıklar, kendini geliştirmenin bileşik faizidir.', author: 'James Clear', note: 'Atomik Alışkanlıklar (2018)' },
  { id: 'd43', cat: 'disiplin', text: 'Don’t watch the clock; do what it does. Keep going.', tr: 'Saate bakma; onun yaptığını yap. Devam et.', author: 'Sam Levenson' },
  { id: 'd44', cat: 'disiplin', text: 'A river cuts through rock not because of its power, but because of its persistence.', tr: 'Nehir kayayı gücüyle değil, ısrarıyla oyar.', author: 'Jim Watkins' },
  { id: 'd45', cat: 'disiplin', text: 'Patience, persistence and perspiration make an unbeatable combination for success.', tr: 'Sabır, ısrar ve ter; başarı için yenilmez bir üçlüdür.', author: 'Napoleon Hill' },

  // ——— Gerçek sözler: Kendine Hatırlat ———
  { id: 'h40', cat: 'hatirlat', text: 'You have power over your mind, not outside events. Realize this, and you will find strength.', tr: 'Dış olaylar üzerinde değil, zihnin üzerinde gücün var. Bunu fark et, gücü bulacaksın.', author: 'Marcus Aurelius', note: 'Düşünceler’den serbest çeviri' },
  { id: 'h41', cat: 'hatirlat', text: 'Courage doesn’t always roar. Sometimes courage is the quiet voice at the end of the day saying, “I will try again tomorrow.”', tr: 'Cesaret her zaman kükremez. Bazen cesaret, günün sonunda “Yarın yeniden deneyeceğim” diyen sessiz bir sestir.', author: 'Mary Anne Radmacher' },
  { id: 'h42', cat: 'hatirlat', text: 'Our greatest glory is not in never falling, but in rising every time we fall.', tr: 'En büyük şerefimiz hiç düşmemek değil, her düştüğümüzde yeniden kalkmaktır.', author: 'Oliver Goldsmith', note: 'Sık sık Konfüçyüs’e mal edilir' },
  { id: 'h43', cat: 'hatirlat', text: 'Never give in, never, never, never.', tr: 'Asla teslim olma. Asla, asla, asla.', author: 'Winston Churchill', note: 'Harrow Okulu konuşması, 1941' },
  { id: 'h44', cat: 'hatirlat', text: 'What lies behind us and what lies before us are tiny matters compared to what lies within us.', tr: 'Arkamızda ve önümüzde olanlar, içimizde olanın yanında çok küçük kalır.', author: 'Henry S. Haskins', note: 'Sık sık Emerson’a mal edilir' },
  { id: 'h45', cat: 'hatirlat', text: 'I am not a product of my circumstances. I am a product of my decisions.', tr: 'Ben koşullarımın ürünü değilim. Kararlarımın ürünüyüm.', author: 'Stephen R. Covey' },
  { id: 'h46', cat: 'hatirlat', text: 'Act as if what you do makes a difference. It does.', tr: 'Yaptığın şey fark yaratıyormuş gibi davran. Çünkü yaratıyor.', author: 'William James' },
  { id: 'h47', cat: 'hatirlat', text: 'With the new day comes new strength and new thoughts.', tr: 'Yeni günle birlikte yeni güç ve yeni düşünceler gelir.', author: 'Eleanor Roosevelt' },
  { id: 'h48', cat: 'hatirlat', text: 'No one can make you feel inferior without your consent.', tr: 'Sen izin vermedikçe kimse sana kendini aşağı hissettiremez.', author: 'Eleanor Roosevelt', note: 'Eleanor Roosevelt’e atfedilir' },
  { id: 'h49', cat: 'hatirlat', text: 'Believe you can and you’re halfway there.', tr: 'Yapabileceğine inan; yolun yarısını geçmiş olursun.', author: 'Theodore Roosevelt', note: 'Theodore Roosevelt’e atfedilir' },
  { id: 'h50', cat: 'hatirlat', text: 'It always seems impossible until it’s done.', tr: 'Bir şey yapılana kadar hep imkânsız görünür.', author: 'Nelson Mandela', note: 'Nelson Mandela’ya atfedilir' },
  { id: 'h51', cat: 'hatirlat', text: 'You are braver than you believe, stronger than you seem, and smarter than you think.', tr: 'İnandığından daha cesur, göründüğünden daha güçlü ve sandığından daha akıllısın.', author: 'Christopher Robin', note: 'Pooh’s Grand Adventure (1997) filminden' },
  { id: 'h52', cat: 'hatirlat', text: 'To love oneself is the beginning of a lifelong romance.', tr: 'Kendini sevmek, ömür boyu sürecek bir aşkın başlangıcıdır.', author: 'Oscar Wilde', note: 'İdeal Bir Koca (1895)' },
  { id: 'h53', cat: 'hatirlat', text: 'Owning our story and loving ourselves through that process is the bravest thing we’ll ever do.', tr: 'Hikâyemizi sahiplenmek ve bu süreçte kendimizi sevmek, yapabileceğimiz en cesur şeydir.', author: 'Brené Brown' },
  { id: 'h54', cat: 'hatirlat', text: 'You yourself, as much as anybody in the entire universe, deserve your love and affection.', tr: 'Bütün evrendeki herkes kadar sen de kendi sevgini ve şefkatini hak ediyorsun.', author: 'Sharon Salzberg', note: 'Sık sık Buda’ya mal edilir' },
  { id: 'h55', cat: 'hatirlat', text: 'Self-care is not selfish. You cannot serve from an empty vessel.', tr: 'Kendine bakmak bencillik değildir. Boş bir kaptan kimseye su veremezsin.', author: 'Eleanor Brown' },
  { id: 'h56', cat: 'hatirlat', text: 'Almost everything will work again if you unplug it for a few minutes, including you.', tr: 'Neredeyse her şey birkaç dakika fişini çekince yeniden çalışır. Sen de.', author: 'Anne Lamott' },
  { id: 'h57', cat: 'hatirlat', text: 'Rest when you’re weary. Refresh and renew yourself, your body, your mind, your spirit. Then get back to work.', tr: 'Yorulunca dinlen. Bedenini, zihnini, ruhunu tazele. Sonra işine geri dön.', author: 'Ralph Marston' },
  { id: 'h58', cat: 'hatirlat', text: 'What you do today can improve all your tomorrows.', tr: 'Bugün yaptığın şey, bütün yarınlarını daha iyi yapabilir.', author: 'Ralph Marston' },
  { id: 'h59', cat: 'hatirlat', text: 'Nothing is impossible. The word itself says “I’m possible”!', tr: 'Hiçbir şey imkânsız değildir. Kelimenin kendisi bile “mümkünüm” diyor!', author: 'Audrey Hepburn' },
  { id: 'h60', cat: 'hatirlat', text: 'Turn your wounds into wisdom.', tr: 'Yaralarını bilgeliğe dönüştür.', author: 'Oprah Winfrey' },
  { id: 'h61', cat: 'hatirlat', text: 'The only way to do great work is to love what you do.', tr: 'Harika işler çıkarmanın tek yolu, yaptığın işi sevmektir.', author: 'Steve Jobs', note: 'Stanford konuşması, 2005' },
  { id: 'h62', cat: 'hatirlat', text: 'Doubt kills more dreams than failure ever will.', tr: 'Şüphe, başarısızlığın öldürebileceğinden çok daha fazla hayali öldürür.', author: 'Suzy Kassem' },
  { id: 'h63', cat: 'hatirlat', text: 'The only impossible journey is the one you never begin.', tr: 'İmkânsız olan tek yolculuk, hiç başlamadığın yolculuktur.', author: 'Tony Robbins' },
  { id: 'h64', cat: 'hatirlat', text: 'Yaşamak şakaya gelmez, büyük bir ciddiyetle yaşayacaksın, bir sincap gibi mesela.', author: 'Nazım Hikmet', note: 'Yaşamaya Dair' },

  // ——— Gerçek sözler: Yaz Ruhu ———
  { id: 'y40', cat: 'yaz', text: 'In the depth of winter, I finally learned that within me there lay an invincible summer.', tr: 'Kışın ortasında, sonunda içimde yenilmez bir yaz olduğunu öğrendim.', author: 'Albert Camus', note: 'Tipasa’ya Dönüş (1952)' },
  { id: 'y41', cat: 'yaz', text: 'The cure for anything is salt water: sweat, tears or the sea.', tr: 'Her şeyin ilacı tuzlu sudur: ter, gözyaşı ya da deniz.', author: 'Isak Dinesen (Karen Blixen)' },
  { id: 'y42', cat: 'yaz', text: 'To live is the rarest thing in the world. Most people exist, that is all.', tr: 'Yaşamak dünyadaki en nadir şeydir. Çoğu insan sadece var olur, o kadar.', author: 'Oscar Wilde' },
  { id: 'y43', cat: 'yaz', text: 'I had that familiar conviction that life was beginning over again with the summer.', tr: 'O tanıdık inanç yine içimdeydi: hayat yazla birlikte yeniden başlıyordu.', author: 'F. Scott Fitzgerald', note: 'Muhteşem Gatsby (1925)' },
  { id: 'y44', cat: 'yaz', text: 'Summer afternoon, summer afternoon; to me those have always been the two most beautiful words in the English language.', tr: 'Yaz öğleden sonrası… Benim için İngilizcedeki en güzel iki kelime hep bunlar oldu.', author: 'Henry James', note: 'Edith Wharton’ın anılarında aktarılır' },
  { id: 'y45', cat: 'yaz', text: 'Rest is not idleness, and to lie sometimes on the grass under trees on a summer’s day, listening to the murmur of the water, or watching the clouds float across the sky, is by no means a waste of time.', tr: 'Dinlenmek tembellik değildir. Bir yaz günü ağaçların altında çimlere uzanıp suyun mırıltısını dinlemek ya da bulutların süzülüşünü izlemek, asla vakit kaybı değildir.', author: 'John Lubbock', note: 'Hayatın Kullanımı (1894)' },
  { id: 'y46', cat: 'yaz', text: 'Live in the sunshine, swim the sea, drink the wild air.', tr: 'Güneşte yaşa, denizde yüz, vahşi havayı içine çek.', author: 'Ralph Waldo Emerson', note: 'Emerson’a atfedilir' },
  { id: 'y47', cat: 'yaz', text: 'The sea, once it casts its spell, holds one in its net of wonder forever.', tr: 'Deniz bir kez büyüsünü yaptı mı, insanı sonsuza dek hayranlık ağında tutar.', author: 'Jacques Cousteau' },
  { id: 'y48', cat: 'yaz', text: 'Friendship is born at that moment when one person says to another: “What! You too? I thought I was the only one.”', tr: 'Dostluk, birinin diğerine “Ne! Sen de mi? Bir tek ben sanıyordum” dediği anda doğar.', author: 'C. S. Lewis', note: 'Dört Sevgi (1960)' },
  { id: 'y49', cat: 'yaz', text: 'A friend is someone who knows all about you and still loves you.', tr: 'Dost, senin hakkında her şeyi bilip yine de seni seven kişidir.', author: 'Elbert Hubbard' },
  { id: 'y50', cat: 'yaz', text: 'Walking with a friend in the dark is better than walking alone in the light.', tr: 'Karanlıkta bir dostla yürümek, aydınlıkta yalnız yürümekten iyidir.', author: 'Helen Keller' },
  { id: 'y51', cat: 'yaz', text: 'Laughter is the shortest distance between two people.', tr: 'Kahkaha, iki insan arasındaki en kısa mesafedir.', author: 'Victor Borge' },
  { id: 'y52', cat: 'yaz', text: 'Life isn’t about waiting for the storm to pass. It’s about learning to dance in the rain.', tr: 'Hayat fırtınanın geçmesini beklemek değil, yağmurda dans etmeyi öğrenmektir.', author: 'Vivian Greene' },
  { id: 'y53', cat: 'yaz', text: 'Enjoy the little things, for one day you may look back and realize they were the big things.', tr: 'Küçük şeylerin tadını çıkar; bir gün dönüp baktığında onların aslında büyük şeyler olduğunu anlayabilirsin.', author: 'Robert Brault' },
  { id: 'y54', cat: 'yaz', text: 'Life is short, and it is up to you to make it sweet.', tr: 'Hayat kısa; onu tatlı yapmak sana kalmış.', author: 'Sarah Louise Delany' },
  { id: 'y55', cat: 'yaz', text: 'Wherever you go, no matter what the weather, always bring your own sunshine.', tr: 'Nereye gidersen git, hava nasıl olursa olsun, güneşini hep yanında götür.', author: 'Anthony J. D’Angelo' },
  { id: 'y56', cat: 'yaz', text: 'The world is a fine place and worth the fighting for.', tr: 'Dünya güzel bir yer ve uğruna savaşmaya değer.', author: 'Ernest Hemingway', note: 'Çanlar Kimin İçin Çalıyor (1940)' },
  { id: 'y57', cat: 'yaz', text: 'En güzel deniz: henüz gidilmemiş olanıdır.', author: 'Nazım Hikmet' },
  { id: 'y58', cat: 'yaz', text: 'Bedava yaşıyoruz, bedava; hava bedava, bulut bedava.', author: 'Orhan Veli Kanık', note: 'Bedava şiirinden' },
  { id: 'y59', cat: 'yaz', text: 'Hayat kısa, kuşlar uçuyor.', author: 'Cemal Süreya' },
  { id: 'y60', cat: 'yaz', text: 'Gelin tanış olalım, işi kolay kılalım; sevelim sevilelim, dünya kimseye kalmaz.', author: 'Yunus Emre' },
  { id: 'y61', cat: 'yaz', text: 'Bir insanı sevmekle başlayacak her şey.', author: 'Sait Faik Abasıyanık', note: 'Haritada Bir Nokta' },

  // ——— Gerçek sözler: Bilgelik ———
  { id: 'b40', cat: 'bilgelik', text: 'Yaşamak bir ağaç gibi tek ve hür ve bir orman gibi kardeşçesine, bu hasret bizim.', author: 'Nazım Hikmet', note: 'Davet' },
  { id: 'b41', cat: 'bilgelik', text: 'Mastering others is strength. Mastering yourself is true power.', tr: 'Başkalarına hükmetmek güçtür. Kendine hükmetmek gerçek kudrettir.', author: 'Lao Tzu', note: 'Tao Te Ching, 33. bölüm' },
  { id: 'b42', cat: 'bilgelik', text: 'No man ever steps in the same river twice, for it’s not the same river and he’s not the same man.', tr: 'Kimse aynı nehre iki kez giremez; çünkü ne nehir aynı nehirdir ne de insan aynı insan.', author: 'Herakleitos', note: 'Platon’un aktarımından uyarlama' },
  { id: 'b43', cat: 'bilgelik', text: 'The unexamined life is not worth living.', tr: 'Sorgulanmamış bir hayat yaşanmaya değmez.', author: 'Sokrates', note: 'Platon, Sokrates’in Savunması' },
  { id: 'b44', cat: 'bilgelik', text: 'It is not because things are difficult that we do not dare; it is because we do not dare that they are difficult.', tr: 'Bazı şeyler zor olduğu için cesaret edemiyor değiliz; cesaret edemediğimiz için zorlar.', author: 'Seneca', note: 'Lucilius’a Mektuplar, 104' },
  { id: 'b45', cat: 'bilgelik', text: 'Difficulties strengthen the mind, as labor does the body.', tr: 'Emek bedeni nasıl güçlendirirse, zorluklar da zihni öyle güçlendirir.', author: 'Seneca', note: 'Seneca’ya atfedilir' },
  { id: 'b46', cat: 'bilgelik', text: 'Everything can be taken from a man but one thing: the last of the human freedoms, to choose one’s attitude in any given set of circumstances.', tr: 'İnsanın elinden her şey alınabilir, bir şey hariç: insan özgürlüklerinin sonuncusu, yani her koşulda tavrını seçebilmek.', author: 'Viktor Frankl', note: 'İnsanın Anlam Arayışı (1946)' },
  { id: 'b47', cat: 'bilgelik', text: 'Well begun is half done.', tr: 'İyi başlanmış iş, yarı bitmiş iştir.', author: 'Aristoteles', note: 'Politika’da eski bir atasözü olarak anar' },
  { id: 'b48', cat: 'bilgelik', text: 'Man needs difficulties; they are necessary for health.', tr: 'İnsanın zorluklara ihtiyacı vardır; sağlık için gereklidirler.', author: 'Carl Gustav Jung' },
  { id: 'b49', cat: 'bilgelik', text: 'Knowledge is power.', tr: 'Bilgi güçtür.', author: 'Francis Bacon' },
]
