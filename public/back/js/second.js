
$(function(){
    var currentPage = 1;
    var pageSize = 5;

    render();
    function render(){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success:function( info ){
                console.log(info);
                
                var htmlstr = template('secondTpl',info);
                $('tbody').html(htmlstr);

                // 分页插件
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(info.total/info.size),
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

    //2.点击添加按钮 模态框显示
    $('#addBtn').on('click',function(){
        $('#addTpl').modal('show');
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            dataType:'json',
            success:function(info){
                var htmlstr = template('categoryTpl',info);
                $('#category').html(htmlstr);
            }
        })
    })

    //3.点击下拉框事件
    $('.dropdown-menu').on('click','a',function(){
        var txt = $(this).text();
        console.log(txt);
        $('#dropdownText').text(txt);
        
    })


})