// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Reportes from './pages/Reportes';

function App() {
  return (
    <Routes>
      <Route path="/reportes" element={<Reportes />} />
    </Routes>
  );
}

export default App;