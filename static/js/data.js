var piedata = {};
var caldata = []
var timedata = {data:[],cata:[]}
var global_iter_num = 0;


function genData(){
    for(var key in rawdata.data){
        // console.log(key)
        var pielist_dict = {};
        var cal_heat = 0;
        for(var index in rawdata.data[key]){
            item = rawdata.data[key][index]

            // time
            // var style;
            if(rawdata.colors.hasOwnProperty(item.name)){
                timedata.data.push({
                    name: item.name,
                    value: [global_iter_num, item.starttime, item.endtime, (item.endtime-item.starttime)],
                    itemStyle: {'normal': {'color': rawdata.colors[item.name]}}
                })
                // style = {'normal': {'color': rawdata.colors[item.name]}}
            }
            

            // pie
            if(pielist_dict[item.name] == undefined){pielist_dict[item.name] = item.endtime-item.starttime}
            else{pielist_dict[item.name] += (item.endtime-item.starttime)}

            // cal heat
            if(rawdata.islearn.includes(item.name)) {cal_heat += (item.endtime-item.starttime)}
        }
        // time
        timedata.cata.push(key.replace('-','.').replace('-','.'))

        // cal
        caldata.push([key,(cal_heat*100/rawdata.totaltime).toFixed(0)]);

        // pie
        var pielist = [];
        var pienames = [];
        for(var name in pielist_dict){
            var style;
            if(rawdata.colors.hasOwnProperty(name)){
                style = {'normal': {'color': rawdata.colors[name]}}
            }else{
                style = {'normal': {'color': '#233333'}}
            }
            pielist.push({
                name:name,
                value:pielist_dict[name],
                itemStyle: style
            });
            pienames.push(name);
        }
        piedata[key] = {data:pielist,names:pienames};

        global_iter_num += 1;
    }
}