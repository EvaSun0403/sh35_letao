
$(function () {
    var currentPage = 1;
    var pageSize = 5;

    render();
    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);

                var htmlstr = template('secondTpl', info);
                $('tbody').html(htmlstr);

                // 分页插件
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

    //2.点击添加按钮 模态框显示
    $('#addBtn').on('click', function () {
        $('#addModal').modal('show');
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (info) {
                var htmlstr = template('categoryTpl', info);
                $('#category').html(htmlstr);
            }
        })
    })

    //3.点击下拉框事件
    $('.dropdown-menu').on('click', 'a', function () {
        var txt = $(this).text();
        // console.log(txt);
        $('#dropdownText').text(txt);
        var id = $(this).data('id');
        //把选择的分类名id  赋值给隐藏域
        $('[name="categoryId"]').val(id);
        //需要手动更改 校验状态
        $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
    })

    //4.上传图片
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            // console.log(e);   
            // console.log(data);
            // console.log(data.result.picAddr);
            var src = data.result.picAddr;
            $('#picImg').attr('src', src);
            //把图片地址设置给隐藏域
            $('[name="brandLogo"]').val(src);
            //手动更改 校验状态
            $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
        }

    })

    //5.配置表单校验
    $('#form').bootstrapValidator({
        //让隐藏域也校验
        excluded: [],
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:'请选择一级分类'
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:'请输入二级分类名称'
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:'请上传图片'
                    }
                }
            }
        }
    });



    //6.点击模态框右下角的 添加功能
    $('#form').on('success.form.bv',function(e){
        e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/category/addSecondCategory',
                data: $('#form').serialize(),
                dataType: 'json',
                success: function (info) {
                    console.log(info);
                    if(info.success){
                        currentPage = 1;
                        render();

                        $('#addModal').modal('hide');
                        //重置表单项 内容+状态
                        $('#form').data('bootstrapValidator').resetForm(true);
                        //针对 一级分类的按钮 和 图片隐藏域 单独处理
                        $('#dropdownText').text('请选择一级分类');
                        $('#picImg ').attr('src','./images/none.png');
                    }
                }
            })
        })

})