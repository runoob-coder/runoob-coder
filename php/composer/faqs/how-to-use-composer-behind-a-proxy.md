---
titleTemplate: 常见问题 | Composer中文文档 - PHP 的依赖管理器 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: HTTPS_PROXY_REQUEST_FULLURI,HTTP_PROXY_REQUEST_FULLURI,CIDR表示法,curl,IPv4,IPv6,CMS,CLI,代理服务器,http_proxy,https_proxy,CGI_HTTP_PROXY,Perl,no_proxy,composer.json,vendor,Composer,依赖管理器,PHP,libraries,dependency,noob-coder,菜鸟码农
  - - meta
    - name: description
      content: 
---

# 如何在代理服务器后使用 Composer？

Composer 与许多其他工具一样，使用环境变量来控制代理服务器的使用，支持：

- `http_proxy` - 用于 HTTP 请求的代理
- `https_proxy` - 用于 HTTPS 请求的代理
- `CGI_HTTP_PROXY` - 在非 CLI 环境中用于 HTTP 请求的代理
- `no_proxy` - 不需要代理的域名

这些命名变量是一种约定，而不是官方标准，它们在不同操作系统和工具中的演变和使用是复杂的。Composer 更倾向于使用小写名称，但在适当情况下也接受大写名称。

## 使用方法

Composer 需要特定的环境变量来处理 HTTP 和 HTTPS 请求。例如：

```
http_proxy=http://proxy.com:80
https_proxy=http://proxy.com:80
```

也可以使用大写名称。

### 非 CLI 使用

Composer 在非 CLI 环境中不会查找 `http_proxy` 或 `HTTP_PROXY`。如果你以这种方式运行（即集成到 CMS 或类似用例中），必须为 HTTP 请求使用 `CGI_HTTP_PROXY`：

```
CGI_HTTP_PROXY=http://proxy.com:80
https_proxy=http://proxy.com:80

# cgi_http_proxy 也可以使用
```

> [!NOTE] 注意
> CGI_HTTP_PROXY 由 Perl 在 2001 年引入，以防止请求头操作，并在 2016 年这个漏洞被广泛报道时流行起来：https://httpoxy.org

## 语法

使用 `scheme://host:port` 格式，如上面的示例所示。虽然缺少协议时默认为 http，缺少端口时 http/https 协议默认为 80/443，但其他工具可能需要这些值。

主机可以指定为 IPv4 的点分四段表示法 IP 地址，或用方括号括起来的 IPv6 地址。

### 授权认证

Composer 支持基本授权（Basic Authorization），使用 `scheme://user:pass@host:port` 语法。用户名或密码中的保留 URL 字符必须进行百分号编码。例如：

```
user:  me@company
pass:  p@ssw$rd
proxy: http://proxy.com:80

# 百分号编码的授权
me%40company:p%40ssw%24rd

scheme://me%40company:p%40ssw%24rd@proxy.com:80
```

> [!NOTE] 注意
> 用户名和密码组件必须单独进行百分号编码，然后用冒号分隔符组合。用户名不能包含冒号（即使是百分号编码的），因为代理会在找到的第一个冒号处分割组件。

## HTTPS 代理服务器

Composer 支持 HTTPS 代理服务器，其中 HTTPS 是连接到代理使用的协议，但仅限于 PHP 7.3 及以上版本且 curl 版本为 7.52.0 及以上。

```
http_proxy=https://proxy.com:443
https_proxy=https://proxy.com:443
```

## 绕过特定域的代理

使用 `no_proxy`（或 `NO_PROXY`）环境变量设置代理**不应**使用的逗号分隔的域名列表。

```
no_proxy=example.com
# 绕过 example.com 及其子域的代理

no_proxy=www.example.com
# 绕过 www.example.com 及其子域的代理，但不包括 example.com
```

域名可以限制在特定端口（例如 `:80`），也可以指定为 IP 地址或 CIDR 表示法的 IP 地址块。

IPv6 地址不需要像 `http_proxy`/`https_proxy` 值那样用方括号括起来，尽管这种格式是可接受的。

将值设置为 `*` 将绕过所有请求的代理。

> [!NOTE] 注意
> 域名中的前导点没有意义，在处理前会被移除。

## 已弃用的环境变量

Composer 最初提供了 `HTTP_PROXY_REQUEST_FULLURI` 和 `HTTPS_PROXY_REQUEST_FULLURI` 来帮助缓解行为异常的代理问题。这些变量不再需要或使用。
