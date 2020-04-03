import csv
import json

def csv2json1(filename):
    finput = open('./cdata/'+filename+'.csv','r',encoding='UTF-8')
    ispc_input = open('./cdata/ispc.csv','r')
    ispc = {}
    header = None
    for line in ispc_input:
        line = line.replace('\n','').replace('"','')
        temp = line.split(',')
        if header is None:
            header = temp
            continue
        cur = {}
        for index, item in enumerate(header):
            cur[item] = temp[index]
        ispc[cur['ISPC']] = cur
    ls = {}
    label = None
    for line in finput:
        # print(line)
        line = line.replace('\n','').replace('"','')
        temp = line.split(',')
        if label is None:
            label = temp
            continue;
        line = {}
        opc = ''
        for i in range(0,len(temp)):
            # print(label,temp,i)
            if(label[i]=='opc'):
                opc = temp[i]
                if opc not in ls.keys():
                    ls[opc] = {}
                # print(temp[i],ls)
            if(label[i]=='dpc'):
                if(temp[i] not in ls[opc].keys()):
                    ls[opc][temp[i]] = 0
                # print(temp[2],ls[opc][temp[i]])
                ls[opc][temp[i]]+=int(temp[2])#count
                
    finput.close()#关闭数据流
    print(ls)
    res = {}
    for opc in ls:
        if opc in ispc.keys():
            if ispc[opc]['city']:
                ocity = ispc[opc]['city']
            else:
                ocity = ispc[opc]['country']
        else:
            print(opc,'不存在该opc')
            continue
        cur = []
        for dpc in ls[opc]:
            if dpc in ispc.keys():
                if ispc[dpc]['city']:
                    dcity = ispc[dpc]['city']
                else:
                    dcity = ispc[dpc]['country']
            else:
                print(dpc,'不存在该ispc')
                continue
            cur.append({'dpc':dpc,'value':ls[opc][dpc],'dcity':dcity})
        res[opc] = {'ocity':ocity,'tolist':cur,'operator':ispc[opc]['operator']}
    with open('./'+filename+".json", 'w', encoding='utf-8') as f:
        json.dump(res, f , ensure_ascii=False, indent=4)
        f.close()
def getispcLatLng(filename):
    finput = open('./cdata/country_coord.json','r',encoding='UTF-8')
    country_coord = json.load(finput)
    chinaIspc = json.load(open('./tisp_connect.json','r',encoding='UTF-8'))
    ispc_input = open('./cdata/ispc.csv','r')
    ispc = {}
    countrylist = {}
    header = None
    for line in ispc_input:
        line = line.replace('\n','').replace('"','')
        temp = line.split(',')
        if header is None:
            header = temp
            continue
        cur = {}
        for index, item in enumerate(header):
            cur[item] = temp[index]
        # print(cur)
        if(cur['country']=='China'):
            if(cur['ISPC'] in chinaIspc.keys() and cur['city']!=''):
                cur['latLng'] =  country_coord[cur['city']]
            else:
                continue
        else:
            if cur['country'] in country_coord.keys() and cur['country'] not in countrylist.keys():
                cur['latLng'] =  country_coord[cur['country']]
                countrylist[cur['country']] = True
            else:
                continue
        ispc[cur['ISPC']] = cur
              
    finput.close()#关闭数据流
    with open('./'+filename+".json", 'w', encoding='utf-8') as f:
        json.dump(ispc, f , ensure_ascii=False, indent=4)
        f.close()
    
def MergeData():
    #读取基尼系数数据
    ginitimeline = GDPtimeline = csv2json('gini')
    #读取人均GDP数据
    GDPtimeline = csv2json('gdppercapita_us_inflation_adjusted')
    #读取人口数据
    p = open('./population.json')
    population = json.load(p)
    p.close()
    #读取国家数据
    Ginicountries = ginitimeline[list(ginitimeline.keys())[0]].keys()
    GDPCountries = GDPtimeline[list(GDPtimeline.keys())[0]].keys()
    Pcountries = population.keys()
    p = open('./countries.json')
    countries1 = json.load(p)
    p.close()
    retA = [i for i in Ginicountries if i in GDPCountries]
    retB = [i for i in retA if i in Pcountries]
    countries = [i for i in retB if i in countries1]
    #读取年份数据
    Giniyears = ginitimeline.keys()
    GDPyears = GDPtimeline.keys()
    Pyears = population[list(population.keys())[0]].keys()
    retA = [i for i in Giniyears if i in GDPyears]
    years = [i for i in retA if i in Pyears]
    #整合 
    series = []
    '''
    [
        [
            [815,34.05,351014,"Australia",1800]
            人均GDP,GINI系数，人口，国家，年份
        ]
    ]
    '''
    GDPInf= {'max':0,'min':0}
    giniInf = {'max':0,'min':0}
    PopulationInf = {'max':0,'min':0}
    for y in years:
        inf = []
        for c in countries:
            GDPvalue = GDPtimeline[y][c]
            ginivalue = ginitimeline[y][c]
            Populationvalue = int(population[c][y])
            inf.append([GDPvalue,ginivalue,Populationvalue,c,y])
            if GDPvalue > GDPInf['max']:
                    GDPInf['max'] = GDPvalue
            if GDPvalue < GDPInf['min'] or GDPInf['min']==0:
                    GDPInf['min'] = GDPvalue
            if ginivalue > giniInf['max']:
                    giniInf['max'] = ginivalue
            if ginivalue < giniInf['min'] or giniInf['min']==0:
                    giniInf['min'] = ginivalue
            if Populationvalue > PopulationInf['max']:
                    PopulationInf['max'] = Populationvalue
            if Populationvalue < PopulationInf['min'] or PopulationInf['min']==0:
                    PopulationInf['min'] = Populationvalue
        series.append(inf)
    res = {
        'timeline':years,
        'countries':countries,
        'series':series,
        'GDPInf':GDPInf,
        'giniInf':giniInf,
        'PopulationInf':PopulationInf
    }
    return res
