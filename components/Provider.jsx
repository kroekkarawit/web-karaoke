"use client";
import * as React from "react";
import { GlobalProvider } from "@/utils/globalContext";
const Provider = ({ children }) => {
  return <GlobalProvider> {children}</GlobalProvider>;
};

export default Provider;
