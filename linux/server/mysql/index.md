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

Mysql安装成功后，默认的root用户密码为空，你可以使用以下命令来创建root用户的密码：

```bash
mysqladmin -u root password "new_password";
```

- 新建帐号：

root默认只能本地连接，如需要远程连接，我们可以创新新帐号

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


CREATE USER 'test'@'%' IDENTIFIED BY 'b7EDsztpD6W8iSkf';
