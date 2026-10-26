export type Category = 'spor' | 'disiplin' | 'hatirlat' | 'yaz' | 'bilgelik'

export interface Quote {
  id: string
  /** Sözün kendisi (özgün dilinde). */
  text: string
  /** Söz İngilizceyse Türkçe karşılığı. */
  tr?: string
  author?: string
  /** Söz kime ait olduğu kesin değilse "atfedilir" gibi kısa bir not. */
  note?: string
  cat: Category
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
]
