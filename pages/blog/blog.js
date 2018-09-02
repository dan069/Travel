// pages/blog/blog.js
Page({
  /**
    * 页面的初始数据
    */
  data: {
    picUrl: "",
    upImg: false,
    location: "所在位置",
    show: true
  },
  addImg: function () {
    wx.chooseImage({
      success: (res) => {
        //console.log(res)
        var tempFilePaths = res.tempFilePaths;
        this.setData({
          picUrl: tempFilePaths[0],
          temPath: tempFilePaths,
          upImg: true
        });
        wx.uploadFile({
          url: 'https://522435231.tlv2018.xyz',
          filePath: tempFilePaths[0],
          name: 'image',
          success: (res) => {
            //console.log(res);
          }
        })
      }
    })
  },
  getLocation: function () {
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success: (res) => {
              wx.chooseLocation({
                success: (res) => {
                  console.log(res);
                  this.setData({
                    location: res.name
                  })
                }
              })
            }
          })
        } else {
          wx.chooseLocation({
            success: (res) => {
              console.log(res);
              this.setData({
                location: res.name
              })
            }
          })
        }
      }
    })
  },
  formSubmit: function (e) {
    console.log(e);
    var now = new Date();
    var month = now.getMonth();
    var date = now.getDate();
    this.setData({
      blog: e.detail.value.blog,
      month: month,
      date: date,
      show: false
    })
  },
  previewImg: function () {
    wx.previewImage({
      urls: this.data.temPath,
      success: (res) => {
        console.log(res)
      }
    })
  },
  saveImg: function () {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.picUrl,
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  }
})