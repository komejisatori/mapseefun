// pages/map/map.js
import common from '../../utils/common.js'
import bleComm from '../../utils/bleComm.js'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    button1:false,
    button2:false,
    button3:false,
    findurl:'',
    findname:'',
    showShortModal:false,
    showRankModal:false,
    showIconModal:false,
    opennum:0,
    energynum:200,
    currentNum: 0,
    showModal: false,
    questionlist:'',
    question:'',
    currentName: '',
    answerlist:'',
    answer:'',
    tipslist:'',
    tips:'',
    current_step:0,
    next:'下一题',
    correctlist:'',
    correct:'',
    buttonHidden:true,
    abletoclick:true,
    urllist:'',
    url:'',
    score:0
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
    wx.onBLECharacteristicValueChange((characteristic) => {
      var news = common.arrayBufferToString(characteristic.value)
      console.log(typeof(news))
      if (news == 809){
          this.setData({
            button1:true,
            showShortModal:true,
            findname:'animal1',
            findurl:'../../src/img/animal1.png'
          })
      }
      if (news == 749){
          this.setData({
            button2:true,
            showShortModal: true,
            findname: 'animal2',
            findurl: '../../src/img/animal2.png'
          })
      }
      if (news == 879){
          this.setData({
            button3:true,
            showShortModal: true,
            findname: 'animal3',
            findurl: '../../src/img/animal3.png'
          })
          console.log('in')
      }
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
  
  },
  // 自定义函数
  openrank:function(){
    this.setData({
      showRankModal:true
    })
  },
  openmenu:function(){
    this.setData({
      showIconModal:true
    })
  },
  skipNext:function(){
    this.setData({
      current_step: this.data.current_step + 1,
    })
    
    if (this.data.current_step < 3) {
      this.setData({
        question: this.data.questionlist[this.data.current_step],
        answer: this.data.answerlist[this.data.current_step],
        buttonHidden: true,
        tips:''
      })
    }
    else {
      this.setData({
        question: '这是最后一道题了',
        answer: null,
        tips: "你完成了全部测试，恭喜！",
        buttonHidden: true,
        current_step: 2
      })
    }
  },
  changeQuestion: function(){
    this.setData({
      abletoclick:true,
      current_step: this.data.current_step + 1,
      score: app.globalData.scores[this.data.currentNum]
    })

    if (this.data.current_step < 3) {
      this.setData({
        url: this.data.urllist[this.data.current_step],
        question: this.data.questionlist[this.data.current_step],
        answer: this.data.answerlist[this.data.current_step],
      })
    }
    else {
      this.setData({
        question: '这是最后一道题了',
        answer: null,
        tips: "你完成了全部测试，恭喜！",
        current_step: 2
      })
    }
  },
  doAnswer:function(e){
    if(this.data.abletoclick){
      var your_answer = parseInt(e.target.id)
      console.log(your_answer)
      if(your_answer == this.data.correctlist[this.data.current_step]){
        app.globalData.scores[this.data.currentNum] += 100
        var self = this
        this.setData({
          question:"答对了，你的动物进化了！",
          abletoclick:false
        })
        setTimeout(function(){self.changeQuestion()},1000)
      }
      else{
        this.setData({
          answer:'',
          tips:this.data.tipslist[this.data.current_step],
          buttonHidden:false
        })
      }
    }
  },
  openAnimal: function(e){
    switch(e.target.id){
      case '1':
        this.setData({
          currentNum: 0
        })
        this.setData({
          currentName: app.globalData.animalname[this.data.currentNum],
          questionlist: app.globalData.question_1,
          answerlist:app.globalData.answer_1,
          correctlist:app.globalData.correct_1,
          question: app.globalData.question_1[this.data.current_step],
          answer: app.globalData.answer_1[this.data.current_step],
          tipslist: app.globalData.tips_1,
          urllist: app.globalData.pic_1,
          url: app.globalData.pic_1[this.data.current_step],
          score: app.globalData.scores[this.data.currentNum]
        })
        break;
      case '2':
        this.setData({
          currentNum: 1
        })
        this.setData({
          currentName: app.globalData.animalname[this.data.currentNum],
          questionlist: app.globalData.question_2,
          answerlist: app.globalData.answer_2,
          correctlist: app.globalData.correct_2,
          question: app.globalData.question_2[this.data.current_step],
          answer: app.globalData.answer_2[this.data.current_step],
          tipslist: app.globalData.tips_2,
          urllist: app.globalData.pic_2,
          url: app.globalData.pic_2[this.data.current_step],
          score: app.globalData.scores[this.data.currentNum]
        })
        break;
      case '3':
        this.setData({
          currentNum: 2
        })
        this.setData({
          currentName: app.globalData.animalname[this.data.currentNum],
          questionlist: app.globalData.question_3,
          answerlist: app.globalData.answer_3,
          correctlist: app.globalData.correct_3,
          question: app.globalData.question_3[this.data.current_step],
          answer: app.globalData.answer_3[this.data.current_step],
          tipslist: app.globalData.tips_3,
          urllist: app.globalData.pic_3,
          url: app.globalData.pic_3[this.data.current_step],
          score: app.globalData.scores[this.data.currentNum]
        })
        break;
        break;
      default:
        break;
    }
    this.setData({
      showModal: true
    })
  },
  preventTouchMove:function(e){

  },
  hideModal:function(){
    this.setData({
      showModal: false
    })
    this.setData({
      current_step: 0,
      tips:''
    })
  },
  hideModal_2:function(){
    this.setData({
      showIconModal:false
    })
  },
  hideModal_3:function(){
    this.setData({
      showRankModal:false
    })
  },
  hideModal_4:function(){
    this.setData({
      showShortModal:false
    })
  }
})
