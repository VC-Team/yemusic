import React from 'react';

import DefaultPage from '@pages/default';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <DefaultPage></DefaultPage>
    </BrowserRouter>
  );
};

export default App;
