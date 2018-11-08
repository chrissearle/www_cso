import React from 'react'

import { StaticQuery, graphql } from 'gatsby'

import {
  Container,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

import '../stylesheets/header.css'

const TitleAndDescription = ({ data }) => {
  const title = data.site.siteMetadata.title

  return (
    <Navbar color="dark" dark expand="lg">
      <Container>
        <NavbarBrand href="/">
          <img className="logo" src="/logo.png" alt="Logo" />
          {title}
        </NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink href="/tags/">All Tags</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/articles/">All Articles</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/years/">By Year</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/cryptographic_keys.html">
              Cryptographic Keys
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="//about.me/chrissearle/">Other sites</NavLink>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  )
}

const Header = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={data => <TitleAndDescription data={data} />}
    />
  )
}

export default Header
