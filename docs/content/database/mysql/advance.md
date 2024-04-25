---
outline: deep
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

\#查看 mysql 慢日志查询开关

`show variables like 'slow_query_log';`

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

> SQL 提示，是优化数据库的一个重要手段，简单来说，就是在 SQL 语句中加入一些人为的提示来达到优化操作的目的。

use index:

```sql
explain select*  from tb_user use index(idx_user._pro) where profession='软件工程'；
```

ignore index：

```sql
explain select * from tb_user ignore index(idx_user._pro) where profession='软件工程'：
```

force index：

```sql
explain select * from tb_user force index(idx_user._pro) where profession='软件工程'：
```

#### 索引失效场景

- 索引列类型不匹配：索引列类型不匹配，索引失效。
- 索引列运算：索引列运算，索引失效。
- 字符串不加引号：字符串不加引号，索引失效。
- 模糊匹配：模糊匹配，索引失效。
- or 连接的条件：or 连接的条件，索引失效。
- 如果 mysql 评估走全部扫描比索引快，索引失效。

#### 覆盖索引

> 尽量使用覆盖索引（查询使用了索引，并且需要返回的列，在该索引中已经全部能够找到），减少 **select \***。

```sql
explain select id,profession from tb user where profession=''and age=31 and status ='0';
explain select id,profession,age,status from tb_user where profession =and age=31 and status ='0';
explain select id,profession,age,status,name from tb_user where profession and age =31 and status='0';
explain select*from tb_user where profession='软件工程'and age=31 and status='o';
```

:::tip 提示：
`using index condition`查找使用了索引，但是需要回表查询数据
`using where;using index`查找使用了索引，但是需要的数据都在索引列中能找到，所以不需要回表查询数据
:::

#### 前缀索引

> 当字段类型为字符串(varchar,text 等)时，有时候需要索引很长的字符串，这会让索引变得很大，查询时，浪费大量的磁盘 O,影响查询效率。此时可以只将字符串的一部分前缀，建立索引，这样可以大大节约索引空间，从而提高索引效率。

语法：

```sql
create index idx_name on tb_name(name(10));前10个字符设置索引
```

前缀长度：

1. 较短的前缀长度，索引占用空间较小，查询效率较高，但是索引失效的概率较大。
2. 较长的前缀长度，索引占用空间较大，查询效率较低，但是索引失效的概率较低。
3. 前缀长度的选择，需要根据实际情况进行选择。

```sql
select count(distinct email)/count(*)from tb_user
select count(distinct substring(email,1,5))/count(*)from tb_user
```

#### 单列索引与联合索引

- 单列索引：索引列只有一个，索引的结构较为简单，查询效率较高。
- 联合索引：索引列有多个，索引的结构较为复杂，查询效率较低。

#### 索引设计原则

