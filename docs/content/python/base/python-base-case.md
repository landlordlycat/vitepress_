---
title: python基础综合案例
outline: deep
---

# 案例：

## json数据格式的转换

> JSON是一种轻量级的数据交互格式。可以按照JSON指定的格式去组织和封装数据·JSON本质上是一个带有特定格式的**字符串**


![案例-json](/assets/python/images/案例-json.png)

- 对象：`{"name": "大圣", "age": 500}`
- 包含对象的数组：`[{"name": "大圣"}, {"name": "八戒"}]`
- 空对象：`{}`
- 空数组：`[]`

1. 导入json模块

```python
import json

# 原始数据
data=[{'name': '张三', 'age': 20}, {'name': '李四', 'age': 25}]
data = {"name": "laoyan", "age": 28, "city": "beijing"}
# 通过dumps方法把python数据转换成json字符串
data = json.dumps(data) # JSON.stringify()

# 通过loads方法把json字符串转换成python数据
data = json.loads(data) # JSON.parse()
```
1. json:是一种轻量级的数据交互格式，采用完全独立于编程语言的文本格式来存储和表示数据(就是字符串) 

    Python语言使用JSON有很大优势，因为：JSON无非就是一个单独的字典或一个内部元素都是字典的列表

    所以JSON可以直接和Python的字典或列表进行无缝转换。

2. json格式数据转化
    
    通过`json.dumps(data)`方法把python数据转化为了json数据 `data = json.dumps(data)`如果有中文可以带上：`ensure_ascii=False`参数来确保中文正常转换

    通过`json.loads(data)`方法把josn数据转化为了python列表或字典


## pyecharts数据可视化

> pyecharts是一款基于Python的开源可视化库，它提供了丰富的图表类型，包括折线图、柱状图、饼图、散点图、雷达图、K线图等。

