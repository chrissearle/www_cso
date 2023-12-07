---
title: Nexus repository manager with LDAP users
date: 2010-09-29 14:50:44 +0200
tags: ldap, maven, opends, nexus
image: nexus-ss1.png
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

<figure class="figure w-100 text-center">
  <img class="figure-img img-fluid rounded" src="/images/posts/2010/09/nexus-ss1.png" title="Sonatype Nexus Maven Repository Manager" alt="Sonatype Nexus Maven Repository Manager"/>
  <figcaption class="figure-caption">Sonatype Nexus Maven Repository Manager</figcaption>
</figure>

#### Authentication

<figure class="figure w-100 text-center">
  <img class="figure-img img-fluid rounded" src="/images/posts/2010/09/nexus-ss2.png" title="Sonatype Nexus Maven Repository Manager" alt="Sonatype Nexus Maven Repository Manager"/>
  <figcaption class="figure-caption">Sonatype Nexus Maven Repository Manager</figcaption>
</figure>

Make sure the Check Authentication button is OK

#### User Element Mapping

<figure class="figure w-100 text-center">
  <img class="figure-img img-fluid rounded" src="/images/posts/2010/09/nexus-ss3.png" title="Sonatype Nexus Maven Repository Manager" alt="Sonatype Nexus Maven Repository Manager"/>
  <figcaption class="figure-caption">Sonatype Nexus Maven Repository Manager</figcaption>
</figure>

Since the password field is blank it will actually perform a bind on ldap to test.

#### Group Element Mapping

<figure class="figure w-100 text-center">
  <img class="figure-img img-fluid rounded" src="/images/posts/2010/09/nexus-ss4.png" title="Sonatype Nexus Maven Repository Manager" alt="Sonatype Nexus Maven Repository Manager"/>
  <figcaption class="figure-caption">Sonatype Nexus Maven Repository Manager</figcaption>
</figure>

Here I had to change the default Group Member Format from ${username} to${dn} because I map the full dn in my group of unique names objects.

Hit the Check User Mapping button:

You should see all your users with their groups

<figure class="figure w-100 text-center">
  <img class="figure-img img-fluid rounded" src="/images/posts/2010/09/nexus-ss5.png" title="Sonatype Nexus Maven Repository Manager" alt="Sonatype Nexus Maven Repository Manager"/>
  <figcaption class="figure-caption">Sonatype Nexus Maven Repository Manager</figcaption>
</figure>

### Security > Roles

Add an external role mapping. For example - here we map the LDAP group nexusadmin to the Nexus Administration Role

<figure class="figure w-100 text-center">
  <img class="figure-img img-fluid rounded" src="/images/posts/2010/09/nexus-ss6.png" title="Sonatype Nexus Maven Repository Manager" alt="Sonatype Nexus Maven Repository Manager"/>
  <figcaption class="figure-caption">Sonatype Nexus Maven Repository Manager</figcaption>
</figure>

### Administration > Server

Head down the page to security settings and make sure that LDAP is selected. Without this LDAP users will not be able to log in but they will look fine in the Security > Users list.

<figure class="figure w-100 text-center">
  <img class="figure-img img-fluid rounded" src="/images/posts/2010/09/nexus-ss7.png" title="Sonatype Nexus Maven Repository Manager" alt="Sonatype Nexus Maven Repository Manager"/>
  <figcaption class="figure-caption">Sonatype Nexus Maven Repository Manager</figcaption>
</figure>

That should be enough to give your LDAP users a working login.
