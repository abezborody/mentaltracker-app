import './app.css';
import { Dashboard } from '../pages/dashboard';
import { Header } from '../widgets/header';

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { theme } from './config/themeConfig';

function App() {
  return (
    <MantineProvider theme={theme}>
      <Header />
      <Dashboard />
    </MantineProvider>
  );
}

export default App;
