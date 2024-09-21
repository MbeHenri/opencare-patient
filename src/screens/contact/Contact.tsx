import React from "react";
import { useTranslation } from "react-i18next";
import "./Contact.css";

function Contact() {

  const { t } = useTranslation();
  
  return (
    <div className="container">
      <div className="row">
        <h2 className="text-center mt-4 text-blue-400 mb-4">{t("contact-page-title")}</h2>
        <hr className="mb-5" />
      </div>
      <div className="row mb-4">
        <p className="text-center my-0">
          {t("contact-page-title1")}
        </p>
        <p className="text-center my-0">
          {t("contact-page-title2")}
        </p>
        <p className="text-center">{t("contact-page-title3")}</p>
      </div>
      <div className="row bg-blue-400">
        <form
          action=""
          className="form w-50 mx-auto bg-light my-3 rounded-5 text-center"
        >
          <div className="form-group mb-3 mt-4">
            <h4 className="text-center">{t("contact-page-title4")}</h4>
            <select
              name=""
              id=""
              className="form-control rounded rounded-5 w-50 mx-auto"
            >
              <option value="">{t("contact-page-title5")}</option>
              <option value="">{t("contact-page-title6")}</option>
              <option value="">{t("contact-page-title7")}</option>
              <option value="">{t("contact-page-title8")}</option>
              <option value="">{t("contact-page-title9")}</option>
            </select>
          </div>
          <div className="row mb-2">
            <div className="col">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control rounded rounded-4"
                  placeholder={t("contact-page-title10")}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group mb-2">
                <input
                  type="text"
                  className="form-control rounded rounded-4"
                  placeholder={t("contact-page-title11")}
                />
              </div>
            </div>
          </div>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control rounded rounded-4"
              placeholder="E-mail"
            />
          </div>
          <div className="form-group mb-3">
            <textarea
              name=""
              id=""
              cols={5}
              rows={10}
              className="form-control rounded rounded-4 p-4"
              placeholder="Message"
            ></textarea>
          </div>
          <p className="text-center">
            <button className="btn rounded-4 w-25 bg-primary text-white my-4">
              {t("contact-page-btn-text")}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Contact;
