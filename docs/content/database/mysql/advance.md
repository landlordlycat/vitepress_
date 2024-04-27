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

### repeat

> repeat 是有条件的循环控制语句，当满足条件的时候退出循环。具体语法为：

```sql
REPEAT
  SQL逻辑...
UNTIL 条件
END REPEAT;
```

计算从 1 累加到 10 的值

```sql
create procedure p8(in n int)
begin
   declare total int default 0;
   repeat
      set total := total + n
      set n := n - 1
   until n <= 0
   end repeat;

   select total;
end;

call p8(10) -- 55
```

### loop

> LOOP 实现简单的循环，如果不在 SQL 逻辑中增加退出循环的条件，可以用其来实现简单的死循环。LOOP 可以配合一下两个语句使用：

- LEAVE:配合循环使用，退出循环。
- ITERATE:必须用在循环中，作用是跳过当前循环剩下的语句，直接进入下一次循环。

```sql
# 无限循环
[begin_label:]loop
  SQL逻辑...
end loop [end_label];

LEAVE label; --退出指定标记的循环体（`break`）
ITERATE label;--直接进入下一次循环(`continue`)
```

1. 计算从 1 累加到 n 的值，n 为传入的参数值。

```sql
create procedure p9(in n int)
begin
   declare total int default 0;
   sum:loop
      if n<=0 then
        leave sum;
      end if;
      set total := total + n
      set n := n - 1;
   end loop sum

   select total;
end;

call p9(10) --55
```

---

2. 计算从 1 到 n 之间的偶数累加的值，n 为传入的参数值。

```sql
create procedure p10(in n int)
begin
   declare total int default 0;
   sum:loop
      if n<=0 then
        leave sum;
      elseif n%2<>0 then
        set n := n - 1;
        iterate sum;
      end if;
      set total := total + n
      set n := n - 1;
   end loop sum

   select total;
end;

call p10(10) --30
```

### cursor

> 游标(CURSOR)是用来存储查询结果集的数据类型，在存储过程和函数中可以使用游标对结果集进行循环的处理。游标的使用包括游标的声明、OPEN、FETCH 和 CLOSE,其语法分别如下。

声明游标

```sql
DECLARE 游标名称 CURSOR FOR 查询语句；
```

打开游标

```sql
OPEN 游标名称
```

获取游标记录

```sql
FETCH 游标名称 INTO 变量[,变量]；
```

关闭游标

```sql
CLOSE 游标名称
```

根据传入的参数 uage,来查询用户表 tb_user 中，所有的用户年龄小于等于 uage 的用户姓名(name)和专业( profession),并将用户的姓名和专业插入到所创建的一张新表(id,name,profession)中。

- **逻辑**：

1. 声明游标，存情查询结果集
   准备：创建表结构
2. 开启游标
3. 获取游标中的记录
4. 插入数据到新表中
5. 关闭游标

```sql{7}
create procedure p11(in uage int)
begin
   declare uname varchar(100);
   declare upro varchar(100);

   declare u_cursor cursor for select name,profession from tb_user where age <= uage;
   declare EXIT handler for sqlstate '02000' close u_cursor;

   drop table if exists tb_user_pro;

   create table if not exists tb_user_pro(
      id int primary key auto_increment,
      name varchar(100),
      profession varchar(20)
   )

   open u_cursor;

   while true do
      fetch u_cursor into uname,upro;
      insert into tb_user_pro values(null,uname,upro);
   end while
   close u_cursor;
end;

call p11(20)
```

### 条件处理程序

> 条件处理程序(Handler)可以用来定义在流程控制结构执行过程中遇到问题时相应的处理步骤。具体语法为：

```sql
DECLARE handler_action HANDLER FOR condition_value [,condition_value]...statement;
handler_action:
   CONTINUE:继续执行当前程序
   EXIT:终止执行当前程序
condition_value:
   SQLSTATE sqlstate_value:状态码，如02000
   SQLWARNING:所有以01开头的SQLSTATE代码的简写
   NOT FOUND:所有以02开头的SQLSTATE代码的简写
   SQLEXCEPTION:所有没有被SQLWARNING或NOT FOUND捕获的SQLSTATE代码的简写
```

## 存储函数

> 存储函数是有返回值的存储过程，存储函数的参数只能是 `IN` 类型的。具体语法如下：

