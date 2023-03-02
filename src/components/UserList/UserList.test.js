import { cleanup, render, screen, waitFor } from "@testing-library/react"
import UserList from "./index"
import * as API from "../../utils/API";
import { mockResponse, mockUsers } from "../../utils/mockData";

jest.mock("../../utils/API")

afterEach(cleanup);

describe("User listing component", () => {

  test("check for user response", async () => {
    API.getRandomUsers.mockResolvedValue({
      data: {
        results: [mockResponse]
      }
    })

    render(<UserList />);
    expect(await screen.findByText('encarnacion.reyes@example.com')).toBeInTheDocument();
  })

  test("user list is rendered successfuly with api data", async () => {
    API.getRandomUsers.mockResolvedValue({
      data: {
        results: mockUsers
      }
    })

    render(<UserList />);
    await waitFor(() => {
      expect(screen.getAllByTestId("user-card").length).toBe(20)
    });

  });


  test('renders error when API call fails', async () => {
    API.getRandomUsers.mockRejectedValue(() => Promise.reject('API error'))

    render(<UserList />)
    expect(await screen.findByText('Something went wrong!')).toBeInTheDocument()
  })

})

