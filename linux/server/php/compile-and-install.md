# 源码编译安装php

## 编译安装

![install_configure](/linux/server/php/install_configure.avif)

### 下载源码

建议下载最新稳定版：https://www.php.net/downloads

```shell
# 从官方下载（替换为最新版本链接）
wget https://www.php.net/distributions/php-8.3.16.tar.gz
tar -zxvf php-8.3.16.tar.gz
cd php-8.3.16
```

### 安装相关依赖包

```shell
yum -y install systemd-devel libxml2-devel sqlite-devel libcurl-devel
# GD 库相关依赖包
yum -y install libpng-devel libavif-devel libwebp-devel libjpeg-devel freetype-devel
# 字符处理相关依赖包
yum -y install oniguruma-devel
# 加密相关依赖包
yum -y install libsodium-devel
# 压缩相关依赖包
yum -y install libzip-devel
```

如果找不到对应的依赖包，请尝试使用 `epel` 仓库源。

```bash
dnf install epel-release
```

或从 https://mirrors.aliyun.com/alinux/4/devel 仓库手动安装。

```bash
yum install libavif
rpm -ivh https://mirrors.aliyun.com/alinux/4/devel/x86_64/os/Packages/libavif-devel-0.11.1-4.alnx4.x86_64.rpm

yum install libzip
rpm -ivh https://mirrors.aliyun.com/alinux/4/devel/x86_64/os/Packages/libzip-devel-1.10.1-1.alnx4.x86_64.rpm
```

### 配置编译选项

核心配置选项列表：https://www.php.net/manual/zh/configure.about.php

