import Link from "next/link";
import React from "react";

function NavLink({ href, title, external = false }) {
  return (
    <li className="nav-item">
      {external && (
        <a href={href} target="_blank" rel="noreferrer" className="nav-link">
          {title}
        </a>
      )}
      {!external && (
        <Link href={href} passHref className="nav-link">
          {title}
        </Link>
      )}
    </li>
  );
}

export default function Header() {
  const links = [];

  const rightLinks = [
    {
      href: "/keys/",
      title: "Cryptographic Keys",
      external: false,
    },
    {
      href: process.env.NEXT_PUBLIC_ABOUT,
      title: "Other Sites",
      external: true,
    },
  ];

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link href="/" passHref className="navbar-brand">
            <div>
              <img className="logo" src="/logo.png" alt="Logo" />
              Chris Searle
            </div>
          </Link>
          <ul className="navbar-nav">
            {links.map((link, index) => (
              <NavLink
                key={`link-${index}`}
                href={link.href}
                title={link.title}
              />
            ))}
          </ul>
          <ul className="navbar-nav ms-auto">
            {rightLinks.map((link, index) => (
              <NavLink
                key={`link-${index}`}
                href={link.href}
                title={link.title}
                external={link.external}
              />
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
