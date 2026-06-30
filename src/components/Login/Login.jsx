import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined';
import Button from '../common/Button';
import Alert from '../common/Alert';

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [state, setState] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });
      
      const json = await response.json();

      if (json.success != null) {
        setState(true);
        window.scrollTo(0, 0);

        localStorage.setItem("username", json.username);
        
        const month = new Map([
          ['01', 'Jan'], ['02', 'Feb'], ['03', 'Mar'], ['04', 'Apr'], 
          ['05', 'May'], ['06', 'June'], ['07', 'July'], ['08', 'Aug'], 
          ['09', 'Sep'], ['10', 'Oct'], ['11', 'Nov'], ['12', 'Dec']
        ]);

        if (json.date) {
          const year = json.date.substring(0, 4);
          const mn = json.date.substring(5, 7);
          localStorage.setItem("since", month.get(mn) + " " + year);
        }
        localStorage.setItem("Usertype", json.userType);
        localStorage.setItem("token", json.success);

        setTimeout(() => {
          window.location.href = json.userType === "admin" ? "/adminHome" : "/";
        }, 1500);
      } else {
        setErrorMsg('Invalid Credentials');
      }
    } catch (err) {
      setErrorMsg('Server error, please try again later.');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 relative overflow-hidden transition-colors duration-300">
      
      {/* Decorative Blur Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10"></div>

      <div className="w-full max-w-md">
        
        {/* Success Alert */}
        {state && (
          <Alert 
            message="<strong>Success!</strong> Welcome back. Redirecting..." 
            type="success" 
            className="mb-4"
          />
        )}

        {/* Error Alert */}
        {errorMsg && (
          <Alert 
            message={`<strong>Error!</strong> ${errorMsg}`} 
            type="error" 
            className="mb-4"
            onClose={() => setErrorMsg("")}
          />
        )}

        {/* Form Card */}
        <div className="glass border border-surfaceBorder rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-textMain tracking-tight">Welcome Back</h2>
            <p className="text-textMuted text-sm mt-2">Sign in to continue to QuerySolve</p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit} method="post">
            
            {/* Email Group */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-textMain uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted">
                  <MailOutlineIcon fontSize="small" />
                </span>
                <input 
                  type="text" 
                  onChange={onChange} 
                  name="email" 
                  value={credentials.email}
                  required 
                  placeholder="name@example.com"
                  className="w-full bg-surfaceHover border border-surfaceBorder rounded-xl pl-11 pr-4 py-3 text-textMain placeholder-textMuted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-sm"
                />
              </div>
            </div>

            {/* Password Group */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-textMain uppercase tracking-wider">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted">
                  <LockOpenIcon fontSize="small" />
                </span>
                <input 
                  type="password" 
                  onChange={onChange} 
                  name="password"
                  value={credentials.password} 
                  required 
                  placeholder="••••••••"
                  className="w-full bg-surfaceHover border border-surfaceBorder rounded-xl pl-11 pr-4 py-3 text-textMain placeholder-textMuted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="primary" fullWidth className="py-3 mt-2">
              Log In
            </Button>

          </form>

          {/* Card Footer */}
          <div className="mt-8 pt-6 border-t border-surfaceBorder text-center text-xs text-textMuted">
            Don't have an account? <NavLink to="/register" className="text-primary hover:underline font-semibold ml-1">Sign up now</NavLink>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
