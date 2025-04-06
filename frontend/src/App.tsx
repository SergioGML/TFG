import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NewPassword from "./pages/NewPassword";
import Footer from "./components/Footer/Footer";
import Country from "./pages/Country";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-rose-200 to-violet-400 dark:from-blue-800/80 dark:to-neutral-950">
      <Header />

      <main className="flex-grow flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/NewPassword" element={<NewPassword />} />
          <Route path="/Country" element={<Country />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
