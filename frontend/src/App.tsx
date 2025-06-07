// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NewPassword from "./pages/NewPassword";
import Country from "./pages/Country";
import Dashboard from "./pages/Dashboard";
import Tax from "./pages/Tax";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-rose-200 to-violet-400 dark:from-blue-800/80 dark:to-neutral-950">
      <Header />

      <main className="flex-grow flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/country" element={<Country />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/tax"
            element={
              <PrivateRoute>
                <Tax />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
