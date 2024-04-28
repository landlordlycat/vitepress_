---
title: Redis
outline: deep
---

# 简介

Redis 是一个开源的使用 ANSI C 语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value 数据库，并提供多种语言的 API。

它通常被称为数据结构服务器，因为值（value）可以是 字符串(`String`), 哈希(`Hash`), 列表(`List`), 集合(`Set`) 和 有序集合(`SortedSet`),消息队列(`Stream`),地理空间`Geospatial`, `HyperLogLog`,位图`Bitmap`,位域`Bitfield`等类型。

![redis-简介](/assets/images/redis-简介.png)

命令行 | 编程使用指定方法 | 可视化软件

- 性能极高数据类型丰富
- 单键值对最大支持 512M 大小的数据简单易
- 支持所有主流编程语言
- 支持数据持久化、主从复制、哨兵模式等高可用特性

## 安装配置

推荐 wsl 命令或者 docker 安装

1. `wsl --install`

2. 重新打开 Ubuntu 应用，进行用户和密码设置。
   `https://learn.microsoft.com/en-us/windows/wsl/setup/environment#set-up-your-linux-username-and-password`

3.进入电脑上的刚刚安装的 Ubuntu 应用安装 redis

```shell
   curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
   echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
   sudo apt-get update
   sudo apt-get install redis
```

4. 启动

`sudo service redis-server start`

5.启动客户端

`redis-cli [--raw]` --raw 可以避免中文乱码

**_GUI 工具推荐-redisInsight_**

redis 服务并执行 `PING` 命令，该命令用于检测 redis 服务是否启动。

远程 redis 服务上执行命令

`redis-cli -h host -p port -a password`

## Key

> Redis 键命令用于管理 redis 的键

语法：`COMMAND KEY_NAME`

实例：`SET name laoyang`

1. `DEL key` 该命令用于在 key 存在时删除 key,如果删除成功则返回 1，否则返回 0。
2. `DUMP key` 序列化给定 key ，并返回被序列化的值。(不常用)
3. `EXISIS key [key...]` 该命令用于检查给定 key 是否存在。返回 1 表示存在，0 表示不存在。
4. `EXPIRE key seconds` 为给定(存在的) key 设置过期时间（以秒为单位）
5. `EXPIREAT key timestamp` 为给定(存在的) key 设置过期时间（以 UNIX 时间戳为单位）
6. `KEYS pattern` 该命令用于查找所有符合给定模式 pattern(\*) 的 key。
7. `MOVE key db` 将 key 移动到给定的数据库 db 当中。
8. `SELECT db(index)` 该命令用于选择数据库 默认为 `select 0`。
9. `PERSIST key` 移除 key 的过期时间，key 将持久保持。
10. `PTTL key` 以毫秒为单位返回 key 的剩余的过期时间。
11. `TTL key` 以秒为单位返回 key 的剩余的过期时间。
12. `RANDOMKEY` 随机返回一个 key
13. `RENAME key newkey` 重命名 key
14. `RENAMENX key newkey` 当 key 不存在时，将 key 改名为 newkey(NX:not exist)
15. `TYPE key` 该命令用于返回 key 所属的类型。
16. `SCAN cursor [MATCH pattern] [COUNT count]` 该命令用于遍历集合中的所有元素`scan 0`。

[更多命令...](https://redis.io/commands)

## 数据类型

### String (字符串)

- 设置指定 key 的值:
  `SET key value`
- 获取指定 key 的值:
  `GET key`
- 返回 key 中字符串值的子字符(类似 substring):
  `	GETRANGE key start end`
- 将给定 key 的值设为 value ，并返回 key 的旧值(old value)
  `GETSET key value`
- 获取所有(一个或多个)给定 key 的值
  `MGET key1 [key2..]`
- 将值 value 关联到 key ，并将 key 的过期时间设为 seconds (以秒为单位)
  `SETEX key seconds value`
- 只有在 key 不存在时设置 key 的值
  `SETNX key value`
- 用 value 参数覆写给定 key 所储存的字符串值，从偏移量 offset 开始
  `SETRANGE key offset value -(setrange test 1 hhh)`
- 返回 key 所储存的字符串值的长度
  `STRLEN key`
- 同时设置一个或多个 key-value 对
  `MSET key value [key value ...]`
- 同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在
  `MSETNX key value [key value ...]`
- 这个命令和 SETEX 命令相似，但它以毫秒为单位设置 key 的生存时间，而不是像 SETEX 命令那样，以秒为单位。
  `PSETEX key milliseconds value`
- 将 key 中储存的数字值增一
  `INCR key`
- 将 key 所储存的值加上给定的增量值（increment）
  `INCRBY key increment (incrby age 20)`
- 将 key 所储存的值加上给定的浮点增量值（increment）
  `INCRBYFLOAT key increment (incrbyfloat age 20.5)`
- 将 key 中储存的数字值减一
  `DECR key`
- 将 key 所储存的值减去给定的减量值（decrement）
  `DECRBY key decrement (decrby age 20)`
- 如果 key 已经存在并且是一个字符串， APPEND 命令将指定的 value 追加到该 key 原来值（value）的末尾
  `APPEND key value`
- 删除全部键
  `FLUSHALL`

### Hash(哈希)

> Redis hash 是一个 string 类型的 field（字段） 和 value（值） 的映射表，hash 特别适合用于存储对象。

---

![redis](/assets/images/redis.png)
