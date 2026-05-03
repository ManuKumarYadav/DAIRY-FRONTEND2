import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('staff');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      const data = await res.json();
      console.log('REGISTER:', data);

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setMessage({ text: 'Registration Successful! Welcome to DairyNest', type: 'success' });
      setTimeout(() => navigate('/login'), 1500);

    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const selectRole = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div className="register-page">
      <section className="register-hero">
        <div className="register-milk-float"></div>

        <div className="register-hero-content">
          <h1>Join DairyNest Family</h1>
          <p>Create your account to enjoy fresh dairy delivered daily</p>

          {message.text && (
            <div className={message.type === 'success' ? 'success-msg' : 'error-msg'}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleRegister} className="glass-form">
            <div className="input-group">
              <span className="input-icon"></span>
              <input
                className="input-field"
                type="text"
                placeholder="UserName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <span className="input-icon"></span>
              <input
                className="input-field"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <span className="input-icon"></span>
              <input
                className="input-field"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
              />
            </div>

            <div className="role-selection">
              <div
                className={`role-card ${role === 'staff' ? 'active' : ''}`}
                onClick={() => selectRole('staff')}
              >
                <span className="emoji"></span>
                <div>Staff</div>
              </div>
              <div
                className={`role-card ${role === 'shop' ? 'active' : ''}`}
                onClick={() => selectRole('shop')}
              >
                <span className="emoji"></span>
                <div>Shop</div>
              </div>
            </div>

            <button type="submit" className="btn-register" disabled={loading || !name || !email || !password}>
              {loading ? 'Creating Account...' : 'Join DairyNest'}
            </button>

            <div className="login-link">
              Already have an account? <a href="/login">Sign in</a>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Register;