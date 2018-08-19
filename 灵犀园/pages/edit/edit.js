// pages/addInfo/addinfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: ['选择性别', '男', '女'],
    sexIndex: 0,
    age: [],
    windowHeight: '',
    constellation: ['请选择星座', '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
    constellationIndex: 0,
    address: ''
  },
// 选择性别
  changeSex: function(e) {
    this.setData({
      sexIndex: e.detail.value
    })
  },
// 选择星座
  changeconstellation: function(e) {
    this.setData({
      constellationIndex: e.detail.value
    })
  },

  // 跳转添加2页面
  formSubmit: function(e) {
    var val = e.detail.value
    var sex = this.data.sexIndex - 1
    var constellation = this.data.constellation[this.data.constellationIndex]
    val.sex = sex;
    val.id = this.data.userId
    val.constellation = constellation;
    val.parentId = app.globalData.userId
    val.latitude = this.data.latitude
    val.longitude = this.data.longitude
    val.selfIntro = this.data.selfIntro
    val.expectation = this.data.expectation
    val.photo = this.data.photo
    val.fp = this.data.fp
    val.tp = this.data.tp
    val.sp = this.data.sp
		console.log(val)
    if (val.username != '' && val.constellation != "选择星座" && val.job != '' && val.age != '' && val.sex != -1 && val.location != '') {
      if (val.username.length > 4) {
        wx.showModal({
          title: '提示',
          content: '请输入4个字以内的姓名',
        })
      } else {
        val = JSON.stringify(val)
        wx.navigateTo({
          url: '../edit2/edit2?value=' + val,
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '用户信息不完整，请完善',
      })
    }

  },

	reminder(){
		wx.showToast({
			title: '此选项禁止修改',
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.setData({
      userId: options.id
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    })
  },

  openmap: function(e) {
    var that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              wx.chooseLocation()
            }
          })
        }
      }
    })
    wx.chooseLocation({
      success(res) {
        that.setData({
          address: res.address,
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
		var that = this
		wx.request({
			url: app.globalData.url + 'user/findById?id=' + that.data.userId,
			success(res) {
				var info = res.data.data.user
				that.setData({
					username: info.username,
					sexIndex: Number(info.sex) + 1,
					age: info.age,
					job: info.job,
					address: info.location,
					phone: info.phone,
					photo: "http://" + info.photo,
					fp: "http://" + info.fp,
					sp: "http://" + info.sp,
					tp: "http://" + info.tp,
					expectation: info.expectation,
					selfIntro: info.selfIntro,
					latitude: info.latitude,
					longitude: info.longitude
				})
				if (info.constellation == '白羊座') {
					that.setData({
						constellationIndex: 1
					})
				} else if (info.constellation == '金牛座') {
					that.setData({
						constellationIndex: 2
					})
				} else if (info.constellation == '双子座') {
					that.setData({
						constellationIndex: 3
					})
				} else if (info.constellation == '巨蟹座') {
					that.setData({
						constellationIndex: 4
					})
				} else if (info.constellation == '狮子座') {
					that.setData({
						constellationIndex: 5
					})
				} else if (info.constellation == '处女座') {
					that.setData({
						constellationIndex: 6
					})
				} else if (info.constellation == '天秤座') {
					that.setData({
						constellationIndex: 7
					})
				} else if (info.constellation == '天蝎座') {
					that.setData({
						constellationIndex: 8
					})
				} else if (info.constellation == '射手座') {
					that.setData({
						constellationIndex: 9
					})
				} else if (info.constellation == '摩羯座') {
					that.setData({
						constellationIndex: 10
					})
				} else if (info.constellation == '水瓶座') {
					that.setData({
						constellationIndex: 11
					})
				} else if (info.constellation == '双鱼座') {
					that.setData({
						constellationIndex: 12
					})
				}
			}
		})
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