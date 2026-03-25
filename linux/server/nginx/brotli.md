# Brotli压缩

Brotli 是基于 **`LZ77算法`** 的一个现代变体、霍夫曼编码和二阶上下文建模。Google软件工程师在2015年9月发布了包含通用无损数据压缩的Brotli增强版本，特别侧重于HTTP压缩。

Brotli 和 Gzip 可以在 Nginx 中可以同时启用，且这是推荐的实践方案。Nginx 会根据客户端的支持情况自动选择最优压缩方式（Brotli 优先级高于 Gzip）。

浏览器支持情况：https://caniuse.com/brotli

## Brotli 与 Gzip 的协同工作原理

1. 客户端请求头：客户端通过 Accept-Encoding 声明支持的压缩类型（如 Accept-Encoding: gzip, deflate, br）。

2. 服务端响应逻辑：

- 如果客户端支持 Brotli（含 br），优先返回 Brotli 压缩内容；

- 如果客户端不支持 Brotli 但支持 Gzip（含 gzip），返回 Gzip 压缩内容；

- 如果都不支持，返回未压缩内容。

## 源码编译安装

`google/ngx_brotli` 从 16年12月的版本起，开始内置 `google/brotli`，所以我们不需要额外编译 `bagder/libbrotli` 库，让安装变得简单起来。

安装方式有两种：**静态编译**和**动态加载**。

### 仓库地址

https://github.com/google/ngx_brotli

### 静态编译


### 动态加载



## 配置

配置指令文档：https://github.com/google/ngx_brotli?#configuration-directives

编辑 **`nginx.conf`** 配置文件，在 **`http`** 块中添加以下配置：

```nginx
## brotli 配置
# 预压缩文件支持（需生成 .br 文件）
brotli_static on;
# 开启 brotli 响应实时压缩
brotli on;
# 设置压缩指定MIME类型，默认值是：text/html
brotli_types text/plain application/json application/javascript application/x-javascript text/javascript text/css application/xml application/xml+rss;
# 设置 brotli 压缩文件使用缓存空间的大小
brotli_buffers 32 8k;
# 压缩级别 0-11（建议 6-8，默认为6）
brotli_comp_level 6;           
# 设置 Brotli 窗口大小。可接受的值为 1k、2k、4k、8k、16k、32k、64k、128k、256k、512k、1m、2m、4m、8m 和 16m。（默认为512k）
brotli_window 512k;
# 仅压缩大于 1KB 的响应内容。
brotli_min_length 1k;
```
