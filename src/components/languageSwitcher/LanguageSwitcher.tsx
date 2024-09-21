import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isFrench, setIsFrench] = useState(i18n.language === "fr");

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    setIsFrench(i18n.language === "fr");
  }, [i18n.language]);

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsFrench(isChecked);
    changeLanguage(isChecked ? "fr" : "en");
  };

  return (
    <div className="d-flex align-items-center">
      <label className="form-check-label me-2">English</label>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="languageSwitch"
          onChange={handleSwitchChange}
          checked={isFrench}
        />
        <label className="form-check-label" htmlFor="languageSwitch">
          Français
        </label>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