```sql
CREATE FUNCTION 存储函数名称([参数列表]) RETURNS type [characteristic...]
BEGIN
   --SQL语句
   RETURN ...;
END;

characteristici说明：

- DETERMINISTIC:相同的输入参数总是产生相同的结果
- NO SQL:不包含SQL语句。
- READS SQL DATA:包含读取数据的语句，但不包含写入数据的语句。
```

```sql
create function fun1(n int)
returns int DETERMINISTIC
begin
   declare total int default 0;

   while n>0 do
      set total := total + n;
      set n := n - 1;
   end while;

   return total;
end;

select fun1(100) --5050
```

## 触发器

> 触发器是与表有关的数据库对象，指在`insert/update/delete `之前或之后，触发并执行触发器中定义的 `SQL` 语句集合。触发器的这种特性可以协助应用在数据库端确保数据的完整性，日志记录，数据校验等操作。<br>
> 使用别名 `OLD` 和 `NEW` 来引用触发器中发生变化的记录内容，这与其他的数据库是相似的。现在触发器还只支持行级触发，不支持语句级触发。

| 触发器类型      | NEW 和 OLD                                             |
| --------------- | ------------------------------------------------------ |
| INSERT 型触发器 | NEW 表示将要或者已经新增的数据                         |
| UPDATE 型触发器 | OLD 表示修改之前的数据，NEW 表示将要或已经修改后的数据 |
| DELETE 型触发器 | OLD 表示将要或者已经删除的数据                         |

- 语法

\> 创建

```sql
CREATE TRIGGER trigger_name
BEFORE/AFTER INSERT/UPDATE/DELETE ON tbl_name FOR EACH ROW --行级触发器
BEGIN
   trigger_stmt;
END;
```

:::details 查看

```sql
SHOW TRIGGERS;
```

:::
:::details 删除

```sql
DROP TRIGGER [schema_name.]trigger_name; --如果没有指定schema_name,默认为当前数据库
```

:::

**练习**：

通过触发器记录 `tb_user` 表的数据变更日志，将变更日志插入到日志表 `tb_user_logs` 中，包含增加，修改，删除；

```sql
create table user_logs(
   id int(11)not null auto_increment, operation varchar(20)not null comment'操作类型,insert/update/delete', operate_time datetime not null comment'操作时间'，
   operate_id int(11)not null comment'操作的1D',
   operate_params varchar(500)comment'操作参数,
   primary key(`id`))engine=innodb default charset=utf8;
```

\# 插入数据触发器

```sql
create trigger tb_user_insert_trigger
   after insert on tb_user for each row
begin
   insert into user_logs(id,operation,operate_time,operate_id,operate_params) values(null,'insert',now(),new.id,concat('插入的数据内容为：id=',new.id,' name=',new.name,'phone=',new.phone,'email=',new.email,'profession=',new.profession));
end;
```

类似于一个拦截器，在执行了插入语句后，触发器就开始进行插入日志语句到相应的表中。以此类推（`update/delete` 同理）

\# 更新数据触发器

```sql
create trigger tb_user_update_trigger
   after update on tb_user for each row
begin
   insert into user_logs(id,operation,operate_time,operate_id,operate_params) values(null,'update',now(),new.id,concat('修改前的数据为：id=',old.id,' name=',old.name,'phone=',old.phone,'email=',old.email,'profession=',old.profession,'| 修改后的数据为：id=',new.id,' name=',new.name,'phone=',new.phone,'email=',new.email,'profession=',new.profession));
end;
```

\# 删除数据触发器

```sql
create trigger tb_user_delete_trigger
   after delete on tb_user for each row
begin
   insert into user_logs(id,operation,operate_time,operate_id,operate_params) values(null,'delete',now(),old.id,concat('删除前的数据为：id=',old.id,' name=',old.name,'phone=',old.phone,'email=',old.email,'profession=',old.profession));
end;
```

总结：

1. 视图(`VIEW`)
   > 虚拟存在的表，不保存查询结果，只保存查询的 SQL 逻辑简单<br>
   > 安全、数据独立
2. 存储过程(`PROCEDURE`)
   > 事先定义并存储在数据库中的一段 SQL 语句的集合。
   > 减少网络交互，提高性能、封装重用
   > 变量、if、Case、参数(in/out/inout)、while、repeat、loop、cursor、 handler
3. 存储函数(`FUNCTION`)
   > 存储函数是有返回值的存储过程、参数类型只能为`IN`类型
   > 存储函数可以被存储过程替代
4. 触发器(`TRIGGER`)
   > 可以在表数据进行引 NSERT、UPDATE、DELETE 之前或之后触发
   > 保证数据完整性、日志记录、数据校验

## 锁

> 锁是计算机协调多个进程或线程并发访问某一资源的机制。在数据库中，除传统的计算资源(CPU、RAM、I/O)的争用以外，数据也是一种供许多用户共享的资源。如何保证数据并发访问的一致性、有效性是所有数据库必须解决的一个问题，锁冲突也是影响数据库并发访问性能的一个重要因素。从这个角度来说，锁对数据库而言显得尤其重要，也更加复杂。

- 分类
  MySQL 中的锁，按照锁的粒度分，分为以下三类：

1. 全局锁：锁定数据库中的所有表。
2. 表级锁：每次操作锁住整张表。
3. 行级锁：每次操作锁住对应的行数据。

### 全局锁

> 全局锁就是对整个数据库实例加锁，加锁后整个实例就处于只读 DQL 状态，后续的 DML 的写语句，DDL 语句，已经更新操作的事务提交语句都将被阻塞。<br>
> 其典型的使用场景是做全库的逻辑备份，对所有的表进行锁定，从而获取一致性视图，保证数据的完整性。

```sql
flush tables with read lock;

mysqldump -h 192.168.200.202 -u root -p xxx db01 > D:/db01.sql

unlock tables;
```

![全局锁-演示](/assets/images/全局锁-演示.png)

只能查不能操作

```sql
mysqldump -h 192.168.200.202 -u root -p xxx db01 > D:/db01.sql
```

- 特点

数据库中加全局锁，是一个比较重的操作，存在以下问题：

1. 如果在主库上备份，那么在备份期间都不能执行更新，业务基本上就得停摆。
2. 如果在从库上备份，那么在备份期间从库不能执行主库同步过来的二进制日志(binlog),，会导致主从延迟。

在 InnoDB 引擎中，我们可以在备份时加上参数--single-transaction 参数来完成不加锁的一致性数据备份。

```sql
mysqldump --single-transaction -uroot-p123456 itcast>itcast.sql
```

### 表级锁

> 表级锁，每次操作锁住整张表。锁定粒度大，发生锁冲突的概率最高，并发度最低。应用在 MyISAM、InnoDB、BDB 等存储引擎中。

对于表级锁，主要分为以下三类：

1. 表锁
2. 元数据锁(meta data lock,MDL)
3. 意向锁

#### 表锁

对于表锁，分为两类：

1. 表共享读锁(read lock)
2. 表独占写锁(write lock)

语法：

1. 加锁：`lock tables 表名..read/write`。
2. 释放锁：`unlock tables/客户端断开连接`。

![表锁-读](/assets/images/表锁-读.png)

(当前客服端和其他客服端都可以读)

![表锁-写](/assets/images/表锁-写.png)

(当前客服端可以写读，其他客服端都不能读和写)

> [!important]
> 读锁不会阻塞其他客户端的读，但是会阻塞写。写锁既会阻塞其他客户端的读，又会阻塞其他客户端的写。

#### 元数据锁 (meta data lock,MDL)

> MDL 加锁过程是系统自动控制，无需显式使用，在访问一张表的时候会自动加上。MDL 锁主要作用是维护表元数据的数据一致性，在表上有活动事务的时候，不可以对元数据进行写入操作。**为了避免 `DML` 与 `DDL` 冲突，保证读写的正确性。**

在 MySQL5.5 中引入了 MDL,当对一张表进行增删改查的时候，加 MDL 读锁(共享)；当对表结构进行变更操作的时候，加 MDL 写锁（排他）。

![元数据锁](/assets/images/元数据锁.png)

```sql
begin
   select * from account;(其他客服端也是有共享读)
   alter table add column xx int  (与其他的mdl互斥)
commit;
```

查看元数据锁：

```sql
select object_type,object_schema,object _name,lock_type,lock_duration from performance_schema.metadata_locks;
```

#### 意向锁

> 为了避免 DML 在执行时，加的行锁与表锁的冲突，在 InnoDB 中引入了意向锁，使得表锁不用检查每行数据是否加锁，使用意向锁来减少表锁的检查。

