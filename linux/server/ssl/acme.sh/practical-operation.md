# 实操

测试环境直接使用通配符证书，便于维护。

生产环境建议给对应的域名进行配置证书。

通配符证书需要使用 `DNS` 验证，手动验证 `acme.sh` 将**无法自动更新证书**，故需要 `DNS API` 自动验证。

## DNS API

DNS 方式的真正强大之处在于可以使用域名解析商提供的 API 自动添加 TXT 记录，且在完成验证后删除对应的记录。

acme.sh 目前支持超过一百家的 DNS API。

更详细的 DNS API 用法: https://github.com/acmesh-official/acme.sh/wiki/dnsapi

以`阿里云`为例：

首先你需要登录你的[阿里云账户](https://ram.console.aliyun.com/users)来获取你的`RAM API`密钥。

```bash
export Ali_Key="<key>"
export Ali_Secret="<secret>"
```

帐号信息将保存在 `~/.acme.sh/account.conf` 中，并在需要时自动获取，无需手动再设置。

注意：建议新建一个RAM帐号，权限策略需要添加 `AliyunDNSFullAccess`,即 `管理云解析（DNS）的权限`，

## 签发通配符证书
完成 `DNS API` 帐号配置后， 现在我们可以签发通配符证书了：

```bash
acme.sh --issue --dns dns_ali -d *.test.example.com
```

### 复制证书

证书生成好以后，我们需要把证书复制给对应的 Apache、Nginx 或其他服务器去使用。

必须使用 `--install-cert` 命令来把证书复制到目标文件，请勿直接使用 `~/.acme.sh/` 目录下的证书文件，这里面的文件都是内部使用，而且目录结构将来可能会变化。

Nginx 示例:

首先新建一个配置目录用于放置证书文件：

```bash
mkdir /etc/nginx/ssl
```

```bash
acme.sh --install-cert -d *.test.example.com \
--key-file       /etc/nginx/ssl/*.test.example.com.key.pem  \
--fullchain-file /etc/nginx/ssl/*.test.example.com.cert.pem \
--reloadcmd     "service nginx force-reload"
```

Nginx后续配置SSL证书请参考 [服务配置这里](/linux/server/nginx/server-config.md)。

## HTTP 验证

### 使用 Nginx 模式

- 签发：

```bash
acme.sh --issue --nginx -d test.example.com
```

- 复制证书：
```bash
acme.sh --install-cert -d test.example.com \
--key-file       /etc/nginx/ssl/test.example.com.key.pem  \
--fullchain-file /etc/nginx/ssl/test.example.com.cert.pem \
--reloadcmd     "service nginx force-reload"
```
