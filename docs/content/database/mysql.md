---
outline: deep
---

# sql

### DDL - 数据库定义

---

```SQL
mysql -u root -p
```

#### 数据库操作

```SQL
SHOW DATABASES;
```

查询当前数据库

```sql
SELECT DATABASE();
```

创建

```sql
CREATE DATABASE [IF NOT EXISTS] 数据库名 [DEFAULT CHARSET 字符集] [COLLATE 排序规则];
```

charset utf8 占用三个字节 推荐使用 utf8mb4 支持 4 位

删除

```sql
DROP DATABASE [IF EXISTS] 数据库名;
```

使用

```sql
USE 数据库;
```

#### 表操作

---

查询

当前数据库所有表

```sql
SHOW TABLES;
```

查询表结构

```sql
DESC 表名;
```

查询指定表的建表语句

```sql
SHOW CREATE TABLE 表名;
```

创建

```sql
CREATE TABLE 表名 (
 字段1 字段1类型[COMMENT 注释],
 ....
 字段n 字段n类型[COMMENT 注释] <-没逗号，像object一样
)[COMMENT 表注释];
```

[?] 可选参数

#### 数据类型

##### 数字型

| 数字型      |                              |                                |
| ----------- | ---------------------------- | ------------------------------ |
| smallint    | 2bytes                       |                                |
| mediumint   | 3bytes                       |                                |
| int integer | 4bytes                       |                                |
| tinyint     | 1bytes                       | 0-255                          |
| bigint      | 8bytes                       |                                |
| float       | 4bytes                       |                                |
| double      | 8bytes                       |                                |
| decimal     | 依赖于 M(精度)和 D(标度)的值 | **123**.1 (3 位精度，1 位标度) |

age tinyint unsigned

score double(4,1)

##### 字符串类型

| 字符串类型 |              |                                                                    |
| ---------- | ------------ | ------------------------------------------------------------------ |
| char       | 0-255        | 定长字符串 char(10)--性能好--性别 gender char(1)                   |
| varchar    | 0-65535      | 变长字符串 varchar(10)--动态计算性能差一些 -- username varchar(50) |
| tinyblob   | 0-255        | 不超过 255 个字符的二进制数据                                      |
| tinytext   | 0-255        | 不超过 255 个字符的文本数据                                        |
| mediumblob | 0-16 777 215 | 中等长度                                                           |
| mediumtext | ~~~          |                                                                    |
| blob       | 0-65535      | .                                                                  |
| text       | 0-65535      |                                                                    |
| longblob   |              |                                                                    |
| longtext   |              |                                                                    |

##### 日期类型

| 日期类型  |                     |                  |
| --------- | ------------------- | ---------------- |
| DATE      | YYYY-MM-DD          | 日期             |
| TIME      | HH:MM:SS            | 时间值或持续时间 |
| YEAR      | YYYY                | 年               |
| DATETIME  | YYYY-MM-DD HH:MM:SS | 混合时间和日期   |
| TIMESTAMP | YYYY-MM-DD HH:MM:SS | 时间戳           |

birthday date

create table employ(

id int comment '编号',

workno varchar(10) comment '工号',

name varchar(10) comment '姓名',

gender char(1) comment '性别',

age tinyint unsigned comment '年龄',

idcard char(18) comment '身份证号',

entrydate date comment '入职时间'

) comment '员工表';

#### 修改

##### 添加字段

```sql
ALTER TABLE 表名 ADD 字段名 类型(长度) [COMMENT ''] [约束];
```

##### 修改数据类型

```sql
ALTER TABLE 表名 MODIFY 字段名 新数据类型（长度）
```

修改字段名和字段类型

```sql
ALTER TABLE ~~ CHANGE 旧字段 新字段 类型（长度）[COMMENT ''][约束];
```

#### 删除字段

```sql
ALTER TABLE 表名 DROP 字段名;
```

#### 修改表名

```sql
ALTER TABLE 表名 RENAME TO 新表名;
```

#### 删除表

```SQL
DROP TABLE [IF EXISTS] 表名;
```

删除指定表，并重新创建该表

```sql
TRUNCATE TABLE 表名;
```

### DML - 增删改

#### 添加数据

##### 给指定字段添加数据

