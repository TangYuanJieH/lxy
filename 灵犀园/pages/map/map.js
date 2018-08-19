 // pages/map/map.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sex: ["所有单身", "单身男生", "单生女生"],
    sexindex: 0,
    ageindex: 0,
    age: ["所有年龄", "18-22岁", "23-26岁", "27-30岁", "31-35岁", "36-40岁", "40岁以上"],
    height: "",
    latitude: '',
    longitude: '',
    markers: [],
    filePath: '',
    controls: [{
      id: 1,
      iconPath: '../../images/address.png',
      position: {
        left: 25,
        top: 400,
        width: 38,
        height: 38
      },
      clickable: true
    }],
    user: {},
    showUser:false
  },
  // 选择性别
  changeSex: function(e) {
    this.setData({
      sexindex: e.detail.value
    })
    this.my()
  },
  // 选择年龄
  changeAge: function(e) {
    this.setData({
      ageindex: e.detail.value
    })
    this.my()
  },

  toUserInfo() {
    wx.navigateTo({
      url: '../userInfo/userInfo?id=' + this.data.user.id,
    })
  },

  cliclMap() {
    this.setData({
      showUser: false
    })
  },
  // 地图事件

  regionchange(e) {
    var that = this
    // this.mapCtx.getScale({
    //   success(res) {

    //   }
    // })
    if (e.type == "end") {
      that.mapCtx.getCenterLocation({
        success(res) {
          var address = {
            latitude: res.latitude,
            longitude: res.longitude
          }
          if (that.data.sexindex == 0) {
            var sex = ''
          } else {
            var sex = that.data.sexindex - 1
          }
          if (that.data.ageindex == 0) {
            var min = 0
            var max = 100
          } else if (that.data.ageindex == that.data.age.length - 1) {
            var min = 40
            var max = 100
          } else {
            var myage = that.data.age[that.data.ageindex]
            var min = myage.substring(0, 2)
            var max = myage.substring(3, 5)
          }
          wx.request({
            url: app.globalData.url + 'find/map/user?latitude=' + res.latitude + '&longitude=' + res.longitude + '&sex=' + sex + '&minAge=' + min + '&maxAge=' + max,
            success(res) {
              var mymarker = []
              for (var i = 0; i < res.data.data.users.length; i++) {
                if (res.data.data.users[i].sex == '0') {
                  var user = {
                    id: res.data.data.users[i].id,
                    iconPath: '../../images/man.png',
                    latitude: res.data.data.users[i].latitude,
                    longitude: res.data.data.users[i].longitude,
                    width: 50,
                    height: 50
                  }
                } else if (res.data.data.users[i].sex == '1') {
                  var user = {
                    id: res.data.data.users[i].id,
                    iconPath: '../../images/woman.png',
                    latitude: res.data.data.users[i].latitude,
                    longitude: res.data.data.users[i].longitude,
                    width: 50,
                    height: 50
                  }
                }
                mymarker[i] = user
              }
              that.setData({
                markers: mymarker
              })
            }
          })
        }
      })
    }
  },

  my(e) {
    var that = this
    that.mapCtx.getCenterLocation({
      success(res) {
        var address = {
          latitude: res.latitude,
          longitude: res.longitude
        }
        if (that.data.sexindex == 0) {
          var sex = ''
        } else {
          var sex = that.data.sexindex - 1
        }
        if (that.data.ageindex == 0) {
          var min = 0
          var max = 100
        } else if (that.data.ageindex == that.data.age.length - 1) {
          var min = 40
          var max = 100
        } else {
          var myage = that.data.age[that.data.ageindex]
          var min = myage.substring(0, 2)
          var max = myage.substring(3, 5)
        }
        wx.request({
          url: app.globalData.url + 'find/map/user?latitude=' + res.latitude + '&longitude=' + res.longitude + '&sex=' + sex + '&minAge=' + min + '&maxAge=' + max,
          success(res) {
            var mymarker = []
            for (var i = 0; i < res.data.data.users.length; i++) {
              if (res.data.data.users[i].sex == '0') {
                var user = {
                  id: res.data.data.users[i].id,
                  iconPath: '../../images/man.png',
                  latitude: res.data.data.users[i].latitude,
                  longitude: res.data.data.users[i].longitude,
                  width: 50,
                  height: 50
                }
              } else if (res.data.data.users[i].sex == '1') {
                var user = {
                  id: res.data.data.users[i].id,
                  iconPath: '../../images/woman.png',
                  latitude: res.data.data.users[i].latitude,
                  longitude: res.data.data.users[i].longitude,
                  width: 50,
                  height: 50
                }
              }
              mymarker[i] = user
            }
            that.setData({
              markers: mymarker
            })
          }
        })
      }
    })
  },

  controltap(e) {
    var that = this;
    wx.getLocation({
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude: latitude, //纬度 
          longitude: longitude, //经度 
        })
      }
    })
  },

  markertap(e) {
    var that = this
    wx.request({
      url: app.globalData.url + 'user/findById?id=' + e.markerId,
      success(res) {
        var userinfo = res.data.data.user
        that.setData({
          user: {
						map: 'http://' + userinfo.photo + '-headImg',
            name: userinfo.username,
            age: userinfo.age,
            job: userinfo.job,
            date: res.data.data.days,
            invitee: userinfo.totalBeRequest,
						acquaintance: userinfo.totalContact,
            id: userinfo.id
          }
        })
      }
    })
	
    this.setData({
      showUser: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height: res.windowHeight,
        })
      }
    })
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              wx.getLocation();
            }
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this
    wx.getLocation({
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude: latitude, //纬度 
          longitude: longitude, //经度 
        })
      }
    })
    this.mapCtx = wx.createMapContext('map')
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