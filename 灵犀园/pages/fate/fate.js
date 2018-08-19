// pages/fate/fate.js
const app =getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
		fate:[],
		page:0,
		count:0
  },
// 跳转进展详情
	toprogress(e) {
		var that = this
		var myindex = e.currentTarget.dataset.n
		wx.navigateTo({
			url: '../progress/progress?orderId=' + that.data.fate[myindex].orderId,
		})
	},
// 点击邀请者头像
	inviteInfo(e){
		var that = this
		var index = e.currentTarget.dataset.n
		wx.request({
			url: app.globalData.url + 'user/findById?id=' + that.data.fate[index].invite.id,
			success(res){
				var myXQ = res.data.data.user.parentId
				if (myXQ == null){
					wx.showModal({
						title: '提示',
						content: '你选择的用户为专员',
					})
				}else{
					wx.navigateTo({
						url: '../userInfo/userInfo?id=' + that.data.fate[index].invite.id
					})
				}
			}
		})
	},
// 点击被邀请者的头像
	invitedInfo(e){
		var that = this
		var index = e.currentTarget.dataset.n
		wx.navigateTo({
			url: '../userInfo/userInfo?id=' + that.data.fate[index].invited.id
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
		wx.showLoading({
			title: '加载中',
		})
		var that = this
		wx.request({
			url: app.globalData.url + 'order/find/order/info?size=' + 7 + '&curr=' + that.data.page,
			success(res) {
				var info = res.data.data.data
				var fate = []
				for (var i = 0; i < info.length; i++) {
					var myinfo = {
						orderId: info[i].orderId,
						date: info[i].operateDate,
						invite: { name: info[i].requesterName, head: "http://" + info[i].requesterPhoto + '-headImg', id: info[i].requesterId },
						invited: { name: info[i].responserName, head: "http://" + info[i].resonserPhoto + '-headImg', id: info[i].responserId + '-headImg' },
						num: info[i].totalProcess
					}
					fate.push(myinfo)
				}
				that.setData({
					fate:fate,
					count: res.data.count,
				})
				wx.hideLoading();
			}
		})
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
		this.setData({
			fate: [],
			page: 0,
			count: 0
		})
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
		var that = this
		if (that.data.fate.length < that.data.count){
			that.setData({
				page: ++that.data.page
			})
			wx.showLoading({
				title: '加载中',
			})
			var that = this
			wx.request({
				url: app.globalData.url + 'order/find/order/info?size=' + 7 + '&curr=' + that.data.page,
				success(res) {
					var info = res.data.data.data
					for (var i = 0; i < info.length; i++) {
						var myinfo = {
							orderId: info[i].orderId,
							date: info[i].operateDate,
							invite: { name: info[i].requesterName, head: "http://" + info[i].requesterPhoto + '-headImg', id: info[i].requesterId },
							invited: { name: info[i].responserName, head: "http://" + info[i].resonserPhoto + '-headImg', id: info[i].responserId + '-headImg' },
							num: info[i].totalProcess
						}
						that.data.fate.push(myinfo)
					}
					that.setData({
						fate: that.data.fate
					})
					wx.hideLoading();
				}
			})
		}
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})