```sql
INSERT INTO 表名（字段1，字段2，....) VALUES (值1，值2...)
```

##### 给全部字段添加数据

```sql
INSERT INTO 表名 VALUES (值1，值2...);
```

##### 批量添加数据

```sql
INSERT INTO 表名（字段1，字段2，....)  VALUES (值1，值2...),(值1，值2...),(值1，值2...);
```

```SQL
INSERT INTO 表名 VALUES (值1，值2...),(值1，值2...),(值1，值2...);
```

#### 修改数据

```sql
UPDATE 表名 SET 字段名1=值1,字段名2=值2,...[WHERE 条件];
```

没有 where 则是全部更改

#### 删除数据

```sql
DELETE FROM 表名 [WHERE 条件]
```

---

### DQL - 数据查询

```sql
SELECT 字段列表 FROM 表名列表 WHERE 条件列表 GROUP BY 分组字段列表 HAVING 分组后条件列表 ORDER BY 排序字段列表 LIMIT 分页参数
```

- 基本查询
- 条件查询 where
- 聚合函数（count，max，min，avg，sum）
- 分组查询 GROUP BY
- 排序查询 ORDER BY
- 分页查询 LIMIT

#### 基本查询

```sql
SELECT 字段1,字段2... FROM tableName;
```

```sql
SELECT * FROM tableName;
```

设置别名

```sql
SELECT fields1 as alias1,fields as alias2... FROM tableName;
```

去除重复记录

```sql
SELECT DISTINCT 字段列表 FROM tableName;
```

#### 条件查询

```sql
SELECT 字段列表 FROM 表名 WHERE 条件列表;
```

条件

```sql
> >= <= != <>
BETWEEN ... AND ...
IN(...) age=19或者20 IN(18,20)
LIKE 占位符模糊匹配(_ 匹配单个字符 %匹配任意个字符)
IS NULL
IS (NOT 逻辑) NULL
AND 或者 &&
OR 或者 ||
NOT 或者 !

```

#### 聚合函数

**_将一列的数据作为一个整体，进行纵向计算_**

```sql
count，max，min，avg，sum
SELECT 聚合函数（字段列表）FROM 表名;
```

#### 分组查询

```sql
SELECT 字段列表 FROM 表名 [WHERE 条件] GROUP BY 分组字段名 [HAVING 分组后过滤条件];
```

where 和 having 的区别

where 是分组之前过滤 having 是对结果进行过滤

where 不能对聚合函数进行判断

#### 排序查询

```sql
SELECT 字段列表 FROM 表名 ORDER BY 字段1 排序方式,字段2排序方式;
```

#### 分页查询

page,size

```sql
SELECT 字段列表 FROM 表名 LIMIT 起始索引，查询记录数;
```

起始索引从 0 开始，起始索引=（查询页码-1）\*每页显示记录数

---

### DCL - 管理数据库用户控制权限

#### 用户管理

1 查询

```SQL
USE mysql;
SELECT * FROM user;
```

2 创建

```sql
CREATE USER '用户名'@'主机名localhost or %' IDENTIFIED BY '密码'
```

3 修改用户密码

```SQL
ALTER USER '用户名'@'主机名' IDENTIFIED WITH mysql_native_password(加密方式) BY '新密码'
报错的用我这个set  password for 'heima'@'%' = password ('1234');
较新版本的可以用alter user 'heima'@'%' identified by '1234'
```

4 删除用户

```sql
DROP USER '用户名'@'主机名'
```

#### 权限管理

查询权限

```sql
SHOW GRANTS FOR '用户名'@'主机名'
```

授权

```sql
 GRANT 权限列表 ON 数据库名.库名 TO '用
 户名'@'主机名'
 grant all itcast.* to 'heima'@'%';
```

撤销权限

```sql
REVOKE 权限列表 ON 数据库名.库名 FROM '用户名'@'主机名'
```

---

# 约束

**约束是作用于表中字段上的规则，用于限制存储在表中的数据，保证数据正确，有效性，完整性。**可用在创建表/修改表的时候添加约束

`not null` 不能为==null==

`unique`唯一约束

`primary key` 主键约束 - 主键是一行数据的唯一标识，要求非空且唯一 auto_increment

`default `默认约束 未设置值得话取默认值 `check`保证字段值满足某一个条件

