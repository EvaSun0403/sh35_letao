$(function () {
    var currentPage = 1;
    var pageSize = 5;
    var picArr = [];

    //1.渲染
    render();

    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('productTpl', info);
                $('tbody').html(htmlStr);

                //2.分页功能
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

    //3.点击添加商品 展示模态框
    $('#addBtn').on('click', function () {
        $('#addModal').modal('show');
        //发送ajax 动态渲染下拉框选项
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('listTpl', info);
                $('#brand').html(htmlStr);

            }
        })
    })

    //4.点击下拉框选项，让按钮改变文字 把id赋值给隐藏域
    $('#brand').on('click', 'a', function () {
        var txt = $(this).text();
        $('#dropdownText').text(txt);

        var id = $(this).data('id');
        $('[name="brandId"]').val(id);

        //手动设置校验状态
        $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
    })

    // <img id="picImg" width="100" src="./images/none.png" alt="">
    //5.图片上传
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            // console.log(data);
            //获取上传图片的信息;
            var picObj = data.result;
            var picSrc = picObj.picAddr;

            picArr.unshift(picObj);
            console.log(picArr);
            
            //把图片追加到 imgBox最前面
            $('#imgBox').prepend('<img width="100" src="' + picSrc + '" alt="">');

            if (picArr.length > 3) {
                //删除最后一张
                picArr.pop();
                // $('#imgBox img:last-of-type').remove();
                $('#imgBox img:last-child').remove();
                // console.log(picArr);
            }
            if(picArr.length === 3){
                $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID');
            }
        }
    })

    //6.初始化 表单校验功能
    $('#form').bootstrapValidator({
        excluded: [],
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3.指定校验字段
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:'请选择二级分类'
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:'请输入商品名称'
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:'请输入商品描述'
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:'请输入商品库存'
                    },
                    //必须是非0开头的数字
                    regexp: {
                        regexp: /^[1-9]\d+$/,
                        message: '库存商品必须是非0开头的数字'
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:'请输入商品尺码'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺码格式必须是 xx-xx 例如：32-44'
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:'请输入商品原价'
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:'请输入商品现价'
                    }
                }
            },
            picStatus:{
                validators:{
                    notEmpty:{
                        message:'请上传3张图片'
                    }
                }
            },
        }
    })

    //7.注册表单校验成功事件 发送ajax
    $('#form').on('success.form.bv',function( e ){
        e.preventDefault();
        console.log(picArr);
        var paramsStr = $('#form').serialize();
        paramsStr += '&picArr='+ JSON.stringify(picArr)
        
        $.ajax({
            type:'post',
            url:'/product/addProduct',
            data:paramsStr,
            dataType:'json',
            success:function( info ){
                // console.log(info);
               if(info.success){
                currentPage = 1;
                render();

                $('#addModal').modal('hide');

                $('#form').data('bootstrapValidator').resetForm(true);

                $('#dropdownText').text('请选择二级分类');

                $('#imgBox img').remove();
               } 
            }
        })
    })

})