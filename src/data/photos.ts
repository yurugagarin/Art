// Fotoğraflar Unsplash'ten (ücretsiz kullanım lisansı) doğrudan bağlantıyla yüklenir.
// Yüklenemeyen bir fotoğraf olursa uygulama onu otomatik atlar ve yerine başka bir
// fotoğraf koyar; yüklenene kadar da temaya uygun bir renk geçişi gösterilir.

export type PhotoTheme = 'yaz' | 'deniz' | 'gunbatimi' | 'doga' | 'spor' | 'arkadas'

export interface Photo {
  id: string
  theme: PhotoTheme
  /** Tam ekran kart için görsel adresi. */
  src: string
  /** Küçük önizleme (favoriler, fotoğraf seçici). */
  thumb: string
  /** Kullanıcının kendi yüklediği fotoğraf mı? */
  own?: boolean
}

const unsplash = (id: string, theme: PhotoTheme): Photo => ({
  id: `u-${id}`,
  theme,
  src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1080&h=1920&q=80`,
  thumb: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=480&h=720&q=70`,
})

export const PHOTOS: Photo[] = [
  // Yaz & deniz
  unsplash('1507525428034-b723cf961d3e', 'deniz'),
  unsplash('1519046904884-53103b34b206', 'yaz'),
  unsplash('1500375592092-40eb2168fd21', 'deniz'),
  unsplash('1502680390469-be75c86b636f', 'deniz'),
  unsplash('1473496169904-658ba7c44d8a', 'yaz'),
  unsplash('1505228395891-9a51e7e86bf6', 'deniz'),
  unsplash('1471922694854-ff1b63b20054', 'yaz'),
  unsplash('1506953823976-52e1fdc0149a', 'yaz'),
  // Gün batımı & doğa
  unsplash('1506905925346-21bda4d32df4', 'gunbatimi'),
  unsplash('1469474968028-56623f02e42e', 'gunbatimi'),
  unsplash('1470071459604-3b5ec3a7fe05', 'doga'),
  unsplash('1441974231531-c6227db76b6e', 'doga'),
  unsplash('1501785888041-af3ef285b470', 'doga'),
  unsplash('1464822759023-fed622ff2c3b', 'doga'),
  unsplash('1519681393784-d120267933ba', 'gunbatimi'),
  unsplash('1472214103451-9374bd1c798e', 'doga'),
  unsplash('1490750967868-88aa4486c946', 'yaz'),
  unsplash('1500534314209-a25ddb2bd429', 'gunbatimi'),
  // Spor
  unsplash('1517836357463-d25dfeac3438', 'spor'),
  unsplash('1534438327276-14e5300c3a48', 'spor'),
  unsplash('1476480862126-209bfaa8edc8', 'spor'),
  unsplash('1571019613454-1cb2f99b2d8b', 'spor'),
  unsplash('1552674605-db6ffd4facb5', 'spor'),
  unsplash('1517649763962-0c623066013b', 'spor'),
  // Arkadaşlar & buluşmalar
  unsplash('1529156069898-49953e39b3ac', 'arkadas'),
  unsplash('1511632765486-a01980e01a18', 'arkadas'),
  unsplash('1528605248644-14dd04022da1', 'arkadas'),
  unsplash('1504280390367-361c6d9f38f4', 'arkadas'),
  unsplash('1470229722913-7c0e2dbbafd3', 'arkadas'),
  unsplash('1492684223066-81342ee5ff30', 'arkadas'),
  unsplash('1414235077428-338989a2e8c0', 'arkadas'),
]

/** Fotoğraf yüklenene kadar (ya da hiç yüklenemezse) görünen renk geçişleri. */
export const THEME_GRADIENTS: Record<PhotoTheme, string> = {
  yaz: 'linear-gradient(165deg, #ffe0a3 0%, #ffa98a 42%, #ff6f91 100%)',
  deniz: 'linear-gradient(165deg, #b8f3ff 0%, #4fc3dc 45%, #1d5f9e 100%)',
  gunbatimi: 'linear-gradient(165deg, #ffd38a 0%, #f7797d 48%, #6a3093 100%)',
  doga: 'linear-gradient(165deg, #e3f7a1 0%, #8fd6a4 45%, #2f6f68 100%)',
  spor: 'linear-gradient(165deg, #ff8a5c 0%, #d7266f 50%, #2b1155 100%)',
  arkadas: 'linear-gradient(165deg, #fff0b8 0%, #ffb547 45%, #f2559e 100%)',
}
