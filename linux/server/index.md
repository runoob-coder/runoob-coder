此仅为个人项目常用环境配置，仅供个人学习参考。

如果觉得此环境搭建部署麻烦，推荐新手/懒人使用[**宝塔面板一键部署 🚀**](https://www.bt.cn/u/1lohGU)。

[![宝塔,安全高效的服务器运维面板](https://www.bt.cn/static/astro/images/home/banner-1/bt_video.gif)](https://www.bt.cn/u/1lohGU)

# 前期准备

## 更新升级软件包

```bash
yum upgrade -y
dnf upgrade-minimal --security -y
```


## 创建www用户

```bash
# 创建 www 用户组
sudo groupadd www
# 创建 www 用户并添加到 www 用户组
sudo useradd -s /sbin/nologin -g www www
# 验证配置
grep 'www' /etc/passwd
# 切换 www 账号
su -s /bin/bash www
```

![创建www用户](/linux/server/preparation/www_user.avif)

## www相关目录

```bash
# 创建相关目录
mkdir -p /www/{wwwlogs,wwwroot,server,vhost}
# 赋予给www用户
cd /www/
chown www:www wwwlogs wwwroot
ls -al
```

![www目录](/linux/server/preparation/www_dir.avif)

```bash
/www/
├── server	# 服务
│   └── src	# 服务安装的源码
├── vhost
├── wwwlogs	# 日志
└── wwwroot	# 项目
```

