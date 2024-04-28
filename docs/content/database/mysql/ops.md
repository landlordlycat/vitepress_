---
outline: deep
---

# Mysql-运维

## 日志

### 错误日志

> 错误日志是 MySQL 中最重要的日志之一，它记录了当 ysqld 启动和停止时，以及服务器在运行过程中发生任何严重错误时的相关信息。当数据库出现任何故障导致无法正常使用时，建议首先查看此日志。

该日志是默认开启的，默认存放目录`/var/log/`,默认的日志文件名为 `mysqld.log`。查看日志位置：

```sql
show variables like '%log_error%';
```

### 二进制日志

> 二进制日志(BINLOG)记录了所有的 DDL(数据定义语言)语句和 DML(数据操纵语言)语句，但不包括数据查询(SELECT、SHOW)语句。

作用：

1. 灾难时的数据恢复；
2. MySQL 的主从复制。在 MySQL8 版本中，默认二进制日志是**开启**着的，涉及到的参数如下：

```sql
show variables like '%log_bin%
```

- 日志格式

> MySQL 服务器中提供了多种格式来记录二进制日志，具体格式及特点如下：

![二进制日志-格式](/assets/images/二进制日志-格式.png)

```sql
show variables like '%binlog_foormat%'
```

- 日志查看

> 由于日志是以二进制方式存储的，不能直接读取，需要通过二进制日志查询工具 ysqlbinlog 来查看，具体语法：

```sql
mysqlbinlog [参数选项1] logfilename

参数选项：
  -d 指定数据库名称，只列出指定的数据库相关操作
  -o 忽略掉日志中的前n行命令。
  -v 将行事件（数据变更）重构为SOL语句
  -vv 将行事件（数据变更）重构为SQL语句，并输出注释信息
```

- 日志删除

> 对于比较繁忙的业务系统，每天生成的 binlog 数据巨大，如果长时间不清除，将会占用大量磁盘空间。可以通过以下几种方式清理日志

![日志删除](/assets/images/日志删除.png)

也可以在 mysql 的配置文件中配置二进制日志的过期时间设置了之后，二进制日志过期会自动删除。

```sql
show variables like '%binlog_expire_logs seconds%';
```

### 查询日志

> 查询日志中记录了客户端的所有操作语句，而二进制日志不包含查询数据的 SQL 语句。默认情况下，查询日志是未开启的。如果需要开启查询日志，可以设置以下配置：

```sql
show variables like '%general%';
```

修改 MySQL 的配置文件/etc/my.cnf 文件，添加如下内容：

```sql
--该选项用来开启查询日志，可选值：0或者1；0代表关闭，1代表开启
general_log=l
--设置日志的文件名，如果没有指定，默认的文件名为host_name.log
general_log_file=mysql_query.log
```

### 慢查询日志

慢查询日志记录了所有执行时间超过参数 long_query_time 设置值并且扫描记录数不小于 min_examined_row_limit 的所有的 SQL 语句的日志，默认未开启。long_query_time 默认为 10 秒，最小为 0，精度可以到微秒。

```sql
--慢查询日志
slow_query_log=1
--执行时间参数
long_query_time=2
```

默认情况下，不会记录管理语句，也不会记录不使用索引进行查找的查询。可以使用 log_slow_admin_statements 和更改此行为 log_queries_not_using_indexes,如下所述。

```sql
--记录执行较慢的管理语句
log_slow_admin_statements =1
--记录执行较慢的未使用索引的语句
log_queries_not_using_indexes =1
```

## 主从复制

> 主从复制是指将主数据库的 DDL 和 DML 操作通过二进制日志传到从库服务器中，然后在从库上对这些日志重新执行（也叫重做），从而使得从库和主库的数据保持同步。

![主从复制](/assets/images/主从复制.png '主从复制')

- 原理

![主从复制-原理](/assets/images/主从复制-原理.png '主从复制-原理')

- 搭建

服务器准备，至少两台服务器

![服务器准备](/assets/images/服务器准备.png '服务器准备')

### 主库配置

1. 修改配置文件 `/etc/my.cnf`

![主库配置](/assets/images/主库配置.png '主库配置')

2. 重启服务器

```sql
systemctl restart mysqld
```

3. 登录 mysql,创建远程连接的账号并授予主从复制权限

```sql
--创建tcst用户，并设置密码，该用户可在任意主机连接该MySQL服务
CREATE USER 'itcast'@'%'IDENTIFIED WITH mysql_native_password BY 'Root@123456';
--为itcast'@'%'用户分配主从复制权限
GRANT REPLICATION SLAVE ON *.* TO 'itcast'@'%';
```

4. 通过指令，查看二进制日志坐标

```sql
show master status;
```

字段含义说明：

- file：从哪个日志文件开始推送日志文件
- position：从哪个位置开始推送日志
- binlog_ignore_db：指定不需要同步的数据库

---

### 从库配置

1. 修改配置文件 `/etc/my.cnf`

![从库配置](/assets/images/从库配置.png '从库配置')

