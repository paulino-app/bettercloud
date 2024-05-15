import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import useFetch from "../app/hooks/useFetch"; // Adjust the import path as needed
import DialogCreateGroup from "@/components/dialog/dialogCreateGroup";
import { API } from "@/app/models/models";

// Mock the useFetch hook
jest.mock("../app/hooks/useFetch");

const mockUseFetch = useFetch as jest.MockedFunction<typeof useFetch>;

describe("DialogCreateGroup", () => {
  const successMock = jest.fn();

  beforeEach(() => {
    mockUseFetch.mockReturnValue({
      data: [],
      status: "",
      startFetch: jest.fn(),
    });
  });

  it("renders without crashing", () => {
    render(<DialogCreateGroup success={successMock} />);
    expect(screen.getByText("New Group")).toBeInTheDocument();
  });

  it("calls fetch on mount", () => {
    render(<DialogCreateGroup success={successMock} />);
    expect(mockUseFetch).toHaveBeenCalledWith(`${API}/member`);
  });

  it("calls success callback on successful group creation", async () => {
    mockUseFetch.mockReturnValue({
      data: { session: {} },
      status: "success",
      startFetch: jest.fn(),
    });
    render(<DialogCreateGroup success={successMock} />);
    await waitFor(() => expect(successMock).toHaveBeenCalled());
  });

  it("updates input values and calls startFetch on create button click", () => {
    const startFetchMock = jest.fn();
    mockUseFetch.mockReturnValue({
      data: [],
      status: "",
      startFetch: startFetchMock,
    });

    render(<DialogCreateGroup success={successMock} />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Group 1" },
    });
    fireEvent.change(screen.getByLabelText("Theme"), {
      target: { value: "Theme 1" },
    });
    fireEvent.click(screen.getByText("Create"));

    expect(startFetchMock).toHaveBeenCalled();
  });
});
