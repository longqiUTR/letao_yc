$(function () {
  
  var pageSize = 5
  render(1)
  // 初始化列表和分页
  function render(page) {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: page,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (res) {
        $('tbody').html(template('tpl', res))
        pagintor(res, render)
      }
    });
  }

  // 点击新增按钮
  $('#addBtn').on('click', function () {
    $('#addModal').modal('show')
  })

  // 添加表单校验
  $('#addForm').bootstrapValidator({
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '请输入分类名'
          }
        }
      }
    }
  })
  // 给表单添加校验成功事件
  $('#addForm').on('success.form.bv', function (e) {
    e.preventDefault()
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $("#addForm").serialize(),
      dataType: "json",
      success: function(res) {
        $("#addModal").modal("hide"4
        )
        $('#addForm').data('bootstrapValidator').resetForm(true)
        render(1)
      }
    });
  })

})