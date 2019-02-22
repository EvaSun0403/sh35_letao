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

