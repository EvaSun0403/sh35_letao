$(function () {
    var currentPage = 1;
    var pageSize = 5;

    render();
    function render() {
        //1.发送ajax 获取用户信息，动态的渲染用户列表
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlstr = template('userTpl', info);
                $('tbody').html(htmlstr);
                //分页功能
                $('#pagintor').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(info.total / info.size),
                    // 点击事件
                    onPageClicked: function (a, b, c, page) {
                        //当前点击的页码
                        // console.log(page);
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

    //点击按钮，改变用户状态和按钮状态
    $('tbody').on('click','.btn',function(){
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data: {
                id: $(this).parent().data('id'),
                // 有btn-danger类名，说明是正常状态，需要改成禁用0，否则1
                isDelete: $(this).hasClass('btn-danger') ? '0' : '1'
            },
            dataType:'json',
            success:function(info){
                // console.log(info);
                render();
            }
        })
    })


})