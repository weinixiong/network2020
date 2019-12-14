import csv
import json

def csv2json1(filename):
    finput = open('./script/'+filename+'.csv','r',encoding='gbk')
    ls = []
    for line in finput:
        line = line.replace('\n','').replace('"','')
        temp = line.split(',')
        nameLens = 0
        name = ''
        for item in temp:
            if(item.isdigit()==False and item !=''):
                if (nameLens!=0):
                    print(item)
                name +=','+ item
                nameLens +=1
        for i in range(nameLens-1):
            del temp[1]
        # temp.splice(0,nameLens)
        temp[0] = name
        ls.append(temp)
    finput.close()#关闭数据流
    foutput = open('./'+filename+".json",'w')
    series = []
    '''
    [
        [
            [815,34.05,351014,"Australia",1800]
            人均GDP,GINI系数，人口，国家，年份
        ]
    ]
    '''
    countries = []
    maxV = 0
    minV = 0
    for i in range(1,len(ls)):
        countries.append(ls[i][0])
        s = []
        #zip是内置函数，将两个长度一样的列表合成一个关系树，ls[0]是key,ls[1]是value
        # ls[i] = dict(zip(ls[0],ls[i]))
        for j in range(1,len(ls[0])):
            if ls[i][j] == '':
                value = 0
            else:
                value = int(ls[i][j])
            s.append([value,value,value,ls[i][0],value])
            if value > maxV:
                    maxV = value
            if value < minV or minV==0:
                    minV = value
        series.append(s)
    res = {
        'timeline':ls[0][1:],
        'countries':countries,
        'series':series,
        'max':maxV,
        'min':minV
    }
    json.dump(res,foutput,sort_keys=True)
    foutput.close()
    
def MergeData():
    #读取基尼系数数据
    ginitimeline = GDPtimeline = csv2json('gini')
    #读取人均GDP数据
    GDPtimeline = csv2json('gdppercapita_us_inflation_adjusted')
    #读取人口数据
    p = open('./script/population.json')
    population = json.load(p)
    p.close()
    #读取国家数据
    Ginicountries = ginitimeline[list(ginitimeline.keys())[0]].keys()
    GDPCountries = GDPtimeline[list(GDPtimeline.keys())[0]].keys()
    Pcountries = population.keys()
    retA = [i for i in Ginicountries if i in GDPCountries]
    countries = [i for i in retA if i in Pcountries]
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
    finput = open('./script/'+filename+'.csv','r',encoding='gbk')
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

if __name__ == '__main__':
    print('main------')
    res = MergeData()
    fw=open("./GDP_Population_gini.json","w")#打开json文件
    json.dump(res,fw,sort_keys=True)
# # from - to - value
# def csv2json(filename):
#     fo=open("./"+ filename +".csv","r",encoding='gbk')  #打开csv文件
#     ls=[]
#     for line in fo:
#         line=line.replace("\n","")  #将换行换成空
#         ls.append(line.split(","))  #以，为分隔符
#     fo.close()  #关闭文件流
#     fw=open("./"+ filename +".json","w")  #打开json文件
#     for i in range(1,len(ls)):  #遍历文件的每一行内容，除了列名
#         ls[i]=dict(zip(ls[0],ls[i]))  #ls[0]为列名，所以为key,ls[i]为value,
#         #zip()是一个内置函数，将两个长度相同的列表组合成一个关系对
#     
#     # print(ls[0:4])

#     pop = []
#     # res = []
#     res = {}
#     print(ls)
#    
# #   for c in ls[1:]:
# #     if clist[cindex] == c["Reporting Economy"]:
# #         coord = []
# #         coord.append(c["longitude"])
# #         coord.append(c["latitude"])
# #         res[c["name"]] = coord

# #     # print(pop)

# # json.dump(res,fw,sort_keys=True)
# # fw.close()