1. 针对于数据量较大，且查询比较频繁的表建立索引。
2. 针对于常作为查询条件(where)、排序(order by）、分组(group by)操作的字段建立索引。
3. 尽量选择区分度高的列作为索引，尽量建立唯一索引，区分度越高，使用索引的效率越高。
4. 如果是字符串类型的字段，字段的长度较长，可以针对于字段的特点，建立前缀索引。
5. 尽量使用联合索引，减少单列索引，查询时，联合索引很多时候可以覆盖索引，节省存储空间，避免回表，提高查询效率。
6. 要控制索引的数量，索引并不是多多益善，索引越多，维护索引结构的代价也就越大，会影响增删改的效率。
7. 如果索引列不能存储 NULL 值，请在创建表时使用 NOT NULL 约束它。当优化器知道每列是否包含 NULL 值时，它可以更好地确定哪个索引最有效地用于查询。

## sql 优化 {sql-optimization}

### 插入数据

insert 优化：

- 批量插入：一次性插入多条数据，减少网络传输，提高插入效率。

```sql
insert into tb_test values(1,'tom'),(2,'cat'),(3,'jetrty')
```

手动提交事务

```sql
start transaction;
insert into tb_test values(1,'tom'),(2,'cat'),(3,'jetrty');
insert into tb_test values(4,'tom'),(5,'cat'),(6,'jetrty');
insert into tb_test values(7,'tom'),(8,'cat'),(9,'jetrty');
commit;
```

主键顺序插入

```sql
主键乱序插入：8192188241589573主键顺序插入：1234578915218889
```

#### 大批量插入数据

如果一次性需要插入大批量数据，使用 `insert` 语句插入性能较低，此时可以使用 MySQL 数据库提供的`load`指令进行插入。操作如下：

![大批量插入数据](/assets/images/大批量插入.png)

```sql
#客户端连接服务端时，加上参数-local--infile
mysql--local-infile -u root -p

#设置全局参数local infile:为1，开启从本地加载文件导入数据的开关
set global local infile =1;

#执行load指令将准备好的数据，加载到表结构中
load data local infile '/root/sql1.log' into table tb_user fields terminated by ',' lines terminated by '\n'
```

### 主键优化

#### 数据组织方式

在 InnoDB 存储引擎中，表数据都是根据主键顺序组织存放的，这种存储方式的表称为**索引组织表**(index organized table IOT)。

![innodb存储结构](/assets/images/innodb存储结构.png)
![逻辑存储结构](/assets/images/逻辑存储结构.png)

#### 页分裂

> 页可以为空，也可以填充一半，也可以填充 100%。每个页包含了 2-N 行数据（如果一行数据多大，会行溢出），根据主键排列。

![主键顺序插入](/assets/images/主键顺序插入.png)

![主键乱序插入](/assets/images/主键乱序插入.png)

#### 页合并

当删除一行记录时，实际上记录并没有被物理删除，只是记录被标记(flaged)为删除并且它的空间变得允许被其他记录声明使用。
当页中删除的记录达到 MERGE THRESHOLD(默认为页的 50%)，InnoDB 会开始寻找最靠近的页（前或后）看看是否可以将两个页合并以优化空间使用。

![页合并1](/assets/images/页合并1.png)
![页合并2](/assets/images/页合并2.png)

:::tip 知识小贴士：
MERGE THRESHOLD:合并页的阈值，可以自己设置，在创建表或者创建索引时指定。
:::

#### 主键设计原则

1. 满足业务需求情况下，尽量降低主键的长度
2. 插入数据时，尽量选择顺序插入，选择使用 `AUTO INCREMENT` 自增主键。
3. 尽量不要使用 `UUID` 做主键或者是其他自然主键，如身份证号。
4. 业务操作时，避免对主键的修改。

### order by 优化

1. Using filesort:通过表的索引或全表扫描，读取满足条件的数据行，然后在排序缓冲区 sort buffer 中完成排序操作，所有不是通过索引直接返回排序结果的排序都叫 FileSort 排序。
2. Using index:通过有序索引顺序扫描直接返回有序数据，这种情况即为 using index,不需要额外排序，操作效率高。

```sql
#没有创建索引时，根据age,phone:进行排序
explain select id,age,phone from tb_user order by age,phone;
#创建索引
create index idx_user_age_phone aa on tb_user(age,phone);
#创建索引后，根据age,phone进行升序排序
explain select id,age,phone from tb_user order by age,phone;
#创建索引后，根据age,phone进行降序排序
explain select id,age,phone from tb_user order by age desc,phone desc
---
#根据age,phone:进行降序一个升序，一个降序
explain select id,age,phone from tb user order by age asc,phone desc;
#创建索引
create index idx user age phone ad on tb user(age asc ,phone desc);
#根据age,phone进行降序一个升序，一个降序
explain select id,age,phone from tb_user order by age asc,phone desc;
```

总结：

1. 根据排序字段建立合适的索引，多字段排序时，也遵循最左前缀法则。
2. 尽量使用覆盖索引（不要用`select *`）。
3. 多字段排序，一个升序一个降序，此时需要注意联合索引在创建时的规则(`ASC/DESC`)。
4. 如果不可避免的出现 filesort,大数据量排序时，可以适当增大排序缓冲区大小 sort buffer size(默认 256k)。

### group by 优化

```sql
#删除掉目前的联合索引idx_user_pro_age_sta
drop index idx_user_pro_age_sta on tb_user;
#执行分组操作，根据profession字段分组
explain select profession,count(*)from tb_user group by profession
#创建索引
Create index idx_user_pro_age_sta on tb_user(profession,age,status);
#执行分组操作，根据profession字段分组
explain select profession,count(*)from tb_user group by profession;
#执行分组操作，根据profession字段分组
explain select profession,count()from tb_user group by profession,age;
```

> 在分组操作时，可以通过索引来提高效率。分组操作时，索引的使用也是满足最左前缀法则的。

### limit 优化

> 一个常见又非常头疼的问题就是 limit2000000,10,此时需要 MySQL 排序前 2000010 记录，仅仅返回 2000000-2000010 的记录，其他记录丢弃，查询排序的代价非常大。

优化思路：一般分页查询时，通过创建覆盖索引能够比较好地提高性能，可以通过覆盖索引加子查询形式进行优化。

```sql
explain select from tb_sku t,(select id from tb_sku order by id limit 2000000,10) a where t.id = a.id;
```

### count 优化

```sql
explain select count(*) from tb user;
```

> MyISAM 引擎把一个表的总行数存在了磁盘上，因此执行 cout(\*)的时候会直接返回这个数，效率很高；
> InnoDB 引擎就麻烦了，它执行 count(\*)的时候，需要把数据一行一行地从引擎里面读出来，然后累积计数。

优化思路：自己计数。

count 的几种用法

- count()是一个聚合函数，对于返回的结果集，一行行地判断，如果 cout 函数的参数不是 NULL,累计值就加 1，否则不加，最后返回累计值。
- 用法：count(\*)、count(主键)、count(字段)、count(1)

1. count(主键) InnoDB 引擎会遍历整张表，把每一行的主键 i 心值都取出来，返回给服务层。服务层拿到主键后，直接按行进行累加（主键不可能为 null)
2. count(字段) 没有 not null 约束：InnoDB 引擎会遍历整张表把每一行的字段值都取出来，返回给服务层，服务层判断是否为 null,不为 null,计数累加。有 not null 约束：InnoDB 引擎会遍历整张表把每一行的字段值都取出来，返回给服务层，直接按行进行累加。
3. count(1) InnoDB 引擎遍历整张表，但不取值。服务层对于返回的每一行，放一个数字"1”进去，直接按行进行累加。(**如果不是 null 则为 1，并且累加，如果是 null 则不累加**)
4. count(\*) InnoDB 引擎并不会把全部字段取出来，而是专门做了优化，不取值，服务层直接按行进行累加。

