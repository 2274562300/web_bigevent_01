$(function(){
    $("#link_reg").on("click",function(){
        $(".login-box").hide();
        $(".reg-box").show();
    })
    $("#link_login").on("click",function(){
        $(".login-box").show();
        $(".reg-box").hide();
    })
    //自定义验证规则
    var form = layui.form;
    form.verify({
        //密码规则
        pwd:[/^[\S]{6,16}$/,"密码必须是6-16位，且不能输入空格"],
        repwd:function(value){
            var pwd = $(".reg-box input[name=password]").val();
            if (value !== pwd){
                return "两次密码输入不一致"
            }
        }
    })
    //注册功能
    var layer = layui.layer
    $("#form_reg").on("submit",function(e){
        //阻止表单提交
        e.preventDefault();
        //发送Ajax
        $.ajax({
            method:"POST",
            url:"/api/reguser",
            data:{
                username:$(".reg-box [name=username]").val(),
                password:$(".reg-box [name=password]").val(),
            },
            success:function(res){
                //返回状态判断
                if(res.status != 0){
                    return layer.msg(res.message)
                }
                //提交成功后处理代码
                layer.msg("注册成功，请登录")
                $("#link_login").click();
                $("#form_reg")[0].reset();//清空注册页面
            }
        })
    })
    //登录功能
    var layer = layui.layer
    $("#form_login").on("submit",function(e){
        //阻止表单提交
        e.preventDefault();
        //发送Ajax
        $.ajax({
            method:"POST",
            url:"/api/login",
            data:$(this).serialize(),
            success:function(res){
                //返回状态判断
                if(res.status != 0){
                    return layer.msg(res.message)
                }
                //提交成功后处理代码
                layer.msg("恭喜您，登陆成功")
                //保存token
                localStorage.setItem("token",res.token);
                //跳转
                location.href = "/index.html"
            }
        })
    })
})