---
titleTemplate: MySQL | 个人服务器环境搭建 | noob-coder | 菜鸟码农
head:
  - - meta
    - name: description
      content: 此仅为个人项目常用环境配置，仅供个人学习参考。如果觉得此环境搭建部署麻烦，推荐新手/懒人使用 宝塔面板一键部署 🚀。
  - - meta
    - name: keywords
      content: mysqladmin,mysqld,mysql-server,服务器优化,www,dnf,yum,Linux,服务器环境搭建,宝塔面板一键部署,服务器运维面板,宝塔,nginx,Apache,mysql,redis,ssl,supervisor,git,composer,php,noob-coder,菜鸟码农
---

# MySQL

由于个人服务器性能不高，仅用于开发测试，因此没必要编译安装MySQL。

线上生产环境请自行编译安装，或使用云数据库。

## 安装与配置

- 安装：

```bash
yum install mysql-server
```

- 权限设置：

```bash
chown -R mysql:mysql /var/lib/mysql/
```

- 初始化 MySQL：

```bash
mysqld --initialize
```

- 验证安装：
```bash
mysqladmin --version
```

```
mysqladmin  Ver 8.0.45 for Linux on x86_64 (Source distribution)
```

- 添加到系统服务

```bash
systemctl daemon-reload
systemctl enable mysqld
systemctl start mysqld
systemctl status mysqld
```

## 管理

- root密码：

Mysql 安装成功后，默认的 root 用户密码为空，你可以使用以下命令来创建 root 用户的密码：

```bash
mysqladmin -u root password "new_password";
```

- 新建帐号：

root 默认只能本地连接，如需要远程连接，我们可以创新新帐号，并授权远程连接权限：

```bash
mysql -u root -p
```

```sql
# 允许从任意主机连接（%）
CREATE USER 'test'@'%' IDENTIFIED BY 'your_password';
       
# 授予所有权限（或按需授权）
GRANT ALL PRIVILEGES ON *.* TO 'test'@'%' WITH GRANT OPTION;

# 刷新权限        
FLUSH PRIVILEGES;
```
