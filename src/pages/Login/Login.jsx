



import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { login, signUp } from '../../firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading , setLoading]=useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!email || !password || (signState === "Sign Up" && !name)) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signUp(name, email, password);
      }
    } catch (err) {
      console.error("Auth Error:", err);
      alert("Authentication failed: " + err.message);
    }
    setLoading(false);
  };

  return (
    loading?<div className='login-spinner'>
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className="login">
      <img src={logo} className="login-logo" alt="App Logo" />

      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your name"
            />
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            autoComplete="email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
          />
          <button onClick={user_auth} type="submit">
            {signState}
          </button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <p className="help-link" onClick={() => alert("Redirect to help page...")}>
              Need Help?
            </p>
          </div>
        </form>

        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span
                onClick={() => {
                  setName("");
                  setEmail("");
                  setPassword("");
                  setSignState("Sign Up");
                }}
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setName("");
                  setEmail("");
                  setPassword("");
                  setSignState("Sign In");
                }}
              >
                Sign In Now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
