//====== Constants =======//
const DURATION = 2000;
const NUMBER_OF_ORBITS = 4;
const timeline = new mojs.Timeline();

//====== Shape Declarations =======//

class Orbits extends mojs.CustomShape {
  getShape() {
    return `
      <path class="orbit-2" d="M67.14,49C67.14,75,59,96,49,96S30.87,75,30.87,49,39,2,49,2,67.14,23,67.14,49Z"/>
      <path class="orbit-1" d="M49,67.14C23,67.14,2,59,2,49S23,30.87,49,30.87,96,39,96,49,75,67.14,49,67.14Z"/>
      <path class="orbit-3" d="M61.83,61.83c-18.36,18.36-39,27.49-46.06,20.41s2.06-27.7,20.41-46.06,39-27.49,46.06-20.41S80.18,43.47,61.83,61.83Z"/>
      <path class="orbit-4" d="M61.83,36.18c18.36,18.36,27.49,39,20.41,46.06s-27.7-2.06-46.06-20.41-27.49-39-20.41-46.06S43.47,17.82,61.83,36.18Z"/>
      <path class="atom-path-2" d="M67.14,49C67.14,75,59,96,49,96S30.87,75,30.87,49,39,2,49,2,67.14,23,67.14,49Z"/>
      <path class="atom-path-1" d="M49,67.14C23,67.14,2,59,2,49S23,30.87,49,30.87,96,39,96,49,75,67.14,49,67.14Z"/>
      <path class="atom-path-3" d="M61.83,61.83c-18.36,18.36-39,27.49-46.06,20.41s2.06-27.7,20.41-46.06,39-27.49,46.06-20.41S80.18,43.47,61.83,61.83Z"/>
      <path class="atom-path-4" d="M61.83,36.18c18.36,18.36,27.49,39,20.41,46.06s-27.7-2.06-46.06-20.41-27.49-39-20.41-46.06S43.47,17.82,61.83,36.18Z"/>
    `;
  }
}

mojs.addShape('orbits', Orbits);

//====== Wrapper =======//
const atom = new mojs.Html({
  el: '.atom',
  isShowStart: true,
  scale: { 2: 0 },
  angleZ: { 90: 0 },
  duration: 150
});

//====== Static Orbits =======//
const orbits = new mojs.Shape({
  shape: 'orbits',
  parent: '.atom',
  isShowStart: true,
  fill: 'transparent',
  strokeWidth: 1.2
});

//====== Nucleus =======//
const nucleus = new mojs.Shape({
  parent: '.atom',
  isShowStart: true,
  fill: '#EB492E',
  radius: 6
});

//====== Implosion effect =======//
const implosion = new mojs.Shape({
  fill: 'white',
  radius: 1000,
  opacity: { 0: 1 },
  easing: 'linear.none',
  duration: 250
});

//====== Create 2 electrons per orbit w/ their trace effect =======//

const ELECTRON_OPTS = {
  easing: 'linear.none',
  duration: DURATION,
  easing: 'M0, 100 C0, 100 55, 20 55, 20 C55, 20 100, 0 100, 0',
  isReverse: true
};

for (let i = NUMBER_OF_ORBITS; i >= 1; i--) {
  const pathEl = `.atom-path-${i}`;
  const electronEl = `.electron-${i}`;

  const trace = new mojs.Html({
    el: pathEl,
    strokeDasharray: { '50%, 200%': '0%, 200%' },
    duration: DURATION,
    easing: 'linear.none'
  });

  const electron = new mojs.MotionPath({
    ...ELECTRON_OPTS,
    el: electronEl,
    path: pathEl
  });

  const electron2 = new mojs.MotionPath({
    ...ELECTRON_OPTS,
    el: `${electronEl}-${i}`,
    path: pathEl,
    pathStart: 0.5
  });

  timeline.add(trace, electron, electron2);
}

timeline.append(atom).append(implosion);
//  .play();

new MojsPlayer({ add: timeline, isRepeat: true, isPlaying: true });
