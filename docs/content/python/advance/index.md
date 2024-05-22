---
title: Python高级
outline: deep
---

# Python 进阶

---

## 三元表达式

> 三元表达式是一种简洁的条件表达式，它由一个条件表达式、一个表达式和一个表达式组成。如果条件表达式为真，则返回第一个表达式的值；否则，返回第二个表达式的值。

语法：`expr1 if condition else expr2`

```python
x = 10
y = 20 if x > 10 else 10
print(y)  # 20
```

上面的代码中，`y`的值取决于`x`是否大于 10。如果`x`大于 10，则`y`的值为 20；否则，`y`的值为 10。

## 推导式

> 推导式是一种创建列表、集合或字典的简洁方式。它使用一种类似于数学方程的语法，可以快速生成指定格式的列表或集合。

### 列表推导式

1. 语法：`[expr for item in iterable if condition]`

```python
# 计算1到10的平方
squares = [x**2 for x in range(1, 11)]
print(squares)  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# list = []
# for i in range(10):
#     if i % 2 == 0:
#         list.append(i)
# print(list)  # [0, 2, 4, 6, 8]

list1 = [i for i in range(10) if i % 2 == 0]

print(list1)  # [0, 2, 4, 6, 8]
```

### 集合推导式

1. 语法：`{expr for item in iterable if condition}`

2. 注意：集合推导式返回的是一个集合，而不是列表。

```python
# 计算1到10的平方
squares = {x**2 for x in range(1, 11)}
print(squares)  # {1, 4, 9, 16, 25, 36, 49, 64, 81, 100}

# set = set()
# for i in range(10):
#     if i % 2 == 0:
#         set.add(i)
# print(set)  # {0, 2, 4, 6, 8}

set1 = {i for i in range(10) if i % 2 == 0}

print(set1)  # {0, 2, 4, 6, 8}
```

### 字典推导式

1. 语法：`{key_expr: value_expr for item in iterable if condition}`

2. 注意：字典推导式返回的是一个字典。

3. 字典推导式也可以使用两个变量来生成键值对。

```python
# 计算1到10的平方
squares = {x: x**2 for x in range(1, 11)}
print(squares)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25, 6: 36, 7: 49, 8: 64, 9: 81, 10: 100}

# 将一个字符串中字符的出现频率计入字典
s = "hello"
char_count = { char: s.count(char) for char in set(s) if not char.isspace() }
print(char_count)  # 输出: {'e': 1, 'o': 1, 'h': 1, 'l': 2}
```

### 生成器表达式

> 生成器表达式是一种创建生成器的简洁方式。它使用一种类似于列表推导式的语法，可以快速生成指定格式的生成器。

```python
# 计算1到10的平方
squares = (x**2 for x in range(1, 11))
for square in squares:
    print(square)  # 1 4 9 16 25 36 49 64 81 100
print(squares)  # <generator object <genexpr> at 0x000001>

s = (x**2 for x in range(10))
for i in s:
    print(i)  # 0 1 4 9 16 25 36 49 64 81
# 等同于：
for i in range(10):
    print(i**2) # 0 1 4 9 16 25 36 49 64 81

```

## 上下文管理器

> 上下文管理器是一种特殊的对象，它定义了进入和退出该对象的代码块。

上下文管理器有两种主要用途：

`__enter__`方法：在进入上下文管理器的作用域时，该方法被调用。

`__exit__`方法：在离开上下文管理器的作用域时，该方法被调用。

1. 资源清理：当离开上下文管理器的作用域时，它会自动释放资源。

2. 状态保存和恢复：上下文管理器可以保存对象的状态，并在离开上下文管理器的作用域时恢复该状态。

Python 提供了`with`语句来简化上下文管理器的使用。

```python
class File:
    def __init__(self, filename, mode='r'):
        self.filename = filename
        self.mode = mode

    def __enter__(self):
        self.file = open(self.filename, self.mode, encoding='utf-8')
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        print('Closing file')
        self.file.close()

with File('input.txt','r') as f:
    print(f.read())
```

## 装饰器

---

### 函数装饰器

1. 语法：`@decorator`

