import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import useFetch from "@/app/hooks/useFetch";
import DialogCreateMember from "@/components/dialog/dialogCreateMember";
import { API } from "@/app/models/models";

// Mock the useFetch hook
jest.mock("../app/hooks/useFetch");

const mockUseFetch = useFetch as jest.MockedFunction<typeof useFetch>;

describe("DialogCreateMember", () => {
  const successMock = jest.fn();

  beforeEach(() => {
    mockUseFetch.mockReturnValue({
      data: [],
      status: "",
      startFetch: jest.fn(),
    });
  });

  it("renders without crashing", () => {
    render(<DialogCreateMember success={successMock} />);
    expect(screen.getByText("New Member")).toBeInTheDocument();
  });

  it("calls fetch on mount", () => {
    render(<DialogCreateMember success={successMock} />);
    expect(mockUseFetch).toHaveBeenCalledWith(`${API}/family`);
  });

  it("calls success callback on successful member creation", async () => {
    mockUseFetch.mockReturnValue({
      data: [],
      status: "success",
      startFetch: jest.fn(),
    });
    render(<DialogCreateMember success={successMock} />);
    await waitFor(() => expect(successMock).toHaveBeenCalled());
  });

  it("updates input values and calls startFetch on create button click", () => {
    const startFetchMock = jest.fn();
    mockUseFetch.mockReturnValue({
      data: [],
      status: "",
      startFetch: startFetchMock,
    });

    render(<DialogCreateMember success={successMock} />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.click(screen.getByText("Create"));

    expect(startFetchMock).toHaveBeenCalled();
  });
});
