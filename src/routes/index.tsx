import { createBrowserRouter } from 'react-router-dom';
import DevTools from './DevTools';

export const router = createBrowserRouter([
  // ... andere routes ...
  {
    path: '/dev',
    element: <DevTools />,
  },
]); 