2. 作用：将一个函数转换为另一个函数，并在不改变原函数的情况下添加新的功能。

3. 示例：

```python
def decorator(params): # 'decorator'
    def wrapper(func):
        def inner_wrapper(*args, **kwargs):
            print(f'Before {func.__name__}')
            func(*args)
        return inner_wrapper
    return wrapper


@decorator('decorator')
def func(params):
  print(f'{params} is decorated')

func('params') 
# Before func
# params is decorated
```


### 类装饰器

> 类装饰器和函数装饰器在概念上是一样的，都是用来修改或增强一个`类`或者`函数`的行为。但是，类装饰器是作用于类的，即它接收一个类并返回一个新的类。

1. 语法：`@decorator`

2. 作用：将一个类转换为另一个类，并在不改变原类的情况下添加新的功能。

3. 示例：

```python
class decorator:
    def __init__(self, params):
        self.params = params

    def __call__(self, cls):
        class inner_decorator(cls):
            def __init__(self, *args, **kwargs):
                super().__init__(*args, **kwargs)
                print(f'Before {cls.__name__} initialization')

            def method(self, *args, **kwargs):
                print(f'Before {cls.__name__} method')
                super().method(*args, **kwargs)

            def __del__(self):
                print(f'Before {cls.__name__} deletion')

        return inner_decorator


@decorator('decorator')
class MyClass:
    def __init__(self, params):
        self.params = params

    def method(self, params):
        print(f'{self.params} is decorated')


obj = MyClass('params')
# Before MyClass initialization
obj.method('params')
# Before MyClass method
# params is decorated
del obj
# Before MyClass deletion
```
```python
class MyDecorator:
    def __init__(self, params):
        self.params = params
    
    def __call__(self, func):
        def inner_wrapper(*args, **kwargs):
            print(f'Before {func.__name__}')
            func(*args, **kwargs)
        return inner_wrapper


@MyDecorator('decorator')
def main():
    print('Hello, world!')

# main()
# Before main
# Hello, world!
```

## @property属性

1. 语法：`@property`

2. 作用：将一个方法转换为属性，并在访问属性时自动调用该方法。

3. 示例：

```python
class Person:
    def __init__(self, name, age):
        self.__name = name
        self.age = age

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, value):
        self.__name = value


p = Person('Alice', 25)
print(p.name)  # Alice
p.name = 'Bob'
print(p.name)  # Bob


---

class Person:
    def __init__(self):
        self.__age = 0

    def get_age(self):
        return self.__age

    def set_age(self, age):
        if age > 0:
            self.__age = age

    age = property(get_age, set_age)

person = Person()
person.age = 25
print(person.get_age())

```

## @classmethod和@staticmethod

1. 语法：`@classmethod`和`@staticmethod`

2. 作用：`classmethod`和`staticmethod`是用来定义类方法和静态方法的装饰器。

3. 示例：

```python{7,12}
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def from_string(cls, string):
        name, age = string.split(',')
        return cls(name.strip(), int(age.strip()))

    @staticmethod
    def is_adult(age):
        return age >= 18


p = Person.from_string('Alice,25')
print(p.name)  # Alice
print(p.age)  # 25


print(Person.is_adult(25))  # True
print(Person.is_adult(17))  # False
```


1. classmethod：
    - classmethod装饰器用于定义一个类方法，它会将类本身作为第一个参数，通常这个参数被命名为`cls`。
    - 类方法可以通过类名调用，也可以通过类的实例调用，但无论如何，都会接收到类（而不是类的实例）作为第一个参数。
    - 类方法通常用于定义那些对整个类进行操作的方法，而不是类的某个实例。它们经常用于工厂模式中，创建类的实例。

2. staticmethod：
    - staticmethod装饰器用于定义一个静态方法，它不接受任何特定的参数（如cls或self）。
    - 静态方法类似于普通函数，区别在于它被包含在类的定义中，相当于类的一个命名空间里的方法。
    - 静态方法可以通过类名直接调用，无需创建类的实例。通常用于放置与类相关但不需使用类或实例数据的工具函数。

