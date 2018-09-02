// pages/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bgUrl: "../images/register.png",
    tmpName: undefined,
    tmpPwd: undefined,
    username: "",
    password: ""
  },
  getName: function (e) {
    console.log(e.detail.value);
    this.setData({
      tmpName: e.detail.value
    })
  },
  getPwd: function (e) {
    console.log(e.detail.value);
    this.setData({
      tmpPwd: e.detail.value
    })
  },
  setInfo: function () {
    if (this.data.tmpName && this.data.tmpPwd) {
      if (this.data.tmpName == this.data.username) {
        wx.showToast({
          title: '用户名重复',
          icon: "none"
        })
      } else {
        this.setData({
          username: this.data.tmpName,
          password: this.data.tmpPwd
        })
        wx.showToast({
          title: '您已注册成功',
          icon: "none",
          duration: 1600,
          success: () => {
            this.setData({
              bgUrl: "../images/login.png"
            })
          }
        })
      }
    } else {
      wx.showToast({
        title: '请输入完整信息',
        icon: "none"
      })
    }
  },
  submitForm: function (e) {
    if (this.data.username !== undefined || this.data.password == !undefined) {
      if (this.data.username == e.detail.value.username && this.data.password == e.detail.value.password) {
        wx.showToast({
          title: '登陆成功',
          icon: "none",
          success: () => {
            wx.setStorage({
              key: 'username',
              data: 'this.data.username',
              success: () => {
                console.log("本地存储用户名成功")
              }
            });
            wx.setStorage({
              key: "password",
              data: this.data.password,
              success: function (e) {
                console.log(e, "本地存储密码成功")
              }
            })
            wx.switchTab({
              url: '../home/home',
            })
          }
        })
      } else {
        wx.showToast({
          title: '密码或用户名不对',
          icon: "none"
        })
      }
    } else {
      wx.showToast({
        title: '请输入信息',
        icon: "none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'username',
      success: function (res) {
        console.log("有name缓存");
        wx.switchTab({
          url: '../home/home'
        })
      }
    })
  }
})