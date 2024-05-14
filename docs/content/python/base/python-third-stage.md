---
title: Python 第三阶段
outline: deep
---

# PySpark

## PySpark实战

> 定义：Apache Spark是用于大规模数据(large-scala data)处理的统一(unified)分析引擎。

Sprk作为全球顶级的分布式计算框架，支持众多的编程语言进行开发。PySpark是Spark的Python API，可以让Python开发者快速的进行Spark的开发。

### 基础准备

构建PySpark执行环境入口对象

想要使用PySpark库完成数据处理，首先需要构建一个执行环境入口对象。 

PySpark的执行环境入口对象是: 类`SparkContext`的类对象

```python
from pyspark import SparkConf, SparkContext

conf = SparkConf().setMaster("local[*]").setAppName('test_spark_app')

sc = SparkContext(conf=conf)

print(sc.version)

sc.stop()
```

![pySpark的编程模型1](/assets/python/images/pySpark的编程模型1.png)

![pySpark的编程模型2](/assets/python/images/pySpark的编程模型2.png)

流程：

- 通过sparkContext对象 - > 构建RDD - > RDD操作 - > 输出结果

#### 数据输入(得到RDD对象)

> PySpark支持多种数据的输入，在输入完成后，都会得到一个：`RDD`类的对象 - > 该对象包含了数据集的元数据和数据。

RDD全称为：弹性分布式数据集（Resilient Distributed Datasets）

PySpark针对数据的处理，都是以RDD对象作为载体，即：
- 数据存储在RDD内
- 各类数据的计算方法，也都是RDD的成员方法 
- RDD的数据计算方法，返回值依旧是RDD对象
 
1. RDD对象是什么？为什么要使用它？
RDD对象称之为分布式弹性数据集，是PySpark中数据计算的载体，它可以：
    :::info
    - 提供数据存储
    - 提供数据计算的各类方法
    - 数据计算的方法，返回值依旧是`RDD`(RDD迭代计算)后续对数据进行各类计算，都是基于`RDD`对象进行
    :::
2. 如何输入数据到Spark(即得到RDD对象)
    :::info
    - 通过`SparkContext`的`parallelize`成员方法，将Python数据容器转换为RDD对象
    - 通过`SparkContext`的`textFile`成员方法，读取文本文件得到RDD对象
    :::
```python
from pyspark import SparkConf, SparkContext
# 创建SparkConf对象
conf = SparkConf().setAppName("test_spark").setMaster("local")
# 创建SparkContext对象
sc = SparkContext(conf=conf)
# 创建RDD
rdd1 = sc.parallelize([1, 2, 3, 4, 5])
rdd2 = sc.parallelize((10, 20, 30, 40, 50))
rdd3 = sc.parallelize('hello world')
rdd4 = sc.parallelize({'a': 1, 'b': 2, 'c': 3})
rdd5 = sc.parallelize({1, 2, 3, 4, 5})
# 查看里面的数据
# print(rdd1.collect())
rdd6 = sc.textFile('input.txt')
print(rdd6.collect())
```
>[!tip]
>大概就好比给数据封装成`list`，使得它有更多的处理数据的方法。

#### 数据处理(RDD操作)
---
##### map
>map算子
>
> 是将RDD的数据一条条处理（处理的逻辑基于map算子中接收的处理函数中），返回新的RDD

```python
from pyspark import SparkConf, SparkContext
import os

os.environ['PYSPARK_PYTHON'] = 'D:\python\python.exe'
# 创建SparkConf对象
conf = SparkConf().setAppName("test_spark").setMaster("local")
# 创建SparkContext对象
sc = SparkContext(conf=conf)

rdd = sc.parallelize([1,2,3,4,5])

# (T)->U
def func(x):
    return x * x

rdd1 = rdd.map(lambda x: x * x)
print(rdd1.collect()) # [1, 4, 9, 16, 25]
```
##### flatMap

> 功能：对rdd执行map操作，然后进行**解除嵌套**操作.


```python
rdd =sc.parallelize(['hello itcast world', 'world itheima itheima', 'pyspark python spark'])
# 相当于js的flatMap 平铺
rdd1 = rdd.flatMap(lambda x: x.split(' '))

print(rdd1.collect()) 
# ['hello', 'itcast', 'world', 'world', 'itheima', 'itheima', 'pyspark', 'python', 'spark']
```

##### readuceByKey

> 功能：`针对KV型`RDD,自动按照key分组，然后根据你提供的聚合逻辑，完成`组内数据(valve)`的聚合操作.

使用 `flatMap` 的时候，如果输入的是一个元素，应用函数之后的输出可能是零个、一个或多个元素。不同于 map 函数，flatMap 在应用函数后会“扁平化”结果，也就是说它会将所有输出元素合并到一个列表中，而不是映射到一个新的 RDD 中的元素。

```python
rdd.reduceByKey(func)
# func:(V,V)->V
#接受2个传入参数（类型要一致），返回一个返回值，类型和传入要求一致

rdd = sc.parallelize([('男',99),('男',88),('女',77),('女',66)])

rdd1 =rdd.reduceByKey(lambda a,b:a+b)
# [('男', 187), ('女', 143)]

rdd = sc.parallelize([1, 2, 3])

def f(x): 
    return (x, x * x)

rdd.flatMap(f).collect()

# 输出将是：
# [1, 1, 2, 4, 3, 9]
# 函数 f 对于每个元素返回一个元组（原始值和它的平方）。flatMap 将这些元组扁平化成单个列表。
```

##### 练习案例1

```python
import os
# 构建执行环境入口对象
from pyspark import SparkConf, SparkContext

os.environ['PYSPARK_PYTHON'] = 'D:\python\python.exe'
# 创建SparkConf对象
conf = SparkConf().setAppName("test_spark").setMaster("local")
# 创建SparkContext对象
sc = SparkContext(conf=conf)
# 读取数据文件
rdd = sc.textFile('input.txt')
# 取出全部单词
word_rdd = rdd.flatMap(lambda x: x.split(" "))
# 转化为(word,1)的元组形式
word_with_one_rdd = word_rdd.map(lambda x: (x, 1))
# 按照key进行分组，然后进行聚合操作
result_rdd = word_with_one_rdd.reduceByKey(lambda x, y: x + y)
# 输出结果
print(result_rdd.collect())

```
