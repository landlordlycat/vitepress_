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

## yield关键字

> yield关键字是Python中的一个关键字，它被用来生成一个生成器。

生成器是一种特殊的迭代器，它可以暂停函数的执行，并在适当的时候恢复。

生成器的优点：

- 节省内存：生成器不会一次性生成所有结果，而是每次只生成一个结果，并在需要时返回。
- 迭代器协议：生成器可以被用于迭代器协议，可以被用于for循环、list、tuple、dict等。
- 延迟计算：生成器可以延迟计算，只有在需要时才生成结果，可以节省内存和提高效率。

1. 语法：`yield`

2. 作用：生成器函数会返回一个生成器对象，该对象可以迭代。

3. 示例：


```python
def my_generator():
    for i in range(10):

        # 这里可以做一些耗时的计算
        # 等到需要时才生成结果
        yield i*i

# 调用生成器函数
gen = my_generator()

# 迭代生成器
for i in gen:
    print(i)
```
