import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@/test/test-utils";
import { useLang, LangProvider } from "@/context/LangContext";

// Test component that uses the hook
const TestComponent = () => {
  const { lang, setLang } = useLang();
  return (
    <div>
      <span data-testid="current-lang">{lang}</span>
      <button
        data-testid="toggle-lang"
        onClick={() => setLang(lang === "en" ? "ru" : "en")}
      >
        Toggle Language
      </button>
    </div>
  );
};

describe("LangContext", () => {
  it("provides default language as EN", () => {
    render(
      <LangProvider>
        <TestComponent />
      </LangProvider>,
    );

    expect(screen.getByTestId("current-lang")).toHaveTextContent("en");
  });

  it("toggles language state", () => {
    render(
      <LangProvider>
        <TestComponent />
      </LangProvider>,
    );

    const toggle = screen.getByTestId("toggle-lang");
    
    expect(screen.getByTestId("current-lang")).toHaveTextContent("en");
    
    fireEvent.click(toggle);
    expect(screen.getByTestId("current-lang")).toHaveTextContent("ru");
    
    fireEvent.click(toggle);
    expect(screen.getByTestId("current-lang")).toHaveTextContent("en");
  });
});
