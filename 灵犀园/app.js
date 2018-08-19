//app.js
App({

	/**
	 * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
	 */
	onLaunch: function () {
		
	},

	/**
	 * 当小程序启动，或从后台进入前台显示，会触发 onShow
	 */
	onShow: function (options) {
		var id = wx.getStorageSync('id')
		var State = wx.getStorageSync('State')
		var phone = wx.getStorageSync('phone')
	},

	/**
	 * 当小程序从前台进入后台，会触发 onHide
	 */
	onHide: function () {
		
	},

	/**
	 * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
	 */
	onError: function (msg) {
		
	},
	
	globalData:{
		url:'https://lxy.comelove.cn/',
		// url:'http://192.168.0.115:444/',
		userId: wx.getStorageSync('id'),
		userPhone: wx.getStorageSync('phone'),
		loginState:wx.getStorageSync('State')
	}
})
