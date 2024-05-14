---
title: Python 第二阶段
outline: deep
---

# 对象

> 在程序中是可以做到和生活中那样，设计表格、生产表格、填写表格的组织形式的。好比一张登记表，每个人都有自己的信息，可以用对象来表示。

| 个人登记表 |        |
| ---------- | ------ |
| 姓名       | `None` |
| 性别       | `None` |
| 国籍       | `None` |
| 籍贯       | `None` |
| 年龄       | `None` |

```python
class Student:
    name = None
    gender = None
    nationality = None
    native_place = None
    age = None


stu_1 = Student()
stu_1.name = "John"
stu_1.gender = "Male"
stu_1.nationality = "American"
stu_1.native_place = "New York"
stu_1.age = 20
print(stu_1.age)

```

## 初识对象

1. 设计类(Class)

- ```python
  class Student:
      def __init__(self, name, age):
  ```

2. 创建对象(Object)

- ```python
  student1 = Student("Alice", 18)
  student2 = Student("Bob", 19)
  ```

3. 访问对象属性(Attribute)

- ```python
  print(student1.name)  # Alice
  print(student2.age)   # 19
  ```

4. 修改对象属性(Attribute)
5. 调用对象方法(Method)
6. 继承(Inheritance)

语法：

```python
class 类名:
  类的属性

  类的方法
```

1. 类定义：`class 类名(父类名):`
2. 实例化对象：`实例名 = 类名()`
3. 访问属性：`实例名.属性名`
4. 修改属性：`实例名.属性名 = 新值`
5. 调用方法：`实例名.方法名()`
6. 继承：`class 子类名(父类名):`

## 类的成员方法的定义语法

```python{1}
def 方法名(self, 参数列表): #self类似于this，代表类的实例，必须填写 # [!code focus] # [!code warning]
    函数体
```

- `self`：代表的是类的实例，可以访问类的属性和方法。**必须填写**
- `参数列表`：方法需要接受的参数，可以为空
- `函数体`：方法的实现代码 想要访问类的属性，可以通过`self`来实现。

`self`关键字，尽管在参数列表中，但实际上并不是参数，**传参的时候直接忽略它**。而是 Python 解释器自动添加的第一个参数，代表的是类的实例。

### 类和对象

![属性-行为](/assets/python/images/属性-行为.png)

基于类创建对象的语法：`对象名 = 类名称()`

**类只是一种程序内的“设计图纸”，需要基于图纸生产实体（对象），才能正常工作，嘞就是 面向对象编程（OOP）的精髓。**

### 构造方法

`__init__(self, 参数列表)`方法：构造方法，在创建对象时自动调用，用于初始化对象的属性

- 在创建类对象（构造类）的时候，会自动执行。
- 在创建类对象（构造类）的时候，将传入参数自动传递给`__init__`方法使用。

```python
class Student:
    def __init__(self, name, age, address):
        self.name = name
        self.age = age
        self.address = address
for i in range(10):
    print(f"当前录入第{i+1}位学生信息，总共需录入10位学生信息")
    name = input("请输入学生姓名: ")
    age = input("请输入学生年龄: ")
    address = input("请输入学生地址: ")
    student =Student(name, age, address)
    print(f"学生{i+1}信息录入完成，信息为：【学生姓名：{student.name}，年龄：{student.age}，地址：{student.address}】")

# 当前录入第1位学生信息，总共需录入10位学生信息
# 请输入学生姓名: 周杰伦
# 请输入学生年龄: 31
# 请输入学生地址: 北京
# 学生1信息录入完成，信息为：【学生姓名：周杰伦，年龄：# 31，地址：北京】
# 当前录入第2位学生信息，总共需录入10位学生信息
# 请输入学生姓名:

```

### 魔术方法

> 魔术方法（Magic Method）是 Python 中一种特殊的函数，它有特殊的用途和功能。

上文学习的`__init__`构造方法，是 Python 类内置的方法之一。

