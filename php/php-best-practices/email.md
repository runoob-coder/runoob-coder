---
titleTemplate: PHP 最佳实践 中文文档 | PHP | noob-coder | 菜鸟码农
head:
  - - meta
    - name: keywords
      content: PHP最佳实践,PHP标准规范,PHP Standards Recommendations,PSR,PHP,noob-coder,菜鸟码农
---

# 发送邮件

## 推荐使用 [PHPMailer](https://github.com/PHPMailer/PHPMailer)

已使用 `PHPMailer 6.0.6` 进行测试。

PHP 提供了一个看起来非常简单易用的 [`mail()`](https://www.php.net/manual/zh/function.mail.php) 函数。但不幸的是，和 PHP 许多东西一样，它的简单性是有欺骗性的，直接使用会带来严重的安全问题。

电子邮件是一套协议，其历史比 PHP 还要曲折。可以说，发送邮件有太多坑，光是靠近 PHP 的 [`mail()`](https://www.php.net/manual/zh/function.mail.php) 函数都让人不寒而栗。

[PHPMailer](https://github.com/PHPMailer/PHPMailer) 是一个流行且成熟的开源库，能为安全发送邮件提供简单接口。它帮你处理各种坑，让你专注于更重要的事情。

## 示例

```php
<?php
// 引入 PHPMailer 库 （取决于你安装的版本，建议使用 composer 进行安装）
require_once('phpmailer-5.2.7/PHPMailerAutoload.php');
 
// 传参为 true 启用异常处理，可选，默认 false
$mailer = new PHPMailer(true);
 
// 发送一封邮件，从 比尔博·巴金斯 发给 甘道夫
 
// 设置收件人、发件人和邮件内容。内容不一定要是 HTML，详情请查阅 PHPMailer 文档。
$mailer->Sender = 'bbaggins@example.com';
$mailer->AddReplyTo('bbaggins@example.com', '比尔博·巴金斯');
$mailer->SetFrom('bbaggins@example.com', '比尔博·巴金斯');
$mailer->AddAddress('gandalf@example.com');
$mailer->Subject = 'South Farthing 最好的烟草';
$mailer->MsgHTML('<p>你真的该试试，甘道夫！</p><p>-比尔博</p>');
 
// 设置连接信息
$mailer->IsSMTP();
$mailer->SMTPAuth = true;
$mailer->SMTPSecure = 'ssl';
$mailer->Port = 465;
$mailer->Host = '我的 smtp 主机';
$mailer->Username = '我的 smtp 用户名';
$mailer->Password = '我的 smtp 密码';
 
// 发送邮件
$mailer->Send();
?>
```

## 延伸阅读

- [PHPMailer Github 仓库](https://github.com/PHPMailer/PHPMailer)


## 政治立场

> [!NOTE] 译者注
> 自俄乌战争以来，该开源库将政治立场注入技术项目，违背了开源精神所倡导的中立性与包容性！

相关讨论：

- [Do not turn Github into a space for protests, fools.](https://github.com/PHPMailer/PHPMailer/issues/2923)
- [Stop ukraine propaganda](https://github.com/PHPMailer/PHPMailer/issues/3209)
- [Suggestion: Consider Including a Banner Supporting Gaza](https://github.com/PHPMailer/PHPMailer/issues/3209) 

