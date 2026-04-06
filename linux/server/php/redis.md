---
titleTemplate: PHP | 个人服务器环境搭建 | noob-coder | 菜鸟码农
head:
  - - meta
    - name: description
      content: 扩展名称：ext-redis；支持 Zend Thread Safety (ZTS)；支持非线程安全模式 (NTS)；支持的操作系统：无限制
  - - meta
    - name: keywords
      content: phpredis,lz4,liblz4,libzstd,Zstd,liblzf,序列化,lzf压缩,msgpack,igbinary,redis,非线程安全,NTS,ZTS,ext-redis,pecl,现代php,PHP开发工具,phpize,php-config,gcc,make.m4,libtool,automake,autoconf,zip,Packagist,php扩展,php安装工具,PIE,服务器优化,www,dnf,yum,Linux,服务器环境搭建,宝塔面板一键部署,服务器运维面板,宝塔,nginx,Apache,mysql,redis,ssl,supervisor,git,composer,php,noob-coder,菜鸟码农
---

# 编译安装 redis 扩展

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
