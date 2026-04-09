/* eslint-disable react-refresh/only-export-components */
import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { LangProvider } from "@/context/LangContext";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * Custom render function that wraps components with all necessary providers
 * Use this instead of render() from @testing-library/react
 */
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <LangProvider>
      <TooltipProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          {children}
        </BrowserRouter>
      </TooltipProvider>
    </LangProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