按照效率排序的话，count(字段)<count(主键 id)<count(1)≈count(\*),所以尽量使用 count(\*)

### update 优化

```sql
update student set no='2000100100'where id=1;
update student set no='2000100105'where name=韦一笑'；
```

:::warning
InnoDB 的行锁是针对**索引**加的锁，不是针对记录加的锁，并且该索引不能失效，否则会从行锁升级为**表锁**（并发性能降低）。
:::

## 视图

视图(View)是一种虚拟存在的表。视图中的数据并不在数据库中实际存在，行和列数据来自定义视图的查询中使用的表，并且是在使用视图时动态生成的。

通俗的讲，视图只保存了查询的 SQL 逻辑，不保存查询结果。所以我们在创建视图的时候，主要的工作就落在创建这条 SQL 查询语句上。

### 创建

```sql
CREATE [OR REPLACE] VIEW 视图名称[(列名列表)] AS SELECT语句 [WITH[CASCADED | LOCAL] CHECK OPTION]
```

```sql
#创建视图
create or replace view stu_v_1 as select id,name from student where id <10
```

```sql
#查询视图
查看创建视图语句：SHOW CREATE VIEW视图名称：查看视图数据：SELECT * FROM 视图名称…；
```

```sql
#修改视图
方式一：CREATE [OR REPLACE] VIEW视图名称[(列名列表)]AS SELECT语句[WITH[CASCADED|LOCAL]CHECK OPTION]
方式二：ALTER VIEW视图名称 [(列名列表)]AS SELECT语句[WITH[CASCADED|LOCAL]CHECK OPTION]
```

```sql
#删除视图
DROP VIEW[IF EXISTS] 视图名称[,视图名称]...
```

### 视图检查选项

