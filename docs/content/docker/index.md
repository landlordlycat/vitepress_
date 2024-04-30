---
title: Redis
description: Redis 是一个键值数据存储系统
outline: deep
---

# docker

:::details 最新笔记
密码：`j.N?-+4\[`

[最新笔记资料](https://b11et3un53m.feishu.cn/wiki/MWQIw4Zvhil0I5ktPHwcoqZdnec?from=from_copylink '密码：j.N?-+4[')
:::

## 安装

1. 更新系统  
   首先，我们需要确保系统是最新的，以获取最新的软件包和安全更新。

```shell
sudo apt update
sudo apt upgrade
```

2. 安装必要的软件包
   我们需要安装一些软件包，以便 apt 可以通过 HTTPS 使用存储库。

```shell
sudo apt install apt-transport-https ca-certificates curl gnupg2 software-properties-common
```

3. 添加 Docker 的官方 GPG 密钥
   为了验证从 Docker 下载的软件包的真实性，我们需要添加 Docker 的官方 GPG 密钥。

```sql
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

4. 添加 Docker 的 APT 存储库
   现在，我们将添加 Docker 的 APT 存储库，以便 apt 可以从中获取 Docker 软件包。

```shell
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

5. 更新 apt 存储库
   我们需要更新 apt 存储库，以便它包含 Docker 存储库中的软件包。

```shell
sudo apt update
```

6. 安装 Docker Engine
   现在，我们可以使用 apt 安装 Docker Engine。

```shell
sudo apt install docker-ce docker-ce-cli containerd.io
```

7. 验证安装

```shell
sudo docker run hello-world
```

这将下载一个简单的 Docker 映像并在容器中运行它。如果一切正常，您将看到一条消息，确认 Docker 已正确安装。

8. （可选）将用户添加到 docker 组
   为了避免每次运行 Docker 命令时都需要使用 sudo，您可以将当前用户添加到 docker 组中。

```shell
sudo usermod -aG docker $USER
```

请注意，添加用户到 docker 组后，需要重新登录才能使更改生效。

:::details 阿里云容器镜像服务

- 容器镜像服务 ACR -> 镜像工具 -> 镜像加速器

1. 安装／升级 Docker 客户端
   推荐安装 1.10.0 以上版本的 Docker 客户端，参考文档 docker-ce

2. 配置镜像加速器
   针对 Docker 客户端版本大于 1.10.0 的用户

您可以通过修改 daemon 配置文件`/etc/docker/daemon.json` 来使用加速器

```shell
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
"registry-mirrors": ["https://xxxxxx.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

:::

## 部署 mysql

> 先停掉虚拟机中的 MySQL,确保你的虚拟机已经安装 Docker,且网络开通的情况下，执行下面命令即可安装 MySQL:

```bash
docker run -d \
  --name mysql\
  -p 3306:3306 \
  -e TZ=Asia/Shanghai \
  -e MYSQL_ROOT_PASSWORD=123 \
  mysql
```

## 镜像和容器

当我们利用 Docker 安装应用时，Docker 会自动搜索并下载应用镜像(image)。镜像不仅包含应用本身，还包含应用运行所需要的环境、配置、系统函数库。Docker 会在运行镜像时创建一个隔离环境，称为容器(container)。

**镜像仓库**：存储和管理镜像的平台，Docker'官方维护了一个公共仓库：[Docker Hub](https://hub.docker.com/)。

![docker-hub](/assets/images/docker-hub.png)

## 命令解读

```bash
docker run -d \
  --name mysql \
  -p 3306:3306 \
  -e TZ=Asia/Shanghai \
  -e MYSQL_ROOT_PASSWORD=123 \
  mysql
```

- `docker run`: 创建并运行一个容器，`-d`是让容器在后台运行
- `--name mysql`：给容器起名，必须**唯一**
- `-p 3306:3306`：将宿主机端口映射到容器端口

  - 容器是隔离环境，外界不可访问。但是可以将宿主机端口映射容器内到端口，当访问宿主机指定端口时，就是在访问容器内的端口了。
  - 容器内端口往往是由容器内的进程决定，例如 MySQL 进程默认端口是 3306，因此容器内端口一定是 3306；而宿主机端口则可以任意指定，一般与容器内保持一致。
  - 格式： -p 宿主机端口:容器内端口，示例中就是将宿主机的 3306 映射到容器内的 3306 端口
    ![镜像映射](/assets/images/镜像映射.png)

- `-e key=value`: 是为容器设置环境变量
  - -e TZ=Asia/Shanghai : 配置容器内进程运行时的一些参数
  - 格式：-e KEY=VALUE，KEY 和 VALUE 都由容器内进程决定
  - 案例中，TZ=Asia/Shanghai 是设置时区；MYSQL_ROOT_PASSWORD=123 是设置 MySQL 默认密码
- `mysql`: 指定运行的镜像的名字
  - `mysql:5.7`：指定镜像版本为 5.7
  - 格式：REPOSITORY:TAG，例如 mysql:8.0，其中 REPOSITORY 可以理解为镜像名，TAG 是版本号
  - 在未指定 TAG 的情况下，默认是最新版本，也就是 mysql:latest

:::warning 注意:

镜像的名称不是随意的，而是要到 DockerRegistry 中寻找，镜像运行时的配置也不是随意的，要参考镜像的帮助文档，这些在 DockerHub 网站或者软件的官方网站中都能找到。

:::

![镜像命名规范](/assets/images/镜像命名规范.png)

## docker 基础

### 常见命令

> Docker 最常见的命令就是操作镜像、容器的命令，详见官方文档：[官方文档][地址]

1. `docker images`：查看本地所有镜像
2. `docker ps(program_status)`：查看运行中的容器
3. `docker ps -a`：查看所有容器
4. `docker run`：运行一个容器(不能重复创建)
5. `docker stop` 停止指定容器
6. `docker start` 启动指定容器
7. `docker restart` 重新启动容器
8. `docker logs containerName`：查看容器日志
9. `docker inspect` 查看容器详细信息
10. `docker save [-o] 文件名.tar IMAGE:latest [IMAGE...] -- docker save IMAGE:latest > FILENAME.tar`：导出一个镜像
11. `docker load -i filename [-q]`：导入一个镜像
12. `docker exec -it imageName bash`：进入容器
13. `docker rm containerName`：删除容器
14. `docker rmi imageName`：删除镜像
15. `docker build -t imageName .`：构建镜像
16. `docker commit containerName imageName`：提交容器为镜像
17. `docker login`：登录 Docker Hub
18. `docker push imageName`：推送镜像到 Docker Hub
19. `docker pull imageName`：拉取镜像

```shell
--美化
docker ps --format "table {{.ID}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}\t{{.Names}}"
```

![docker-常见命令](/assets/images/docker-常见命令.png)

案例：

1. 在 DockerHub 中搜索 Nginx 镜像，查看镜像的名称
2. 拉取 Nginx 镜像
3. 查看本地镜像列表
4. 创建并运行 Nginx 容器
5. 查看容器
6. 停止容器
7. 再次启动容器
8. 进入 Nginx 容器
9. 删除容器

[地址]: https://docs.docker.com/reference/cli/docker/

### 命令别名

`vi ~/.bashrc` 添加别名

```shell
alias dis='docker images'
alias dc='docker-compose'
```

`source ~/.bashrc` 重新加载

### 数据卷

> 数据卷是镜像中的一部分，它是一组文件的映射，它可以被容器使用，这些文件可以被映射到一个或多个容器中。它是一个虚拟目录，是容器内目录与宿主机目录之间映射的桥梁。

案例 1-利用 Nginx 容器部署静态资源

_需求_：

创建 Nginx 容器，修改 nginx 容器内的 html 目录下的 `index.html` 文件，查看变化将静态资源部署到 nginx 的 `html` 目录

:::tip 提示：

1. 在执行 docker run 命令时，使用`-v 数据卷名:容器内目录 ( docker run -d --name nginx -p 80:80 -v html:/usr/share/nginx/html nginx)` 可以完成数据卷挂载
2. 当创建容器时，如果挂载了数据卷且数据卷不存在，会自动创建数据卷
   :::

![数据卷](/assets/images/数据卷.png)

| 命令                    | 说明                 | 文档地址                                                                                      |
| ----------------------- | -------------------- | --------------------------------------------------------------------------------------------- |
| `docker volume create`  | 创建数据卷           | [docker volume create](https://docs.docker.com/engine/reference/commandline/volume_create/)   |
| `docker volume ls`      | 查看所有数据卷       | [docker volume ls](https://docs.docker.com/engine/reference/commandline/volume_ls/)           |
| `docker volume rm`      | 删除指定数据卷       | [docker volume rm](https://docs.docker.com/engine/reference/commandline/volume_prune/)        |
| `docker volume inspect` | 查看某个数据卷的详情 | [docker volume inspect](https://docs.docker.com/engine/reference/commandline/volume_inspect/) |
| `docker volume prune`   | 清除数据卷           | [docker volume prune](https://docs.docker.com/engine/reference/commandline/volume_prune/)     |

### 本地目录挂载

案例 2-ysql 容器的数据挂载

需求：

- 查看 mysql 容器，判断是否有数据卷挂载
- 基于宿主机目录实现 MySQL 数据目录、配置文件、初始化脚本的桂载(查阅官方镜像文档)
  1.  挂载/root/mysql/data 到容器内的/var/ib/mysql 目录
  2.  挂载/root/mysql/init 到容器内的/docker-entrypoint-initdb.d 目录，携带课前资料准备的 SQL 脚本
  3.  挂载/root/mysql/conf 到容器内的/etc/mysql/conf.d 目录，携带课前资料准备的配置文件

```shell
# 1.查看MySQL容器详细信息
docker inspect mysql
```

:::tip

- 在执行 docker run 命令时，使用`-v 本地目录：容器内目录`可以完成本地目录挂载
- 本地目录必须以“`/`”或"`./`"开头，如果直接以名称开头，会被识别为数据卷而非本地目录
  - -v mysql:var/ib/mysql 会被识别为一个数据卷叫 mysql
  - -v./mysql:Nar/ib/mysql 会被识别为当前目录下的 mysql 目录

:::

### 自定义镜像

> 镜像就是包含了应用程序、程序运行的系统函数库、运行配置等文件的文件包。构建镜像的过程其实就是把上述文件打包的过程。

举个例子，我们要从 0 部署一个 Java 应用，大概流程是这样：

- 准备一个 linux 服务（CentOS 或者 Ubuntu 均可）
- 安装并配置 JDK
- 上传 Jar 包
- 运行 Jar 包

层(layer)

添加安装包、依赖、配置等，每次操作都形成新的一层。

![镜像结构](/assets/images/镜像结构.png)

#### Dockerfile

> [!note]
> Dockerfile 就是一个文本文件，其中包含一个个的指令(Instruction),用指令来说明要执行什么操作来构建镜像。将来 Docker 可以根据 Dockerfile 帮我们构建镜像。常见指令如下：

| 指令       | 说明                                           | 示例                           |
| ---------- | ---------------------------------------------- | ------------------------------ |
| FROM       | 指定基础镜像                                   | `FROM centos:6  `              |
| ENV        | 设置环境变量，可在后面指令使用                 | `ENV key value `               |
| COPY       | 拷贝本地文件到镜像的指定目录                   | `COPY ./xx.jar /tmp/app.jar`   |
| RUN        | 执行 Linux 的 shell 命令，一般是安装过程的命令 | `RUN yum install gcc `         |
| EXPOSE     | 指定容器运行时监听的端口，是给镜像使用者看的   | `EXPOSE 8080  `                |
| ENTRYPOINT | 镜像中应用的启动命令，容器运行时调用           | `ENTRYPOINT java -jar xx.jar ` |

更多语法：[官方文档](https://docs.docker.com/engine/reference/builder/)

:::code-group

```dockerfile [完整]
# 指定基础镜像
FROM ubuntu:16.04
# 配置环境变量，JDK的安装目录、容器内时区
ENV JAVA_DIR=/usr/local
ENV TZ=Asia/Shanghai
# 拷贝jdk和java项目的包
COPY ./jdk8.tar.gz $JAVA_DIR/
COPY ./docker-demo.jar /tmp/app.jar
# 设定时区
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
# 安装JDK
RUN cd $JAVA_DIR \
 && tar -xf ./jdk8.tar.gz \
 && mv ./jdk1.8.0_144 ./java8
# 配置环境变量
ENV JAVA_HOME=$JAVA_DIR/java8
ENV PATH=$PATH:$JAVA_HOME/bin
# 指定项目监听的端口
EXPOSE 8080
# 入口，java项目的启动命令
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

```dockerfile [优化]
# 基础镜像
FROM openjdk:11.0-jre-buster --需要单独下载
# 设定时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
# 拷贝jar包
COPY docker-demo.jar /app.jar
# 入口
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

:::
`openjdk:11.0-jre-buster`这个包需要单独下载。导入镜像`docker load -i filename [-q]`

```bash
# 查看镜像列表：
docker images
# 结果
`REPOSITORY    TAG       IMAGE ID       CREATED          SIZE
docker-demo   1.0       d6ab0b9e64b9   27 minutes ago   327MB
nginx         latest    605c77e624dd   16 months ago    141MB
mysql         latest    3218b38490ce   17 months ago    516MB
openjdk 11.0-jre-buster 57925f2e4cff   22 months ago    301MB
```

![docker-demo](/assets/images/docker-demo.png)

当编写好了 Dockerfile,可以利用下面命令来构建镜像：

```shell
# 进入镜像目录
cd /root/demo
docker build -t 镜像名:1.0 Dockerfile目录
```

- `-t`:是给镜像起名，格式依然是 repository:tag 的格式，不指定 tag 时，默认为 latest
- `.`:表示当前目录，也就是 Dockerfile 所在的目录

### 网络

Docker 网络是由 Docker Engine 本身提供的，可以通过 `docker network ls` 查看。

默认情况下，所有容器都是以 bridge 方式连接到 Docker 的一个虚拟网桥上：

![网络](/assets/images/网络.png)

加入自定义网络的容器才可以通过容器名互相访问，Docker 的网络操作命令如下：

![自定义网络-指令](/assets/images/自定义网络-指令.png)

选项：**`--network customNetworkName`** 创建时就连上

`docker run -d --name containerName -p 80:80 --network customNetworkName imageName`

```bash
# 1.首先通过命令创建一个网络
docker network create hmall

# 2.然后查看网络
docker network ls
# 结果：
NETWORK ID     NAME      DRIVER    SCOPE
639bc44d0a87   bridge    bridge    local
403f16ec62a2   hmall     bridge    local
0dc0f72a0fbb   host      host      local
cd8d3e8df47b   none      null      local
# 其中，除了hmall以外，其它都是默认的网络

# 3.让dd和mysql都加入该网络，注意，在加入网络时可以通过--alias给容器起别名
# 这样该网络内的其它容器可以用别名互相访问！
# 3.1.mysql容器，指定别名为db，另外每一个容器都有一个别名是容器名
docker network connect hmall mysql --alias db
# 3.2.db容器，也就是我们的java项目
docker network connect hmall dd

# 4.进入dd容器，尝试利用别名访问db
# 4.1.进入容器
docker exec -it dd bash
# 4.2.用db别名访问
ping db
# 结果
PING db (172.18.0.2) 56(84) bytes of data.
64 bytes from mysql.hmall (172.18.0.2): icmp_seq=1 ttl=64 time=0.070 ms
64 bytes from mysql.hmall (172.18.0.2): icmp_seq=2 ttl=64 time=0.056 ms
# 4.3.用容器名访问
ping mysql
# 结果：
PING mysql (172.18.0.2) 56(84) bytes of data.
64 bytes from mysql.hmall (172.18.0.2): icmp_seq=1 ttl=64 time=0.044 ms
64 bytes from mysql.hmall (172.18.0.2): icmp_seq=2 ttl=64 time=0.054 ms
```

### 项目部署

...

### DockerCompose

Docker Compose 通过一个单独的 docker-compose.yml 模板文件(YAML 格式)来定义一组相关联的应用容器，帮助我们实现多个相查关联的 Docker:容器的快速部署。

![DockerCompose](/assets/images/dockercompose.png)

```bash
docker run -d \
  --name mysql \
  -p 3306:3306 \
  -e TZ=Asia/Shanghai \
  -e MYSQL_ROOT_PASSWORD=123 \
  -v ./mysql/data:/var/lib/mysql \
  -v ./mysql/conf:/etc/mysql/conf.d \
  -v ./mysql/init:/docker-entrypoint-initdb.d \
  --network hmall
  mysql
```

如果用 `docker-compose.yml` 文件来定义，就是这样：

```bash
version: "3.8"

services:
  mysql:
    image: mysql
    container_name: mysql
    ports:
      - "3306:3306"
    environment:
      TZ: Asia/Shanghai
      MYSQL_ROOT_PASSWORD: 123
    volumes:
      - "./mysql/conf:/etc/mysql/conf.d"
      - "./mysql/data:/var/lib/mysql"
    networks:
      - new
networks:
  new:
    name: hmall

```

![docker-run](/assets/images/docker-run.png)
![docker-compose-指令](/assets/images/docker-compose-指令.png)

`docker compose up -d`

```bash
version: "3.8"

services:
  mysql:
    image: mysql
    container_name: mysql
    ports:
      - "3306:3306"
    environment:
      TZ: Asia/Shanghai
      MYSQL_ROOT_PASSWORD: 123
    volumes:
      - "./mysql/conf:/etc/mysql/conf.d"
      - "./mysql/data:/var/lib/mysql"
      - "./mysql/init:/docker-entrypoint-initdb.d"
    networks:
      - hm-net
  hmall:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: hmall
    ports:
      - "8080:8080"
    networks:
      - hm-net
    depends_on:
      - mysql
  nginx:
    image: nginx
    container_name: nginx
    ports:
      - "18080:18080"
      - "18081:18081"
    volumes:
      - "./nginx/nginx.conf:/etc/nginx/nginx.conf"
      - "./nginx/html:/usr/share/nginx/html"
    depends_on:
      - hmall
    networks:
      - hm-net
networks:
  hm-net:
    name: hmall
```
