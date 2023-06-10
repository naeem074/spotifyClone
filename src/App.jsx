import React, { useEffect } from "react";
import Login from "./components/Login";

import { reducerCases } from "./utils/Constants";
import { useStateProvider } from "./utils/StateProvider";
import Layout from "./components/Layout";


export default function App() {
  // redux hook
  const [{ token }, dispatch] = useStateProvider();

  // user token hook
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch({ type: reducerCases.SET_TOKEN, token });
      }
    }
    document.title = "Beat Audio";
  }, [dispatch, token]);
  return <div>{token ? <Layout /> : <Login />}</div>;
}