> 当使用 WITH CHECK OPTION 子句创建视图时，MySQL 会通过视图检查正在更改的每个行，例如插入，更新，删除，以使其符合视图的定义。MySQL 允许基于另一个视图创建视图，它还会检查依赖视图中的规则以保持一致性。为了确定检查的范围，Mysql 提供了两个选项： CASCADED 和 LOCAL,默认值为 CASCADED。

![](/assets/images/视图检查.png)

(上图解：v3 没有视图检查，v2 依赖于 v1，所以 v1 也会有 v2 的检查选项)

加上 cascaded check option 就相当于加上限制条件,基于上层表满足的条件才可以执行,(cascaded 每一层都满足，local 只有存在 check option 的满足)

![](/assets/images/视图检查选项-local.png)

(上图解：v3 没有视图检查，v2 依赖于 v1（视图检查选项为 local),递归到 v1，v1 不存在 local option)

### 视图的更新

要使视图可更新，视图中的行与基础表中的行之间必须存在一对一的关系。如果视图包含以下任何一项，则该视图不可更新：

1. 聚合函数或窗口函数(SUM()、MIN()、MAX()、COUNT()等)
2. DISTINCT
3. GROUP BY
4. HAVING
5. UNION、UNION ALL、INTERSECT、EXCEPT

```sql
create view stu_v_count as select count(*)from student;
insert into stu_v_count values(10);#报错
```

### 作用

简单

视图不仅可以简化用户对数据的理解，也可以简化他们的操作。那些被经常使用的查询可以被定义为视图，从而使得用户不必为以后的操作每次指定全部的条件。

安全

数据库可以授权，但不能授权到数据库特定行和特定的列上。通过视图用户只能查询和修改他们所能见到的数据

## 存储过程

封装，复用，可以接收参数，也可以返回数据减少网络交互，效率提升

（mysql 语句封装）

### 基本语法

#### 创建

```sql
CREATE PROCEDURE 存储过程名称([参数列表]) BEGIN

      --SQL语句

END;
```

#### 调用

```sql
CALL CALL名称([参数])
```

#### 查看

```sql
SELECT * FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_SCHEMA='itcast';--查询指定数据库的存储过程及状态信息
SHOW CREATE PROCEDURE 存储过程名称；--查询某个存储过程的定义
```

#### 删除

```sql
DROP PROCEDURE[IF EXISTS]存储过程名称；
```

在命令行操作需要 修改`delimiter $$`

```sql
CREATE PROCEDURE 存储过程名称([参数列表]) BEGIN

      --SQL语句

END$$
```

### 变量

> 系统变量是 MySQL 服务器提供，不是用户定义的，属于服务器层面。分为全局变量(GLOBAL)、会话变量(SESSION)。

#### 系统变量

```sql
SHOW [SESSION | GLOBAL] VARIABLES; --查看所有系统变量

SHOW [SESSION | GLOBAL] VARIABLES LIKE '...';--可以通过LKE模糊匹配方式查找变量

SELECT @@[SESSION|GLOBAL].系统变量名；--查看指定变量的值
```

设置系统变量

```sql
SET [SESSION|GLOBAL]系统变量名=值；

SET @@[SESSION|GLOBAL]系统变量名=值;
```

:::tip 注意：
如果没有指定 SESSION/GLOBAL,默认是 SESSION,会话变量。

Mysq 服务重新启动之后，所设置的全局参数会失效，要想不失效，可以在`/etc/my.cnf`中配置。
:::

#### 自定义变量

> 用户定义变量是用户根据需要自己定义的变量，用户变量不用提前声明，在用的时候直接用“`@变量名`”使用就可以。其作用域为当前连接。

```sql
#赋值
SET @var_name = expr [,@var_name = expr]... ;

SET @var_name := expr [,@var_name :=expr]...;

例：set @myage := 10,@myname := 'laoyang'

SELECT @var_name := expr [ ,@var_name :=expr]...;

SELECT 字段名 INTO @var_name FROM 表名；

例：select count(*) into @mycount from tb_user;
```

```sql
#使用
SELECT @var_name [,@var_name...]；
```

:::tip 注意：
用户定义的变量无需对其进行声明或初始化，只不过获取到的值为 NULL。

select @abc -- NULL
:::

#### 局部变量