def csv2json(filename):
    finput = open('./'+filename+'.csv','r',encoding='gbk')
    GDPtimeline = {}#年份：{国家：GDP数目, ...}
    Label = True
    timeline = []
    for line in finput:
        if Label == True:
            times = line.split(',')[1:]
            for t in times:
                GDPtimeline[t]={}
                timeline.append(t)
            Label = False
        else:
            countryInf = {}
            line = line.replace('\n','')#.replace('"','')
            if '"' in line:
                temp=line.split('",')
                name=temp[0].replace('"','')
                temp = temp[1].split(',')
            else:
                temp = line.split(',')
                name = temp[0]
                temp = temp[1:]
            for i in range(len(temp)):
                if(temp[i]==''):
                    item = 0
                else:
                    item = round(float(temp[i]),2)
                GDPtimeline[timeline[i]][name] = item
    finput.close()#关闭数据流
    return GDPtimeline
def getcountries():
    p = open('./cdata/GDP_Population_gini.json')
    c = json.load(p)
    p.close()
    bubbleC = c['countries']
    p = open('./cdata/2017_trade_balance_percent_of_gdp.json')
    c = json.load(p)
    p.close()
    balanceC = c.keys()

    p = open('./cdata/country_coord.json')
    c = json.load(p)
    p.close()
    country_coordC = c.keys()

    p = open('./cdata/WtoData_exports.json')
    c = json.load(p)
    p.close()
    exportsC = []
    for item in c:
        exportsC.append(item[0])
    p = open('./cdata/WtoData_imports.json')
    c = json.load(p)
    p.close()
    importsC = []
    for item in c:
        importsC.append(item[0])
    
    res = []
    for k in balanceC:
        if k in bubbleC and k in exportsC and k in importsC and k in country_coordC:
            res.append(k)
    with open('./results/countries.json','w') as f:
        json.dump(res,f)
def freshData():
    p = open('./results/countries.json')
    countries = json.load(p)
    p.close()
    balanceURL = '2017_trade_balance_percent_of_gdp.json'
    exportsURL = 'WtoData_exports.json'
    importsURL = 'WtoData_imports.json'
    p = open('./cdata/'+balanceURL)
    balance = json.load(p)
    p.close()
    res = {}
    for k in balance:
        print(k)
        if k in countries:
            res[k] = balance[k]
    fw=open("./results/"+balanceURL,"w")#打开json文件
    json.dump(res,fw,sort_keys=True)

    p = open('./cdata/'+exportsURL)
    c = json.load(p)
    p.close()
    exportsC = []
    for item in c:
        if item[0] in countries:
            exportsC.append(item)
    fw=open("./results/"+exportsURL,"w")#打开json文件
    json.dump(exportsC,fw,sort_keys=True)

    p = open('./cdata/'+importsURL)
    c = json.load(p)
    p.close()
    importsC = []
    for item in c:
        if item[0] in countries:
            importsC.append(item)
    fw=open("./results/"+importsURL,"w")#打开json文件
    json.dump(importsC,fw,sort_keys=True)
def getcommon():
    f = open('../static/data/2018_export.json')
    exports = json.load(f)
    res = []
    for k in exports:
        if k['source'] not in res:
            res.append(k['source'])
    
    print(res)
    f = open('../static/data/countries.json')
    countries = json.load(f)
    for c in countries:
        if c not in res:
            print(c)
if __name__ == '__main__':
    print('main------')
    # csv2json1('tisp_connect')
    getispcLatLng('ispc_coord')