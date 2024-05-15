import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import useFetch from "../app/hooks/useFetch"; // Adjust the import path as needed
import DialogAddMember from "@/components/dialog/dialogAddMember";
import { API } from "@/app/models/models";

// Mock the useFetch hook
jest.mock("../app/hooks/useFetch");

const mockUseFetch = useFetch as jest.MockedFunction<typeof useFetch>;

describe("DialogAddMember", () => {
  const successMock = jest.fn();

  beforeEach(() => {
    mockUseFetch.mockReturnValue({
      data: [],
      status: "",
      startFetch: jest.fn(),
    });
  });

  it("renders without crashing", () => {
    render(<DialogAddMember success={successMock} groupId={1} />);
    expect(screen.getByText("Add Member")).toBeInTheDocument();
  });

  it("calls fetch on mount", () => {
    render(<DialogAddMember success={successMock} groupId={1} />);
    expect(mockUseFetch).toHaveBeenCalledWith(
      `${API}/group/1/members-not-in-group`,
    );
  });

  it("calls success callback on successful member addition", async () => {
    mockUseFetch.mockReturnValue({
      data: [],
      status: "success",
      startFetch: jest.fn(),
    });
    render(<DialogAddMember success={successMock} groupId={1} />);
    await waitFor(() => expect(successMock).toHaveBeenCalled());
  });

  it("updates input values and calls startFetch on add button click", () => {
    const startFetchMock = jest.fn();
    mockUseFetch.mockReturnValue({
      data: [],
      status: "",
      startFetch: startFetchMock,
    });

    render(<DialogAddMember success={successMock} groupId={1} />);
    fireEvent.change(screen.getByLabelText("Member"), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByText("Add"));

    expect(startFetchMock).toHaveBeenCalled();
  });
});