区别在于：
:::tip
- `classmethod`必须有一个对类对象的引用作为第一个参数(`cls`)，而`staticmethod`则可以没有任何参数。
- `classmethod`可以访问或修改类状态，`staticmethod`则不能。
- 当你需要访问类属性或者类方法时，应使用classmethod。相反，如果在方法内部不需要访问任何类属性或方法，可以使用staticmethod。
:::



## 运算符
---
### 算术运算符

优先级：

| 运算符 | 优先级 |
|---|---|
|**|幂|
|* / // %| 乘 除 取整 取模|
|+ - | 加 减|

### 比较运算符

> 判断两个操作数的关系，并返回一个布尔值。

```python
5 > 3  # True
```

### 逻辑运算符

优先级: `not > and > or`

|运算符|逻辑表达式|描述|
|---|---|---|
|not|not x|布尔“非” 如果x为True，返回False；如果x为False，返回True|
|and|x and y|布尔“与” 只有x和y都为真，才返回True|
|or|x or y|布尔“或” 只要x或y有一个为真，就返回True|

```python
1 and 0  # 0
1 or 0  # 1
not 1  # False
```

### 位运算符

|运算符|描述|功能|实列|
|---|----|----|----|
|`&`|按位与|对二进制位进行逻辑“与”运算，只有两个相应位都为1时，结果才为1，否则为0|a = 60, b = 13; c = a & b; print(c) # 12|
|`\|`|按位或|对二进制位进行逻辑“或”运算，只要两个相应位有一个为1时，结果就为1，否则为0|a = 60, b = 13; c = a | b; print(c) # 61|
|`^`|按位异或|对二进制位进行逻辑“异或”运算，当两个相应位相异时，结果为1，否则为0|a = 60, b = 13; c = a ^ b; print(c) # 49|
|`~`|按位取反|对二进制位进行逻辑“取反”运算，即把1变为0，把0变为1，~x 类似于 -x - 1|a = 60; b = ~a; print(b) # -61|
|`<<`|左移|将数字的二进制表示向左移动指定的位数|a = 60; b = a << 2; print(b) # 240|
|`>>`|右移|将数字的二进制表示向右移动指定的位数|a = 60; b = a >> 2; print(b) # 15|

### 成员运算符

1. 语法：`in`和`not in`

2. 作用：判断对象是否在序列中。

3. 示例：

```python
a = [1, 2, 3]
print(1 in a)  # True
print(4 not in a)  # True
```


### 身份运算符

1. 语法：`is`和`is not`

2. 作用：比较两个标识符是否引用同一个对象。

3. 示例：

```python
a = 10
b = 10
print(a is b)  # True


c = [1, 2, 3]
d = [1, 2, 3]
print(c is d)  # False
```
## raise语句

> raise语句用于抛出一个指定的异常。

```python
raise Exception('Error message')
```


## 内置函数

map 、filter 、reduce

### map

> map() 函数接收两个参数，一个是函数，一个是Iterable，map将传入的函数依次作用到序列的每个元素，并把结果作为新的Iterator返回。

```python
def square(x):
    return x ** 2


numbers = [1, 2, 3, 4, 5]
result = map(square, numbers)
print(list(result))  # [1, 4, 9, 16, 25]
```

### filter

> filter() 函数接收两个参数，一个是函数，一个是Iterable，filter() 函数用于过滤序列，过滤掉不符合条件的元素，返回一个Iterator。

```python
def is_odd(x):
    return x % 2 == 1


numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
result = filter(is_odd, numbers)
print(list(result))  # [1, 3, 5, 7, 9]
```

### reduce


> reduce() 函数接收两个参数，一个是函数，一个是Iterable，reduce() 函数用于对序列进行归约操作，即：

```python
reduce(f, [x1, x2, x3, x4]) = f(f(f(x1, x2), x3), x4)
```


```python
from functools import reduce

def add(x, y):
    return x + y


numbers = [1, 2, 3, 4, 5]
result = reduce(add, numbers)
print(result)  # 15

my_rd = reduce(lambda x, y: x + y, [1, 2, 3])
print(my_rd)
``` 
### sorted

