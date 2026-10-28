// 라이브러리 없이 실행: 올리면 멈춤, 벗어나면 이어서 재생.
document.querySelectorAll('.card').forEach((card) => {
  let hovered = false;
  let focused = false;
  let pinned = false;
  function update() {
    const paused = hovered || focused || pinned;
    card.classList.toggle('is-paused', paused);
    card.setAttribute('aria-pressed', String(paused));
  }
  card.addEventListener('pointerenter', (event) => {
    if (event.pointerType !== 'touch') { hovered = true; update(); }
  });
  card.addEventListener('pointerleave', () => { hovered = false; update(); });
  card.addEventListener('focus', () => { focused = card.matches(':focus-visible'); update(); });
  card.addEventListener('blur', () => { focused = false; pinned = false; update(); });
  card.addEventListener('click', (event) => {
    if (event.pointerType === 'touch' || event.detail === 0) { pinned = !pinned; update(); }
  });
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); pinned = !pinned; update(); }
    if (event.key === 'Escape') { pinned = false; card.blur(); update(); }
  });
});
