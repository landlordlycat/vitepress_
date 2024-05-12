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

