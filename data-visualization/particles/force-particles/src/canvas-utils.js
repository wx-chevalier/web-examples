import isMobile from 'ismobilejs';

const sf = isMobile.phone ? 1 : 2;

export function crispyCanvas(
  canvas,
  { width = window.width, vizHeight = window.innerHeight }
) {
  if (!canvas) {
    return;
  }

  canvas.width = width * sf;
  canvas.height = vizHeight * sf;
  canvas.style.width = width + 'px';
  canvas.style.height = vizHeight + 'px';

  canvas.getContext('2d').scale(sf, sf);
}
