calChart.on('click',function(params){
    pieChart.setOption(pieChart_option((params.value[0])))
    // console.log(params)
})

function cal_jump(cu_mounth, fb){
    var twodayTime = 3600 * 24 * 1000 * 2 * fb;
    time = +echarts.number.parseDate(cu_mounth) + twodayTime;
    calChart.setOption(calChart_option(echarts.format.formatTime('yyyy-MM', time)))
}

function calChart_option(cu_mounth) {
    return {
        tooltip: {
            position: 'top',
        },
        title: {
            text: cu_mounth,
            left: 'center'
        },
        toolbox: {
            show : true,
            feature : {
                myFormer: {
                    show: true,
                    title: '-1Mon',
                    icon: "path://M12,23 C5.92486775,23 1,18.0751322 1,12 C1,5.92486775 5.92486775,1 12,1 C18.0751322,1 23,5.92486775 23,12 C23,18.0751322 18.0751322,23 12,23 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M10.4142136,11 L17,11 L17,13 L10.4142136,13 L12.7071068,15.2928932 L11.2928932,16.7071068 L6.58578644,12 L11.2928932,7.29289322 L12.7071068,8.70710678 L10.4142136,11 Z",
                    onclick: function(){cal_jump(cu_mounth, -1)}
                },
                mylatter: {
                    show: true,
                    title: '+1Mon',
                    icon: "path://M12,23 C5.92486775,23 1,18.0751322 1,12 C1,5.92486775 5.92486775,1 12,1 C18.0751322,1 23,5.92486775 23,12 C23,18.0751322 18.0751322,23 12,23 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M13.5857864,13 L7,13 L7,11 L13.5857864,11 L11.2928932,8.70710678 L12.7071068,7.29289322 L17.4142136,12 L12.7071068,16.7071068 L11.2928932,15.2928932 L13.5857864,13 Z",
                    onclick: function(){cal_jump(cu_mounth, 1)}
                },
                saveAsImage : {show: true}
            }
        },
        visualMap: {
            min: 0,
            max: 100,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: 20
        },
        
        calendar: {
            top: 'middle',
            left: 'center',
            orient: 'vertical',
            height: '50%',
            yearLabel: {
                margin: 40,
                show: false
            },
            dayLabel: {
                firstDay: 1,
                nameMap: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
            },
            monthLabel: {
                nameMap: 'cn',
                margin: 20,
                show: false
            },
            cellSize: 40,
            range: cu_mounth
        },

        series: [{
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: caldata//getVirtulData(2019)
        }]
    }
}
