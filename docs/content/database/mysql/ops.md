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
