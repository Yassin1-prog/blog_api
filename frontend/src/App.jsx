import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";
import SignInPage from "./pages/SigninPage";
import Homepage from "./pages/Homepage";
import ManagePage from "./pages/ManagePage";
import CreatePage from "./pages/CreatePage";
/*
import PostPage from "./pages/PostPage";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
*/

const App = () => {
  const [islogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Event handler to update islogged state
  const handleLoginStatusChange = (status) => {
    setIsLogged(status);
    const userRole = localStorage.getItem("role");
    setIsAdmin(userRole === "ADMIN");
  };

  return (
    <BrowserRouter>
      <Header
        islogged={islogged}
        isAdmin={isAdmin}
        onLeave={handleLoginStatusChange}
      />
      <main>
        <Routes>
          <Route path="/" element={<Homepage islogged={islogged} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/signin"
            element={<SignInPage onLeave={handleLoginStatusChange} />}
          />
          <Route path="/manage-posts" element={<ManagePage />} />
          <Route path="/manage-posts/add" element={<CreatePage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
