import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import SignesVitaux from "../SignesVitaux/SignesVitaux";
import { useAuth } from "../../context/AuthContext";

function DossierMedical() {
  const { user } = useAuth();
  return (
    <>
      <SignesVitaux />
    </>
  );
}

export default DossierMedical;
