$(function(){
    //定义规则
    var form = layui.form;
    form.verify({
        //密码
        pwd:[/^[\S]{6,16}$/,"密码必须是6-16位，且不能出现空格"],
        //新旧不重复
        samePwd:function(value){
            if(value == $("[name=oldPwd]").val()){
                return "原密码和新密码不能一致"
            }
        },
        //两次新密码要相同
        rePwd:function(value){
            if(value !== $("[name=newPwd]").val()){
                return "两次密码必须一致!"
            }
        },
    })
    //表单提交
    $(".layui-form").on("submit",function(e){
        e.preventDefault();
        $.ajax({
            method:"POST",
            url:"/my/updatepwd",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg("修改密码成功！");
                $(".layui-form")[0].reset();
            }
        })
    })
})