foreign key 外键约束 - 用来让两张表的数据之间建立连接，保证数据得一致性和完整性

```sql
CREATE TABLE user(
	id INT NOT NULL PRIMARY KEY auto_increment COMMENT 'id',
	name VARCHAR(10) not NULL UNIQUE,
	age INT CHECK(age>0&&age<=120),
	status char(1) DEFAULT '1',
	gender char(1)
) COMMENT '用户表'
```

---

# 约束

## 外键约束

外键就是使两张表的数据之间建立联系。保证数据的一致性和完整性。

某用户归属某部门。（用户表-部门表）

### 添加外键

```sql
CREATE TABLE TABLENAME(
	...
    [CONSTRAINT][外键名称] FOREIGN KEY(外键字段名) REFERENCES 主表（主表列名）
)
```

```sql
ALTER TABLE TABLENAME ADD CONSTRAINT 外键名称 FOREIGN KEY(外键字段名) REFERENCES 主表（主表列名）
```

```sql
ALTER TABLE user ADD CONSTRAINT fk_emp_dept_id FOREIGN KEY (dept_id) REFERENCES dept(id)
```

### 删除外键

```sql
ALTER TABLE TABLENAME DROP FOREIGN KEY 外键名称
```

```sql
ALTER TABLE emp DROP FOREIGN KEY fk_emp_dept_id
```

## 外键删除更新行为

| 行为        | 说明                                                                             |
| ----------- | -------------------------------------------------------------------------------- |
| no action   | 当在父表中删除/更新时，首先检查该记录是否有对应外键。如果有则不允许删除/更新     |
| restrict    | 同上                                                                             |
| cascade     | 如果有，则也删除/更新外键在子表中的记录                                          |
| set null    | 当在父表中删除对应记录时，如果有则设置子表中该外键值为 null（允许外键可取 null） |
| set default | 父表有变更时，子表将外键设置成一个默认值（innodb 不支持）                        |

```sql
ALTER TABLE TABLENAME 外键名称 FOREIGN KEY (外键字段) REFERENCES 主表(主表字段名) ON UPDATE CASCADE ON DELETE CASCADE
```

---

> 是一组操作的集合，不可分割的工作单位。一个整体
>
> 要么成功，要么失败。失败就回滚

```sql
SELECT @@autocommit; @@-系统变量
set @@autocommit = 0; 设置手动提交
```

查询当前事务是否自动还是手动

自动：1 手动：0

```sql
commit; #提交事务
ROLLBACK; #回滚
```

## 事务操作

开启事务

```sql
start transaction 或 begin
```

提交事务

```sql
commit;
```

回滚事务

```sql
rollback
```

## 事务的四大特性

> 原子性：要么成功，要么全部失败
>
> 一致性：事务完成时，必须所有数据保持一致状态
>
> 隔离性：数据库提供的隔离机制，事务之间有独立的环境，不会影响到其他事务
>
> 持久性：事务一旦提交或回滚，它对数据库的数据的改变是永久的

## 并发事务问题

|            |                                                                                                            |
| ---------- | ---------------------------------------------------------------------------------------------------------- |
| 脏读       | 一个事务读取到另外一个事务还没提交的数据(一个事务 update 数据但是未提交，但是另一个事务却能查询到变更状态) |
| 不可重复读 | 一个事务先后读取同一条记录，但两次读取的数据不同                                                           |
| 幻读       | 一个事务按照条件查询数据时，没有对应的数据行，但是在插入数据时，又存在这行数据。                           |

## 事务隔离级别

| 隔离级别                      | 脏读 | 不可重复读 | 幻读 |
| ----------------------------- | ---- | ---------- | ---- |
| read uncommitted              | √    | √          | √    |
| read committed                | ×    | √          | √    |
| repeatable read(default)      | ×    | ×          | √    |
| serializable (序列化，串行化) | ×    | ×          | ×    |

```sql
--查看事务隔离级别
select @@transaction_isolation;
```

```sql
--设置事务隔离级别
set [session|global] transaction isolation level {read uncommitted|read committed|repeatable read|serializable}
```

---

# 多表查询

## 多表关系

> 一对多（多对一）多对多 一对一

### 一对多 多对一

部门与员工的关系

一个部门可以有多个员工