> sorted() 函数接收一个可迭代对象，并返回一个新的排序后的列表。

```python
my_st = sorted([1, 5, 3])
print(my_st)
# [1, 3, 5]
my_st = sorted([1, 5, 3], reverse=True)
print(my_st)
# [5, 3, 1] 

test_list = ["test_mi_001","test_ki_012","test_go_008","test_lt_003"]

print(sorted(test_list,key=lambda x:x.split('_')[2],reverse=False))
# ['test_mi_001', 'test_lt_003', 'test_go_008', 'test_ki_012']
print(sorted(test_list,key=lambda x:re.findall(r"\d+",x),reverse=False))
```
>[!important]
>`sort` 和 `sorted` 的区别，一个对原列表排序，一个返回一个新的排序后的列表。

维护一个排序序列，建议使用Python 的标准库 `bisect`来做，它是采用二分查找算法，性能较高。

### zip

> zip() 函数用于将可迭代的对象作为参数，将对象中对应的元素打包成一个个元组，然后返回由这些元组组成的列表。

```python
a = [1,2,3]
b = [4,5,6]

c = zip(a,b) # c是一个迭代器对象
print(list(c))
# [(1, 4), (2, 5), (3, 6)]
```


## 迭代器

一个类只要实现了魔法函数 `__iter__` 就是可迭代的（Iterable），但是它还不是迭代器(Iterator)

:::tip
节省资源消耗，迭代器并不会计算每一项的值，它只在你访问这些项的时候才计算，也就是说它保存的是一种计算方法，而不是计算的结果

迭代器就是使对象可以进行 for 循环，它需要实现 `__iter__` 和 `__next__` 两个魔法函数。
:::

1. 语法：`iter(object)`

2. 作用：将一个可迭代对象转换为迭代器。

3. 示例：

```python
a = [1, 2, 3]
b = iter(a)
print(next(b))  # 1
print(next(b))  # 2
print(next(b))  # 3
```

## 生成器

生成器是一种特殊的迭代器，它可以暂停函数的执行，并在适当的时候恢复。

生成器的优点：

- 节省内存：生成器不会一次性生成所有结果，而是每次只生成一个结果，并在需要时返回。
- 迭代器协议：生成器可以被用于迭代器协议，可以被用于for循环、list、tuple、dict等。
- 延迟计算：生成器可以延迟计算，只有在需要时才生成结果，可以节省内存和提高效率。

1. 语法：`yield`

2. 作用：生成器函数会返回一个生成器对象，该对象可以迭代。

3. 示例：

```python
my_gen = (i for i in range(10))


print(next(my_gen))
print(next(my_gen))
print(next(my_gen))
print(next(my_gen))
```
前面讲的好多对象都是在类里面定义的，而生成器对象就不是在类里面了，而是在函数里面定义，在一个函数里面只要出现了 `yield` 它就不是普通函数，而是一个生成器。

```python
def my_gen():
    print("setp 1")
    yield 1
    print("setp 2")
    yield 2

g = my_gen()
next(g)
next(g)
```
`yield` 的用途是让函数暂停，并保存对象状态在内存中，下次再使用 `next` 调用同一个对象时，又开始从之前暂停的位置开始执行，直到运行到下一个 `yield` 又暂停，如果后面没有 `yield`了，则会抛 `StopIteration` 异常。

`yield` 和 `return` 都能返回数据，但是有区别，return 语句之后的代码是不执行的，而 `yield` 后面还可以执行。

```python
def my_gen():
    yield 1
    yield 2
    return 3

for i in my_gen():
    print(i)

# 输出结果：
# 1
# 2
```
`return` 后面的值并没有返回

## 总结

- 迭代器需要实现两个魔法函数：`__iter__` 和 `__next__` ；

- 迭代器允许惰性求值，只有在请求下一个元素时迭代器对象才会去生成它，它保存的是一种生成数据的方法；

- 生成器是迭代器的一种更 Pythonic 的写法，可以在函数里面用 `yield` 创建一个迭代器；

- 生成器表达式是生成器的一种更加 Pythonic 的写法。

