
//index.js
//获取应用实例
const app = getApp();
const api = require("../../utils/api.js");
Page({
  data: {
    slider: [
      { picUrl: 'https://zhenglinglu.cn/external/musicimg/1.jpg' },
      { picUrl: 'https://zhenglinglu.cn/external/musicimg/2.jpg' },
      { picUrl: 'https://zhenglinglu.cn/external/musicimg/3.jpg' }
    ],
    //精品歌单列表
    qualityList: null,
    //最新歌单列表
    newList: null,
    //最新歌单列表
    hotList: null,
  },
  // 添加
  onLoad: function () {
    /* 获取歌单分类 */
    // api.getHotMusicData('全部', 100, 'hot');

    api.getEssenceMusicData('全部', 100);
    api.getHotMusicData('全部', 100, 'new');
    // api.getHotMusicData('全部', 100, 'hot');
  },
  onShow: function () {
    let essenceTime = setInterval(() => {
      if (app.globalData.essenceMusicData) {
        this.updateData('essence');
        clearInterval(essenceTime);
      }
    }, 10);

    // let hotTime = setInterval(() => {
    //   if (app.globalData.hotMusicData) {
    //     this.updateData('hot');
    //     clearInterval(hotTime);
    //   }
    // }, 10);

    let newTime = setInterval(() => {
      if (app.globalData.newMusicData) {
        this.updateData('new');
        clearInterval(newTime);
      }
    }, 10);
  },
  updateData: function (key) {
    switch (key) {
      case 'essence':
        this.setData({
          qualityList: app.globalData.essenceMusicData.slice(0, 12),
        });
        break;
      case 'hot':
        this.setData({
          hotList: app.globalData.hotMusicData.slice(0, 12)
        });
        break;
      case 'new':
        this.setData({
          newList: app.globalData.newMusicData.slice(0, 12)
        });
        break;
      default:
        break;
    }
  },


  //选择歌单ID
  _selectItemId: function (event) {
    const data = event.currentTarget.dataset.data;
    app.globalData.songSheetData = data;
    wx.navigateTo({
      url: '/pages/bill-list/bill-list'
    })
  },
  _selectSongSheet: function (event) {
    let mark = event.currentTarget.dataset.mark,url='';
    if (mark === 'new') {
      url= '/pages/newSongSheet/newSongSheet';
    } else if (mark === 'hot') {
      url= '/pages/hotSongSheet/hotSongSheet';
    } else if (mark === 'culle') {
      url= '/pages/culleSongSheet/culleSongSheet';
    } else if (mark === 'all') {
      url= '/pages/allSongSheet/allSongSheet';
    };
    wx.navigateTo({url});
  }
})
// //index.js
// //获取应用实例
// const app = getApp()

// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })
