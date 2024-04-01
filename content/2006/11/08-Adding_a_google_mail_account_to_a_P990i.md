---
title: Adding a google mail account to a P990i
date: 2006-11-08 19:25:16 +0100
tags: p990i
---

To add a google mail account to a P990i.

With the flap open:

First - get to the correct configuration:

1.  go to Control Panel
1.  then Messaging
1.  then E-Mail Accounts
1.  then the New Button

Now - fill out

### Basic Tab

| field           | value                       |
| --------------- | --------------------------- |
| Account Name    | _google_                    |
| Your Name       | _your full name_            |
| Email Address   | _your google email address_ |
| Connection Type | _POP3_                      |

### Inbox Tab

| field                   | value                             |
| ----------------------- | --------------------------------- |
| Incoming Server Address | _pop.googlemail.com_              |
| Username                | _your google mail email address_  |
| Password                | _your google mail email password_ |

### Outbox Tab

| field                   | value                 |
| ----------------------- | --------------------- |
| Outgoing server address | _smtp.googlemail.com_ |
| Use SMTP auth           | _checked_             |
| Use Inbox login details | _checked_             |

### Outgoing Tab

| field             | value |
| ----------------- | ----- |
| Secure Connection | _TLS_ |
| Outgoing port     | _587_ |

Finally Save, Save and then Done.

Now google mail should be available in your messages app.

