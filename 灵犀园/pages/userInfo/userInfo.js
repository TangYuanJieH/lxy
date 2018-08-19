// pages/userInfo/userInfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   user:{},
	  zhuanyuan: '',
		selfIntro:'',
		expectation:'',
		userid:'',
		parentid:''
  },


// 邀请相识
	inviteeXS(e){
		var mydata = {
			requesterId : app.globalData.userId,
			responserId: this.data.userid,
			serverId:this.data.parentid
		}
		mydata = JSON.stringify(mydata)
		if(app.globalData.userId == ''){
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
			wx.request({
				method: "post",
				data: mydata,
				url: app.globalData.url + 'order/postOrder',
				success(res) {
					if(res.data.code=='200'){
						wx.showModal({
							title: '提示',
							content: '是否确定邀请相识',
							success(res) {
								if (res.confirm) {
									wx.showToast({
										title: '你的请求已发出',
									})
								}
							}
						})
					}else if(res.data.code =='4001'){
						wx.showModal({
							title: '提示',
							content: '你当前次数已用完'
						})
					}
				}
			})
		}
	
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		this.setData({
			userid:options.id
		})
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
		var that = this
		wx.showLoading({
			title: '加载中',
		})
		wx.request({
			url: app.globalData.url + 'user/findById?id=' + that.data.userid,
			success(res){
				var userinfo = res.data.data.user
				if(userinfo.sex=='0'){
					var sex = '男';
				}else if(userinfo.sex=='1'){
					var sex = '女'
				}
				that.setData({
					user:{
						head: 'http://'+userinfo.photo,
						head1: 'http://' + userinfo.photo + '-headImg',
						fp: 'http://' +userinfo.fp,
						fp1: 'http://' + userinfo.fp + '-album',
						sp: 'http://' +userinfo.sp,
						sp1: 'http://' + userinfo.sp + '-album',
						tp: 'http://' +userinfo.tp,
						tp1: 'http://' + userinfo.tp+ '-album',
						name: userinfo.username,
						sex: sex,
						age: userinfo.age,
						num: userinfo.id,
						constellation: userinfo.constellation,
						work: userinfo.job,
						date: res.data.data.days,
						invitee: userinfo.totalBeRequest,
						acquaintance: userinfo.totalContact,
					},
					zhuanyuan: res.data.data.serverName,
					selfIntro: userinfo.selfIntro,
					expectation: userinfo.expectation,
					parentid:userinfo.parentId
				})
				wx.hideLoading();
			}
		})
  },

	cilckImg1(e){
		var that = this
		wx.previewImage({
			current: that.data.user.head,
			urls: [that.data.user.head, that.data.user.fp, that.data.user.sp, that.data.user.tp]
		})
	},

	cilckImg2(e) {
		var that = this
		wx.previewImage({
			current: that.data.user.fp,
			urls: [that.data.user.head, that.data.user.fp, that.data.user.sp, that.data.user.tp]
		})
	},

	cilckImg3(e) {
		var that = this
		wx.previewImage({
			current: that.data.user.sp,
			urls: [that.data.user.head, that.data.user.fp, that.data.user.sp, that.data.user.tp]
		})
	},

	cilckImg4(e) {
		var that = this
		wx.previewImage({
			current: that.data.user.tp,
			urls: [that.data.user.head, that.data.user.fp, that.data.user.sp, that.data.user.tp]
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