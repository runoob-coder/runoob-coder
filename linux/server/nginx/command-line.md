# Nginx命令参数

官网文档：https://nginx.org/en/docs/switches.html

Nginx支持以下命令行参数：

- **`-?` | `-h`** - 打印命令行参数的帮助信息。

- **`-c file`** - 使用替代的配置文件，而不是默认文件。

- **`-e file`** - 使用替代的错误日志文件来存储日志，而不是默认文件（1.19.5 版本）。特殊值 `stderr` 选择标准错误文件。

- **`-g directives`** — 设置[全局配置指令](https://nginx.org/en/docs/ngx_core_module.html)，例如：

```bash
nginx -g "pid /var/run/nginx.pid; worker_processes sysctl -n hw.ncpu;"
```

- **`-p prefix`** — 设置 Nginx 路径前缀，即存放服务器文件的目录（默认值是 `/usr/local/nginx` ）。
- **`-q`** — 在配置测试期间禁止非错误消息。
- **`-s signal`** — 向主进程发送信号。参数 `signal` 可以是以下之一：
  - `stop` — 快速关闭；
  - `quit` — 平滑关闭；
  - `reload` — 重新加载配置，用新的配置启动新的工作进程，并平滑关闭旧的工作进程；
  - `reopen` — 重新打开日志文件；

::: info 注：
`kill` 命令工具也可以用于直接向主进程发送信号。主进程的进程ID默认写入到 `nginx.pid` 文件，该文件通常位于 `/usr/local/nginx/logs` 或 `/var/run` 目录中。
:::

- **`-t`** — 测试配置文件：Nginx 检查配置文件的语法是否正确，然后尝试打开配置中引用的文件。

- **`-T`** — 与 `-t` 相同，但额外将配置文件输出到标准输出（1.9.2 版本）。

- **`-v`** — 打印 Nginx 版本。

- **`-V`** — 打印 Nginx 版本、编译器版本和配置参数。

