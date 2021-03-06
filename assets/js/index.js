$(function(){
    //获取用与信息
    getUserInfo();
    //退出
    var layer = layui.layer;
    $("#btnLogout").on("click",function(){
        //框架提供的询问框
        layer.confirm('是否退出？', {icon: 3, title:'提示'}, function(index){
            //清空本地token
            localStorage.removeItem("token");
            //页面跳转
            location.href = "/login.html";
            //关闭询问框
            layer.close(index);
        })

    })
});
//获取用于信息（封装到入口函数的外面了）
//原因，后面其他的页面要调用
function getUserInfo(){
    //发送ajax
    $.ajax({
        url:"/my/userinfo",
        // headers:{
        //     Authorization:localStorage.getItem("token") || ""
        // },
        success:function(res){
            console.log(res);
            if(res.status !== 0){
                return layui.layer.msg(res.message);
            }
            //请求成功，渲染用户头像
            renderAvater(res.data);
        }
    })
}
//防撞用户头像渲染函数
function renderAvater(user){
    //用户名
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎  "+name);
    //用户头像
    if(user.user_pic !== null){
        //有头像
        $(".layui-nav-img").show().attr("src",user.user_pic);
        $(".text-avatar").hide();
    }else{
        //无头像
        $(".layui-nav-img").hide();
        var text = name[0].toUpperCase();
        $(".text-avatar").show().html(text);
    }
}