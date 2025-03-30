import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import ExtensionStore from "./components/ExtensionStore";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/extension-store" element={<ExtensionStore />} />
      </Routes>
    </Router>
  );
}

export default App;
