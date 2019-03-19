$(function() {
  var $loginform = $("#loginform");

  // 表单校验
  $loginform.bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh"
    },
    fields: {
      username: {
        // 校验的规则
        validators: {
          // 非空校验
          notEmpty: {
            // 为空时显示的提示信息
            message: "用户名不能为空"
          },
          // 长度要求 2-6 位
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须是 2-6 位"
          },
          callback: {
            message: "用户名不存在"
          }
        }
      },
      password: {
        // 校验的规则
        validators: {
          // 非空校验
          notEmpty: {
            // 为空时显示的提示信息
            message: "密码不能为空"
          },
          // 长度要求 2-6 位
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须是 6-12 位"
          },
          callback: {
            message: "密码不正确"
          }
        }
      }
    }
  });

  // 注册一个表单校验成功事件 success.form.bv
  $loginform.on("success.form.bv", function(e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $loginform.serialize(),
      success: function(res) {
        console.log(res);
        if (res.error === 1000) {
          // 改变提示信息 updateStatus
          // 第一个参数 表单字段
          // 第二个参数 验证状态
          // 第三个参数 验证回调
          $loginform
            .data("bootstrapValidator")
            .updateStatus("username", "INVALID", "callback");
        } else if (res.error === 1001) {
          $loginform
            .data("bootstrapValidator")
            .updateStatus("password", "INVALID", "callback");
        } else if (res.success === true) {
          location.href = "index.html";
        }
      }
    });
  });
});
