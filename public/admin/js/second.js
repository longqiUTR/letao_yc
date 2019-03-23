$(function () {
  
  var pageSize = 5
  render(1)
  // 初始化列表和分页
  function render(page) {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: page,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (res) {
        console.log(res);
        $("tbody").html(template("tpl", res));
        pagintor(res, render);
      }
    });
  }

  // 点击新增按钮
  $('#addBtn').on('click', function () {
    $('#addModal').modal('show')
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 1000
      },
      dataType: "json",
      success: function (res) {
        $('.dropdown-menu').html(template('f-tpl', res))
      }
    });
  })

  // 选择一级分类
  $('.dropdown-menu').on('click', 'li', function () {
    // console.log($(this).data('id'));
    $('.catename').text($(this).children().text())
    $('[name="categoryId"]').val($(this).data("id"))
    $("#addForm")
      .data("bootstrapValidator")
      .updateStatus("categoryId", "VALID")
  })

  // 点击上传图片
  $("#file").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function(e, data) {
      var src = data.result.picAddr
      $('#brandImg').attr('src', src)
      $('[name=brandLogo]').val(src)
      $('#addForm').data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
    }
  });

  // 表单校验
  $("#addForm").bootstrapValidator({
    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],
    // 配置图标
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh"
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择二级分类Logo"
          }
        }
      }
    }
  });
  // 给表单添加校验成功的事件
  $('#addForm').on('success.form.bv', function (e) {
    e.preventDefault()
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $('#addForm').serialize(),
      dataType: "json",
      success: function (res) {
        if (res.success) {
          $('#addModal').modal('hide')
          $('#addForm').data('bootstrapValidator').resetForm(true)
          $('.catename').text('请选择一级分类')
          $('[name=categoryId]').val('')
          $('#brandImg').attr('src', '')
          $('[name=brandLogo]').val('')
          render(1)
        }
      }
    });
  })

})