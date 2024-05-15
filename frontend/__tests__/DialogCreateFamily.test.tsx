import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import useFetch from "../app/hooks/useFetch"; // Adjust the import path as needed
import DialogCreateFamily from "@/components/dialog/dialogCreateFamily";

// Mock the useFetch hook
jest.mock("../app/hooks/useFetch");

const mockUseFetch = useFetch as jest.MockedFunction<typeof useFetch>;

describe("DialogCreateFamily", () => {
  const successMock = jest.fn();

  beforeEach(() => {
    mockUseFetch.mockReturnValue({
      data: {},
      status: "",
      startFetch: jest.fn(),
    });
  });

  it("renders without crashing", () => {
    render(<DialogCreateFamily success={successMock} />);
    expect(screen.getByText("New Family")).toBeInTheDocument();
  });

  it("calls success callback on successful family creation", async () => {
    mockUseFetch.mockReturnValue({
      data: {},
      status: "success",
      startFetch: jest.fn(),
    });
    render(<DialogCreateFamily success={successMock} />);
    await waitFor(() => expect(successMock).toHaveBeenCalled());
  });

  it("updates input values and calls startFetch on create button click", () => {
    const startFetchMock = jest.fn();
    mockUseFetch.mockReturnValue({
      data: {},
      status: "",
      startFetch: startFetchMock,
    });

    render(<DialogCreateFamily success={successMock} />);
    fireEvent.change(screen.getByLabelText("Family"), {
      target: { value: "Family 1" },
    });
    fireEvent.click(screen.getByText("Create"));

    expect(startFetchMock).toHaveBeenCalled();
  });
});
