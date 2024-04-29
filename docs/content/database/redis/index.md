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

---

### Hash(哈希)

> Redis hash 是一个 string 类型的 field（字段） 和 value（值） 的映射表，hash 特别适合用于存储对象。

1. `HDEL key field1 [field2]` 删除一个或多个哈希表字段
2. `HEXISTS key field` 查看哈希表 key 中，指定的字段是否存在。
3. `HGET key field` 获取存储在哈希表中指定字段的值。
4. `HGETALL key` 获取在哈希表中指定 key 的所有字段和值
5. `HINCRBY key field increment` 哈希表中字段值自增
6. `HINCRBYFLOAT key field increment` 哈希表中字段值自增
7. `HKEYS key` 获取所有哈希表字段
8. `HLEN key` 获取哈希表 key 的长度
9. `HMGET key field1 [field2]` 获取所有给定字段的值
10. `HMSET key field1 value1 [field2 value2 ]` 同时将多个 field-value (域-值)对设置到哈希表 key 中。
11. `HSET key field value` 将哈希表 key 中的字段 field 的值设为 value
12. `HVALS key` 获取哈希表 key 中的所有值
13. `HSCAN key cursor [MATCH pattern] [COUNT count]` 迭代哈希表中的键值对

---

### List(列表)

> Redis 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）

1. `LPUSH key value1 [value2]` 将一个或多个值 value 插入到列表 key 的表头
2. `RPUSH key value1 [value2]` 将一个或多个值 value 插入到列表 key 的表尾
3. `LLEN key` 获取列表 key 的长度
4. `LPOP key` 移除并返回列表 key 的头元素
5. `RPOP key` 移除并返回列表 key 的尾元素
6. `LPUSHX key value` 将值 value 插入到列表 key 的表头，如果列表 key 不存在，则`LPUSHX` 会创建一个空列表并执行 `LPUSH`
7. `RPUSHX key value` 为已存在的列表添加值
8. `LRANGE key start stop` 获取列表 key 中指定范围内的元素，闭区间
9. `LSET key index value` 将列表 key 下标为 index 的元素的值设置为 value
10. `LTRIM key start stop` 对一个列表进行修剪(trim),就是说，让列表只保留指定区间内的元素，不在指定区间之内的元素都将被删除
11. `LINSERT key BEFORE|AFTER pivot value (linsert person before 'meter' 'kiki')` 在列表的元素前或者后插入元素
12. `LINDEX key index` 通过索引获取列表中的元素
13. `LREM key count value` 根据参数 count 的值，移除列表中与参数 value 相等的元素

- count > 0： 从表头开始向表尾搜索，移除与 value 相等的元素，数量为 count
- count < 0： 从表尾开始向表头搜索，移除与 value 相等的元素，数量为 count 的绝对值
- count = 0： 移除表中所有与 value 相等的值

14. `BLPOP key1 [key2 ] timeout` 移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
15. `BRPOP key1 [key2 ] timeout` 移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
16. `RPOPLPUSH source destination timeout` 从列表中弹出一个值，并将弹出的元素插入到另外一个列表中并返回它； 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
17. `BRPOPLPUSH source destination timeout` 从列表中弹出一个值，将弹出的元素插入到另外一个列表中并返回它； 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。

---

### Set(集合)

:::tip
集合是唯一性，无序性，确定性。

集合对象的编码可以是 intset 或者 hashtable。
Redis 中集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(I)。

集合中最大的成员数为 232 - 1 (4294967295, 每个集合可存储 40 多亿个成员)。
:::

1. `SADD key member1 [member2]` 给集合添加多个成员
2. `SCARD key` 获取集合的成员数
3. `SDIFF key1 [key2]` 返回第一个集合与其他集合之间的差异。
4. `SDIFFSTORE destination key1 [key2]` 返回给定所有集合的差集并存储在 destination 中
5. `SINTER key1 [key2]` 返回给定所有集合的**交集**
6. `SINTERSTORE destination key1 [key2]` 返回给定所有集合的交集并存储在 destination 中
7. `SISMEMBER key member` 判断 member 是否是 key 的成员
8. `SMEMBERS key` 获取集合的所有成员
9. `SMOVE source destination member` 将 member 元素从 source 集合移动到 destination 集合 - `smove list list1 1`
10. `SPOP key [count]` 移除并返回集合中的一个随机元素 count 是个数默认为 1
11. `SRANDMEMBER key [count]` 返回集合中一个或多个随机数
12. `SREM key member1 [member2]` 移除给定集合中的一个或多个成员，不存在的成员将被忽略
13. `SUNION key1 [key2]` 返回所有给定集合的**并集**
14. `SUNIONSTORE destination key1 [key2]` 返回所有给定集合的并集并存储在 destination 中
15. `SSCAN key cursor [MATCH pattern] [COUNT count]` 迭代集合中的元素

---

### Sorted Set(有序集合)

Redis 有序集合和集合一样也是 string 类型元素的集合,且不允许重复的成员。

不同的是每个元素都会关联一个 double 类型的分数。redis 正是通过分数来为集合中的成员进行从小到大的排序。

有序集合的成员是唯一的,但分数(score)却可以重复。

![redis](/assets/images/redis.png)
