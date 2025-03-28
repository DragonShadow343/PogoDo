import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ForgotPassword from './ForgotPassword';
import axios from '../api/axios';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../api/axios');

describe('ForgotPassword Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
//mock renderign
  test('renders the forgot password form', () => {
    render(
      <Router>
        <ForgotPassword />
      </Router>
    );
    expect(screen.getByRole('heading', { name: /reset password/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('New Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm New Password')).toBeInTheDocument();
  });



  test('shows password requirements', () => {
    render(
      <Router>
        <ForgotPassword />
      </Router>
    );
    expect(screen.getByText(/8-24 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/at least one uppercase letter/i)).toBeInTheDocument();
    expect(screen.getByText(/at least one number/i)).toBeInTheDocument();
    expect(screen.getByText(/at least one special character/i)).toBeInTheDocument();
  });



  test('validates password requirements', () => {
    render(
      <Router>
        <ForgotPassword />
      </Router>
    );
    const passwordInput = screen.getByPlaceholderText('New Password');
    
    //when the test passes it will show the green text with a checkmark
    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    expect(screen.getByText(/8-24 characters/i)).not.toHaveClass('text-green-400');
    
    fireEvent.change(passwordInput, { target: { value: 'StrongPass1!' } });
    expect(screen.getByText(/8-24 characters/i)).toHaveClass('text-green-400');
    expect(screen.getByText(/at least one uppercase letter/i)).toHaveClass('text-green-400');
    expect(screen.getByText(/at least one number/i)).toHaveClass('text-green-400');
    expect(screen.getByText(/at least one special character/i)).toHaveClass('text-green-400');
  });


  test('submits the form with valid data', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });
    render(
      <Router>
        <ForgotPassword />
      </Router>
    );
    fireEvent.change(screen.getByPlaceholderText('Username'), { 
      target: { value: 'testuser' } 
    });
    fireEvent.change(screen.getByPlaceholderText('New Password'), { 
      target: { value: 'StrongPass1!' } 
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm New Password'), { 
      target: { value: 'StrongPass1!' } 
    });

    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));
    expect(axios.post).toHaveBeenCalledWith(
      '/Users/reset-password',
      JSON.stringify({ username: 'testuser', newPassword: 'StrongPass1!' }),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    );
  });


  
});