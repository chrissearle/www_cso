#!/usr/bin/perl

use strict;

use HTTP::Request::Common;
use HTTP::Response;

use LWP::UserAgent;

sub getCookie {
  my $host = shift;

  my $ua = LWP::UserAgent->new;

  $ua->cookie_jar({});

  my $url = "http://" . $host . "";

  my $response = $ua->get($url);

  return $ua;
}

sub login {
  my $host = shift;
  my $user = shift;
  my $pass = shift;
  my $ua = shift;

  my $url = "http://" . $host . "/user/login";

  my $response = $ua->request(POST $url,
                            [ 'name' => $user,
                              'pass' => $pass,
                              'form_id' => 'user_login',
                              'op' => 'Log in']);

  # Note - the 'op' value MUST match the name on the log in button of your page

  return $ua;
}

sub cron {
  my $host = shift;
  my $ua = shift;

  my $url = "http://" . $host . "/cron.php";

  my $response = $ua->post($url);
}

cron("yourhost", login("yourhost", "youruser", "yourpass", getCookie("yourhost")));