> 局部变量是根据需要定义的在局部生效的变量，访问之前，需要 DECLARE 声明。可用作存储过程内的局部变量和输入参数，局部变量的范围是在其内声明的 BEGIN...END 块。

```sql
DECLARE 变量名 变量类型 [DEFAULT..];
```

变量类型就是数据库字段类型：INT、BIGINT、CHAR、VARCHAR、DATE、TIME 等。

赋值

```sql
SET 变量名=值;

SET 变量名：=值;

SELECT 字段名 INTO 变量名 FROM 表名...;
```

局部变量 -- **_作用域在 begin 和 end 之间_**

```sql
create procedure p2()
begin
   declare stu_count int default 0;
   select count(*) into stu_count from tb_user;
   select stu_count; --使用
end;

call p2()
```

### if 判断

语法：

```sql
IF 条件1 THEN
   ...
ELSEIF 条件2 THEN --可选
   ...
ELSE --可选
   ...
END IF;
```

练习：

_根据定义的分数 score 变量，判定当前分数对应的分数等级。_

1. score>=85 分，等级为优秀。
2. score>=60 分且 score<85 分，等级为及格。
3. score<60 分，等级为不及格。

```sql
create procedure p3()
begin
   declare score int default 58; --局部变量
   declare result varchar(10); --局部变量

   if score>=85 then
      set result = '优秀';
   elseif score>=60 then
      set result = '及格';
   else
      set result = '不及格';
   end if;

   select result; --查看result
end;


call p3() -- 不及格
```

### 参数(in, out, inout)

| 类型  | 含义                                         |
| :---- | -------------------------------------------- |
| in    | 该类参数作为输入，也就是需要调用时传入值     |
| out   | 该类参数作为输出，也就是该参数可以作为返回值 |
| inout | 既可以作为输入参数，也可以作为输出参数       |

```sql
CREATE PROCEDURE 存储过程名称([IN/OUT/INOUT参数名 参数类型])
BEGIN
  --SQL语句
END;
```

```sql
create procedure p4(in score int,out result varchar(10))
begin
   if score>=85 then
      set result = '优秀';
   elseif score>=60 then
      set result = '及格';
   else
      set result = '不及格';
   end if;
end;


call p4(58,@result)

select @result;  -- 不及格
```

--将传入的 200 分制的分数，进行换算，换算成百分制，然后返回分数-->inout

```sql
create procedure p5(inout score double)
begin
   set score := score * 0.5;
end;

set @result = 78

call p5(@result)

select @result;  -- 不及格
```

### case

语法一

```sql
CASE case_value
    WHEN when_value1 THEN statement_list1 [WHEN when_value2 THEN statement_list 2]...
    [ELSE statement list]
END CASE;
```

语法二

```sql
CASE
   WHEN search_condition1 THEN statement_list1
   [WHEN search_condition2 THEN statement_list2]...
   [ELSE statement_list]
END CASE;
```

根据传入的月份，判定月份所属的季节（要求采用 `CASE` 结构）。

1. 1-3 月份，为第一季度
2. 4-6 月份，为第二季度
3. 7-9 月份，为第三季度
4. 10-12 月份，为第四季度

```sql
create procedure p6(in month int)
begin
  declare result varchar(10);

  case
    when month between 1 and 3 then set result := '第一季度';
    when month between 4 and 6 then set result := '第二季度';
    when month between 7 and 9 then set result := '第三季度';
    when month between 10 and 12 then set result := '第四季度';
    else set result := '月份不在范围内';
  end case;

  select concat('你输入的月份为：',month,',所属的季度是：',result);
end;

call p6(4) --您输入的月份为：4，所属的季度为：第二季度
```

### while

> whil 循环是有条件的循环控制语句。满足条件后，再执行循环体中的 SQL 语句。具体语法为：

```sql
#先判定条件，如果条件为tue,则执行逻辑，否则，不执行逻辑
WHILE 条件 DO
  SQL逻辑...
END WHILE;
```

while 计算从 1 累加到的值，n 为传入的参数值

```sql
create procedure p7(in n int)
begin
  -- declare i int default 1;
  declare sum int default 0;

  while n>0 do
    set sum := sum + n;
    set n := n - 1;
  end while;

  select sum;
end;

call p7(100)
```
