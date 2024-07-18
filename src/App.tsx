import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignIn from './routes/signIn';
import Signup from './routes/signup';
import Home from './routes/home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