这些内置的类方法，各自有各自特殊的功能，这些内置方法我们称之为：_魔术方法_

1. `__init__(self, 参数列表)`：构造方法，在创建对象时自动调用，用于初始化对象的属性
2. `__str__(self)`：打印对象时调用，返回对象的字符串表示
3. `__lt__(self, other)`：对象小于时调用，返回两个对象大小比较的结果
4. `__le__(self, other)`：对象小于等于时调用，返回两个对象大小比较的结果
5. `__eq__(self, other)`：对象等于时调用，返回两个对象是否相等的结果
6. `__del__(self)`：对象被删除时调用，释放对象占用的资源
7. `__getitem__(self, key)`：获取对象中某个元素时调用，返回某个元素的值
8. `__setitem__(self, key, value)`：设置对象中某个元素时调用，设置某个元素的值
9. `__len__(self)`：获取对象长度时调用，返回对象长度
10. `__call__(self, *args, **kwargs)`：对象作为函数调用时调用，返回对象的结果
11. `__add__(self, other)`：对象相加时调用，返回两个对象相加的结果
12. `__sub__(self, other)`：对象相减时调用，返回两个对象相减的结果
13. `__mul__(self, other)`：对象相乘时调用，返回两个对象相乘的结果
14. `__truediv__(self, other)`：对象真除时调用，返回两个对象真除的结果
15. `__floordiv__(self, other)`：对象整数除时调用，返回两个对象整数除的结果
16. `__mod__(self, other)`：对象取模时调用，返回两个对象取模的结果
17. `__pow__(self, other[, modulo])`：对象求幂时调用，返回两个对象求幂的结果
18. `__lshift__(self, other)`：对象左移位时调用，返回两个对象左移位的结果
19. `__rshift__(self, other)`：对象右移位时调用，返回两个对象右移位的结果
20. `__and__(self, other)`：对象与运算时调用，返回两个对象与运算的结果
21. `__or__(self, other)`：对象或运算时调用，返回两个对象或运算的结果
22. `__xor__(self, other)`：对象异或运算时调用，返回两个对象异或运算的结果
23. `__neg__(self)`：对象取负时调用，返回对象的取负结果
24. `__pos__(self)`：对象取正时调用，返回对象的取正结果
25. `__invert__(self)`：对象取反时调用，返回对象的取反结果
26. `__enter__(self)`：对象作为上下文管理器时调用，返回对象的上下文管理器
27. `__exit__(self, exc_type, exc_val, exc_tb)`：对象作为上下文管理器时调用，释放对象占用的资源

`__str__`方法：打印对象时调用，返回对象的字符串表示

```python
class Student:
    def __init__(self, name, age, address):
        self.name = name
        self.age = age
        self.address = address

    def __str__(self): # [!code focus] # [!code warning]
      # 相当于重写方法toString() 打印对象时调用，返回对象的字符串表示
        return "姓名：{}，年龄：{}，地址：{}".format(self.name, self.age, self.address)

student1 = Student("张三", 20, "北京市")

print(student1)
# 输出：姓名：张三，年龄：20，地址：北京市
# 默认是自动调用__str__方法打印对象（默认是内存地址一堆数字）
```

`__lt__`小于符号比较方法

```python{6,9,12}
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __lt__(self, other):
        return self.age < other.age

    def __le__(self, other):
        return self.age <= other.age

    def __eq__(self, other):
        return self.age == other.age

stu1 = Student("John", 20)
stu2 = Student("Alice", 22)

print(stu1<stu2)
# True
```

### 封装

> 封装（Encapsulation）是面向对象编程（OOP）的重要概念，是指将数据和操作数据的方法绑定在一起，对外隐藏内部的实现细节，只暴露必要的接口，这样可以提高代码的可读性、可维护性和可扩展性。

::: tip 补充知识：
面向对象编程，是许多编程语言都支持的一种编程思想。

