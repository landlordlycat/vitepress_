---
outline: deep
---

# Linux <Badge type="tip" text="Linux" />

> 只有一个根目录`/`,所有文件都在它下面

## linux 的路径描述方式

linux：`:/` /etc/

wubdiws：`:\` #D:\data\

---

# linux 命令入门

## 命令基础

> ···

`command [-options] [parameter]`

command:命令本身

options:命令的一些选项，可以通过选项控制行为细节

parameter：命令的参数

[]，表示可选的意思

例：

```
ls -l /home/itheima
cp -r test1 test2 cp是命令本身，-r是选项，test和test2是参数，意思是复制文件夹test1成为test2

```

## 命令入门

ls：列出目录下的内容

`ls [-a -l -h] [linux 路径]`

- -a 选项，表示：all 的意思，全部的文件列出来
- -l 以列表形式排列展示内容
- -h 表示以易于阅读，格式化文件大小。必须跟 l 搭配使用

语法种的选项是可以组合使用的

- ls -l -a
- ls -la
- ls -al

## Home 目录和工作目录

home 目录：每个 linux 操作用户在 linux 系统的个人账户目录。路径在：/home/用户名

- 如，当前用户是 itheima。其 home 目录是：/home/itheima
- windows 和 linux 系统，均设有用户的 home 目录

---

## 目录切换相关命令（cd/pwd）

### cd 切换工作目录

==cd：change directory==

语法：`cd [linux路径]` 不写参数默认去 home 目录

~ 是 home 目录的意思。

1. 如果以超级用户 root 账号登陆：~ 是 /root 目录
2. 如果以普通用户 name 登陆：~是 /home/name 目录

---

### pwd 查看当前工作目录

==pwd：print work directory==

语法：`pwd`

pwd 命令，无选项，无参数，直接输入

---

## 相对路径，绝对路径和特殊路径符

绝对路径：以根目录为起点，以`/`开头`cd /home/iteheima/Desktop`

相对路径：以当前目录为起点，无需以`/`开头`cd Desktop`

特殊路径符：

- `.`表示当前目录，比如`cd ./desktop` 表示切换到当前目录下的`desktop`目录内和`cd desktop`效果一样
- `..`表示上一级目录，比如：`cd ..` 切换到上一级，`cd ../..` 切换上一级的上一级目录
- `~ `表示 home 目录，比如：`cd ~`切换到 home 目录或者`cd ~/desktop`, 切换到 home 内的 desktop 目录

---

## 创建目录（mkdir）

==mkdir：make directory==

语法：mkdir [-p] linux 路径

- 参数必填，需要创建的文件夹路径。
- -p 选项可选，表示自动创建不存在的父目录，适用于多层级的目录

```shell
mkdir -p ~/itcast/itheima/nice/666
```

---

## 文件操作

### touch，cat，more

语法：touch linux 路径\*

- touch 命令无选项，参数必填。

用于创建文件

```shell
touch test.txt #在当前目录下创建名为test的文件
```

- cat 命令 查看文件内容 语法：cat linux 路径

```shell
cat test.txt
```

- more 命令跟 cat 差不多，只不过 more 支持翻页。内容过多的，可以一页页的展示，空格翻页，q 退出查看

```shell
more test.txt
```

### cp，mv，rm

cp 用于复制

语法：`cp  [-r] 参数1 参数2`

- -r 选项，用于复制文件夹使用，表示递归
- 参数 1，表示复制的文件或文件夹
- 参数 2，复制去的地方

mv 用于移动

语法：`mv 参数1 参数2`

- 参数 1，表示移动的文件或文件夹
- 参数 2，表示要移动去的地方，如果目标不存在，则进行改名，确保目标存在。（有改名的效果）

rm 用于删除

语法：`rm [-r -f]参数1，参数2.....参数N`

- 同 cp 命令一样，-r 表示 recursion 选项用于删除文件夹，递归
- -f 表示 force。强制性的（不会弹出提示确认信息）
  - 普通用户删除内容不会弹出提示，只有 root 管理员用户删除内容会有提示
  - 所以一般普通用户用不到`-f`的选项
- 参数 1，参数 2.....参数 n，表示要删除的文件或文件夹路径，按照空格隔开。

rm 命令支持通配符\*，用来做模糊匹配

- 符号\*表示通配符。即匹配任意内容（包含空），
- test\*，表示匹配任何 test 开头的内容，
- \*test，表示匹配任何以 test 结尾的内容，
- \*test\*，表示匹配任何包含 test 的内容

```shell
rm -r test*
ls
```

可以通过 `su - root`，输入密码切换为 root 用户。

通过 exit 命令，退回普通用户

---

## 查找命令

which，find

which 命令可以查看 命令的程序文件所在位置，命令本体是二进制可执行程序，例：`which cd`

---

find 命令去可以搜索指定的文件，支持使用通配符

语法：`find 起始路径 -name '搜索的文件名'`

按照文件大小查找：

语法：`find 起始路径 -size +|- n[kMG]`

- +,-表示大于和小于
- n 代表大小数字
- kmg 表示单位，k（小写）表示 kb，M 表示 mb，G 表示 gb

```shell
find / -size -10m #查找小于10mb的文件
```

---

## grep,wc 和管道符 {#grep}

grep 命令，从文件中通过关键字过滤文件行
语法：`grep [-n] '搜索的内容' 文件路径`

- -n 选项，表示显示行号
- 搜索的内容，表示要搜索的内容
- 文件路径，表示要搜索的文件路径

```shell
grep -n 'hello' test.txt
```

wc 命令，用于统计文件内容
语法：`wc [-c -m -l -w] 文件路径`

- -c 选项，表示 bytes 数
- -m 选项，表示统计字符数
- -l 选项，表示统计行数
- -w 选项，表示统计单词数

```shell
wc -l test.txt
```

管道符：`|`

管道符，表示将前一个命令的结果，作为后一个命令的输入

```shell
ls -l | grep 'hello'
```

---
