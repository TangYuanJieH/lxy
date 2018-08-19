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
    constellation: ['选择星座', '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
    constellationIndex: 0,
    address: ''
  },

  changeSex: function(e) {
    this.setData({
      sexIndex: e.detail.value
    })
  },

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
		val.status= 3;
    val.constellation = constellation;
    val.parentId = app.globalData.userId
    val.latitude = this.data.latitude
    val.longitude = this.data.longitude
		console.log(val)
    if (val.username != '' && val.constellation != "选择星座" && val.job != '' && val.age != '' && val.phone != '' && val.sex != -1 && val.location != '' && val.password != '') {
			if(val.username.length>4){
				wx.showModal({
					title: '提示',
					content: '请输入4个字以内的姓名',
				})
			}else{
				var szreg = /^[1-9][0-9]$/
				if (szreg.test(val.age)){
					var regexp = /^1\d{10}$/
					if (regexp.test(val.phone)) {
						val = JSON.stringify(val)
						wx.request({
							method: 'post',
							data: val,
							header: {
								'content-type': 'application/json;charset=utf-8'
							},
							url: app.globalData.url + 'user/reg',
							success: function (res) {
								if (res.data.code == 4008) {
									wx.showModal({
										title: '提示',
										content: res.data.msg,
									})
								} else if (res.data.code == 200) {
									wx.navigateTo({
										url: '../addInfo2/addinfo2?id=' + res.data.data.user.id,
									})
								} else if (res.data.code == 400) {
									wx.showModal({
										title: '提示',
										content: res.data.msg,
									})
								}
							}
						})
					} else {
						wx.showModal({
							title: '提示',
							content: '请输入正确的电话号码',
						})
					}
				}else{
					wx.showModal({
						title: '提示',
						content: '年龄必须为两位数数字',
					})
				}
			}
    }else{
			wx.showModal({
				title: '提示',
				content: '用户信息不完整，请完善',
			})
		}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
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