import React from "react";
import { TitleContent } from "./HomePage";
import AccountForm from "./AccountForm";
import { useUI } from "../context/UIContext";
const MainContent = () => {
  const [{ isCTAclicked }] = useUI();
  return <div>{isCTAclicked ? <AccountForm /> : <TitleContent />}</div>;
};

export default MainContent;
