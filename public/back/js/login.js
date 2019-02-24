$(function () {

  //1.表单校验配置
  $('#form').bootstrapValidator({
    //指定不校验的类型，可以不设置
    // excluded: [':disabled', ':hidden', ':not(:visible'],
    // 指定校验时的图标显示
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 3.指定校验字段 需要给表单添加name属性
    fields: {
      username: {
        //校验规则
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名必须在2-6位之间'
          },
          // regexp:{
          //   regexp:/^[a-zA-Z0-9_\.]+$/,
          //   message:'用户名由数字字母下划线和.组成'
          // },
          callback:{
            message:'用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 8,
            message: '密码要在6-8位之间'
          },
          regexp: {
            regexp: /^[a-zA-Z0-9]+$/,
            message: '密码由数字字母组成'
          },
          callback:{
            message:'密码错误'
          }
        }
      }
    }
  });


  //注册表单校验成功事件，要阻止默认的跳转提交，通过ajax提交
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    //发送ajax验证
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        // console.log(info);
       
        //{ "success": true }
        //error 1000 用户名错误  1001 密码错误
        if ( info.error === 1000 ){
          $('#form').data('bootstrapValidator').updateStatus( 'username','INVALID','callback');
        }
        if ( info.error === 1001 ){
          $('#form').data('bootstrapValidator').updateStatus( 'password','INVALID','callback');
        }
        if(info.success){
          location.href = 'index.html'
        }
      }
    })
  })

  //3.表单重置
  $('[type="reset"]').click(function(){
    $('#form').data('bootstrapValidator').resetForm();
  })

})