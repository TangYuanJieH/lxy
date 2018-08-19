// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

	formSubmit:function(e){
		var val = e.detail.value
		val = JSON.stringify(val)
		wx.request({
			method:'post',
			url: app.globalData.url +'login',
			data: val,
			header:{
				'content-type':'application/json'
			},
			success:function(res){
				var statusCode = res.data.code
				var user = res.data.data
				if (statusCode=='2000'){
					wx.switchTab({
						url: '../promanage/promanage',
					})
					app.globalData.userId=user.userId
					app.globalData.userPhone=user.phone
					app.globalData.loginState=true
					wx.setStorageSync('id', user.userId)
					wx.setStorageSync('State', true)
					wx.setStorageSync('phone', user.phone)
				} else if (statusCode ==4000){
					wx.showModal({
						title: '提示',
						content: '你输入的账号或密码不正确，请从新输入',
					})
				} else if (statusCode == 4001) {
					wx.showModal({
						title: '提示',
						content: '用户被冻结，请联系客服解冻后登陆',
					})
				} else if (statusCode == 4002) {
					wx.showModal({
						title: '提示',
						content: '用户正在审核中，无法登陆',
					})
				} else if (statusCode == 4003) {
					wx.showModal({
						title: '提示',
						content: '用户资料未完善，请完善后登陆',
					})
				}
				else if(statusCode == 4004){
					wx.showModal({
						title: '提示',
						content: '你输入的账号或密码不正确，请重新输入',
					})
				}
				
			}
		})
		
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