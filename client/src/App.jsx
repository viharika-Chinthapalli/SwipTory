import "./App.css";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookmarksPage from "./pages/BookmarksPage/BookmarksPage";
import Navbar from "./components/Navbar/Navbar";
import { ClickedCardProvider } from "./context/ClickedCardContext";
import { EditCardProvider } from "./context/EditCardContext";
import { UserIDProvider } from "./context/UserIdContext";
function App() {
  return (
    <UserIDProvider>
      <ClickedCardProvider>
        <EditCardProvider>
          <BrowserRouter>
            <ToastContainer />
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />{" "}
              <Route path="/bookmarks" element={<BookmarksPage />} />{" "}
            </Routes>
          </BrowserRouter>
        </EditCardProvider>
      </ClickedCardProvider>
    </UserIDProvider>
  );
}

export default App;
