# 编译安装swoole扩展

扩展名称：ext-redis

支持 Zend Thread Safety (ZTS): ✅

支持非线程安全模式 (NTS): ✅

支持的操作系统：无限制

## 配置选项

- `--enable-redis` 启用 redis 支持
- `--disable-redis-session` 禁用会话支持
- `--disable-redis-json` 禁用 json 序列化支持
- `--enable-redis-igbinary` 启用 igbinary 序列化支持
- `--enable-redis-msgpack` 启用 msgpack 序列化支持
- `--enable-redis-lzf` 启用 lzf 压缩支持
- `--with-liblzf=<value\>` 使用系统 liblzf
- `--enable-redis-zstd` 启用 Zstd 压缩支持
- `--with-libzstd=<value\>` 使用系统 libzstd
- `--enable-redis-lz4` 启用 lz4 压缩支持
- `--with-liblz4=<value\>` 使用系统 liblz4

## 安装

::: code-group

```bash [PIE]
pie install phpredis/phpredis
```

```bash [pecl]
pecl install redis
```
:::
