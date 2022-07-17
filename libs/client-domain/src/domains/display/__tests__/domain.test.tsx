import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { DisplayDomain } from '../domain';

const { DisplayProvider, DisplayContext } = new DisplayDomain({
  theme: 'light',
});
