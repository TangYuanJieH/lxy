// pages/addInfo2/addinfo2.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head: {
      img: '',
      panduan: true
    },
    frist: {
      img: '',
      panduan: true
    },
    second: {
      img: '',
      panduan: true
    },
    third: {
      img: '',
      panduan: true
    }
  },
// 头像图片
  addheadimg: function(e) {
    var url;
    var that = this
    wx.chooseImage({
      success: function(res) {
        url = res.tempFilePaths
        that.setData({
          head: {
            img: url[0],
            panduan: false
          }
        })
				wx.uploadFile({
					url: app.globalData.url + 'user/qiniu/uploadPhoto/' + that.data.id,
					filePath: url[0],
					name: 'file',
					header: {
						"Content-Type": "multipart/form-data"
					},
					success: function (res) {
						console.log("成功")
					}
				})
      },
    })
  },
// 第一张图
  addfristimg: function(e) {
    var url;
    var that = this
    wx.chooseImage({
      success: function(res) {
        url = res.tempFilePaths
        that.setData({
          frist: {
            img: url[0],
            panduan: false
          }
        })
				wx.uploadFile({
					url: app.globalData.url + 'user/qiniu/uploadFp/' + that.data.id,
					filePath: url[0],
					name: 'file',
					header: {
						"Content-Type": "multipart/form-data"
					},
					formData: {
						'userId': '100000'
					},
					success: function (res) {
						console.log("成功")
					}
				})
      },
    })
  },
// 第二张图
  addsecondimg: function(e) {
    var url;
    var that = this
    wx.chooseImage({
      success: function(res) {
        url = res.tempFilePaths
        that.setData({
          second: {
            img: url[0],
            panduan: false
          }
        })
				wx.uploadFile({
					url: app.globalData.url + 'user/qiniu/uploadSp/'+ that.data.id,
					filePath: url[0],
					name: 'file',
					header: {
						"Content-Type": "multipart/form-data"
					},
					formData: {
						'userId': '100000'
					},
					success: function (res) {
						console.log("成功")
					}
				})
      },
    })
  },
// 第三张图
  addthirdimg: function(e) {
    var url;
    var that = this
    wx.chooseImage({
      success: function(res) {
        url = res.tempFilePaths
        that.setData({
          third: {
            img: url[0],
            panduan: false
          }
        })
				wx.uploadFile({
					url: app.globalData.url + 'user/qiniu/uploadTp/' + that.data.id,
					filePath: url[0],
					name: 'file',
					header: {
						"Content-Type": "multipart/form-data"
					},
					formData: {
						'userId': '100000'
					},
					success: function (res) {
						console.log("成功")
					}
				})
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
		console.log(options)
		var id = options.id
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight,
          id: id
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
// 提交
  formSubmit: function(e) {
    var that = this
    var res = e.detail.value
		console.log(res)
		res.id = that.data.id
		res.status = 2
		console.log(res)
    wx.request({
      method: 'post',
      data: res,
			header:{
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			url: app.globalData.url + 'user/regEdit',
      success(res) {
				wx.showToast({
					title: '提交成功',
					duration:500
				})
				wx.switchTab({
					url: "../promanage/promanage"
				})
      }
    })
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})