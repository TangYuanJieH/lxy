// pages/promanage/promanage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
		user: '',
		afterLogin: ''
  },

	tologin:function(){
		wx.navigateTo({
			url: '../login/login',
		})
	},
// 跳转用户添加
	toadd: function () {
		if (app.globalData.userId==''){
			wx.showModal({
				title: '提示',
				content: '请登录',
				success(res){
					if(res.confirm){
						wx.navigateTo({
							url: '../login/login',
						})
					}
				}
			})
		}else{
			wx.navigateTo({
				url: '../addInfo/addinfo',
			})
		}
	
	},
// 跳转客户管理
	topro: function () {
		if (app.globalData.userId == '') {
			wx.showModal({
				title: '提示',
				content: '请登录',
				success(res) {
					if (res.confirm) {
						wx.navigateTo({
							url: '../login/login',
						})
					}
				}
			})
		}else {
			wx.navigateTo({
				url: '../audit/audit',
			})
		}
	
	},
// 跳转服务
	toserve(){
		if (app.globalData.userId == '') {
			wx.showModal({
				title: '提示',
				content: '请登录',
				success(res) {
					if (res.confirm) {
						wx.navigateTo({
							url: '../login/login',
						})
					}
				}
			})
		} else {
			wx.navigateTo({
				url: '../dynamic/dynamic',
			})
		}
	
	},

	toperformance(){
		if (app.globalData.userId == ''){
			wx.showModal({
				title: '提示',
				content: '请登录',
				success(res) {
					if (res.confirm) {
						wx.navigateTo({
							url: '../login/login',
						})
					}
				}
			})
		}else{
			wx.navigateTo({
				url: '../performance/performance'
			})
		}
	},
// 点击注销
	quit(){
		this.setData({
			afterLogin:false
		})
		wx.removeStorageSync('id')
		wx.removeStorageSync('State')
		wx.removeStorageSync('phone')
		app.globalData.userId=''
		app.globalData.userPhone = ''
		app.globalData.loginState = ''

	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
		
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
		this.setData({
			user: app.globalData.userPhone,
			afterLogin: app.globalData.loginState
		})
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})