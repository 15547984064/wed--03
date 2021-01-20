$(function () {
    getUserInfo()
    // 绑定退出事件
    var layer = layui.layer
    $("#btnLogout").on('click', function () {
        //eg1
        layer.confirm('是否确定退出？', { icon: 3, title: '提示' }, function (index) {
          localStorage.removeItem("token");
          location.href = "/login.html";
          

            layer.close(index);
        });
    })
})
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败！')
            }
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user) {
    //1.获取用户名称
    var name = user.nickname || user.username;
    $('#welcome').html("欢迎&nbsp;&nbsp;" + name);
    // 2.渲染头像
    if (user.user_pic !== null) {
        // 有头像
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $('.text-avatar').hide();
        //无头像
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase();
        $('.text-avatar').show().html(text);

    }



}