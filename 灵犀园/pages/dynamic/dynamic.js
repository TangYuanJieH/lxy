// pages/dynamic/dynamic.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [],
    showDialog: '',
    puanduan: false,
		// showZyDialog:true,
		showZyDialog:false,
		curr:0,
		count:0
  },
  // 点击成功
  chenggong: function(e) {
		var that = this
		var index = e.target.dataset.n
    wx.showModal({
      title: '提示',
      content: '确定客户接受邀约吗？',
      success(res) {
        if (res.confirm) {
					wx.request({
						url: app.globalData.url + 'order/receive?id=' + that.data.info[index].id,
					})
					var str = "info[" + index + "].panduan"
					that.setData({
						[str]: '1',
						index: index
					})
        }
      }
    })
  },

	// 点击进入邀请者用户详情
	toreqInfo(e){
		var that = this
		var index = e.currentTarget.dataset.n
		wx.request({
			url: app.globalData.url + 'user/findById?id=' + that.data.info[index].name1Id,
			success(res){
				var info = res.data.data.user
				if (info.parentId==null){
					that.setData({
						zy:{
							name: info.username,
							phone: info.phone,
							photo:'http://' +info.photo
						},
						showZyDialog:true
					})
					
				}else{
					wx.navigateTo({
						url: '../userInfo/userInfo?id=' + that.data.info[index].name1Id,
					})
				}
			}
		})
	},
// 点击隐藏专员
	hiddenZy(){
		this.setData({
			showZyDialog:false
		})
	},

	// 点击进入被邀请的用户详情
	toresInfo(e){
		var that = this
		var index = e.currentTarget.dataset.n
		wx.navigateTo({
			url: '../userInfo/userInfo?id=' + that.data.info[index].name2Id,
		})
	},

  // 做跟进
  dofollow: function(e) {
		var index = e.currentTarget.dataset.n
    this.setData({
      showDialog: true,
			gjindex:index
    })
  },
  // 取消提交
  abandon() {
    this.setData({
      showDialog: false,
      puanduan: false
    })
  },
  // 点击婉拒
  error(e) {
    var that = this
		var index = e.currentTarget.dataset.n
    wx.showModal({
      title: '提示',
      content: '确定客户婉拒邀约吗？',
      success(res) {
        if (res.confirm) {
					wx.request({
						url: app.globalData.url + 'order/refuse?id=' + that.data.info[index].id
					})
          that.data.info.splice(e.target.dataset.n, 1)
          that.setData({
            info: that.data.info
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
	
  },


  // 提交跟进信息
  formSubmit(e) {
    var that = this
    wx.uploadFile({
			url: app.globalData.url + 'order/Process/add',
      filePath: that.data.url,
      name: 'file',
      formData: {
        'message': e.detail.value.followUp,
        'orderId': that.data.info[that.data.gjindex].id
      },
      success() {

      },
			fail(){
				wx.showToast({
					title: '必须添加图片，请重新编辑',
				})
			}
    })
		that.data.info[that.data.gjindex].num = that.data.info[that.data.gjindex].num + 1
		that.setData({
			info: that.data.info,
			showDialog: false,
			puanduan: false
		})
  },

  // 选择图片
  chooseImg() {
    var that = this
    wx.chooseImage({
      success: function(res) {
        var url = res.tempFilePaths
        that.setData({
          url: url[0],
          puanduan: true
        })
      },
    })
  },

	// 进去记录详情
	toProgress(e){
		var that = this
		var index = e.currentTarget.dataset.n
		wx.navigateTo({
			url: '../progress/progress?orderId=' + that.data.info[index].id,
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
		wx.showLoading({
			title: '加载中',
		})
		wx.request({
			url: app.globalData.url + 'order/find/orderInfoByParentId/' + app.globalData.userId + '/?size=' + 10 + '&curr=' + that.data.curr,
			success(res) {
				console.log(res)
				var myinfo = res.data.data.orderInfos
				var info = []
				for (var i = 0; i < myinfo.length; i++) {
					var order = {
						name1: myinfo[i].requesterName,
						name1Id: myinfo[i].requesterId,
						date: myinfo[i].date,
						name2: myinfo[i].responserName,
						name2Id: myinfo[i].responserId,
						num: myinfo[i].totalProcess,
						id: myinfo[i].orderId,
						panduan: myinfo[i].orderStatus
					}
					info.push(order)
				}
				that.setData({
					info: info,
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
			info:[],
			count:0,
			curr:0
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
		if (that.data.info.length < that.data.count){
			that.setData({
				curr: ++that.data.curr
			})
			wx.showLoading({
				title: '加载中',
			})
			wx.request({
				url: app.globalData.url + 'order/find/orderInfoByParentId?id=' + app.globalData.userId + '&size=' + 10 + '&curr=' + that.data.curr,
				success(res) {
					var myinfo = res.data.data.orderInfos
					for (var i = 0; i < myinfo.length; i++) {
						var order = {
							name1: myinfo[i].requesterName,
							name1Id: myinfo[i].requesterId,
							date: myinfo[i].date,
							name2: myinfo[i].responserName,
							name2Id: myinfo[i].responserId,
							num: myinfo[i].totalProcess,
							id: myinfo[i].orderId,
							panduan: myinfo[i].orderStatus
						}
						that.data.info.push(order)
					}
					that.setData({
						info: that.data.info,
					})
					wx.hideLoading();
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