要查看所有可用配置选项的列表，在运行 autoconf 命令后在 PHP 的源代码目录运行 **`./configure --help`**（参见[安装与配置](https://www.php.net/manual/zh/install.php)）。若需调试，添加 `--enable-debug`。

```shell
./configure --prefix=/usr/local/php/php83 --with-config-file-path=/etc/php/php83 --with-config-file-scan-dir=/etc/php/php83/conf.d --enable-fpm --with-fpm-user=www --with-fpm-group=www --with-fpm-systemd --enable-zts --with-openssl --with-zlib --enable-bcmath --with-curl --enable-gd --with-avif --with-webp --with-jpeg --with-freetype --enable-intl --enable-mbstring --with-mysqli=mysqlnd --with-pdo-mysql=mysqlnd --enable-opcache --enable-opcache-jit --enable-pcntl --enable-sockets --with-sodium --with-zip
```

```bash
./configure \
  ## 统一关键路径，便于管理和维护
  --prefix=/usr/local/php/php83 \           # 安装路径
  ## 通用设置 
  --with-config-file-path=/etc/php/php83 \  # 配置文件路径
  --with-config-file-scan-dir=/etc/php/php83/conf.d \  # 设置扫描配置文件的路径
  ## SAPI（服务器应用编程接口） 模块配置
  --enable-fpm \              # 开启FPM模式
  --with-fpm-user=www \       # 设置 php-fpm 运行的用户
  --with-fpm-group=www \      # 设置 php-fpm 运行的用户组
  --with-fpm-systemd \        # 激活 systemd 集成
  ## 模式
  # 启用 ZTS 线程安全模式
  # （swoole6.0的Thread模块需要ZTS，如果不需要多线程模式，可忽略此选项，将在NTS模式下编译）
  --enable-zts \ 
  ## 扩展模块设置
  ### 基础扩展
  --with-openssl \            # 启用 OpenSSL 支持（需要 OpenSSL >= 1.0.2）
  --with-zlib \               # 包含 ZLIB 支持 (需要 zlib >= 1.2.0.4)
  ### 数学和数据处理
  --enable-bcmath \           # 启用 bc 风格的高精度数学函数
  --with-curl \               # 启用 cURL 支持
  ### 数据库抽象层 (DBA)
  ### 其他扩展
  --enable-gd \               # 包含 GD 支持（libgd图像生成和处理）
  --with-avif \               # 启用 AVIF 支持（仅限捆绑 libgd）
  --with-webp \               # 启用 WebP 支持（仅限捆绑 libgd）
  --with-jpeg \               # 启用 JPEG 支持（仅限捆绑 libgd）
  --with-freetype \           # 启用 FreeType 2 支持（仅限捆绑 libgd）
  --enable-intl \             # 启用国际化支持
  --enable-mbstring \         # 启用多字节字符串支持
  --with-mysqli=mysqlnd \     # 启用mysql原生驱动支持  
  --with-pdo-mysql=mysqlnd \  # 启用PDO_MYSQL支持
  --enable-opcache \          # 启用 Zend OPcache 支持（PHP 7.0+ 默认启用，但建议保留此选项）
  --enable-opcache-jit \      # 启用 Zend OPcache JIT 支持（PHP 8.0+ 支持，提升 CPU 密集型任务性能）
  --enable-pcntl \            # 启用 pcntl 支持（仅限 CLI/CGI）
  --enable-sockets \          # 启用 sockets 支持
  --with-sodium \             # 启用 sodium 支持
  --with-zip \                # 包含 Zip 读写支持
```

:::tip 注：

若编译配置时提示缺少依赖包，可尝试安装对应的开发依赖包`xxx-devel`，缺啥补啥：

Package 'xxx', required by 'virtual:world', not found

亦或者通过 `CFLAGS` 引入本地对应的依赖。

然后再次运行 `./configure` 命令进行编译配置。

当出现`Thank you for using PHP.`时表明已完成编译配置。

:::

### 编译安装

编译配置完成后，执行 `make install` 进行编译安装。

![编译安装](/linux/server/php/make_install.avif)


### 其他扩展模块安装

扩展模块按需安装，后续如需安装其他扩展模块，

```shell
ext
├── bcmath
├── bz2
├── calendar
├── com_dotnet
├── ctype
├── curl
├── date
├── dba
├── dl_test
├── dom
├── enchant
├── exif
├── ffi
├── fileinfo
├── filter
├── ftp
├── gd
├── gettext
├── gmp
├── hash
├── iconv
├── imap
├── intl
├── json
├── ldap
├── libxml
├── mbstring
├── mysqli
├── mysqlnd
├── oci8
├── odbc
├── opcache
├── openssl
├── pcntl
├── pcre
├── pdo
├── pdo_dblib
├── pdo_firebird
├── pdo_mysql
├── pdo_oci
├── pdo_odbc
├── pdo_pgsql
├── pdo_sqlite
├── pgsql
├── phar
├── posix
├── pspell
├── random
├── readline
├── reflection
├── session
├── shmop
├── simplexml
├── skeleton
├── snmp
├── soap
├── sockets
├── sodium
├── spl
├── sqlite3
├── standard
├── sysvmsg
├── sysvsem
├── sysvshm
├── tidy
├── tokenizer
├── xml
├── xmlreader
├── xmlwriter
├── xsl
├── zend_test
├── zip
└── zlib
```

## 验证

## 设置环境变量

```shell
echo "export PATH=$PATH:/usr/local/php/php83/bin/" >> /etc/profile
echo "export PATH=$PATH:/usr/local/php/php83/sbin/" >> /etc/profile
source /etc/profile
```

## ini配置

```
php --ini
```

```bash
Configuration File (php.ini) Path: "/etc/php/php85"
Loaded Configuration File:         (none)
Scan for additional .ini files in: "/etc/php/php85/conf.d"
Additional .ini files parsed:      (none)
```

如果没有配置文件，则创建一个空的配置文件：

```
touch /etc/php/php85/php.ini
```

```bash
Configuration File (php.ini) Path: "/etc/php/php85"
Loaded Configuration File:         "/etc/php/php85/php.ini"
Scan for additional .ini files in: "/etc/php/php85/conf.d"
Additional .ini files parsed:      (none)
```

## 配置 PHP-FPM

## systemd服务
