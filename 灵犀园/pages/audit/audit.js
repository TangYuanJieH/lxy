// pages/audit/audit.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
		users: [],
		page:0,
		count:0
  },

	edit(e){
		var that = this
		var index = e.currentTarget.dataset.n
		if (that.data.users[index].status =='3'){
			wx.navigateTo({
				url: '../addInfo2/addinfo2?id=' + that.data.users[index].id,
			})
		}else if(that.data.users[index].status == '0') {
			wx.navigateTo({
				url: '../updata/updata?id=' + that.data.users[index].id,
			})
		}else if(that.data.users[index].status=='2'){
			wx.showToast({
				icon:'waiting',
				title: '用户审核中',
			})
		}else if(that.data.users[index].status=='1'){
			wx.showToast({
				icon:'none',
				title: '用户已被禁用',
			})
		}
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
			url: app.globalData.url + 'user/findChild?id=' + app.globalData.userId + '&size=' + 10 + '&curr=' + that.data.page,
			success(res) {
				var userInfo = res.data.data.users
				var myinfo = []
				for (var i = 0; i < userInfo.length; i++) {
					var user = {}
					user.id = userInfo[i].id
					user.photo = "http://" + userInfo[i].photo
					user.name = userInfo[i].username
					user.age = userInfo[i].age
					user.invitee = userInfo[i].totalBeRequest
					user.work = userInfo[i].job
					user.constellation = userInfo[i].constellation
					user.acquaintance = userInfo[i].totalContact
					user.status = userInfo[i].status
					if (userInfo[i].status == "3") {
						user.date = '编辑中'
					} else if (userInfo[i].status == "2") {
						user.date = '审核中'
					} else if (userInfo[i].status == "1") {
						user.date = '禁用'
					} else if (userInfo[i].status == "0") {
						user.date = userInfo[i].days + '天'
					}
					myinfo.push(user)
				}
				that.setData({
					users: myinfo,
					count: res.data.data.count
				})
				wx.hideLoading()
			}
		})
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
		this.setData({
			users: [],
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
		if (that.data.users.length < that.data.count){
			that.setData({
				page: ++that.data.page
			})
			wx.request({
				url: app.globalData.url + 'user/findChild?id=' + app.globalData.userId + '&size=' + 10+ '&curr=' + that.data.page,
				success(res) {
					var userInfo = res.data.data.users
					for (var i = 0; i < userInfo.length; i++) {
						var user = {}
						user.id = userInfo[i].id
						user.photo = "http://" + userInfo[i].photo
						user.name = userInfo[i].username
						user.age = userInfo[i].age
						user.invitee = userInfo[i].totalBeRequest
						user.work = userInfo[i].job
						user.constellation = userInfo[i].constellation
						user.acquaintance = userInfo[i].totalContact
						user.status = userInfo[i].status
						if (userInfo[i].status == "3") {
							user.date = '编辑中'
						} else if (userInfo[i].status == "2") {
							user.date = '审核中'
						} else if (userInfo[i].status == "1") {
							user.date = '禁用'
						} else if (userInfo[i].status == "0") {
							user.date = userInfo[i].days + '天'
						}
						that.data.users.push(user)
					}
					that.setData({
						users: that.data.users
					})
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