简单理解是：**基于模板（类）去创建实体（对象）**，使用对象完成功能开发。
:::

#### 私有成员

既然现实事物有不公开的属性和行为，那么作为现实事物在程序中映射的类，也应该支持。

1. 私有属性：在类的内部定义，外部类对象无法直接访问，只能通过方法间接访问。
2. 私有方法：在类的内部定义，外部类对象无法直接调用，只能通过方法间接调用。

定义私有成员的方式：

1. 在属性名前加上两个下划线`__` like `__name`
2. 在方法名前加上两个下划线`__` like `__method`

```python{2,4}
class Phone:
    __current_voltage = 1 # 私有属性

    def __keep_single_core(self): # 私有方法
        print('CPU 单核模式运行')

    def call_by_5g(self):
        if self.__current_voltage >= 1: # 内部调用私有属性
            print('5G 通话')
        else:
            self.__keep_single_core() # 内部调用私有方法
            print('当前电压信号弱，切换到单核模式')

phone = Phone()
phone.call_by_5g() # 调用公开方法
```

#### 练习

![私有成员-练习](/assets/python/images/私有成员-练习.png)

```python{2,3}
class Phone:
    __is_5g_enable = False # 5G 功能是否开启 (私有属性)
    def __check_5g(self): # 私有方法
        if self.__is_5g_enable:
            print('5G 功能已开启')
        else:
            print('5G 关闭s，使用4g网络')
    def call_by_5g(self):
        self.__check_5g()
        print('正在通话中')


phone = Phone()
phone.call_by_5g()
# 5G 关闭s，使用4g网络
# 正在通话中
```

### 继承

> 继承（Inheritance）是面向对象编程（OOP）的重要概念，是指派生一个新类，继承原类的所有属性和方法，并可以添加新的属性和方法。

`class 子类名(父类名):`

#### 单继承

```python{8}
class Phone:
    IMEL = None
    producer = "HM"

    def call_by_4g(self):
        print("4g call")

class Phone2022(Phone): # 继承 Phone 父类
    face_id = "10001"

    def call_by_5g(self):
        print("5g call")

phone = Phone2022()
print(phone.call_by_4g()) # 可以调用父类的方法
```

#### 多继承

1. 多个父类，用逗号分隔
2. 子类会继承所有父类的属性和方法

`class 子类名(父类1, 父类2, ...):`

多继承中，如果父类有同名方法或属性，先继承的优先级高于后继承

例如：父类 1 里面的方法跟父类 2 里面的方法同名，那么子类调用的时候，优先调用父类 1 里面的方法。

```python
class Phone:
    IMEL = None
    producer = "ITCAST"

    def call_by_4g(self):
        print("4g call")


class Phone2022(Phone):
    face_id = "10001"

    def call_by_5g(self):
        print("5g call")

class NFCReader:
    nfc_type = "第五代"
    producer = "HM"

    def read_card(self):
        print("NFC读卡")

    def write_card(self):
        print("NFC写卡")

class RemoteControl:
    rc_type = "遥控器"

    def control(self):
        print("红外遥控开启了")

class myPhone(Phone2022, NFCReader, RemoteControl):
    pass # 占位符，没有具体的功能

phone = myPhone()
print(phone.producer) # ITCAST
```

:::info
`pass` 关键字在 Python 中是一个占位声明，它用在语法上需要一个语句，但程序需要什么动作都不做的情况下。它不仅可以在类（`class`）定义中使用，也可以在函数（`function`）定义、`if` 语句、`while` 循环、`for` 循环等多种语境中使用。
:::

#### 覆写和使用父类成员

子类继承父类的成员属性和成员方法后，如果对其“不满意”，那么可以进行复写。

**在子类中重新定义同名的属性或方法即可。**

