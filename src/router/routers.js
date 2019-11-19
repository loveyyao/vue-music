const Home = () => import('../pages/Home')
const LyricWindow = () => import('../pages/LyricWindow')
const Lyric = () => import('../pages/Lyric')
const Search = () => import('../pages/Search')
const MusicLibrary = () => import('../pages/MusicLibrary')
const ToBeDeveloped = () => import('../pages/ToBeDeveloped')
const Recommend = () => import('../pages/Recommend')
const TopList = () => import('../pages/TopList')
const Singer = () => import('../pages/Singer')
export default [
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/home/lyric',
        component: Lyric
      },
      {
        path: '/home/musicLibrary',
        component: MusicLibrary,
        children: [
          {
            path: '/home/musicLibrary/recommend',
            component: Recommend
          },
          {
            path: '/home/musicLibrary/toplist',
            component: TopList
          },
          {
            path: '/home/musicLibrary/singer',
            component: Singer
          },
          {
            path: '/home/musicLibrary/classify',
            component: ToBeDeveloped
          },
          {
            path: '/home/musicLibrary',
            redirect: '/home/musicLibrary/recommend'
          }
        ]
      },
      {
        path: '/home/broadcastingStation',
        component: ToBeDeveloped
      },
      {
        path: '/home/songList',
        component: ToBeDeveloped
      },
      {
        path: '/home/liveStreaming',
        component: ToBeDeveloped
      },
      {
        path: '/home/ktv',
        component: ToBeDeveloped
      },
      {
        path: '/home/search',
        component: Search
      },
      {
        path: '/home/mv',
        component: ToBeDeveloped
      },
      {
        path: '/home',
        redirect: '/home/musicLibrary'
      }
    ]
  },
  {
    path: '/lyric',
    component: LyricWindow
  },
  {
    path: '/',
    redirect: '/home'
  }
]
