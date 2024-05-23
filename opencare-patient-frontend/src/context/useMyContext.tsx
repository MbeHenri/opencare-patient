import { createContext, useContext } from "react";

function useMyContext() {
  const myContext = createContext("");
  return useContext(myContext);
}

export default useMyContext;
