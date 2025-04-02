import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom"
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
import Login from '../pages/Login';
import { MemoryRouter } from 'react-router-dom';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

jest.mock('../api/axios');

let mockNavigate;
let mockSetAuth;

beforeEach(() => {
    mockNavigate = jest.fn();
    mockSetAuth = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
});

describe('Login Component', () => {
    beforeEach(() => {
        render(
            <AuthContext.Provider value={{setAuth: mockSetAuth}}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </AuthContext.Provider>
        );
    });

    test('renders login form correctly', () => {
        const signInElements = screen.getAllByText(/sign in/i)
        expect(signInElements[0]).toBeInTheDocument();
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    test('shows error message if login fails', async () => {
        axios.post.mockRejectedValueOnce({
            response: { status: 401 }
        });

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wronguser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpass' } });
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        const errorMsg = await screen.findByText(/unauthorized/i);
        expect(errorMsg).toBeInTheDocument();
    });

    test("redirects on successful login for admin", async () => {
        axios.post.mockResolvedValueOnce({
            data: { username: "testadmin", role: "admin", id: "12345" },
        });

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "testadmin" } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "testpass" } });
        fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

        await waitFor(() => expect(mockSetAuth).toHaveBeenCalled()); // ✅ Ensure setAuth is called
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/admin/home")); // ✅ Ensure navigation happens
    });

    test("redirects on successful login for user", async () => {
        axios.post.mockResolvedValueOnce({
            data: { username: "testuser", role: "user", id: "12345" },
        });

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "testuser" } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "testpass" } });
        fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

        await waitFor(() => expect(mockSetAuth).toHaveBeenCalled()); // ✅ Ensure setAuth is called
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/user/home")); // ✅ Ensure navigation happens
    });
});
