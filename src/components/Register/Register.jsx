import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined';
import Button from '../common/Button';
import Alert from '../common/Alert';

function Register() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const [state, setState] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: credentials.name, email: credentials.email, password: credentials.password })
      });

      const json = await response.json();

      if (json.success) {
        setState(true);
        localStorage.setItem('username', json.username);

        const month = new Map([
          ['01', 'Jan'], ['02', 'Feb'], ['03', 'Mar'], ['04', 'Apr'], 
          ['05', 'May'], ['06', 'June'], ['07', 'July'], ['08', 'Aug'], 
          ['09', 'Sep'], ['10', 'Oct'], ['11', 'Nov'], ['12', 'Dec']
        ]);
        
        const year = json.date.substring(0, 4);
        const mn = json.date.substring(5, 7);
        
        localStorage.setItem("since", month.get(mn) + " " + year);
        localStorage.setItem("token", json.success);
        localStorage.setItem("Usertype", "user");

        setTimeout(() => {
          navigate("/");
          window.location.reload(true);
        }, 1500);
      } else {
        setErrorMsg(json.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      setErrorMsg("Server error, please try again later.");
    }
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
            message="<strong>Success!</strong> You are registered. Redirecting..." 
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
            <h2 className="text-3xl font-extrabold text-textMain tracking-tight">Create Account</h2>
            <p className="text-textMuted text-sm mt-2">Join the QuerySolve community today</p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            
            {/* Username Group */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-textMain uppercase tracking-wider">Username</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted">
                  <PersonOutlineIcon fontSize="small" />
                </span>
                <input 
                  type="text" 
                  name="name"
                  value={credentials.name}
                  onChange={onChange} 
                  required 
                  placeholder="johndoe"
                  className="w-full bg-surfaceHover border border-surfaceBorder rounded-xl pl-11 pr-4 py-3 text-textMain placeholder-textMuted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-sm"
                />
              </div>
            </div>

            {/* Email Group */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-textMain uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted">
                  <MailOutlineIcon fontSize="small" />
                </span>
                <input 
                  type="email" 
                  name="email"
                  value={credentials.email}
                  onChange={onChange} 
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
                  name="password" 
                  value={credentials.password}
                  onChange={onChange} 
                  required 
                  placeholder="••••••••"
                  className="w-full bg-surfaceHover border border-surfaceBorder rounded-xl pl-11 pr-4 py-3 text-textMain placeholder-textMuted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="primary" fullWidth className="py-3 mt-2">
              Create Account
            </Button>

          </form>

          {/* Card Footer */}
          <div className="mt-8 pt-6 border-t border-surfaceBorder text-center text-xs text-textMuted">
            Already have an account? <NavLink to="/login" className="text-primary hover:underline font-semibold ml-1">Sign in</NavLink>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;
