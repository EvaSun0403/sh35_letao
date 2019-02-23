// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.querySelector('.echarts_left'));

// 指定图表的配置项和数据
var option = {
    title: {
        text: '2019年注册人数'
    },
    tooltip: {},
    legend: {
        data: ['销量','人数']
    },
    xAxis: {
        data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    },
     {
        name: '人数',
        type: 'bar',
        data: [50, 200, 306, 100, 100, 200]
    }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

// 右边的饼状图
var myChart = echarts.init(document.querySelector('.echarts_right'));
// 指定图表的配置项和数据
var option = {
    title : {
        text: '热门品牌销售',
        subtext: '2019年2月',
        x:'center',
        textStyle:{
            color:'red',
            fontSize:25
        }
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','老北京','安踏','360']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'联盟广告'},
                {value:135, name:'安踏'},
                {value:1548, name:'360'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);













