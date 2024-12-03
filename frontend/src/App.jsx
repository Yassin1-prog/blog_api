import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";
import SignInPage from "./pages/SigninPage";
import Homepage from "./pages/Homepage";
/*
import PostPage from "./pages/PostPage";
import CreatePostPage from "./pages/CreatePostPage";
import ManagePostPage from "./pages/ManagePostPage";
import EditPostPage from "./pages/EditPostPage";
*/

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;
