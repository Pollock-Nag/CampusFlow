import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HRPrivateRoute({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const hrauth = Cookies.get('hrauth');
  useEffect(() => {
    if (hrauth) {
      setIsLoggedIn(true);
    }
    if (!hrauth) {
      navigate(`/hr/login?redirect=${window.location.pathname}`);
    }
  }, [hrauth]);

  return <>{isLoggedIn && children}</>;
}

export default HRPrivateRoute;