意向锁（Intention Lock）是数据库管理系统中的一种锁机制，用于协调事务对共享资源的访问。它不是针对某一具体数据行或对象的锁，而是用来表明事务意图锁定一个范围内的资源，比如一个表或一个页面。

![意向锁](/assets/images/意向锁.png)

1. 意向共享锁(IS):由语句`select..lock in share mode`添加。
2. 意向排他锁(lX):由`insert、update、delete、select..for update`添加。

3. 意向共享锁(IS):与表锁共享锁(read)兼容，与表锁排它锁(write)互斥。
4. 意向排他锁(IX):与表锁共享锁(read)及排它锁(write)都互斥。意向锁之间不会互斥。

可以通过以下 SQL,查看意向锁及行锁的加锁情况：

```sql
select object_schema,object_name,index_name,lock_type,lock_mode,lock_data from performance_schema.data_locks;
```

### 行级锁

> 行级锁，每次操作锁住对应的行数据。锁定粒度最小，发生锁冲突的概率最低，并发度最高。应用在 InnoDB 存储引擎中。

InnoDB 的数据是基于索引组织的，行锁是通过对索引上的索引项加锁来实现的，而不是对记录加的锁。对于行级锁，主要分为以下三类：

1. 行锁(Record Lock):锁定单个行记录的锁，防止其他事务对此行进行`update`和`delete`。在 RC(read committed)、RR(repeatable read) 隔离级别下都支持。
2. 间隙锁(Gap Lock)：锁定索引记录间隙（不含该记录），确保索引记录间隙不变，防止其他事务在这个间隙进行 `insert`,防止产生幻读。在 RR 隔离级别下都支持。
3. 临键锁(NeXt-Key Lock)：**行锁**和**间隙锁**组合，同时锁住数据，并锁住数据前面的间隙 Gap。在 RR 隔离级别下支持。

![间隙锁](/assets/images/间隙锁.png)

#### 行锁

InnoDB 实现了以下两种类型的行锁：

1. 共享锁(S)：允许一个事务去读一行，阻止其他事务获得相同数据集的排它锁。
2. 排他锁(X)：允许获取排他锁的事务更新数据，阻止其他事务获得相同数据集的共享锁和排他锁。

![共享锁-排他锁-兼容](/assets/images/共享锁-排他锁-兼容.png)
![行锁](/assets/images/行锁.png)

演示：

默认情况下，InnoDB 在 REPEATABLE READ 事务隔离级别运行，InnoDB 体用 next-key 锁进行搜索和索引扫描，以防止幻读。

1. 针对唯一索引进行检索时，对已存在的记录进行等值匹配时，将会自动优化为行锁。
2. InnoDB 的行锁是针对于索引加的锁，不通过索引条件检索数据，（如果字段没有索引）那么 InnoDB:将对表中的所有记录加锁，此时**就会升级为表锁**。

#### 间隙锁/临键锁-演示

默认情况下，InnoDB 在 REPEATABLE READ 事务隔离级别运行，InnoDB 使用 next-key 锁进行搜索和索引扫描，以防止幻读。

1. 索引上的等值查询（唯一索引），给不存在的记录加锁时，优化为间隙锁（`where id = 5` --id 为 3 和 8 之间的(不包含)间隙锁 ）

```sql
begin
   select * from account where id = 5;
commit;
```

2.  索引上的等值查询（普通索引-不唯一），向右遍历时最后一个值不满足查询需求时，next-key lock 退化为间隙锁。
3.  索引上的范围查询（唯一索引）-会访问到不满足条件的第一个值为止。

> [!warning]
> 间隙锁唯一目的是防止其他事务插入间隙。间隙锁可以共存，一个事务采用的间隙锁不会阻止另一个事务在同一间隙上采用间隙锁。

临键锁:`select \* from tb_user where id >=19 (19 25) 19 加上行锁，25 加上间隙锁，正无穷加锁` 即会包含当前的数据记录，也会锁定该数据记录之前的这部分间隙.

## InnoDB 引擎

### 逻辑存储结构

![逻辑存储结构](/assets/images/逻辑存储结构.png)

- 表空间(ibd 文件),一个 Mysql 实例可以对应多个表空间，用于存储记录、索引等数据。

