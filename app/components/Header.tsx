'use strict';

import styles from '@/app/components/Header.module.scss';
import { Container, Nav, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle, NavDropdown, NavDropdownDivider, NavDropdownItem, NavItem, NavLink } from '@/lib/client-react-bootstrap';
import { Github, Twitter } from 'react-bootstrap-icons';
import type { JSX } from 'react';

export function Header(): JSX.Element {
    return (
        <header className={styles['header']}>
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
                        <Nav className="mw-auto mb-2 mb-lg-0">
                            <NavItem>
                                <NavLink href="https://github.com/ms0503"><Github /> GitHub</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://twitter.com/ms0503"><Twitter /> Twitter</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://misskey.io/@ms0503">Misskey.io</NavLink>
                            </NavItem>
                        </Nav>
                    </NavbarCollapse>
                </Container>
            </Navbar>
        </header>
    );
}
