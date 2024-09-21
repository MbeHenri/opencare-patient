import React from "react";
import { useTranslation } from "react-i18next";
import "./Header.css";
import { useAuth } from "../../context/AuthContext";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";

function Header() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="mb-4 border-bottom shadow">
        <div className="row mb-0 mt-4">
          <div className="d-flex justify-content-end me-5 pe-5">
            <LanguageSwitcher />
          </div>
        </div>
        <Navbar bg="white" expand="lg" className="shadow-sm">
          <Container fluid>
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
              <div className="col-md-3 mb-2 mb-md-0">
                {/* Logo */}
                <Navbar.Brand href="#home" className="me-4">
                  <img
                    src="/opencare/Logo-texte.png"
                    alt="OpenCare logo"
                    width="65%"
                    height="52"
                    className="bi ms-5"
                  />
                </Navbar.Brand>
              </div>
              {user ? (
                <>
                  {/* Navigation links */}
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                      <Nav.Link href="/" className="px-2 active text-primary">
                        {t("welcome")}
                      </Nav.Link>
                      <Nav.Link href="/services" className="text-body">
                        {t("services")}
                      </Nav.Link>
                      <Nav.Link href="/dossier_medical" className="text-body">
                        {t("dossier-medical")}
                      </Nav.Link>
                      <Nav.Link href="/contact" className="text-body">
                        {t("contact")}
                      </Nav.Link>
                    </Nav>
                    <div className="col-md-3">
                      <div className="d-flex align-items-center">
                        <p className="mx-1 mt-4">{t("connected")}</p>
                        <img
                          src="/opencare/user-img-connected.png"
                          alt=""
                          height="42"
                          width="10%"
                          className="img-fluid mx-1"
                        />
                        {/* User dropdown */}
                        <Dropdown align="end" className="text-center">
                          <Dropdown.Toggle
                            variant="light"
                            id="dropdown-basic"
                            className="border-0"
                          ></Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="/profile">
                              {t("profile")}
                            </Dropdown.Item>
                            <Dropdown.Item href="#/factures">
                              {t("invoices")}
                            </Dropdown.Item>
                            <Dropdown.Item
                              href="#/logout"
                              onClick={handleLogout}
                            >
                              {t("logout")}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </Navbar.Collapse>
                </>
              ) : (
                <>
                  {/* Navigation links */}
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                      <Nav.Link href="/" className="px-2 active text-primary">
                        {t("welcome")}
                      </Nav.Link>
                      <Nav.Link href="/contact" className="text-body">
                        {t("contact")}
                      </Nav.Link>
                    </Nav>
                    <div className="col-md-3">
                      <div className="d-flex align-items-center">
                        <p className="mx-1 mt-4">{t("disconnected")}</p>
                        <img
                          src="/opencare/user-img-disconnect.png"
                          alt=""
                          height="42"
                          width="10%"
                          className="img-fluid mx-1"
                        />
                        {/* User dropdown */}
                        <Dropdown align="end" className="text-center">
                          <Dropdown.Toggle
                            variant="light"
                            id="dropdown-basic"
                            className="border-0"
                          ></Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="/profile">
                              {t("profile")}
                            </Dropdown.Item>
                            <Dropdown.Item href="#/factures">
                              {t("invoices")}
                            </Dropdown.Item>
                            <Dropdown.Item
                              href="#/logout"
                              onClick={handleLogout}
                            >
                              {t("logout")}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </Navbar.Collapse>
                </>
              )}
            </div>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

export default Header;
