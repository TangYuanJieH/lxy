// pages/progress/progress.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
		orderId:'',
    progressinfo: [],
		count:0,
		curr:0
  },

	// 预览图片
	previewImg(e){
		var that = this
		var index = e.currentTarget.dataset.n
		wx.previewImage({
			urls: [that.data.progressinfo[index].infoimg],
		})
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
		var that = this
		this.setData({
			orderId: options.orderId
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
		wx.showLoading({
			title: '加载中',
		})
		var that = this
		wx.request({
			url: app.globalData.url + 'order/process?orderId=' + that.data.orderId + '&size=' + 7 + '&curr=' + that.data.curr,
			success(res) {
				var progressinfo=[]
				var info = res.data.data
				for (var i = 0; i < info.length; i++) {
					var myInfo = {
						date: info[i].date,
						info: info[i].message,
						infoimg: "http://" + info[i].photo
					}
					progressinfo.push(myInfo)
				}
				that.setData({
					progressinfo:progressinfo,
					count: res.data.count
				})
				wx.hideLoading();
			}
		})
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
		this.setData({
			progressinfo: [],
			count: 0,
			curr: 0
		})
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
		var that = this
		if (that.data.progressinfo.length < that.data.count){
			that.setData({
				curr: ++that.data.curr
			})
			wx.request({
				url: app.globalData.url + 'order/process?orderId=' + that.data.orderId + '&size=' + 7 + '&curr=' + that.data.curr,
				success(res) {
					var info = res.data.data
					for (var i = 0; i < info.length; i++) {
						var myInfo = {
							date: info[i].date,
							info: info[i].message,
							infoimg: "http://" + info[i].photo
						}
						that.data.progressinfo.push(myInfo)
					}
					that.setData({
						progressinfo: that.data.progressinfo,
					})
				}
			})
		}
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})