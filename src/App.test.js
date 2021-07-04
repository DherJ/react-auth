import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import { BrowserRouter } from "react-router-dom";

const initRenderDom = () => {
  return (<React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>);
}

test('renders navBar', () => {
  const { container } = render(initRenderDom());
  const button = container.querySelector('nav');
  expect(button).toBeInTheDocument();
});