2. 重启服务器

```sql
systemctl restart mysqld
```

3. 登录 mysql,设置主库配置

```sql
--设置主库配置 (8.0.23之前版本)
CHANGE MASTER TO MASTER_HOST='89.207.132.170',MASTER_USER='itcast',MASTER_PASSWORD='Root@123456',MASTER_LOG_FILE='mysql-bin.000001',MASTER_LOG_POS=123;
```

```sql
--设置主库配置 (8.0.23版本)
CHANGE REPLICATION SOURCE TO MASTER_HOST='89.207.132.170',MASTER_USER='itcast',MASTER_PASSWORD='Root@123456',MASTER_LOG_FILE='mysql-bin.000001',MASTER_LOG_POS=663; --position
```

![从库配置-1](/assets/images/从库配置-1.png '从库配置-1')

4. 开启同步操作

```sql
start replica; --8.0.22 after

start slave; --8.0.22 before
```

5. 查看主从同步状态

```sql
show replica status; --8.0.22 after
show slave status;  --8.0.22 before
```

### 测试

![从库配置-测试](/assets/images/从库配置-测试.png '从库配置-测试')

主库上创建数据库，从库上进行操作。

### 总结

1. 概述

> 将主库的数据变更同步到从库，从而保证主库和从库数据一致。数据备份、失败迁移，读写分离，降低单库读写压力。

2. 原理

① 主库会把数据变更记录在二进制日志文件 Binlog 中。

② 从库连接主库，读取 binlog 日志，并写入自身中继日志 relaylog。

③ slave 重做中继日志，将改变反映它自己的数据。

3. 搭建

① 服务器准备，至少两台服务器

② 主库配置

③ 从库配置

④ 测试主从复制

## 分库分表

### 问题分析

随着互联网及移动互联网的发展，应用系统的数据量也是成指数式增长，若采用单数据库进行数据存储，存在以下性能瓶颈：

1. IO 瓶颈：热点数据太多，数据库缓存不足，产生大量磁盘 O,效率较低。请求数据太多，带宽不够，网络 IO 瓶颈。
2. CPU 瓶颈：排序、分组、连接查询、聚合统计等 SQL 会耗费大量的 CPU 资源，请求数太多，CPU 出现瓶颈。

:::tip 提示:
分库分表的中心思想都是将数据分散存储，使得单一数据库/表的数据量变小来缓解单一数据库的性能问题，从而达到提升数据库性能的目的。
:::

![分库分表-介绍](/assets/images/分库分表-介绍.png)

### 拆分策略

![拆分策略](/assets/images/拆分策略.png)

#### 垂直分库

> 以表为依据，根据业务将不同表拆分到不同库中。

![分库分表-垂直分库](/assets/images/分库分表-垂直分库.png)

特点：

1. 每个库的表结构都不一样。
2. 每个库的数据也不一样。
3. 所有库的并集是全量数据。

#### 垂直分表

> 以字段为依据，根据业务将不同字段拆分到不同表中。

![分库分表-垂直分表](/assets/images/分库分表-垂直分表.png)

特点：

1. 每个表的结构都不一样。
2. 每个表的数据也不一样，一般通过一列（主键/外键）关联。
3. 所有表的并集是全量数据。

#### 水平分库

> 水平分库：以字段为依据，按照一定策略，将一个库的数据拆分到多个库中。

![分库分表-水平拆分](/assets/images/分库分表-水平拆分.png)

特点：

1. 每个库的表结构都一样。
2. 每个库的数据都不一样。
3. 所有库的并集是全量数据。

#### 水平分表

> 水平分表：以字段为依据，按照一定策略，将一个表的数据拆分到多个表中。

![分库分表-水平分表](/assets/images/分库分表-水平分表.png)

特点：

1. 每个表的表结构都一样。
2. 每个表的数据都不一样。
3. 所有表的并集是全量数据。

### 实现技术

- shardingJDBC:基于 AOP 原理，在应用程序中对本地执行的 SQL 进行拦截，解析、改写、路由处理。需要自行编码配置实现，只支持 java 语言，性能较高。

- MyCat:数据库分库分表中间件，不用调整代码即可实现分库分表，支持多种语言，性能不及前者。

![分库分表-实现技术](/assets/images/分库分表-实现技术.png)

### Mycat 概述

Mycat：是开源的、活跃的、基于刊 ava 语言编写的 MySQL 数据库中间件。可以像使用 mysql 一样来使用 mycat,对于开发人员来说根本感觉不到 mycat 的存在。

#### 安装

Mycat;是采用 java 语言开发的开源的数据库中间件，支持 Windows 和 Linux 运行环境，下面介绍 MyCat 的 Linux 中的环境搭建。我们需要在准备好的服务器中安装如下软件。

- MySQL
- JDK
- Mycat

![mycat-安装](/assets/images/mycat-安装.png)

未完待续。。。

[mycat](https://www.bilibili.com/video/BV1Kr4y1i7ru?p=165&vd_source=62fbd3e7f5c7a7a439105d77a02cb206)
