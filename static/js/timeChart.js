function timeChart_option() {
    var startTime = 0;
    return {
    tooltip: {
        formatter: function (params) {
            return params.marker + params.name + ': ' + params.value[3] + ' min';
        }
    },
    title: {
        text: 'Timelines',
        left: 'center'
    },
    dataZoom: [{
        type: 'slider',
        filterMode: 'weakFilter',
        showDataShadow: false,
        bottom: 20,
        height: 10,
        borderColor: 'transparent',
        backgroundColor: '#e2e2e2',
        handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
        handleSize: 20,
        handleStyle: {
            shadowBlur: 6,
            shadowOffsetX: 1,
            shadowOffsetY: 2,
            shadowColor: '#aaa'
        },
        zoomOnMouseWheel: false,
        labelFormatter: ''
    }, {
        type: 'inside',
        filterMode: 'weakFilter',
        zoomOnMouseWheel: false,
    }, {
        type: 'slider',
        yAxisIndex: 0,
        // zoomLock: true,
        width: 10,
        right: 0,
        top: 30,
        bottom: 60,
        start: ((timedata.cata.length-7)*100/timedata.cata.length).toFixed(0),
        end: 100,
        handleSize: 0,
        showDetail: false,
    }, {
        type: 'inside',
        id: 'insideY',
        yAxisIndex: 0,
        // start: 5,
        // end: 100,
        zoomOnMouseWheel: false,
        moveOnMouseMove: true,
        moveOnMouseWheel: true
    }],
    grid: {
        top: 30,
        bottom: 60,
        right: 15
    },
    xAxis: {
        min: startTime,
        scale: true,
        axisLabel: {
            formatter: function (val) {
                return parseInt(Math.max(0, val - startTime)/60)+7 + ':' +  ("0000"+parseInt(Math.max(0, val - startTime) % 60)).substr(-2) ;
            }
        }
    },
    yAxis: {
        data: timedata.cata
    },
    series: [{
        type: 'custom',
        renderItem: function (params, api) {
                        var categoryIndex = api.value(0);
                        var start = api.coord([api.value(1), categoryIndex]);
                        var end = api.coord([api.value(2), categoryIndex]);
                        var height = api.size([0, 1])[1] * 0.6;

                        var rectShape = echarts.graphic.clipRectByRect({
                            x: start[0],
                            y: start[1] - height / 2,
                            width: end[0] - start[0],
                            height: height
                        }, {
                            x: params.coordSys.x,
                            y: params.coordSys.y,
                            width: params.coordSys.width,
                            height: params.coordSys.height
                        });

                        return rectShape && {
                            type: 'rect',
                            shape: rectShape,
                            style: api.style()
                        };
                    },
        itemStyle: {
            normal: {
                opacity: 0.8
            }
        },
        encode: {
            x: [1, 2],
            y: 0
        },
        data: timedata.data
    }]
}
};
