// pages/user/user.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    avatarUrl: "../images/portrait.png",
    nickName: "yourname",
    weather: "获取天气"
  },
  bindGetUserInfo: function (e) {
    var nickname = e.detail.userInfo.nickName;
    var avatar = e.detail.userInfo.avatarUrl;
    this.setData({
      nickName: nickname,
      avatarUrl: avatar,
      show: false
    })
  },
  switchChange: function (e) {
    if (e.detail.value) {
      wx.request({
        url: 'https://free-api.heweather.com/s6/weather/now?parameters',
        data: {
          location: "北京",
          key: "1a648085384740ed9938d10098c1dc8f"
        },
        success: (res) => {
          //console.log(res)
          var location = res.data.HeWeather6[0].basic.location;
          var weather = res.data.HeWeather6[0].now.cond_txt;
          var tmp = res.data.HeWeather6[0].now.tmp;
          this.setData({
            weather: location + " " + weather + " " + tmp + "度"
          })
        }
      })
    } else {
      this.setData({
        weather: "获取天气"
      })
    }
  },
  toBlog: function () {
    wx.navigateTo({
      url: '../blog/blog',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 查看是否授权
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: (res) => {
              console.log(res.userInfo)
              var nickname = res.userInfo.nickName;
              var avatar = res.userInfo.avatarUrl;
              this.setData({
                nickName: nickname,
                avatarUrl: avatar,
                show: false
              })
            }
          })
        }
      }
    })
  }
})