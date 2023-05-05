import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./css/resets.css";
import PublicNav from "./components/PublicNav";
import Landing from "./pages/public/landing/Landing";
import Department from "./pages/public/department/Department";
import PatientLogin from "./pages/auth/patient/PatientLogin";
import PatientRegister from "./pages/auth/patient/PatientRegister";
import DoctorLogin from "./pages/auth/doctor/DoctorLogin";
import PatientDashboard from "./pages/patient/PatientDashboard";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import MedecinDashboard from "./pages/medecin/MedecinDashboard";
import MedecinNavbar from "./components/MedecinNavbar";
import MedecinOrdonnances from "./pages/medecin/MedecinOrdonnances";
import MedecinFactures from "./pages/medecin/MedecinFactures";

import AdminNavbar from "./components/AdminNavbar";
import {
  AdminLogin,
  AdminDashboard,
  AdminDoctors,
  AddDoctor,
  DoctorPage,
} from "./pages/admin";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<PublicNav />}>
            <Route index element={<Landing />} />
            <Route path="patient/signup" element={<PatientRegister />} />
            <Route path="patient/login" element={<PatientLogin />} />
            <Route path="medecin/login" element={<DoctorLogin />} />
            <Route path="departements">
              <Route path=":departmentName" element={<Department />} />
            </Route>
          </Route>

          {/* patient routes */}
          <Route path="/patient" element={<Sidebar />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<PatientDashboard />} />
          </Route>

          {/* medecin routes */}
          <Route path="/medecin" element={<MedecinNavbar />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<MedecinDashboard />} />
            <Route path="ordonnances" element={<MedecinOrdonnances />} />
            <Route path="factures" element={<MedecinFactures />} />
          </Route>

          {/* admin routes */}
          <Route path="/admin" element={<AdminNavbar />}>
            <Route index element={<AdminLogin />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="medecins" element={<AdminDoctors />} />
            <Route path="ajouter-medecin" element={<AddDoctor />} />
            <Route path="medecins/:id" element={<DoctorPage />} />
            {/* <Route path="ordonnances" element={<MedecinOrdonnances />} />
            <Route path="factures" element={<MedecinFactures />} /> */}
          </Route>
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
