/** 加载 CSS */
export function loadCSS(href: string) {
  const head = document.getElementsByTagName('head')[0];

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = href;

  head.appendChild(link);
}