```python
class Phone:
    IMEL = None
    producer = "ITCAST" # [!code --]

    def call_by_5g(self): # [!code --]
        print("5g call")

class myPhone(Phone):
    producer = "ITHEIMA" # 子类覆盖父类属性 # [!code ++]

    def call_by_5g(self): # 子类重写父类方法 # [!code ++]
        print("开机cpu单核模式，起飞")

phone = myPhone()
print(phone.producer) # ITHEIMA
phone.call_by_5g() # 开机cpu单核模式，起飞
```

#### 调用父类同名成员

一旦复写父类成员，那么类对象调用成员的时候，就会调用复写后的新成员

方式 1：

- 调用父类成员

  > 使用成员变量：`父类名.成员变量`
  > 使用成员方法：`父类名.成员方法(self)`

方式 2：

- 调用父类成员

  > 使用成员变量：`super().成员变量`
  > 使用成员方法：`super().成员方法()`

```python
class Phone:
    IMEL = None
    producer = "ITCAST"

    def call_by_5g(self):
        print("5g call")

class myPhone(Phone):
    producer = "ITHEIMA" # 子类覆盖父类属性

    def call_by_5g(self): # 子类重写父类方法
        print("开机cpu单核模式，起飞")
        Phone.call_by_5g(self) #方式1 # [!code ++]
        print(super().producer) #方式2 # [!code ++]

phone = myPhone()
print(phone.producer)
# ITHEIMA
phone.call_by_5g()
# 输出：
# 开机cpu单核模式，起飞
# 5g call
# ITCAST
```

### 多态

抽象类的作用：
>[!important]
>✅**多用于做顶层设计（设计标准），以便子类做具体实现。**<br>
>✅**也是对子类的一种软性约束，要求子类必须复写（实现）父类的一些方法**<br>
>✅**并配合多态使用，获得不同的工作状态。**

> 多态（Polymorphism）是面向对象编程（OOP）的重要概念，是指允许不同类的对象对同一消息作出不同的响应。

多态，指的是：多种状态，即完成某个行为时，使用不同的对象会得到不同的状态。

```python{2,3,6,10}
class Animal:  # 抽象类 接口
    def speak(self):  # 抽象方法
        pass  # 方法体是空实现的(pass)

class Dog(Animal):
    def speak(self): # 子类具体实现
        print('wang wang')

class Cat(Animal):
    def speak(self):  # 子类具体实现
        print('meow meow')


def make_noise(animal: Animal):
    animal.speak()

dog = Dog()
cat = Cat()

make_noise(dog)
make_noise(cat)

# 输出：
# wang wang
# meow meow
```

- 父类用来确定有哪些方法
- 具体的方法实现，子类自行决定

**_(这种写法，就叫抽象类，也可以称为接口)_**

抽象类相当于一个标准（接口），包含一些抽象的方法，真正的实现需要子类自己去复写。--顶层设计模式

```python
class AC: # 抽象类 接口
    def cool_wind(self): # 顶层设计模式 (pass)抽象方法
        pass

    def hot_wind(self):
        pass

    def swing_l_l(self):
        pass


class Midea_AC(AC):
    def cool_wind(self):
        print('美的冷风')

    def hot_wind(self):
        print('美的热风')

    def swing_l_l(self):
        print('美的左侧左摆')


class GREE_AC(AC):
    def cool_wind(self):
        print('格力冷风')

    def hot_wind(self):
        print('格力热风')

    def swing_l_l(self):
        print('格力左侧左摆')

def make_coole(ac:AC):
    ac.cool_wind()

mide_ac = Midea_AC()
gree_ac = GREE_AC()
make_coole(mide_ac)
make_coole(gree_ac)
# 输出：
# 美的冷风
# 格力冷风
```

## 类型注解

### 变量的类型注解

> 变量的类型注解（Type Annotation）是 Python 3.6 引入的新特性，它允许我们在定义变量时，为其指定类型 类似`typescript`

支持：

1. 变量类型注解
2. 函数类型注解
3. 类类型注解

为变量设置类型注解

基础语法：`变量：类型`

