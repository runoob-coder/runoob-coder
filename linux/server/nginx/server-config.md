# 服务项目配置

通过 `nginx -t` 命令检测配置文件。

```
[root@test ~]# nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

假设配置文件位于 `/etc/nginx/nginx.conf`，如果我们所有服务都在此文件里配置，不利于管理与维护。

因此我们在 `/www/vhost/` 里放置所有都服务配置文件。

需修改全局配置文件，并在 `http` 块里引入上述配置文件目录。

::: code-group
```conf{4} [ /etc/nginx/nginx.conf]
# 其他配置
http {
    # 其他配置
// [!code focus][!code ++]
    include /www/vhost/*.conf;
}
```
:::

## 静态网页

::: code-group
```conf [ /www/vhost/web.conf ]
server
{
    listen 80;
    # listen 443 ssl;
    server_name test.example.com;
    index index.php index.html index.htm default.php default.htm default.html;
    root /www/wwwroot/web;
    
    # 字符集设置
    charset utf-8;

    # Gzip 压缩优化
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {

        # 文件尝试顺序：精确匹配 -> HTML 文件 -> 目录 -> 404
        try_files $uri $uri.html $uri/ =404;

         # 自定义错误页面
        error_page 404 /404.html;
        error_page 403 /404.html;
        
        # 静态资源缓存 - 带哈希文件名的资源永久缓存
        location ~* ^/assets/ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            access_log off;
        }
    }

    # 禁止访问的文件或目录
    location ~ ^/(\.user.ini|\.htaccess|\.git|\.env|\.svn|\.project|LICENSE|README.md)
    {
        return 404;
    }
    
    # 禁止访问备份文件和隐藏文件
    location ~ /\.(htaccess|htpasswd|ini|log|sh|sql|conf|bak)$
    {
        deny all;
    }

    # 图片资源缓存
    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
    {
        expires      30d;
        access_log off;
        error_log off;
    }

    # CSS 和 JavaScript 缓存
    location ~ .*\.(js|css)?$
    {
        expires      12h;
        access_log off;
        access_log off;
    }
    
    # ssl证书配置
    # 参考后续配置

    # 日志配置
    access_log  /www/wwwlogs/web/access_log.log;
    error_log  /www/wwwlogs/web/error.log;
}
```
:::

## PHP-FPM

## 反向代理

项目示例：Hyperf

https://hyperf.wiki/3.1/#/zh-cn/tutorial/nginx

::: code-group
```conf [ /www/vhost/hyperf.conf ]
# 至少需要一个 Hyperf 节点，多个配置多行
upstream hyperf {
    # Hyperf HTTP Server 的 IP 及 端口
    server 127.0.0.1:9503;
}

server {
    # 监听端口
    listen 80;
    server_name hyperf.example.com;
    
    # 字符集设置
    charset utf-8;

    location / {
        # 将客户端的 Host 和 IP 信息一并转发到对应节点  
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # 转发Cookie，设置 SameSite
        proxy_cookie_path / "/; secure; HttpOnly; SameSite=strict";

        # 执行代理访问真实服务器
        proxy_pass http://hyperf;
    }
   
    # ssl证书配置
    # 参考后续配置
   
    access_log  /www/wwwlogs/hyperf/access_log.log;
    error_log  /www/wwwlogs/hyperf/error.log;

}
```
:::

## SSL证书配置

::: code-group
```conf [ /www/vhost/hyperf.conf ]
# 至少需要一个 Hyperf 节点，多个配置多行
upstream hyperf {
    # Hyperf HTTP Server 的 IP 及 端口
    server 127.0.0.1:9503;
}

server {
    # 监听端口
    listen 80;
    // [!code focus][!code ++]
    listen  443 ssl;
    server_name hyperf.example.com;
    
    # 字符集设置
    charset utf-8;

    // [!code focus][!code ++]
    # ssl证书配置
    // [!code focus][!code ++]
    ssl_certificate /etc/nginx/ssl/*.test.example.com.cert.pem;
    // [!code focus][!code ++]
    ssl_certificate_key /etc/nginx/ssl/*.test.example.com.key.pem;
    // [!code focus][!code ++]
    ssl_session_timeout 5m;
    // [!code focus][!code ++]
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
    // [!code focus][!code ++]
    ssl_ciphers EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
    // [!code focus][!code ++]
    ssl_prefer_server_ciphers on;
    // [!code focus][!code ++]
    # 强制Https
    // [!code focus][!code ++]
    add_header Strict-Transport-Security "max-age=31536000";

    location / {
        # 将客户端的 Host 和 IP 信息一并转发到对应节点  
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # 转发Cookie，设置 SameSite
        proxy_cookie_path / "/; secure; HttpOnly; SameSite=strict";

        # 执行代理访问真实服务器
        proxy_pass http://hyperf;
    }
   
    access_log  /www/wwwlogs/hyperf/access_log.log;
    error_log  /www/wwwlogs/hyperf/error.log;

}
```
:::