- 段,分为数据段(Leaf node segment)、索引段(Non-leaf node segment)、回滚段(Rollback segment),InnoDB 是索引组织表，数据段就是 B+树的叶子节点，索引段即为 B+树的非叶子节点。段用来管理多个 Extent （区）

- 区,表空间的单元结构，每个区的大小为 1M。默认情况下，InnoDB 存储引擎页大小为 16K,即一个区中一共有 64 个连续的页。

- 页，是 InnoDB 存储引擎磁盘管理的最小单元，每个页的大小默认为 16KB。为了保证页的连续性，InnoDB 存储引擎每次从磁盘申请 4-5 个区。

- 行，InnoDB 存储引擎数据是按行进行存放的

> [!warning]
> Tx_id:每次对某条记录进行改动时，都会把对应的事务 id 赋值给 trx_id 隐藏列 <br>Roll_pointer:每次对某条引记录进行改动时，都会把旧的版本写入到 undo 日志中，然后这个隐藏列就相当于一个指针，可以通过它来找到该记录修改前的信息。

### 架构

> MySQL5.5 版本开始，默认使用 InnoDB 存储引擎，它擅长事务处理，具有崩溃恢复特性在日常开发中使用非常广泛。下面是 InnoDB 架构图，左侧为内存结构，右侧为磁盘结构。

![架构图](/assets/images/架构图.png)

#### 内存结构

- Buffer Pool：缓冲池是主内存中的一个区域，里面可以缓存磁盘上经常操作的真实数据，在执行增删改查操作时，先操作缓冲池中的数据（若缓冲池没有数据，则从磁盘加载并缓存），然后再以一定频率刷新到磁盘，从而减少磁盘 IO,加快处理速度。

  > 缓冲池以 Page 页为单位，底层采用链表数据结构管理 Page。根据状态，将 Page 分为三种类型：

  > - free page:空闲 page,未被使用。
  > - clean page:被使用 page,数据没有被修改过。
  > - dirty page:脏页，被使用 page,数据被修改过，也中数据与磁盘的数据产生了不一致。

- Change Buffer:更改缓冲区（针对于非唯一二级索引页），在执行 DML 语句时，如果这些数据 Page 没有在 Buffer Pool 中，不会直接操作磁盘，而会将数据变更存在更改缓冲区 Change Buffer 中，在未来数据被读取时，再将数据合并恢复到 Buffer Pool 中，再将合并后的数据刷新到磁盘中。

  > **Change Buffer 的意义是什么？**<br>与聚集索引不同，二级索引通常是非唯一的，并且以相对随机的顺序插入二级索引。同样，删除和更新可能会影响索引树中不相邻的二级索引页，如果每一次都操作磁盘，会造成大量的磁盘 IO。有了 ChangeBuffer 之后，我们可以在缓冲池中进行合并处理，减少磁盘 IO。

- Adaptive Hash Index:自适应 hash 索引，用于优化对 Buffer Pool 数据的查询。InnoDB 存储引擎会监控对表上各索引页的查询，如果观察到 hash 索引可以提升速度，则建立 hash 索引，称之为自适应 hash 索引。自适应哈希索引，无需人工干预，是系统根据情况自动完成。参数：adaptive hash index

- Log Buffer:日志缓冲区，用来保存要写入到磁盘中的 log 日志数据(redo log、undo log),默认大小为 16MB,日志缓冲区的日志会定期刷新到磁盘中。如果需要更新、插入或删除许多行的事务，增加日志缓冲区的大小可以节省磁盘 I/0。

  > 参数：<br>innodb_log_buffer_size:缓冲区大小 innodb_flush.\_log_at_trx_commit:日志刷新到磁盘时机

  > 1:日志在每次事务提交时写入并刷新到磁盘<br> 0:每秒将日志写入并刷新到磁盘一次。
  > <br> 2:日志在每次事务提交后写入，并每秒刷新到磁盘一次。

#### 磁盘结构

- System Tablespace:系统表空间是更改缓冲区的存储区域。如果表是在系统表空间而不是每个表文件或通用表空间中创建的，它也可能包含表和索引数据。(在 MySQL5.x 版本中还包含 InnoDB 数据字典、undolog 等)参数：`innodb data file path`

- File-Per-Table Tablespaces:每个表的文件表空间包含单个 InnoDB:表的数据和索引，并存储在文件系统上的单个数据文件中。参数：`innodb_fle_per_table`

