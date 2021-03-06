define(function (require) {
    var $ = require('jquery');
    var bootstrap = require('bootstrap');
    var util = require('app/util');
    var log = require('log');
    $(function(){
        log('login');
        $.each($('[data-toggle="dropdown"]'), function(index, value){
            $(value).click(function(){
                $(this).siblings().fadeToggle();
            });
        });
        document.getElementById("container").addEventListener('click', function(){
            $('.dropdown-menu').fadeOut();
        });
        $("#login").click(function(){
            var username = $("#login-name").val();
            var password = $("#login-pass").val();
            var result_username = util.check_username(username);
            var result_password = util.check_password(password);
            if(!result_username['status']){
                $("#tipmessage>p").html(result_username['tipmessage']);
                return
            }
            if(!result_password['status']){
                $("#tipmessage>p").html(result_password['tipmessage']);
                return
            }
            if(result_username['status'] && result_password['status']){
                $.ajax({
                    url: '/admin/login',
                    type: 'post',
                    dataType: 'json',
                    data:{
                        'username': username,
                        'password': password
                    },
                    success: function(res){
                        log(res)
                        log("login success");
                        if (res['status'] == "success"){
                            location.href = "/admin"
                        }else{
                            $("#tipmessage>p").html(res['info']);
                        }
                    },
                    error : function() {
                        log("异常！");    
                    }
                })
            }
        });
    });
});
