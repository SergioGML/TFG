import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NewPassword from "./pages/NewPassword";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-rose-200 to-violet-400 dark:from-violet-900 dark:to-neutral-800">
      <Header />

      <main className="flex-grow flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/NewPassword" element={<NewPassword />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
