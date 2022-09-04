import "./App.css";
import Landing from "./pages/Landing";
import UserInfo from "./pages/UserInfo";
import LaptopInfo from './pages/LaptopInfo'
import UserDetailsPage from "./pages/UserDetailsPage";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="form/userInfo" element={<UserInfo />}></Route>
          <Route path="form/laptopInfo" element={<LaptopInfo />}></Route>
          <Route path="/users" element={<LaptopInfo />}></Route>
          <Route path="/user_id" element={<UserDetailsPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
