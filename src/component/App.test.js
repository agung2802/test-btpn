import { render, screen } from '@testing-library/react';
import App from './App';

import store from "../slice/contactStore";

  test('renders learn react link', () => {
    
    const storage = store;
    render(<App />);

    expect(screen.getByText('Hello world!')).toBeInTheDocument();



  });
