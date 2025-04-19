import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Locations from "./pages/Locations";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import MOUs from "./pages/MOUs";
import Surveys from "./pages/Surveys";
import Content from "./pages/Content";
import Users from "./pages/Users";
import Requests from "./pages/Requests";
import CreateProject from "./pages/CreateProject";
import ProjectDetail from "./pages/ProjectDetail";
import CreateMOU from "./pages/CreateMOU";
import MOUDetail from "./pages/MOUDetail";
import CreateRequest from "./pages/CreateRequest";

function AppRouter() {
  const { user, loading } = useAuth();

  // Define a PrivateRoute component
  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    if (loading) {
      return <div>Loading...</div>;
    }
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />
        <Route path="/projects/new" element={<CreateProject />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Reports />
            </PrivateRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <PrivateRoute>
              <Analytics />
            </PrivateRoute>
          }
        />
        <Route
          path="/locations"
          element={
            <PrivateRoute>
              <Locations />
            </PrivateRoute>
          }
        />
        <Route
          path="/mous"
          element={
            <PrivateRoute>
              <MOUs />
            </PrivateRoute>
          }
        />
        <Route path="/mous/new" element={<CreateMOU />} />
        <Route path="/mous/:id" element={<MOUDetail />} />
        <Route
          path="/surveys"
          element={
            <PrivateRoute>
              <Surveys />
            </PrivateRoute>
          }
        />
        <Route
          path="/content"
          element={
            <PrivateRoute>
              <Content />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/requests"
          element={
            <PrivateRoute>
              <Requests />
            </PrivateRoute>
          }
        />
        <Route path="/requests/new" element={<CreateRequest />} />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