[pyecharts官网](https://pyecharts.org/)

```python
# 导入pyecharts包里面Line类
from pyecharts.charts import Line
from pyecharts.options import TitleOpts, LegendOpts,ToolboxOpts,VisualMapOpts
# 实例化Line类
line = Line()
# 设置折线图的标题和横纵坐标轴的名称
line.add_xaxis(['中国','美国','英国']).add_yaxis("GDP",[30,20,10])

line.set_global_opts(title_opts=TitleOpts(title="GDP展示",pos_left="center",pos_bottom="0"),legend_opts=LegendOpts(is_show=True),toolbox_opts=ToolboxOpts(is_show=True),visualmap_opts=VisualMapOpts(is_show=True))

# 渲染
line.render()
```
- pyecharts模块中有很多的配置选项，常用到2个类别的选项：
    - 全局配置选项
    - 系列配置选项

`set_global_opts方法`

- 设置全局配置选项，如设置图表的标题、图例位置、背景颜色等。

### 数据准备
[点击数据下载...](https://download.csdn.net/download/qq_45833373/87890515)

### 疫情折线案例

```python
import json

from pyecharts.charts import Line
from pyecharts.options import TitleOpts, LabelOpts


def get_data(name: str, prefix: str):
    with open(f"{name}.txt", 'r', encoding='utf-8') as f:
        content = f.read().replace(f'{prefix}(', "").strip(');')

    def format_data(data: dict, slice_num: int = 314):
        trend_data = data['data'][0]['trend']
        update_date = trend_data.get('updateDate')[:slice_num]
        y_data = trend_data.get('list')[0]['data'][:slice_num]
        return update_date, y_data

    return json.loads(content), format_data


us_data, formatData = get_data('美国', 'jsonp_1629344292311_69436')
jp_data = get_data('日本', 'jsonp_1629350871167_29498')[0]
in_data = get_data('印度', 'jsonp_1629350745930_63180')[0]

# time
updateDate, us_y_data = formatData(us_data)
jp_y_data = formatData(jp_data)[1]
in_y_data = formatData(in_data)[1]

line = Line()

line.set_global_opts(title_opts=TitleOpts(title="2020年美日印三国确诊人数趋势图",pos_bottom="0",pos_left="center"))
line.add_xaxis(updateDate).add_yaxis("美国确诊人数", us_y_data,label_opts=LabelOpts(is_show=False)).add_yaxis("日本确诊人数", jp_y_data,label_opts=LabelOpts(is_show=False)).add_yaxis(
    "印度确诊人数", in_y_data,label_opts=LabelOpts(is_show=False)).render()

```

### 基础地图使用

#### 地图
```python
from pyecharts.charts import Map
from pyecharts.options import VisualMapOpts
from pyecharts.faker import Faker
map = Map()

data = [list(z) for z in zip(Faker.provinces, Faker.values())]

map.add(series_name="全国主要城市", data_pair=data, maptype="china")
map.set_global_opts(visualmap_opts=VisualMapOpts(
    is_show=True,
    is_piecewise=True,
    pieces=[
        {"min":1,"max":9,"label":"1-9人","color":"#006edd"},
        {"min":10,"max":99,"label":"10-99人","color":"#FFA500"},
        {"min":100,"max":499,"label":"100-499人","color":"#FF0000"}
    ]                                        ))

map.render()

```
#### 全国疫情地图

数据没下，喵了一眼跟前面的没啥区别。[官方文档 ](https://gallery.pyecharts.org/#/Map/map_guangdong)

#### 柱状图

基础使用：

```python
from pyecharts.charts import Bar
from pyecharts import options as opts
bar = Bar()

bar.add_xaxis(["中国", "美国", "英国"])
bar.add_yaxis("GDP", [30, 20, 10],label_opts=opts.LabelOpts(position="right"))
bar.reversal_axis()
bar.render()
```

全球GDP数据下载：[点击下载...](https://download.csdn.net/download/qq_45833373/87892636)


```python
from pyecharts import options as opts
from pyecharts.charts import Bar, Timeline
from pyecharts.faker import Faker
from pyecharts.globals import ThemeType
x = Faker.choose()
tl = Timeline(init_opts=opts.InitOpts(theme=ThemeType.WHITE))

for i in range(2015, 2020):
    bar = (
        Bar()
        .add_xaxis(x)
        .add_yaxis("商家A", Faker.values())
        .add_yaxis("商家B", Faker.values())
        .set_global_opts(title_opts=opts.TitleOpts("某商店{}年营业额".format(i)))
    )
    tl.add(bar, "{}年".format(i))
tl.add_schema(play_interval=3000,is_timeline_show=True,is_auto_play=True,is_loop_play=True)
tl.render()
```

#### GDP动态图表绘制

```python
from pyecharts.charts import Bar
from pyecharts.options import LabelOpts,TitleOpts
from pyecharts.charts import Timeline
from pyecharts.globals import ThemeType
with open("1960-2019全球GDP数据.csv", "r", encoding='gbk') as f:
    data_lines = f.readlines()
    data_lines.pop(0)
    # print(data_lines)

data_dict = {}
tl = Timeline({
    "theme": ThemeType.LIGHT
})

def ge_data(line):
    year, nation, gdp = line.split(",")
    if year not in data_dict:
        data_dict[year] = []
    data_dict[year].append([nation, float(gdp)])


for line in data_lines:
    ge_data(line)

result = dict(data_dict)

sorted_data = sorted(result.keys())
for year in sorted_data:
    data_dict[year].sort(key=lambda elem: elem[1], reverse=True)
    year_data = data_dict[year][:8]
    x_data = []
    y_data = []
    for nation, gdp in year_data:
        x_data.append(nation)
        y_data.append(gdp / 1000000000)

    bar = Bar()
    x_data.reverse()
    y_data.reverse()
    bar.add_xaxis(x_data).add_yaxis("GDP(亿)", y_data,label_opts=LabelOpts(position="right")).reversal_axis().set_global_opts(title_opts=TitleOpts(title=f"{year}年全球GDP排名"))
    tl.add(bar, str(year)).add_schema(is_auto_play=True, play_interval=2000,is_loop_play=True,is_timeline_show=True)

tl.render()

```