**在多的一方建立外键，指向对应的一方的主键**

### 多对多

学生 - 课程的关系

**建立第三张中间表，中间表至少包含两个外键，分别关联两方主键**

### 一对一

**在任意一方加入外键，关联另一方的主键，并且设置外键为唯一的 unique**

---

## 多表查询

```sql
select * from table1,table2.... where table1_id = table2.id;
```

where 确定消除笛卡儿积

---

### 连接查询

#### 内连接

> 相当于查询 A,B 交集部分数据

隐式内连接

```sql
SELECT 字段列表 FROM 表1，表2 WHERE 条件...;
```

显示内连接

```sql
SELECT 字段列表 FROM 表1 [INNER] JOIN 表2 ON 连接条件...;
```

#### 外连接

> 左外连接：查询左表所有数据，以及两张表交集部分数据
>
> 右外连接：查询右表所有数据，以及两张表交集部分数据

**左外连接 查询表 1 左表的所有数据，包含表 1 和表 2 交集部分的数据，以左表为驱动,为空的则用 null 填充**

```sql
SELECT 字段列表 FROM 表1 LEFT [OUTER] JOIN 表2 ON 条件...;
```

**右外连接 查询表 1 右表的所有数据，包含表 1 和表 2 交集部分的数据，以右表为驱动**

```sql
SELECT 字段列表 FROM 表1 right [OUTER] JOIN 表2 ON 条件...;
```

#### 自连接

> 当前表与自身的连接查询，自连接必须使用表别名

```sql
SELECT * FROM biao1 a,biao1 b where a.xxxid= b.id
```

```sql
SELECT 字段列表 FROM 表a 别名a join 表a 别名b ON 条件...
```

```sql
SELECT A.NAME 'USER',B.NAME 'BOSS' FROM EMP A LEFT JOIN EMP B ON A.XXXXID = B.ID
```

**自连接查询，可以是内连接查询，也可以是外连接查询**

---

### 联合查询

`union（结果去重）,union-all`（直接合并）

> union 查询就是把多次查询的结果合并起来，形成一个新的查询结果集。
>
> 例：
>
> 1. 将薪资低于 5000 的员工 , 和 年龄大于 50 岁的员工全部查询出来.
> 2.

```sql
SELECT 字段列表 FROM 表a... UNION [ALL] SELECT 字段列表 FROM 表b...
---
select * from emp where salary < 5000
union all
select * from emp where age > 50;

```

上面的字段列表跟下面的字段列表保持一致

### 子查询

> 嵌套 select 语句。嵌套查询

#### 标量子查询

子查询返回的结果是==单个值==（数字，字符串，日期）

常见的操作符= < > <=

```sql
SELECT * FROM T1 WHERE COL1 = (SELECT `id` FROM T2)
```

#### 列子查询

子查询返回的结果是一列或者多列

常用的操作符：in，not in ，any，some，all(所有的值都得满足才行)

```sql
select * from emp where dept_id in (select id from dept where name = '销售部' or name = '市场部')

```

```sql
SELECT * from emp where salary > ALL(select salary from emp where dept_id in (select id from dept where name = '财务部'))
```

```sql
SELECT * from emp where salary > SOME(SELECT salary from emp where dept_id = (SELECT id FROM dept where id = '1'))
```

#### 行子查询

子查询返回得结果是一行，也可以是多行

常用操作符：=,<>,in ,not in

```sql
select * from emp where (salary,managerid) = (SELECT salary,managerid from emp where name = '张无忌');
```

#### 表子查询

子查询返回得结果是多行多列

常用得操作符：in

```sql
select * from emp where (job,salary) in (SELECT job ,salary from emp where name = '鹿杖客' or name = '宋远桥'
)
```

```sql
 SELECT * from (SELECT * from emp where entrydate > '2006-01-01'
) e left JOIN dept d ON e.dept_id = d.id
```

---

## 函数

### 字符串函数

1. concat(s1,s2,...sn)str 拼接
2. lower(str) 转换成小写
3. upper(str)转换成大写
4. lpad(str,n,pad)左填充，用字符串 pad 对 str 左进行填充，直到长度为 n 个字符串长度
5. rpad(str,n,pad)
6. trim(str)去除首尾的空格
7. substring(str,start,len)