```python{24,27,18}
# 基础数据类型
var_1:int = 10
var_2:str = "hello"
var_3:bool = True
var_4:float = 3.14

# 类对象类型注解
class Student:
    pass

stu:Student = Student()

#基础容器类型注解
my_list:list = [1, 2, 3]
my_tuple:tuple = (1, 2, 3)
my_set:set = {1, 2, 3}
my_dict:dict = {"name": "张三", "age": 20}
my_str:str = "hello" # 字符串也是属于容器类型 ✌

# 容器类型详细注解
my_list:list[int] = [1, 2, 3]
# 元组类型需要每一个元素都标记出来
my_tuple:tuple[int, str, bool] = (1, "hello", True)
my_set:set[int] = {1, 2, 3}
# 字典类型需要每一个键-值对都标记出来，第一个是key，第二个是value
my_dict:dict[str, int] = {"name": 10, "age": 20}
```

除了上面的方法，也可以在**注释中**进行类型注解
`# type:类型`

```python
var_1 = random.randint(1, 10) # type: int
var_2 = json.loads('{"name": "张三", "age": 20}') # type: dict

def func():
  return True
var_3 = func() # type:bool
```

### 函数(方法)的类型注解

```python {1}
def 函数方法名(形参名:类型，形参名:类型，...) -> 返回值类型:
    pass
```

```python{1,7}
def func(data:list):
  data.append(4)

# data:list
func([1, 2, 3])

def add(a:int, b:int)->int:
    return a + b

add(1, 2) # 3 int
```

### Union 类型

:::tip 补充知识：

1. `my_list:list[int|str|bool] = [1,2,3,'hello',True]` 这个类型注释在 Python 3.10 及以上的版本中是正确的。Python 3.10 引入了一种新的语法，允许你使用 `| `运算符来表示类型联合，所以`int|str|bool`表示一个整数、字符串或布尔值。
2. 在 Python 3.10 以下的版本中，你需要使用 Union 来表示类型联合。`from typing import Union` 导入 Union 类型。
   :::

> Union 类型是 Python 3.10 引入的新特性，它允许我们在类型注解中使用多个类型，表示该变量可以是多个类型中的一种。

联合类型：

`Union[类型1, 类型2, ...]` # 多个类型之间用逗号分隔，类似于 ts 里面的`|`，`type u = number | string;`

Union 联合类型注解，在**变量注解、函数（方法）形参和返回值注解中**，均可使用。

```python
# Union类型，必须导包
from typing import Union ✅ # [!code warning]

# 3.10 以下版本
my_list:list[Union[int, str, bool]] = [1,2,3,'hello',True] # [!code --]

def func(data: Union[list, tuple]) -> Union[int, str]: # [!code --]
  return len(data) # type -> int

# 3.10 及以上版本
my_list:list[int|str|bool] = [1,2,3,'hello',True] # [!code ++]

def func(data: list|tuple) -> int|str: # [!code ++]
  return len(data) # type -> int

```
推荐使用 3.10 及以上版本的`|`语法，更加简洁。


## 综合案例

![综合案例-需求分析](/assets/python/images/综合案例-需求分析.png)

:::code-group

```python[main.py]
from data_define import Record
from file_define import *
from pyecharts.charts import Bar
from pyecharts.options import *
from pyecharts.globals import ThemeType

text_file_reader = TextFileReader('2011年1月销售数据.txt')
json_file_reader = JsonFileReader('2011年2月销售数据JSON.txt')

january_data:list[Record] = text_file_reader.read_data()
february_data:list[Record] = json_file_reader.read_data()

all_data:list[Record] = january_data + february_data

data_dict = {}
# [{data:'2021',order_id:'123456',price:'10000',province:'gd},{data:'2021',order_id:'123456',price:'10000',province:'gd}]
for item in all_data:
    if item.date in data_dict:
        data_dict[item.date] += item.money
    else:
        data_dict[item.date] = item.money

bar = Bar(init_opts=InitOpts(theme=ThemeType.LIGHT))

bar.add_xaxis(list(data_dict.keys())).add_yaxis("销售金额",list(data_dict.values()),label_opts=LabelOpts(is_show=False)).set_global_opts(title_opts=TitleOpts(is_show=True,title="每日销售金额"))

bar.render('每日销售金额.html')
```

