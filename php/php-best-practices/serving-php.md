---
titleTemplate: PHP 最佳实践 中文文档 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: PHP最佳实践,PHP标准规范,PHP Standards Recommendations,PSR,PHP,noob-coder,菜鸟码农
---

# 通过 Web 服务器运行 PHP

## 使用 [PHP-FPM](https://www.php.net/manual/zh/install.fpm.php)

配置 Web 服务器以运行 PHP 有多种方式。早期常用 Apache 的 [`mod_php`](http://stackoverflow.com/questions/2712825/what-is-mod-php)。mod_php 会将 PHP 绑定到 Apache，但 Apache 管理 PHP 的方式很差，一旦有真实流量就会遇到严重的内存问题。

后来出现了两个新方案：[`mod_fastcgi`](http://www.fastcgi.com/mod_fastcgi/docs/mod_fastcgi.html) 和 [`mod_fcgid`](http://httpd.apache.org/mod_fcgid/)。它们会保持有限数量的 PHP 进程运行，Apache 将请求发送给这些接口，由它们代为执行 PHP。由于这些库限制了 PHP 进程数量，内存占用大幅降低，性能却不受影响。

一些聪明的人专门为 PHP 设计了 fastcgi 的实现，称为 [`PHP-FPM`](https://www.php.net/manual/zh/install.fpm.php)。从 Ubuntu 12.04 起，这成为 Web 服务器的标准方案。

自 Ubuntu 12.04 之后，Apache 推出了与 PHP-FPM 交互的新方式：[`mod_proxy_fcgi`](http://httpd.apache.org/docs/2.4/mod/mod_proxy_fcgi.html)。我们会用这个模块将 Apache 接收到的 PHP 请求转发给 FPM 实例。

以下示例适用于 Apache 2.4.29，但 PHP-FPM 也支持 Nginx 等其他 Web 服务器。 

## 安装 PHP-FPM 和 Apache

在 Ubuntu 18.04 上，可以通过以下命令安装 PHP-FPM 和 Apache：

```shell
sudo apt-get install apache2 php-fpm
sudo a2enmod proxy_fcgi rewrite
``` 

首先，我们要创建一个新的 PHP FPM 池来服务我们的应用。

将以下内容粘贴到 `/etc/php/7.2/fpm/pool.d/mysite.conf`：

```conf
[mysite]  
user = www-data  
group = www-data

listen = /run/php/mysite.sock  
listen.owner = www-data  
listen.group = www-data

pm = ondemand  
pm.max_children = 10
```

（配置 PHP-FPM 池时还有很多其他的选项，尤其是 `php_admin_value[include_path]`。）

接下来，配置 Apache 虚拟主机，将 PHP 请求转发到 PHP-FPM 进程。在 Ubuntu 默认配置文件 `/etc/apache2/sites-available/000-default.conf` 的 `<VirtualHost>` 指令中粘贴以下内容：

```conf
<VirtualHost *:80>  
<Directory />  
Require all granted  
</Directory>

    # FPM 接收 Transfer-Encoding: chunked 的 POST 数据所需
    # 需要 Apache 2.4.47+ 的 bug 修复
    SetEnv proxy-sendcl 1

    RewriteEngine on  
    RewriteCond %{REQUEST_FILENAME} \.php$  
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_FILENAME} -f  
    RewriteRule . proxy:unix:/run/php/mysite.sock|fcgi://localhost%{DOCUMENT_ROOT}%{REQUEST_FILENAME} [P]  
</VirtualHost>
```

最后，重启 Apache 和 FPM 进程：

```shell
sudo systemctl restart apache2.service php7.2-fpm.service
```

## 延伸阅读

- [PHP 手册：PHP-FPM](https://www.php.net/manual/zh/install.fpm.php)
- [PHP-FPM 官网](https://php-fpm.org/)
- [Apache2 与 php fpm 性能优化——分步指南](https://medium.com/@sbuckpesch/apache2-and-php-fpm-performance-optimization-step-by-step-guide-1bfecf161534)

- [Franken PHP ：现代 PHP 应用服务器](https://frankenphp.dev/cn/)
