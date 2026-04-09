import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("combines class names", () => {
    const result = cn("px-2", "py-1");
    expect(result).toBe("px-2 py-1");
  });

  it("handles conditional classes", () => {
    const classNames = [false, true];
    const result = cn("px-2", classNames[0] && "py-1", classNames[1] && "text-center");
    expect(result).toBe("px-2 text-center");
  });

  it("merges tailwind classes correctly (later class wins)", () => {
    const result = cn("px-2", "px-4");
    expect(result).toBe("px-4");
  });

  it("handles object syntax", () => {
    const result = cn({
      "px-2": true,
      "py-1": false,
    });
    expect(result).toBe("px-2");
  });

  it("handles arrays", () => {
    const result = cn(["px-2", "py-1"]);
    expect(result).toBe("px-2 py-1");
  });

  it("handles mixed arguments", () => {
    const result = cn(
      "text-base",
      {
        "text-lg": true,
        "text-sm": false,
      },
      ["font-bold"],
    );
    expect(result).toBe("text-lg font-bold");
  });
});
