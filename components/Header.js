import Link from "next/link";
import React from "react";

function NavLink({ href, title, external = false }) {
  return (
    <li>
      {external && (
        <a href={href} target="_blank" rel="noreferrer">
          {title}
        </a>
      )}
      {!external && (
        <Link href={href} passHref>
          {title}
        </Link>
      )}
    </li>
  );
}

export default function Header() {
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
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          <img className="logo" src="/logo.png" alt="Logo" />
          Chris Searle
        </Link>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1">
          <li className="lg:hidden">
            <label htmlFor="right-drawer" className="drawer-button lg:hidden">
              Toggle sidebar
            </label>
          </li>

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
    </div>
  );
}
