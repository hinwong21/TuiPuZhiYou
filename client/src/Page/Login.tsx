import React from "react";

interface LoginProps {
  onStatusChange: (newStatus: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onStatusChange }) => {
  const handleStatus = (newStatus: string) => {
    onStatusChange(newStatus);
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {/* Login form */}
      <form>
        {/* Input fields for username and password */}
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        {/* Button to submit the login form */}
        <button type="submit">Login</button>
      </form>

      {/* Register button */}
      <div className="register-link">
        <p>Don't have an account?</p>
        <button
          onClick={() => {
            handleStatus("register");
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};
