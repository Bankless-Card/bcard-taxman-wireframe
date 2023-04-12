import { createContext, useContext, useState } from "react";

export const UIContext = createContext();

export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [isCTAclicked, setIsCTAclicked] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);

  // console.log(children);

  return (
    <>
      <UIContext.Provider
        value={[
          { isCTAclicked, showTransactionModal, showEmailInput },
          { setShowTransactionModal, setIsCTAclicked, setShowEmailInput },
        ]}
      >
        {children}
      </UIContext.Provider>
    </>
  );
};
