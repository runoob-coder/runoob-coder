# Supervisor快速入门

官网：[Supervisor: A Process Control System](https://supervisord.org/)

## 简介

Supervisor是一个进程管理工具，用于在类UNIX操作系统上控制和监视多个进程。能够自动启动、停止、重启和管理进程，并提供对进程日志的访问和监控。

## 安装分发包

官网文档：https://supervisord.org/installing.html

一些 Linux 发行版通过系统软件包管理器提供了可安装的 Supervisor 版本。**这些软件包由第三方制作，而不是 Supervisor 开发人员，并且通常包含对 Supervisor 进行的特定于发行版的更改。**

Supervisor 的发行版软件包的一个特点是，通常会将其集成到发行版的服务管理基础设施中，例如允许 supervisord 在系统启动时自动启动。

```bash
# 安装epel仓库源，如已安装可忽略。
yum install -y epel-release
# 从epel仓库中下载安装supervisor
yum install -y supervisor 
```

## 设置开机自启

如果你使用的是发行版自带的 Supervisor 版本，它应该已经集成到你所使用发行版的服务管理基础设施中。

在以下链接中可以找到用户为各种操作系统贡献的脚本：https://github.com/Supervisor/initscripts

如果你遇到问题，可以在 Serverfault 上找到一些解答： [在Linux（Ubuntu）上如何自动启动supervisord](http://serverfault.com/questions/96499/how-to-automatically-start-supervisord-on-linux-ubuntu)

```bash
# 设置开机自启
systemctl enable supervisord
# 启动supervisord
systemctl start supervisord
# 查看supervisord是否开机自启
systemctl is-enabled supervisord
# 查看supervisord状态
systemctl status supervisord
```
