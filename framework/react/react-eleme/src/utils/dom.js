
/*eslint-disable*/
export const hasClass = (el, className) => {
  if (el.classList) {
    return el.classList.contains(className)
  }
  const nameArray = el.className.split(' ')
  return nameArray.indexOf(className) > -1
}

export const addClass = (el, className) => {
  if (el.classList) {
    el.classList.add(className)
  } else {
    const newClass = el.className.split(' ').concat([className]).join(' ')
    el.className = newClass
  }
}

export const removeClass = (el, className) => {
  if (el.classList) {
    el.classList.remove(className)
  } else {
    if (hasClass(el, className)) {
      const newClass = el.className.split(' ').filter(name => name !== className).join(' ')
      el.className = newClass
    }
  }
}

// css3 hark前缀
const elementStyle = document.createElement('div').style
const vendor = (() => {
  const transformNames = {
    Webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform',
  }
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export const prefixStyle = (style) => {
  if (!vendor) return false
  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

export const watchTransitionEvent = () => {
  const transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
  };
  for (let key in transitions) {
    if (elementStyle[key] !== undefined) {
      return transitions[key];
    }
  }
  return false;
};
