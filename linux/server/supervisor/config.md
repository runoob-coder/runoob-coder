# Supervisord配置与项目部署

Supervisor 配置文件通常命名为 **`supervisord.conf`** 。该配置文件同时被 **supervisord** 和 **supervisorctl** 使用。如果这两个应用程序在启动时没有使用 `-c` 选项（用于显式指定配置文件名），它们将按以下顺序在指定位置查找名为 `supervisord.conf` 的文件，并使用找到的第一个文件。

1. `../etc/supervisord.conf`（相对于可执行文件）
2. `../supervisord.conf`（相对于可执行文件）
3. `$CWD/supervisord.conf`
4. `$CWD/etc/supervisord.conf`
5. `/etc/supervisord.conf`
6. `/etc/supervisor/supervisord.conf`（自 Supervisor 3.3.0 起）

::: info 注意：
许多为 Debian 和 Ubuntu 打包的 Supervisor 版本包含了一个补丁，增加了对 **`/etc/supervisor/supervisord.conf`** 的搜索路径支持。第一个包含此功能的 PyPI 包版本是 Supervisor 3.3.0。
:::


安装完发行包后，会生成默认配置文件`/etc/supervisord.d`，在该配置文件中`include`了`supervisord.d/*.ini`。

因此我们只需要在`/etc/supervisord.d/`目录下创建对应的`.ini`文件，即可添加新的项目。

如果需要`.conf`文件，则在配置文件的`include`下添加`*.conf`

::: code-group
```conf{3} [/etc/supervisord.conf]
[include]
files = supervisord.d/*.ini
// [!code focus][!code ++]
files = supervisord.d/*.conf 
```
:::

[//]: # (https://hyperf.wiki/3.1/#/zh-cn/tutorial/supervisor)


## 主配置

::: info 注：
如果没有配置文件，可以运行 `echo_supervisord_conf` 命令，将会在终端的标准输出中打印一个"示例" Supervisor 配置文件。

在终端中看到文件输出后，重新执行命令 `echo_supervisord_conf > /etc/supervisord.conf`。
:::

```ini

```


### web



## 子配置（应用配置）

```ini

```

### hyperf项目配置示例

https://hyperf.wiki/3.1/#/zh-cn/tutorial/supervisor

::: code-group
```conf [/etc/supervisord.d/hyperf.conf]
# 新建一个应用并设置一个名称，这里设置为 hyperf
[program:hyperf]
# 设置命令在指定的目录内执行
directory=/var/www/hyperf/
# 这里为您要管理的项目的启动命令
command=php ./bin/hyperf.php start
# 以哪个用户来运行该进程
user=root
# supervisor 启动时自动该应用
autostart=true
# 进程退出后自动重启进程
autorestart=true
# 进程持续运行多久才认为是启动成功
startsecs=1
# 重试次数
startretries=3
# stderr 日志输出位置
stderr_logfile=/var/www/hyperf/runtime/stderr.log
# stdout 日志输出位置
stdout_logfile=/var/www/hyperf/runtime/stdout.log
```
:::
