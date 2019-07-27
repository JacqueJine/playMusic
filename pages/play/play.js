// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: '',//所有数据
    nowindex: 0,//当前数据
    songn:[],//歌曲名字
  },
  //输入文字
  getword(e){
    let word=this.data.list[this.data.nowindex].keyword[e.target.id];
    for(let i=0;i<this.data.list[this.data.nowindex].songname.length;i++){
      if(this.data.songn[i]==''){
        this.data.songn[i]=word;
        break;
      }
    }
    this.setData({
      songn:this.data.songn,
    });
    //判断是否闯关成功
    //判断用户是否输入完
    if(this.data.songn.join('').length==this.data.list[this.data.nowindex].songname.length){
      if(this.data.list[this.data.nowindex].songname==this.data.songn.join('')){
        wx.showModal({
          title: '提示',
          content: '闯关成功',
          showCancel:false,
          success: (res)=> {
            if (res.confirm) {  
              //判断是否最后一曲
              if(this.data.nowindex==this.data.list.length-1){
                wx.redirectTo({
                  url:'./../win/win'
                });
              }else{
                this.data.nowindex+=1;
                this.setData({
                  nowindex:this.data.nowindex,
                  songn:[],
                });
                this.info();
              }
              
            } 
          }
        })
      }else{
        wx.showToast({
          title: '答案有所误差',
          image:'./../../image/error.png',
          duration: 2000
        })
      }
    }
  },

  //清除文字
  clearword(e){
    this.data.songn[e.target.id]='';
    this.setData({
      songn:this.data.songn,
    });
  },
  //获取数据
  info(){
    wx.request({
      url: 'https://www.easy-mock.com/mock/5d36ba467981b54db1e89175/music/get_music',
      success: (res) => {
        //songn
        for(let i=0;i<res.data.data[this.data.nowindex].songname.length;i++){
          this.data.songn.push('');
        }
        this.setData({
          list: res.data.data,
          songn:this.data.songn,
        });
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'first',
      success: (res) => {
        this.info();
      },
      fail(res) {
        wx.redirectTo({
          url: './../guide/guide',
        });
      }
    });

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