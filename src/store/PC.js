const state = {
  windowH: 0,
  isShowBg: '',
  picUrl: '',
  keywords: '',
  offset: 0,
  searchList: [],
  atPresent: {}, // 存放当前播放歌曲
  defaultList: [], // 默认播放列表
  comment: {}, // 存储歌曲评论
  lyric: {}, // 歌词
  index: 0,
  top: 0,
  singers: [],
  token: '',
  userInfo: {},
  playList: [],
  userPlaylist: []
}
const getters = {
}

const mutations = {
  addPlayList: function (state, data) {
    state.userPlaylist = data
  },
  setPlayList: function (state, data) {
    state.playList = data
  },
  setToken: function (state, data) {
    state.token = data
  },
  setUserInfo: function (state, data) {
    state.userInfo = data
  },
  delSingersData: function (state, data) {
    state.singers = data
  },
  setSingersData: function (state, data) {
    state.singers = [...state.singers, ...data]
  },
  setWindowH: function (state, data) {
    state.windowH = data
  },
  setShowBg: function (state, data) {
    state.isShowBg = data
  },
  addPicUrl: function (state, data) {
    state.picUrl = data
  },
  setSearchInfo: function (state, data) {
    state.keywords = data.keywords
    state.offset = data.offset
  },
  // 添加搜索列表数据
  addData: function (state, data) {
    state.searchList = [...state.searchList, ...data]
  },
  delData: function (state, data) {
    state.searchList = data
  },
  // 设置当前播放
  setAtPresentPlayMusic: function (state, data) {
    state.atPresent = data
  },
  // 添加到默认播放列表
  addDefaultList: function (state, data) {
    state.defaultList = [...state.defaultList, ...data]
  },
  delMusic: function (state, index) {
    state.defaultList.splice(index, 1)
  },
  addSongComment: function (state, data) {
    state.comment = data
  },
  setLyric: function (state, data) {
    state.lyric = data
  },
  setLyricIndex: function (state, data) {
    state.index = data.index
    state.top = data.top
  }
}

const actions = {
}

export default {
  // namespaced: true,
  state,
  getters,
  mutations,
  actions
}
