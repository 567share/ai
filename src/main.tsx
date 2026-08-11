import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { supabase } from './lib/supabase';

// Triggers a one-time connection script to fill your empty spreadsheet rows:
supabase.from('tools').select('id').then(({ data }) => {
  if (!data || data.length === 0) {
    import('./data/seed').then(() => console.log("Database initialized!"));
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
