# Redis

## 安装

测试环境直接使用 yum 命令安装 Redis。

生产环境根据需要可以进行编译安装。

```bash
sudo yum install -y redis
```

## 设置开机自启动

```bash
sudo systemctl enable redis
```

## 启动 Redis 服务

```bash
sudo systemctl start redis
```

## 检查 Redis 的运行状态和是否设置成功 

- 查看服务状态：

```bash
systemctl status redis
```

- 功能测试：

使用命令行客户端尝试连接。

```bash
redis-cli ping
```
