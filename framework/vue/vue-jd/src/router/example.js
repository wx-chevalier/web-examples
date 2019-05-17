const loadingMore = () => import('@/example/loadingMore')
const tabContainer = () => import('@/example/tabContainer')
const videoPlayer = () => import('@/example/videoPlayer')
const qrCode = () => import('@/example/qrCode')
const imgCropper = () => import('@/example/imgCropper')
const swiperTabs = () => import('@/example/swiperTabs')

export default [
    {
      path: '/loadingMore',
      name: 'loadingMore',
      component: loadingMore
    },
    {
      path: '/tabContainer',
      name: 'tabContainer',
      component: tabContainer
    },
    {
      path: '/videoPlayer',
      name: 'videoPlayer',
      component: videoPlayer
    },
    {
        path: '/qrCode',
        name: 'qrCode',
        component: qrCode
    },
    {
        path: '/imgCropper',
        name: 'imgCropper',
        component: imgCropper
    },
    {
      path: '/swiperTabs',
      name: 'swiperTabs',
      component: swiperTabs
    }
]