```python[data_define.py]
"""
数据定义的类
"""

class Record:
    def __init__(self, date, order_id, money, province):
        self.date = date
        self.order_id = order_id
        self.money = money
        self.province = province

    def __str__(self): # 重写__str__方法，方便打印对象 魔术方法
        return f"{self.date}, {self.order_id}, {self.money}, {self.province}"
```

```python[file_define.py]{7,12,15,25,28}
"""
文件相关的类定义
"""
from data_define import Record
import json

class FileReader: # 抽象类
    def read_data(self) -> list[Record]:
        pass

class TextFileReader(FileReader):
    def __init__(self, file_path: str): # 构造函数
        self.file_path = file_path

    def read_data(self) -> list[Record]: # 复写父类方法
        record_list: list[Record] = []
        with open(self.file_path, 'r', encoding='utf-8') as file:
            for line in file.readlines():
                line = line.strip()
                [date, order_id, money, province] = line.split(',')
                record_list.append(Record(date, order_id, int(money), province))
        return record_list

class JsonFileReader(FileReader):
    def __init__(self, file_path: str):  # 构造函数
        self.file_path = file_path

    def read_data(self) -> list[Record]:  # 多态 复写父类方法
        record_list: list[Record] = []
        with open(self.file_path, 'r', encoding='utf-8') as file:
            for line in file.readlines():
               data_dict = json.loads(line)
               record_list.append(Record(data_dict['date'], data_dict['order_id'], int(data_dict['money']), data_dict['province']))
        return record_list


if __name__ == '__main__':
    text_file_reader = TextFileReader('2011年1月销售数据.txt')
    for i in text_file_reader.read_data():
        print(i)
```
:::

## SQL

[跳转·mysql基础](/database/mysql/)


### python操作mysql

除了使用图形化工具以外，我们也可以使用编程语言来执行SQL从而操作数据库。

在Python中，使用第三方库：`pymysql`来完成对MySQL数据库的操作。[^官方文档]

[^官方文档]: https://pymysql.readthedocs.io/en/latest/modules/connections.html

安装：`pip install pymysql`

```python
from pymysql import Connection
# Connect to the database
mysql = Connection(
    host='127.0.0.1',
    user='root',
    password='********',
    autocommit=True, # 自动提交事务 需要自行配置
)

# cursor
cursor = mysql.cursor() # 获取游标

# execute SQL
mysql.select_db('itcast') # 选择数据库
count = cursor.execute("select * from account") # 执行SQL语句，返回影响的行数

# 表结构

# | name|money |java|


cursor.execute('insert into account(name,money,java) values ("李四",15000,90),("王五|20000|90|")')

mysql.commit() # 提交事务 默认未自动提交，所以需要手动提交

# fetch data

result =cursor.fetchall() # 获取全部数据

# print result

for r in result:
    print(r)

mysql.close()
```

### 案例

数据库名：`py_sql`

```sql
create table orders(
    id int primary key auto_increment,
    order_date DATE not null comment '订单日期',
    order_id varchar(255) not null comment '订单号',
    money int not null comment '金额',
    province varchar(255) not null comment '省份'
) comment '订单表';
```

```python
for item in all_data:
    # insert into orders(order_date, order_id, money, province) values('2021-01-01', '123456', 10000, 'gd')
    sql = f"insert into orders(order_date, order_id, money, province) values({item.date}, '{item.order_id}', {item.money}, '{item.province}')"
    cursor.execute(sql)

mysql.commit() # 提交事务 如果没有自动提交，需要手动提交
mysql.close()
```