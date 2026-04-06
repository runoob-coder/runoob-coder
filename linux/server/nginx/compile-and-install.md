---
titleTemplate: Nginx | 个人服务器环境搭建 | noob-coder | 菜鸟码农
head:
  - - meta
    - name: description
      content: 
  - - meta
    - name: keywords
      content: http,threads,服务器优化,www,dnf,yum,Linux,服务器环境搭建,宝塔面板一键部署,服务器运维面板,宝塔,nginx,Apache,mysql,redis,ssl,supervisor,git,composer,php,noob-coder,菜鸟码农
---

# 源码编译安装Nginx

## 官网资料

[官网](https://nginx.org/)

源码下载：[nginx: download](https://nginx.org/en/download.html)

源码安装文档：[Building nginx from Sources](https://nginx.org/en/docs/configure.html)


## 环境准备

```bash
# gcc 安装
yum -y install gcc gcc-c++ make
# PCRE（Perl兼容正则表达式库）和开发库（用于HTTP重写模块）
yum -y install pcre pcre-devel
# zlib库（用于数据压缩）
yum -y install zlib zlib-devel
# OpenSSL和相关开发库（用于SSL支持）
yum -y install openssl openssl-devel
```

::: tip 注
`xxx-devel`或`xxx-dev`：开发库，用于编译时链接到xxx库。若安装编译安装过程中提示缺少xxx-devel，则下载安装对应的开发库即可。
:::

## 下载并解压源码

请在 `/www/sever/src/` 或 `/usr/local/src/` 目录下进行下载，后续其他的编译安装均在此目录下进行。

```bash
# 官网下载源码，详见上述资料。此处以1.26.2稳定版为例。
wget https://nginx.org/download/nginx-1.26.2.tar.gz
# 解压源码，并进入源码目录
tar -zxvf nginx-1.26.2.tar.gz && cd nginx-1.26.2
```

![下载并解压Nginx源码](/linux/server/nginx/download_nginx_sources.avif)

## 配置编译参数

运行 `./configure` 并指定安装路径和模块，将会创建一个`Makefile`文件，用于编译和安装：

```bash
./configure \
  ## 统一关键路径，便于管理和维护
  --prefix=/usr/local/nginx \          # 安装路径（默认为/usr/local/nginx）
  --sbin-path=/usr/sbin/nginx \        # 可执行文件路径（默认为prefix/sbin/nginx）
  --conf-path=/etc/nginx/nginx.conf \  # 配置文件路径
  --pid-path=/var/run/nginx.pid \      # PID 文件路径
  --lock-path=/var/lock/nginx.lock \
  --error-log-path=/var/log/nginx/error.log \
  --http-log-path=/var/log/nginx/access.log \
  --user=www --group=www \             # 指定用户和组（也可以通过 nginx.conf 进行配置）
  ## 启用高性能模块
  --with-threads \                     # 启用线程池，提升IO效率
  --with-file-aio \                    # 异步文件IO（Linux内核≥2.6.22）
  --with-http_ssl_module \             # 启用 SSL 支持（https）
  --with-http_v2_module \              # 启用 HTTP/2
  --with-http_v3_module \              # 启用 HTTP/3（更快、更可靠，根据个人需要选择）
  --with-http_realip_module \          # 启用真实客户端IP解析（需配合代理）
  --with-http_gunzip_module \          # 动态解压预压缩文件
  --with-http_gzip_static_module       # 预压缩.gz文件直接发送
  --with-http_stub_status_module       # 启用状态监控模块
  --with-pcre-jit                      # 启用PCRE JIT编译加速正则
  --without-http_autoindex_module \    # 禁用自动索引目录列表

# 若需其他模块，可参考官方文档添加参数
```

```bash
./configure --prefix=/usr/local/nginx --sbin-path=/usr/sbin/nginx --conf-path=/etc/nginx/nginx.conf --pid-path=/var/run/nginx.pid --lock-path=/var/lock/nginx.lock --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --user=www --group=www --with-threads --with-file-aio --with-http_ssl_module --with-http_v2_module --with-http_v3_module --with-http_realip_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_stub_status_module --with-pcre-jit --without-http_autoindex_module
```

配置参数详见：https://nginx.org/en/docs/configure.html

![nginx配置编译参数](/linux/server/nginx/nginx_configure.avif)

## 编译并安装

```bash
# 安装到系统目录
make install
```

![nginx编译并安装](/linux/server/nginx/nginx_make_install.avif)

## 验证安装

![nginx验证安装](/linux/server/nginx/nginx_version.avif)

### 检查安装路径和版本 

```bash
ls /usr/local/nginx   # 确认安装目录存在
nginx -v              # 查看Nginx安装版本
nginx -V              # 打印 Nginx 版本、编译器版本和配置参数
```

### 启动Nginx并检查服务状态

```bash
sudo nginx            # 启动Nginx
curl -I 127.0.0.1     # 查看 HTTP 响应头
ps aux | grep nginx   # 查看进程
```

启动Nginx服务后，可以通过浏览器或CURL访问Nginx的默认首页，并检查服务是否正常。

![Nginx的默认首页](/linux/server/nginx/welcome_to_nginx.avif)

## 设置环境变量

如果你编译配置的安装路径不在系统默认的 PATH 中，则需要设置环境变量。如下所示：

```bash
echo "export PATH=$PATH:/usr/local/nginx/sbin" >> /etc/profile
source /etc/profile
```

## 设置开机自启

创建 systemd 服务文件：

```bash
sudo vim /etc/systemd/system/nginx.service
```

写入以下内容：

```ini
[Unit]
# 描述服务
Description=nginx服务
# 描述服务类别
After=network.target

# 服务运行参数的设置
[Service]
# 以 fork 方式从父进程创建子进程，创建后父进程会立即退出
Type=forking
# nginx.conf设置pid位置
PIDFile=/var/run/nginx.pid
# 启动当前服务之前执行的命令 
ExecStartPre=/usr/sbin/nginx -t
# 启动当前服务的命令
ExecStart=/usr/sbin/nginx
# 重启当前服务时执行的命令
ExecReload=/usr/sbin/nginx -s reload
# 停止当前服务时执行的命令
ExecStop=/usr/sbin/nginx -s stop
#ExecStop=/bin/kill -s QUIT $MAINPID
# 定义何种情况 Systemd 会自动重启当前服务 always（总是重启）
Restart=always
# 表示给服务分配独立的临时空间
PrivateTmp=true
#TimeoutStopSec=5
#KillMode=mixed

[Install]
# 运行级别设置，可设置为多用户，即系统运行级别为3
WantedBy=multi-user.target
```

启用并启动服务：

```bash
# 重载服务配置
systemctl daemon-reload
# 启动nginx服务
systemctl start nginx
# 设置开机自启nginx服务
systemctl enable nginx
# 查看nginx服务状态
systemctl status nginx
# 停止nginx服务
systemctl stop nginx
# 平滑重启nginx服务
systemctl reload nginx
```

可以通过 `reboot` 重启服务器验证 nginx 是否开机自启。
