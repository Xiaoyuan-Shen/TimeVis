function pieChart_option(time) {
    return {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        title: {
            text: time,
            left: 'center'
        },
        // legend: {
        //     x : 'center',
        //     y : 'bottom',
        //     data: piedata['2019-02-27'].names
        // },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                },
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'时长（比例）',
                type:'pie',
                radius : [20, 100],
                roseType : 'area',
                data: piedata[time].data
            }
        ]
    }
}
