$(function () {
  
  var pageSize = 5	// 获取数据条数
  var arr = []  // 存储图片 
  // 初始化表格
  render(1)
  function render(page) {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: page,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (res) {
        // console.log(res);
        $('tbody').html(template('tpl', res))
        pagintor(res, render)
      }
    });
  }

  // 改变商品状态
  $('tbody').on('click', '[type=button]', function () {
    $('#updateModal').modal('show')
  })

  // 点击新增按钮
  $('#addBtn').on('click', function () {
    $('#addModal').modal('show')
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 1000
      },
      dataType: "json",
      success: function (res) {
        // console.log(res);
        $('.dropdown-menu').html(template('s-tpl', res))
      }
    });
  })

  // 选择二级分类
  $('.dropdown-menu').on('click', 'li', function () {
    $('.catename').text($(this).children().text())
    $('[name=brandId]').val($(this).data('id'))
    $('#addForm').data('bootstrapValidator').updateStatus('brandId', 'VALID')
  })

  // 选择图片
  $("#file").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      // console.log(data.result);
      arr.unshift(data.result)
      if (arr.length > 3) {
        arr.pop()
        $('.img-group img:last-of-type').remove()
      }
      // console.log(arr);
      $('.img-group').prepend('<img src="' + data.result.picAddr + '" width="100">')
      // 上传三张图片的时候校验成功
      if (arr.length === 3) {
        $('#addForm').data('bootstrapValidator').updateStatus('picStatus', 'VALID')
      }
    }
  });

  // 添加表单校验
  $("#addForm").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh"
    },
    fields: {
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺寸"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          }
        }
      },
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  });

  // 表单添加校验成功事件
  $('#addForm').on('success.form.bv', function (e) {
    e.preventDefault()
    var productData = $('#addForm').serialize()
    productData += '&picArr=' + JSON.stringify(arr)
    console.log(productData);
    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: productData,
      dataType: "json",
      success: function (res) {
        // console.log(res);
        if (res.success) {
          $('#addModal').modal('hide')
          $('#addForm').data('bootstrapValidator').resetForm(true)
          render(1)
        }
      }
    });
  })

})