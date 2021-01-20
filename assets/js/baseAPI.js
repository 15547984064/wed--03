///////////
// 测试接口
var baseAPI = 'http://api-breakingnews-web.itheima.net';
$.ajaxPrefilter(function(options){
    options.url = baseAPI + options.url
    // 身份认证
    if(options.url.indexOf('/my/' !== -1)){
        options. headers = {
                Authorization: localStorage.getItem('token') || ""
            }
    }
    // 3.拦截所有响应，判断身份认证信息
    // 全局统一挂载 complete 回调函数
  options.complete = function(res) {
    // console.log('执行了 complete 回调：')
    // console.log(res)
    // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 1. 强制清空 token
      localStorage.removeItem('token')
      // 2. 强制跳转到登录页面
      location.href = '/login.html'
    }
  }
})