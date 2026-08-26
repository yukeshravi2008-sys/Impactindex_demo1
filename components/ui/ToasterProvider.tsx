"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "hsl(24 10% 10%)",
          color: "hsl(40 33% 98%)",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: 500,
          padding: "12px 16px",
        },
        success: {
          iconTheme: {
            primary: "hsl(160 84% 30%)",
            secondary: "hsl(0 0% 100%)",
          },
        },
      }}
    />
  );
}