- General Tablespaces:通用表空间，需要通过 CREATE TABLESPACE 语法创建通用表空间，在创建表时，可以指定该表空间。

```sql
CREATE TABLESPACE xxxX ADD DATAFILE 'file name' ENGINE engine_name;

CREATE TABLE (...) engine=innodb TABLESPACE ts_name;
```

- Undo Tablespaces:撤销表空间，MySQL 实例在初始化时会自动创建两个默认的 undo 表空间(初始大小 16M),用于存储 undo log 白志。

- Doublewrite Buffer Files:双写缓冲区，innoDB 引擎将数据页从 Buffer Pool 刷新到磁盘前，先将数据页写入双写缓冲区文件中，便于系统异常时恢复数据。

- Redo Log:重做日志，是用来实现事务的持久性。该日志文件由两部分组成：重做日志缓冲(redo log buffer).以及重做日志文件(redo log),前者是在内存中，后者在磁盘中。当事务提交之后会把所有修改信息都会存到该日志中，用于在刷新脏页到磁盘时，发生错误时，进行数据恢复使用。

#### 后台线程

![后台线程](/assets/images/后台线程.png)

1. Master Thread 核心后台线程，负责调度其他线程，还负责将缓冲池中的数据异步刷新到磁盘中，保持数据的一致性，还包括脏页的刷新、合并插入缓存、undo 页的回收。
2. IO Thread 在 InnoDB 存储引擎中大量使用了 AIO 来处理 IO 请求，这样可以极大地提高数据库的性能，而 lO Thread 主要负责这些 IO 请求的回调。

| 线程类型      | 默认个数 | 职责                         |
| ------------- | -------- | ---------------------------- |
| Read thread   | 4        | 负责从磁盘读取数据           |
| Write thread  | 4        | 负责将数据写入磁盘           |
| Log thread    | 1        | 负责日志的写入和刷新         |
| Insert Buffer | 1        | 负责将写缓冲区内容刷新到磁盘 |

3. Purge Thread 主要用于回收事务已经提交了的 undo log,在事务提交之后，undo log 可能不用了，就用它来回收。

4. Page Cleaner Thread 协助 Master Thread 刷新脏页到磁盘的线程，它可以减轻 Master Thread 的工作压力，减少阻塞。

### 事务原理

![事务原理](/assets/images/事务原理.png)

- redolog 持久性

重做日志，记录的是事务提交时数据页的物理修改，是用来实现事务的持久性。该日志文件由两部分组成：重做日志缓冲(redo log buffer)以及重做日志文件(redo log file),前者是在内存中，后者在磁盘中。当事务提交之后会把所有修改信息都存到该日志文件中，用于在刷新脏页到磁盘，发生错误时，进行数据恢复使用。

![redo log](/assets/images/redo-log.png)

- undolog 原子性

回滚日志，用于记录数据被修改前的信息，作用包含两个：提供回滚和 MVCC(多版本并发控制)。

undo log 和 redo log 记录物理日志不一样，它是逻辑日志。可以认为当 delete-一条记录时，undo log 中会记录一条对应的 inserti 记录，反之亦然，当 update 一条记录时，它记录一条对应相反的 update 记录。当执行 rollback 时，就可以从 undo log 中的逻辑记录读取到相应的内容并进行回滚。

Undo log 销毁：undo log 在事务执行时产生，事务提交时，并不会立即删除 undo log,因为这些日志可能还用于 MVCC。

Undo log 存储：undo log 采用段的方式进行管理和记录，存放在前面介绍的 rollback segment 回滚段中，内部包含 1024 个 undo log seament

### MVCC

- 当前读

  读取的是记录的*最新版本*，读取时还要保证其他并发事务不能修改当前记录，会对读取的记录进行加锁。对于我们日常的操作，如： `select..lock in share mode(共享锁)，select..for update、update、insert、delete`(排他锁)都是一种当前读。

- 快照读

  简单的 select(不加锁)就是快照读，快照读，读取的是记录数据的可见版本，可能是历史数据，不加锁，是非阻塞读

- Read Committed:每次 select,都生成一个快照读。
- Repeatable Read:开启事务后第一个 select 语句才是快照读的地方。
- Serializable:快照读会退化为当前读。

- MVCC

