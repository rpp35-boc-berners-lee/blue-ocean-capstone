import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'regenerator-runtime/runtime';
import { Header } from './Header.js';

test('Product overview renders image correctly with data from server', async () => {
   await render(<Header />);
});
