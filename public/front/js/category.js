
$(function(){
    //1.获取数据，动态渲染左侧列表
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        dataType:'json',
        success:function(info){
            console.log(info);
            var htmlStr = template('leftTpl',info);
            $('.lt_left ul').html(htmlStr);
            renderById(info.rows[0].id);
        }
    })

    //2.左侧点击事件
    //2-1 current类
    $('.lt_left ul').on('click','a',function(){
        $('.lt_left a').removeClass('current');
        $(this).addClass('current');
        var id = $(this).data('index');
        renderById(id);
    })


    function renderById(id){
        //2-2 获取被点击的a的id 发送ajax 动态渲染右侧
       $.ajax({
        type:'get',
        url:'/category/querySecondCategory',
        data:{
            id:id
        },
        dataType:'json',
        success:function(info){
            // console.log(info);
            var htmlStr = template('rightTpl',info);
            $('.lt_right ul').html(htmlStr);
            
        }
    })
    }


})