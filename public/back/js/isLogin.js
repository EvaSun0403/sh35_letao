//登录拦截

$.ajax({
    type:'get',
    url:'/employee/checkRootLogin',
    dataType:'json',
    success:function( info ){
        if( info.error == 400){
            // console.log( info );           
            location.href = 'login.html'
            // alert('没有登录')
        }
    }

})