```sql
SELECT CONCAT('XXX')
```

### 数值函数

1. ceil(x)向上取整
2. floor(x)向下取整
3. mod(x,y)返回 x/y 的模 取余
4. rand()返回 0~1 的随机数
5. round(x,y)求参数 x 的四舍五入的值，保留 y 位小数

### 日期函数

1. curdate() curret date 当前日期
2. curtime() 当前时间
3. now() 当前日期和时间
4. year(date)获取指定 date 的年
5. month(date)获取指定 date 的月
6. day(date)获取指定 date 的日
7. date_add(date,interval expr type)返回一个日期/时间值加上一个时间间隔 expr 后的时间值 SELECT DATE_ADD(now(),INTERVAL 20 day);
8. datediff(date1,date2)返回起始时间和结束时间之间的天数 diff

### 流程函数

IF(value,t,f)如果 value 为 true，则返回 t，否则返回 f 类似三元运算

ifnull(value1,value2)如果 value1 不为空，则返回 value1，否则返回 value2

case when [val1] then [res1] ... else [default] end case 如果 val1 为 true 返回 res1，否则返回 default 默认值

case [expr] when [val1] then [res1]...else [default] end case 如果 expr 的值等于 val1，返回 res1，...否则返回 default 默认值

---

# 存储引擎

## mysql 体系结构

连接层，服务层，引擎层，存储层

## 存储引擎简介

创建表时，指定存储引擎

```sql
create table (
	...
)engine = innodb [comment 'xx'];
```

```sql
show engines;查询当前数据库支持的引擎

```

## 存储引擎特点

> DML 操作遵循 ACID 模型，支持==事务==
>
> ==行级锁==，提高并发访问性能
>
> 支持==外键==foreign key 约束。

xxx.ibd `表名.ibd`存储该表的表结构(frm,sdi),数据和索引

## 存储引擎选择

默认使用 innodb 存储引擎，支持事务，支持行级锁，支持外键。

1. MyISAM 存储引擎：不支持事务，不支持外键，适合于==大数据量==的读写操作。

2. InnoDB 存储引擎：支持事务，支持外键，适合于==小数据量==的读写操作。

3. MEMORY 存储引擎：不支持事务，不支持外键，适合于==小数据量==的读写操作。

4. CSV 存储引擎：不支持事务，不支持外键，适合于==大数据量==的读写操作。

5. ARCHIVE 存储引擎：不支持事务，不支持外键，适合于==大数据量==的读写操作。

6. PERFORMANCE_SCHEMA 存储引擎：不支持事务，不支持外键，用于性能分析。

7. FEDERATED 存储引擎：不支持事务，不支持外键，用于联合查询

## 索引

> 索引是数据库系统中一个重要的概念，它是为了提高数据查询效率的一种**数据结构(有序)**，它是一个数据表里的**列或者多个列**，通过索引列的排序，快速定位数据记录的位置。

### 索引结构

| 索引结构            | 描述                                                                             |
| :------------------ | :------------------------------------------------------------------------------- |
| B+tree 索引         | 常见的索引类型，大部分引擎支持                                                   |
| Hash 索引           | 底层数据结构是用哈希表实现的，只有景区匹配索引列的查询才有效，不支持范围查询     |
| R-tree（空间索引）  | 空间索引是 MyISAM 引擎的一个特殊索引类型，主要用于地理空间数据类型，通常使用较少 |
| full-text(全文索引) | 是一种通过建立倒排索引，快速匹配文档的方式。类似于 Lucene,Solr,ES                |

二叉树结构

- 二叉树缺点：二叉树缺点：顺序插入时，会形成一个链表，查询性能大大降低。大数据量情况下，层级较深，检索速度慢。
- 红黑树：大数据量情况下，层级较深，检索速度慢。

B-Tree(多路平衡查找树)

> 以一颗最大度数(max-degree)为 5(5 阶)的 b-tree 为例每个节点最多存储 4 个 key,5 个指针

:::tip
树的度数指的是一个节点的子节点个数。5 阶为例子，每个节点最多存储 4 个 key,5 个指针，5 个子节点
:::

![b+tree](/assets/images/B+tree.png 'b+tree')

相对于 B-Tree 区别：

1. 所有的数据都会出现在叶子节点
2. 叶子节点形成一个单向链表

