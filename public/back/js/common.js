//进度条，需要在开始发送ajax时，开启进度条，在全部ajax结束时，关闭进度条；

$(document).ajaxStart(function () {
    //开启进度条
    NProgress.start();
})

$(document).ajaxStop(function () {
    //关闭进度条 用延时器模拟速度
    setTimeout(function () {
        NProgress.done();
    }, 500);
})



//等dom结构加载完成后，执行
$(function () {
    //二级菜单的显示与隐藏；
    $('.lt_aside .category').click(function () {
        console.log(1111);
        // $(this).next().slideToggle();
        $(this).next().stop().slideToggle();
        // $(this).next().show();
    })

    //隐藏侧边栏 
    $('.icon_menu').click(function () {
        $('.lt_aside').toggleClass('hidemenu');
        $('.lt_main').toggleClass('hidemenu');
        $('.lt_topbar').toggleClass('hidemenu');
    })

    //退出功能
    $('.icon_logout').click(function () {
        // console.log(1111);

        //1.显示模态框
        $('#logoutModal').modal('show');
    })

    $('.logoutBtn').click(function () {
        //2.发送ajax,销毁登录状态
        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                //退出登录
                location.href = 'login.html'

            }
        })
    })
})
