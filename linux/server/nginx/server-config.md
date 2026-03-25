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