> MySQL 索引数据结构对经典的 B+Tree 进行了优化。在原 B+Tree 的基础上，增加一个指向相邻叶子节点的链表指针，就形成了带有顺序指针的 B+Tree,提高区间访问的性能。

:::info 思考：
为什么 InnoDB 存储引擎选择使用 B+tree 索引结构？

1. 相对于二叉树，层级更少，搜索效率高；
2. 对于 B-tree,无论是叶子节点还是非叶子节点，都会保存数据，这样导致一页中存储的键值减少，指针跟着减少，要同样保存大量数据，只能增加树的高度，导致性能降低；
3. 相对 Hash 索引，B+tree 支持范围匹配及排序操作；
   :::

聚集索引和二级索引

- 聚集索引：聚集索引就是数据行的物理顺序与键值的逻辑顺序相同，一个表只能有一个聚集索引，一个表只能有一个聚集索引。

- 二级索引：二级索引是一种索引结构，它可以在一个索引上建立索引，而不是直接在表上建立索引。

1. 聚集索引：聚集索引的叶子节点存放的就是数据，通过主键索引查找数据，效率最高。
2. 二级索引：二级索引是索引结构，它可以在一个索引上建立索引，而不是直接在表上建立索引。

### 索引类型

- 主键索引：主键索引是一种特殊的索引，主键索引的唯一性保证了表中每一行数据的唯一性。
- 唯一索引：唯一索引是一种非聚集索引，它可以保证数据唯一性。
- 外键索引：外键索引是一种非聚集索引，它可以保证外键的正确性，外键是指被引用表中的关联列，可以保证外键的正确性。
- 普通索引：普通索引是一种聚集索引，它可以提高查询效率。
- 聚簇索引：聚簇索引是一种聚集索引，它可以提高查询效率。

### 索引选择

- 选择唯一索引：唯一索引的唯一性保证了表中每一行数据的唯一性，可以作为主键索引，也可以作为唯一索引。
- 选择普通索引：普通索引是一种聚集索引，它可以提高查询效率。
- 选择聚簇索引：聚簇索引是一种聚集索引，它可以提高查询效率。
- 选择复合索引：复合索引是一种多列索引，可以提高查询效率。
- 选择前缀索引：前缀索引是一种索引，它可以提高查询效率。
- 选择覆盖索引：覆盖索引是一种索引，它可以减少查询的次数。
- 选择索引列顺序：索引列的顺序可以提高查询效率。
- 选择索引列数据类型：索引列的数据类型可以提高查询效率。
- 选择索引列的存储长度：索引列的存储长度可以提高查询效率。
- 选择索引列的分布：索引列的分布可以提高查询效率。

### 索引语法

创建索引

```sql
CREATE [UNIQUE|FULLTEXT] INDEX index_name ON table_name (index_column_name,...);
```

查看索引

```sql
SHOW INDEX FROM table_name;
```

删除索引

```sql
DROP INDEX index_name ON table_name;
```

### sql 性能分析

sql 执行频率

```sql
SHOW GLOBAL STATUS LIKE 'Com_______'
```

#### 慢查询日志

> 慢查询日志记录了所有执行时间超过指定参数(long*query*.time,单位：秒，默认 10 秒)的所有 SQL 语句的日志。 MySQL 的慢查询日志默认没有开启，需要在 MySQL 的配置文件(/etc/my.cnf)中配置如下信息：

\#查看 mysql 慢日志查询开关 <br>
`show variables like 'slow_query_log';`
<br>
\#开启 mysql 慢日志查询开关

```sql
slow_query_log = 1
```

\#设置 mysql 慢日志查询时间

```sql
long_query_time = 10
```

配置完毕之后，通过以下指令重新启动 MySQL 服务器进行测试，查看慢日志文件中记录的信息/var/lib/mysql/localhost-slow.log

#### profile 详情

> show profiles 能够在做 SQL 优化时帮助我们了解时间都耗费到哪里去了。通过 nave profiling 参数，能够看到当前 MySQL 是否支持

```sql
select @@have_profiling;
```

默认是关闭的，可以通过 set 语句在 session/global 级别开启，如：

```sql
set profiling = 1;
```

\# 查看每一条 sql 的耗时情况

