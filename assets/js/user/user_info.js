$(function(){
    //1.自定义验证规则
    var form = layui.form;
    form.verify({
        nickname:function(value){
            if(value.length > 8){
                return "昵称长队为1-8位之间！"
            }
        }
    })
    //用户渲染
    initUserInfo();
    //导出layer
    var layer = layui.layer;
    //封装函数
    function initUserInfo(){
        $.ajax({
            mothod:"GET",
            url:"/my/userinfo",
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                //成功，后渲染
                form.val("formUserInfo",res.data)
            }
        })
    }
    //重置表单
    $("#btnReset").on("click",function(e){
        //阻止默认
        e.preventDefault();
        //重新渲染
        initUserInfo();
    })
    //4.修改用户信息
    $(".layui-form").on("submit",function(e){
        e.preventDefault();
        //发送ajax
        $.ajax({
            method:"POST",
            url:"/my/userinfo",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg("用户信息修改失败！")
                }
                layer.msg("恭喜您，用户信息修改成功！")
                window.parent.getUserInfo();
            }
        })
    })
})