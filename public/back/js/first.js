
$(function () {
    //1.渲染页面
    var currentPage = 1;
    var pageSize = 5;

    render();
    function render() {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlstr = template('cagetoryTpl', info);
                $('tbody').html(htmlstr);

                // $('#paginator').bootstrapPaginator({
                //分页功能
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(info.total/info.size),
                    onPageClicked: function( a,b,c,page){
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

    //2.点击添加按钮，展示模态框；发送ajax,修改数据;
    $('#addBtn').on('click', function () {
        $('#addModal').modal('show');
    })

    //3.添加校验
    $('#form').bootstrapValidator({
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3.指定校验字段
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:'请输入一级分类名'
                    }
                }
            }
        }
    })

    //4.注册表单验证成功事件
    $('#form').on('success.form.bv',function(e){
        e.preventDefault();
        $('#addCategory').on('click', function () {
            $.ajax({
                type: 'post',
                url: '/category/addTopCategory',
                data: $('#form').serialize(),
                dataType: 'json',
                success: function (info) {
                    // console.log(info);
                    currentPage = 1;
                    render();

                    $('#addModal').modal('hide');
                }
            })
        })
    })

})