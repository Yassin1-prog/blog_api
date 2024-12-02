import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WelcomePage from "./pages/WelcomePage";
import RegisterPage from "./pages/RegisterPage";
import SignInPage from "./pages/SignInPage";
import Homepage from "./pages/Homepage";
import PostPage from "./pages/PostPage";
import CreatePostPage from "./pages/CreatePostPage";
import ManagePostPage from "./pages/ManagePostPage";
import EditPostPage from "./pages/EditPostPage";

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/manage-posts" element={<ManagePostPage />} />
        <Route path="/edit-post/:id" element={<EditPostPage />} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;
