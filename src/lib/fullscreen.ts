// iOS'ta ana ekrandan açılan web uygulamalarında bazı sürümler görünür alanı ekranın
// en altına kadar uzatmıyor ve altta bir boşluk kalıyor. Aradaki farkı ölçüp tam ekran
// katmanları (--vh-gap kadar) aşağı uzatıyoruz. Normal durumda fark 0'dır.

function safeTop(): number {
  const probe = document.createElement('div')
  probe.style.cssText = 'position:fixed;top:0;left:0;height:0;visibility:hidden;padding-top:env(safe-area-inset-top)'
  document.body.appendChild(probe)
  const v = parseFloat(getComputedStyle(probe).paddingTop) || 0
  probe.remove()
  return v
}

function fit() {
  const standalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  const portrait = window.innerHeight >= window.innerWidth
  let gap = 0
  // İçerik durum çubuğunun altına uzanıyorsa (üstte boşluk yoksa) eksik kalan kısım alttadır.
  if (standalone && portrait && safeTop() > 0) {
    const diff = Math.round(screen.height - window.innerHeight)
    if (diff > 2 && diff < 160) gap = diff
  }
  document.documentElement.style.setProperty('--vh-gap', `${gap}px`)
}

export function keepFullscreen() {
  fit()
  for (const ev of ['resize', 'orientationchange', 'pageshow']) window.addEventListener(ev, () => requestAnimationFrame(fit))
  document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' && setTimeout(fit, 120))
  window.visualViewport?.addEventListener('resize', () => requestAnimationFrame(fit))
}