```sql
show profiles;
```

\#查看指定 query id 的 SQL 语句各个阶段的耗时情况

```sql
show profile for query query_id;
```

\#查看指定 query id 的 SQL 语句 CPU 的使用情况

```sql
show profile cpu for query query_id;
```

#### explain 执行计划

> EXPLAIN 或者 DESC 命令获取 MySQL 如何执行 SELECT 语句的信息，包括在 SELECT 语句执行过程中表如何连接和连接的顺序。

```sql
#直接在select语句之前加上关键字explain/desc
EXPLAIN SELECT 字段列表 FROM 表名 WHERE 条件；
```

EXPLAIN 执行计划各字段含义：

- Id select 查询的序列号，表示查询中执行 select 子句或者是操作表的顺序(id 相同，执行顺序从上到下；id 不同，值越大，越先执行)。
- select type 表示 SELECT 的类型，常见的取值有 SIMPLE(简单表，即不使用表连接或者子查询)、PRIMARY(主查询，即外层的查询)、 UNION(UNION 中的第二个或者后面的查询语句)、SUBQUERY(SELECT/WHERE 之后包含了子查询)等
- type 表示连接类型，性能由好到差的连接类型为 `NULL、system、const、eq_ref、ref、range、index、all。 possible key`
- possible_key 显示可能应用在这表上的索引，一个或多个

- Key 实际使用的索引，如果为 NU 儿 L,则没有使用索引。

- Key_len 表示索引中使用的字节数，该值为索引字段最大可能长度，并非实际使用长度，在不损失精确性的前提下，长度越短越好。

- rows MySQL 认为必须要执行查询的行数，在 innodb 引擎的表中，是一个估计值，可能并不总是准确的。

- filtered 表示查询的百分比，可能会有些偏差，因为这个值是通过查询过程中的计算得出的，所以是一个估计值。

### 索引使用

在未建立索引之前，执行如下 SQL 语句，查看 SQL 的耗时。

```sql
SELECT FROM tb sku WHERE sn ='100000003145001';
```

针对字段创建索引

```sql
create index idx_sku_sn on tb_sku(sn);
```

然后再次执行相同的 SQL 语句，再次查看 SQL 的耗时。

```sql
SPLECT FROM tb sku WHERE sn ='100000003145001';
```

#### 最左前缀法则

如果索引了多列（联合索），要遵守最左前缀法则。最左前缀法则指的是查询从索的最左列开始，并且不跳过索引中的列如果跳跃某一列，**索引将部分失效(后面的字段索引失效)**。

```sql
explain select*from tb_user where profession='软件工程'and age=31 and status='o';
```

```sql
explain select*from tb_user where profession='软件工程'and age=31;
```

```sql
explain select*from tb_user where profession='软件工程';
```

```sql
explain select from tb user where age =31 and status ='0';
```

```sql
explain select from tb_user where status ='0';
```

#### 范围查询

范围查询右边的查询条件将失效，出现范围查询（>,<）(条件允许下，尽量使用>=，<=)

```sql
explain select*from tb user where profession='软件工程'and.age>30 and status='o';
explain select*from tb_user where profession='软件工程and age>= 30 and status='o';
```

#### 索引列运算

不要再索引列上进行运算操作，**索引将失效**

```sql
explain select from tb_user where substring(phone,10,2)='15';
```

#### 字符串不加引号

字符串类型字段使用时，不加引号，**索引将失效**

```sql
explain select * from tb_user where profession ='软件工程 and age=31 and status=O;

explain select * from tb_user where phone 17799990015;
```

#### 模糊匹配

如果仅仅是尾部模糊匹配，索引不会失效。如果是头部模糊匹配，索引失效。

```sql
select * from tb_user where profession like '%工程';

select * from tb_user where profession like '软件%'; √

select * from tb_user where profession like '%工%';
```

#### or 连接的条件

> 用 o 分割开的条件，如果 o 前的条件中的列有索引，而后面的列中没有索引，那么涉及的索引都不会被用到。(只有两次都有索引才生效)

```sql
explain select from tb_user where id 10 or age =3;
explain select from tb_user where phone ='17799990017'or age 23;
```

#### 数据分布影响

**_如果 mysql 评估使用索引比全表慢，则不使用索引_**

#### sql 提示
