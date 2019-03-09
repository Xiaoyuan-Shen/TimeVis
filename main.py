import pandas as pd
import json
import datetime
from settings import *
from dateutil import parser
from flask import Flask, render_template, Response, request, redirect, session

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template("index.html")



@app.route('/data', methods=['GET'])
def data():
    df = pd.read_excel(file)
    settings_color = pd.read_excel(file,1)
    settings_learn = pd.read_excel(file,2)
    start_time = datetime.time(7)
    learn = list(settings_learn.columns)
    colors = settings_color.T.to_dict()[0]
    d = dict()
    for index, s in df.sort_values('日期', ascending=False).iterrows():
    #     print(s)
        li = []
        c_task = None
        c_time = None
        for time, task in s[2:].iteritems():
            d_time = (time.hour-start_time.hour if time.hour-start_time.hour >= 0 else time.hour-start_time.hour+24)*60 + (time.minute-start_time.minute)
            if c_task is not None:
                c_task['endtime'] = d_time
                if c_task['name'] == str(task):
                    pass
                else:
                    li.append(c_task)
                    c_task = dict(name=str(task),starttime=d_time)
            else:
                c_task = dict(name=str(task),starttime=d_time)
        d[s[1].strftime('%Y-%m-%d')] = li
    
    data = dict(data=d, colors=colors, islearn=learn, totaltime=35*30, now=datetime.datetime.now().strftime('%Y-%m-%d'))
    
    result = dict()
    for index, row in df.iterrows():
        d = dict()
        for each in row[2:]:
            d.update({str(each):0.5}) if d.get(str(each)) is None else d.update({str(each):d[str(each)]+0.5})
        result[row[1]] = d
    rdf = pd.DataFrame(data=result).T.fillna(0)
    rdf.index = rdf.index.strftime('%Y-%m-%d')
    rd=rdf.to_dict()
    li = []
    for keys in rd:
        datalist = []
        for k,v in rd[keys].items():
    #         print(k,v)
            datalist.append(dict(
                name=k,
                value=[k.replace('-','/'),v]
            ))
        li.append(dict(
            name=keys,
            type='line',
            stack= '总量',
            areaStyle= {'normal': {'color': colors.get(keys) if colors.get(keys) is not None else '#233333'}},
            itemStyle= {'normal': {'color': colors.get(keys) if colors.get(keys) is not None else '#233333'}},
            data=datalist
        ))

    data.update(dict(anadata=dict(names=list(rdf.columns),series=li)))
    return json.dumps(data)


if __name__ == '__main__':
    app.run(server_ip, port = port, debug=True, use_reloader=False)
