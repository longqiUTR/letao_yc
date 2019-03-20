$(function() {
  // 柱状图
  // 基于准备好的dom，初始化echarts实例
  var PChart = echarts.init(document.querySelector(".m-model .left"));
  // 指定图表的配置项和数据
  var Poption = {
    title: {
      text: "2019年注册人数"
    },
    tooltip: {},
    legend: {
      data: ["人数"]
    },
    xAxis: {
      data: ["一月", "二月", "三月", "四月", "五月", "六月"]
    },
    yAxis: {},
    series: [
      {
        name: "人数",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  PChart.setOption(Poption);

  // 饼状图
  // 基于准备好的dom，初始化echarts实例
  var SChart = echarts.init(document.querySelector(".m-model .right"));
  // 指定图表的配置项和数据
  var Soption = {
    title: {
      text: "热门品牌销售",
      subtext: "2019年3月",
      x: "center"
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: ["李宁", "鸿星尔克", "双星", "回力", "361°"]
    },
    series: [
      {
        name: "销售",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [
          { value: 335, name: "李宁" },
          { value: 310, name: "鸿星尔克" },
          { value: 234, name: "双星" },
          { value: 135, name: "回力" },
          { value: 1548, name: "361°" }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  SChart.setOption(Soption);
});
