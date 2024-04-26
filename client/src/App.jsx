import "./App.css";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import BrowserRouter, Routes, and Route
import BookmarksPage from "./pages/BookmarksPage/BookmarksPage"
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<HomePage />} /> {/* Wrap Route inside Routes */}
        <Route path='/bookmarks' element={<BookmarksPage />} /> {/* Wrap Route inside Routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
