const app = getApp().globalData;
const api = require('../../utils/api.js')
// const song = require('../../utils/song.js')
Page({
  data: {
    //精品歌单列表
    songs: [
      // {
      //   id: "1338695683",
      //   name: "起风了",
      //   singer: "吴青峰",
      //   pic: "http://p1.music.126.net/aMVPsO00OqlVTS2yMH8RgA==/109951163785600029.jpg?param=400y400",
      //   lrc: "https://api.bzqll.com/music/netease/lrc?id=1338695683&key=579621905",
      //   url: "https://api.bzqll.com/music/netease/url?id=1338695683&key=579621905",
      //   time: 313
      // },
      // {
      //   id: "1313558186",
      //   name: "一曲相思 ",
      //   singer: "半阳",
      //   pic: "http://p1.music.126.net/yHRY23bKbLJjjbSnE-T8gA==/109951163575213436.jpg?param=400y400",
      //   lrc: "https://api.bzqll.com/music/netease/lrc?id=1313558186&key=579621905",
      //   url: "https://api.bzqll.com/music/netease/url?id=1313558186&key=579621905",
      //   time: 167
      // },
    ],
    songListPic: "https://p2.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg?param=400y400"
  },
  onLoad: function () {
    let id = app.songSheetData.id;
    this._getSongMusicData(id);
  },
  onShow: function () {
    
  },
  /* 获取歌单数据 */
  _getSongMusicData: function (id) {
    const url = `https://api.bzqll.com/music/netease/songList?key=579621905&id=${id}&limit=10&offset=0`,_this = this;
    wx.request({
      url: url,
      method: 'GET',
      success: function (res) {
        if (res.data && res.data.code === 200) {
          _this.setData({
            songs: res.data.data.songs,
            songListPic: res.data.data.songListPic,
          });
          app.songMusicData = res.data.data;
        }
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  /* 随机播放 */
  _randomPlayall: function () {
   
    wx.switchTab({
      url: '/pages/player/player'
    })
  },
  /* 播放音乐 */
  _PlayMusic: function (event) {
    app.songData = event.currentTarget.dataset.data;
    app.currentIndex = event.currentTarget.dataset.index;
    wx.switchTab({
      url: '/pages/player/player'
    })
  },
})