'use strict';

import { Container, Nav, NavDropdown, NavDropdownDivider, NavDropdownItem, NavItem, NavLink, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from '@/lib/client-react-bootstrap';
import type { JSX } from 'react';

export function Header(): JSX.Element {
    return (
        <header>
            <Navbar className="bg-body-tertiary" expand="lg">
                <Container fluid>
                    <NavbarBrand className="mb-0 h1">Tech Blog</NavbarBrand>
                    <NavbarToggle aria-controls="navbar-nav" />
                    <NavbarCollapse id="navbar-nav" className="collapse">
                        <Nav className="me-auto mb-2 mb-lg-0">
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavDropdown title="Blog">
                                    <NavDropdownItem href="/blog">記事一覧</NavDropdownItem>
                                    <NavDropdownDivider />
                                    <NavDropdownItem href="/blog/cat">カテゴリー</NavDropdownItem>
                                    <NavDropdownItem href="/blog/tag">タグ</NavDropdownItem>
                                </NavDropdown>
                            </NavItem>
                        </Nav>
                    </NavbarCollapse>
                </Container>
            </Navbar>
        </header>
    );
}