全称 Multi-Version Concurrency Control,多版本并发控制。指维护一个数据的多个版本，使得读写操作没有冲突，快照读为 MySQL 实现 MCC 提供了一个非阻塞读功能。MVCC 的具体实现，还需要依赖于数据库记录中的`三个隐式字段、undo log 日志、readView`。

#### 记录中的隐藏字段

![记录中的隐藏字段](/assets/images/隐藏字段.png)

```sql
ibd2sdi employee.idb
```

#### undo log 日志（出错就回滚）

回滚日志，在 insert、update、deletel 的时候产生的便于数据回滚的日志。

当 insert 的时候，产生的 undo log 日志只在回滚时需要，在事务提交后，可被立即删除。

而 update、delete 的时候，产生的 undo log 日志不仅在回滚时需要，在快照读时也需要，不会立即被删除。

- undo log 版本链

不同事务或相同事务对同一条记录进行修改，会导致该记录的 undolog 生成一条记录版本链表，链表的头部是最新的旧记录，链表尾部是最早的旧记录。
![undolog](/assets/images/undolog-版本链.png)

#### readview

ReadView(读视图)是快照读 SQL 执行时 MVCC 提取数据的依据，记录并维护系统当前活跃的事务（未提交的）id。 ReadView 中包含了四个核心字段：

| 字段           | 含义                                                     |
| -------------- | -------------------------------------------------------- |
| m_ids          | 当前活跃的事务 ID 集合                                   |
| min_trx_id     | 最小活跃事务 ID                                          |
| max_trx_id     | 预分配事务 ID，当前最大事务 ID+1（因为事务 ID 是自增的） |
| creator_trx_id | ReadView 创建者的事务 ID                                 |

![readview](/assets/images/readview.png)

> RC 隔离级别下，在事务中每一次执行快照读时生成 ReadView。

![readview-1](/assets/images/readview-1.png)

> RR 隔离级别下，仅在事务中第一次执行快照读时生成 ReadVieW，后续复用该 ReadVieW。

![readview-2](/assets/images/readview-2.png)

![mvcc](/assets/images/mvcc.png)

#### 总结

1. 逻辑存储结构

   表空间、段、区、页、行

2．架构

> 内存结构 磁盘结构

3. 事务原理

原子性 -undo lag

持久性 -redo log

一致性 -undo log +redo log

隔离性 -锁 + MVCC

4. MVCC

记录隐藏字段、undolog 版本链、readview

## Mysql 管理

### 系统数据库

MySq 数据库安装完成后，自带了一下四个数据库，具体作用如下：

![系统数据库](/assets/images/系统数据库.png)

### 常用工具

- mysql

> 该 mysql 不是指 mysql 服务，而是指 mysql 的客户端工具。

语法：

```sql
   mysql [options] [database]
选项：
   -u,--user=name #指定用户名
   -p,--password[=name] #指定密码
   -h,--host=name #指定服务器P或域名
   -P,--port=port #指定连接端口
   -e,--execute=name #执行SQL语句并退出
```

`-e`选项可以在 Mysq 客户端执行 SQL 语句，而不用连接到 MySQL 数据库再执行，对于一些批处理脚本，这种方式尤其方便。

```sql
   mysql -uroot -p123456 itcast -e "select from stu";
```

- mysqladmin

> mysqladmin 是一个执行管理操作的客户端程序。可以用它来检查服务器的配置和当前状态、创建并删除数据库等。

![mysqladmin](/assets/images/mysqladmin.png)

- mysqlbinlog

> 由于服务器生成的二进制日志文件以二进制格式保存，所以如果想要检查这些文本的文本格式，就会使用到 mysqlbinlog 日志管理工具。

![mysqlbinlog](/assets/images/mysqlbinlog.png)

- mysqlshow

> mysqIshow 客户端对象查找工具，用来很快地查找存在哪些数据库、数据库中的表、表中的列或者索引。

![mysqlshow](/assets/images/mysqlshow.png)

- mysqldump

> mysqldump 客户端工具用来备份数据库或在不同数据库之间进行数据迁移。备份内容包含创建表，及插入表的 sQL 语句。

![mysqldump](/assets/images/mysqldump.png)

- mysqlimport/source

> mysqlimport 是客户端数据导入工具，用来导入 mysqldump 加-T 参数后导出的文本文件。

![mysqlimport](/assets/images/mysqlimport.png)

### 总结

![mysql管理-总结](/assets/images/mysql管理-总结.png)
