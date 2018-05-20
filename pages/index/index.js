// pages/index/index.js
import common from '../../utils/common.js'
import bleComm from '../../utils/bleComm.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bluetooth:''
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
    wx.showLoading({
      title: '连接蓝牙设备',
      mask: true
    })
    bleComm.connectDevice().then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '连接成功',
        icon: 'success',
        duration: 500
      })
      wx.redirectTo({
        url: '../map/map',
      })
    }
    )
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