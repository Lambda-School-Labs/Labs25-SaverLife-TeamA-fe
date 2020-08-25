import RenderHomePage from '../components/pages/Home/RenderHomePage';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<RenderHomePage /> test suite', () => {
  test('it handles a loading state', () => {
    const authService = {
      logout: jest.fn(),
    };
    const { getByText } = render(
      <Router>
        <RenderHomePage userInfo={{ name: 'Sara' }} authService={authService} />
      </Router>
    );
    const dropdown = getByText(/profile/i);
    userEvent.click(dropdown);
    const logout = getByText(/logout/i);
    userEvent.click(logout);
    expect(authService.logout).toHaveBeenCalledTimes(1);
    expect(getByText(/logout/i).innerHTML).toBe('Logout');
    expect(getByText(/hi sara, welcome to/i).innerHTML).toBe(
      'Hi Sara, Welcome to SaverLife'
    );
  });
});
