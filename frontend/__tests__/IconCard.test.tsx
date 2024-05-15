import IconCard, { IconCardAdd } from "@/components/cards/iconCard";
import { render, screen, fireEvent } from "@testing-library/react";

describe("IconCard", () => {
  const removeMock = jest.fn();

  beforeEach(() => {
    removeMock.mockClear();
  });

  it("renders without crashing", () => {
    render(<IconCard id="1" name="Test" remove={removeMock} />);
    expect(screen.getByText("T")).toBeInTheDocument();
  });

  it("calls remove function when remove button is clicked", () => {
    render(<IconCard id="1" name="Test" remove={removeMock} />);
    fireEvent.click(screen.getByRole("button"));
    expect(removeMock).toHaveBeenCalledWith("1");
  });

  it("does not show remove button when disableRemove is true", () => {
    render(<IconCard id="1" name="Test" remove={removeMock} disableRemove />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

describe("IconCardAdd", () => {
  const handleClickMock = jest.fn();

  beforeEach(() => {
    handleClickMock.mockClear();
  });

  it("renders without crashing", () => {
    render(<IconCardAdd handleClick={handleClickMock} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls handleClick function when the card is clicked", () => {
    render(<IconCardAdd handleClick={handleClickMock} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClickMock).toHaveBeenCalled();
  });
});
