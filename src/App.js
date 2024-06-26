import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat  from './client';
import Home from './Home';
import Air from './Air';
import Layout from './Layout';
import NoPage from './NoPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Air" element={<Air />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
