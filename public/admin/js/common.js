$(document).ajaxStart(function() {
  NProgress.start();
});

$(document).ajaxStop(function() {
  // 模拟网络延迟
  setTimeout(function() {
    NProgress.done();
  }, 500);
});

$(function() {
  // 展开隐藏导航
  $(".down-menu")
    .prev()
    .on("click", function() {
      $(this)
        .next()
        .stop()
        .slideToggle();
    });

  // 点击切换菜单
  $(".a-menu .item").on("click", function() {
    $(".a-menu .item").removeClass("active");
    $(this).addClass("active");
  });

  // 点击头部按钮，侧边栏隐藏
  $(".m-top .left").on("click", function() {
    $(".lt-aside,.lt-main").toggleClass("hideAnimate");
  });

  // 显示模态框
  $(".m-top .right").on("click", function() {
    $("#modal").modal("show");
  });
  // 退出登录
  $("#sure").on("click", function() {
    $.get("/employee/employeeLogout", function(res) {
      if (res.success) {
        location.href = "login.html";
      }
    });
  });
});
