import React from "react";
import { useTranslation } from "react-i18next";
import "./Footer.css";
import { Container } from "react-bootstrap";

function Footer() {
  const { t } = useTranslation();
  return (
    <>
      <div className="mb-5 pt-5">
        <Container fluid className="bg-opencare-fonce py-5">
          <div className="d-flex justify-content-center text-opencare-clair">
            <p className="text-2xl">{t("social-title")}</p>
            <div className="d-flex align-items-center">
              <img
                src="/opencare/Faceboock-ico.png"
                alt=""
                height={32}
                width={32}
                className="img-circle mx-2"
              />
              <img
                src="/opencare/Instagram-ico.png"
                alt=""
                height={32}
                width={32}
                className="img-circle mx-2"
              />
              <img
                src="/opencare/Youtube-ico.png"
                alt=""
                height={32}
                width={32}
                className="img-circle mx-2"
              />
            </div>
          </div>
        </Container>
        <footer className="py-1 my-4 text-body-secondary text-center">
          <Container fluid>
            <p className="my-0 lead">&copy;{t("footer-title1")}</p>
            <p className="lead">{t("footer-title2")}</p>
          </Container>
        </footer>
      </div>
    </>
  );
}

export default Footer;
