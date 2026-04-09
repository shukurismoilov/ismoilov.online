import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import Navbar from "@/components/Navbar";

describe("Navbar Component", () => {
  it("renders navigation links", () => {
    render(<Navbar />);

    expect(screen.getByText(/Design/i)).toBeInTheDocument();
    expect(screen.getByText(/Labs/i)).toBeInTheDocument();
    expect(screen.getByText(/Academy/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });

  it("renders logo", () => {
    render(<Navbar />);

    const logo = screen.getByAltText(/Ismoilov Online/i);
    expect(logo).toBeInTheDocument();
  });

  it("renders language toggle button", () => {
    render(<Navbar />);

    const langToggle = screen.getByRole("button", { name: /EN.*RU|RU.*EN/i });
    expect(langToggle).toBeInTheDocument();
  });

  it("has mobile menu button", () => {
    render(<Navbar />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });
});
