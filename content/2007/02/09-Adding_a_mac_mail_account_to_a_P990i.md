---
title: Adding a .mac mail account to a P990i
date: 2007-02-09 10:12:25 +0100
tags: p990i, imap, smtp
---

To add a .mac mail account to a P990i.

With the flap open:

First - get to the correct configuration:

1.  go to Control Panel
1.  then Messaging
1.  then E-Mail Accounts
1.  then the New Button

Now - fill out

### Basic Tab

| field           | value                     |
| --------------- | ------------------------- |
| Account Name    | _mac_                     |
| Your Name       | _your full name_          |
| Email Address   | _your .mac email address_ |
| Connection Type | _IMAP_                    |

### Inbox Tab

| field                   | value                        |
| ----------------------- | ---------------------------- |
| Incoming Server Address | _mail.mac.com_               |
| Username                | _your .mac account name_     |
| Password                | _your .mac account password_ |

### Outbox Tab

| field                   | value          |
| ----------------------- | -------------- |
| Outgoing server address | _smtp.mac.com_ |
| Use SMTP auth           | _checked_      |
| Use Inbox login details | _checked_      |

### Outgoing Tab

| field             | value |
| ----------------- | ----- |
| Secure Connection | _TLS_ |
| Outgoing port     | _25_  |

Now .mac mail should be available in your messages app.

