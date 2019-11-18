import Home from '../pages/Home'
import LyricWindow from '../pages/LyricWindow'
import Lyric from '../pages/Lyric'
import Search from '../pages/Search'
import MusicLibrary from '../pages/MusicLibrary'
import ToBeDeveloped from '../pages/ToBeDeveloped'
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
        component: MusicLibrary
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
