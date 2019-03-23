$(function () {
  // 渲染表格
  var currentPage = 1
  var pageSize = 5
  render(1)
  function render(page) {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: page,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (res) {
        $("tbody").html(template("tpl", res))
        // 渲染分页
        pagintor(res, render)
        currentPage = res.page
      }
    });
  }

  // 点击操作按钮
  $('tbody').on('click', '.user-btn', function () {
    $('#userModal').modal('show')
    $('#userSure').attr('data-id', $(this).data('id'))
    $('#userSure').attr('data-status', $(this).data('status') === 1 ? 0 : 1)
  })
  // 改变用户状态
  $('#userSure').on('click', function () {
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id: $(this).attr("data-id"),//这里不能用data去获取值，因为上面点击的时候只改变了自定义属性的值，而data获取的是jq对象的属性，它在第一次被点击的时候就被赋值了，后面的点击就不会生效
        isDelete: $(this).attr("data-status")
      },
      dataType: "json",
      success: function(res) {
        if (res.success) {
          $("#userModal").modal("hide")
          render(currentPage)
        }
      }
    })
  })


})