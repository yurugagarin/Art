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
  // Eklenen fotoğraflar (daha fazla çeşitlilik için)
  unsplash('1506744038136-46273834b3fb', 'doga'),
  unsplash('1470770841072-f978cf4d019e', 'doga'),
  unsplash('1501854140801-50d01698950b', 'doga'),
  unsplash('1426604966848-d7adac402bff', 'doga'),
  unsplash('1447752875215-b2761acb3c5d', 'doga'),
  unsplash('1433086966358-54859d0ed716', 'doga'),
  unsplash('1476514525535-07fb3b4ae5f1', 'doga'),
  unsplash('1502082553048-f009c37129b9', 'doga'),
  unsplash('1454496522488-7a8e488e8606', 'doga'),
  unsplash('1483728642387-6c3bdd6c93e5', 'doga'),
  unsplash('1504198453319-5ce911bafcde', 'doga'),
  unsplash('1500964757637-c85e8a162699', 'doga'),
  unsplash('1465146344425-f00d5f5c8f07', 'doga'),
  unsplash('1439066615861-d1af74d74000', 'doga'),
  unsplash('1418065460487-3e41a6c84dc5', 'doga'),
  unsplash('1490730141103-6cac27aaab94', 'gunbatimi'),
  unsplash('1419242902214-272b3f66ee7a', 'gunbatimi'),
  unsplash('1444080748397-f442aa95c3e5', 'gunbatimi'),
  unsplash('1477959858617-67f85cf4f1df', 'gunbatimi'),
  unsplash('1475924156734-496f6cac6ec1', 'gunbatimi'),
  unsplash('1495616811223-4d98c6e9c869', 'gunbatimi'),
  unsplash('1507400492013-162706c8c05e', 'gunbatimi'),
  unsplash('1472120435266-53107fd0c44a', 'gunbatimi'),
  unsplash('1518837695005-2083093ee35b', 'deniz'),
  unsplash('1505118380757-91f5f5632de0', 'deniz'),
  unsplash('1476673160081-cf065607f449', 'deniz'),
  unsplash('1468413253725-0d5181091126', 'deniz'),
  unsplash('1530053969600-caed2596d242', 'deniz'),
  unsplash('1544551763-46a013bb70d5', 'deniz'),
  unsplash('1520942702018-0862200e6873', 'deniz'),
  unsplash('1510414842594-a61c69b5ae57', 'yaz'),
  unsplash('1540541338287-41700207dee6', 'yaz'),
  unsplash('1520250497591-112f2f40a3f4', 'yaz'),
  unsplash('1566073771259-6a8506099945', 'yaz'),
  unsplash('1516483638261-f4dbaf036963', 'yaz'),
  unsplash('1570077188670-e3a8d69ac5ff', 'yaz'),
  unsplash('1533105079780-92b9be482077', 'yaz'),
  unsplash('1523906834658-6e24ef2386f9', 'yaz'),
  unsplash('1469854523086-cc02fe5d8800', 'yaz'),
  unsplash('1499793983690-e29da59ef1c2', 'yaz'),
  unsplash('1414609245224-afa02bfb3fda', 'yaz'),
  unsplash('1436491865332-7a61a109cc05', 'yaz'),
  unsplash('1500835556837-99ac94a94552', 'yaz'),
  unsplash('1503220317375-aaad61436b1b', 'yaz'),
  unsplash('1512100356356-de1b84283e18', 'yaz'),
  unsplash('1540497077202-7c8a3999166f', 'spor'),
  unsplash('1581009146145-b5ef050c2e1e', 'spor'),
  unsplash('1574680096145-d05b474e2155', 'spor'),
  unsplash('1541534741688-6078c6bfb5c5', 'spor'),
  unsplash('1526506118085-60ce8714f8c5', 'spor'),
  unsplash('1544367567-0f2fcb009e0b', 'spor'),
  unsplash('1506126613408-eca07ce68773', 'spor'),
  unsplash('1461897104016-0b3b00cc81ee', 'spor'),
  unsplash('1530549387789-4c1017266635', 'spor'),
  unsplash('1571019614242-c5c5dee9f50b', 'spor'),
  unsplash('1549060279-7e168fcee0c2', 'spor'),
  unsplash('1517838277536-f5f99be501cd', 'spor'),
  unsplash('1486218119243-13883505764c', 'spor'),
  unsplash('1583454110551-21f2fa2afe61', 'spor'),
  unsplash('1599058917212-d750089bc07e', 'spor'),
  unsplash('1522202176988-66273c2fd55f', 'arkadas'),
  unsplash('1543269865-cbf427effbad', 'arkadas'),
  unsplash('1527529482837-4698179dc6ce', 'arkadas'),
  unsplash('1516450360452-9312f5e86fc7', 'arkadas'),
  unsplash('1514525253161-7a46d19cd819', 'arkadas'),
  unsplash('1501386761578-eac5c94b800a', 'arkadas'),
  unsplash('1540039155733-5bb30b53aa14', 'arkadas'),
  unsplash('1429962714451-bb934ecdc4ec', 'arkadas'),
  unsplash('1517457373958-b7bdd4587205', 'arkadas'),
  unsplash('1533174072545-7a4b6ad7a6c3', 'arkadas'),
  unsplash('1478131143081-80f7f84ca84d', 'arkadas'),
  unsplash('1510312305653-8ed496efae75', 'arkadas'),
  unsplash('1506869640319-fe1a24fd76dc', 'arkadas'),
  unsplash('1523580494863-6f3031224c94', 'arkadas'),
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
