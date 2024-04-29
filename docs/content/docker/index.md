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
10. `docker save [-o] IMAGE:latest [IMAGE...]`：导出一个镜像
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
