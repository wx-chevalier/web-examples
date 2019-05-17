// 颜色
const COLORS = {
  RED: '#FD5061',
  YELLOW: '#FFCEA5',
  BLACK: '#29363B',
  WHITE: 'white',
  VINOUS: '#A50710'
};

// 过渡时间
const DURATION = 800;

// 父元素图形，只用于整体的位置的变化
const showBase = new mojs.Shape({
  fill: 'none',
  radius: 20,
  x: {
    [-150]: 0,
    easing: 'cubic.out'
  },
  y: {
    [90]: 0,
    easing: 'cubic.out'
  },
  duration: DURATION + 400,
  // 动画执行完毕，添加样式、事件
  onComplete() {
    this.el.style.cursor = 'pointer';
    this.el.addEventListener('click', scaleAnime, false);
  }
});

// 最后执行的圆形扩散
const circle = new mojs.Shape({
  fill: COLORS.WHITE,
  parent: showBase.el, // 定义父元素
  radius: 50,
  scale: {
    0.4: 1
  },
  duration: 650,
  opacity: {
    0.5: 0
  },
  delay: DURATION + 100,
  easing: 'cubic.out'
});

const showUp = new mojs.Shape({
  fill: 'none',
  stroke: COLORS.WHITE,
  parent: showBase.el, // 定义父元素
  radius: {
    0: 10
  },
  angle: {
    560: 270
  },
  strokeWidth: {
    0: 22,
    easing: 'cubic.inout'
  },
  strokeDasharray: '100%',
  strokeDashoffset: {
    '-100%': '0%',
    easing: 'cubic.in'
  },
  strokeLinecap: 'round',
  duration: DURATION
})
  .then({
    scale: 0.75,
    duration: 250
  })
  .then({
    scale: 1,
    duration: 300
  });

const addButtonCross = new mojs.Shape({
  shape: 'cross',
  parent: showUp.el, // 定义旋转的圆形为父元素
  fill: 'none',
  stroke: COLORS.VINOUS,
  radius: 6,
  strokeLinecap: 'round',
  isShowStart: true,
  duration: DURATION,
  angle: {
    0: -360
  },
  scale: {
    0: 1
  },
  y: {
    35: 0
  },
  x: {
    35: 0
  }
}).then({
  angle: -540,
  duration: DURATION / 2,
  easing: 'cubic.out'
});

const timelineback = new mojs.Timeline();
timelineback.add(showBase, circle, showUp, addButtonCross).play();

// 点击按钮放大动画
function scaleAnime() {
  circle
    .tune({
      delay: 0,
      scale: {
        0.4: 30
      },
      opacity: 1,
      duration: 500,
      easing: 'cubic.inout'
    })
    .replay();
}
