$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 校验规则
    var form = layui.form
    form.verify({
        // 自定义pwd规则
        pwd: [/^\S{6,12}$/, '密码必须6到12位,且不能出现空格'],
        //校验俩次密码是否一致
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '俩次密码不一致'
            }
        }
    })
    //监听表单提交事件
    var layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        // 1.阻止默认提交行为
        e.preventDefault()
        // 2.发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log('参观参观参观过');
                layer.msg('注册成功，请登录！')
                // 模拟人的点击行为
                $('#link_login').click()
            }
        })
    })
    // 监听登录
    $('#form_login').submit(function (e) {
        // 1.阻止默认提交行为
        e.preventDefault()
        // 2.?
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败！')
                }
                layer.msg('登陆成功！')
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }

        })
    })
})