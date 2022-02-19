---
title: Nexus repository manager with LDAP users
date: 2010-09-29 14:50:44 +0200
tags: ldap, maven, opends, nexus
---

I wanted to use LDAP to give access to the nexus repository manager from sonatype for those users who need more access than just browsing.

## Software used:

- OpenDS 2.2.0
- Nexus OSS 1.8.0

## Directory setup

- All users are directly under ou=people, dc=chrissearle, dc=net and are of type inetOrgPerson.
- All role groups are under ou=groups, dc=chrissearle, dc=net
- A system user is cn=nexus, ou=users, dc=chrissearle, dc=net (because I have disabled anonymous access to OpenDS).

## Nexus setup

### Security > LDAP Configuration

#### Connection

![Sonatype Nexus Maven Repository Manager](nexus-ss1.png 'Sonatype Nexus Maven Repository Manager')

#### Authentication

![Sonatype Nexus Maven Repository Manager](nexus-ss2.png 'Sonatype Nexus Maven Repository Manager')

Make sure the Check Authentication button is OK

#### User Element Mapping

![Sonatype Nexus Maven Repository Manager](nexus-ss3.png 'Sonatype Nexus Maven Repository Manager')

Since the password field is blank it will actually perform a bind on ldap to test.

#### Group Element Mapping

![Sonatype Nexus Maven Repository Manager](nexus-ss4.png 'Sonatype Nexus Maven Repository Manager')

Here I had to change the default Group Member Format from ${username} to${dn} because I map the full dn in my group of unique names objects.

Hit the Check User Mapping button:

You should see all your users with their groups

![Sonatype Nexus Maven Repository Manager](nexus-ss5.png 'Sonatype Nexus Maven Repository Manager')

### Security > Roles

Add an external role mapping. For example - here we map the LDAP group nexusadmin to the Nexus Administration Role

![Sonatype Nexus Maven Repository Manager](nexus-ss6.png 'Sonatype Nexus Maven Repository Manager')

### Administration > Server

Head down the page to security settings and make sure that LDAP is selected. Without this LDAP users will not be able to log in but they will look fine in the Security > Users list.

![Sonatype Nexus Maven Repository Manager](nexus-ss7.png 'Sonatype Nexus Maven Repository Manager')

That should be enough to give your LDAP users a working login.
