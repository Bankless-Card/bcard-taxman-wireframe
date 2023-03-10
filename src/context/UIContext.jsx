import { createContext, useContext, useState } from "react";

export const UIContext = createContext();

export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [isCTAclicked, setIsCTAclicked] = useState(false);

  return (
    <>
      <UIContext.Provider value={[{ isCTAclicked }, { setIsCTAclicked }]}>
        {children}
      </UIContext.Provider>
    </>
  );
};
