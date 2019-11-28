const Home = () => import('../pages/Home')
const LyricWindow = () => import('../pages/LyricWindow')
const Lyric = () => import('../pages/Lyric')
const Search = () => import('../pages/Search')
const MusicLibrary = () => import('../pages/MusicLibrary')
const ToBeDeveloped = () => import('../pages/ToBeDeveloped')
const Recommend = () => import('../pages/Recommend')
const TopList = () => import('../pages/TopList')
const Singer = () => import('../pages/Singer')
const SingerDetails = () => import('../pages/SingerDetails')
const SongDetails = () => import('../pages/SongDetails')
const MHome = () => import('../pages/mobile/Home')
const Hear = () => import('../pages/mobile/Hear')
const Look = () => import('../pages/mobile/Look')
const Me = () => import('../pages/mobile/Me')
const Sing = () => import('../pages/mobile/Sing')
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
            path: '/home/musicLibrary/singer/details',
            name: 'SingerDetails',
            component: SingerDetails
          },
          {
            path: '/home/musicLibrary/song/details',
            name: 'SongDetails',
            component: SongDetails
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
    path: '/mobile/home',
    component: MHome,
    children: [
      {
        path: '/mobile/home/me',
        component: Me
      },
      {
        path: '/mobile/home/hear',
        component: Hear
      },
      {
        path: '/mobile/home/look',
        component: Look
      },
      {
        path: '/mobile/home/sing',
        component: Sing
      },
      {
        path: '/mobile/home',
        redirect: '/mobile/home/hear'
      }
    ]
  },
  {
    path: '/',
    redirect: '/home'
  }
]
