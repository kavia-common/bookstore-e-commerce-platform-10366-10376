import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../state/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await register(email, password);
      navigate('/');
    } catch (error) {
      setErr(error.message || 'Registration failed');
    }
  };

  return (
    <div className="card auth-card">
      <h1 style={{ marginTop: 0 }}>Create account</h1>
      {err && <p style={{ color: 'var(--danger)' }}>{err}</p>}
      <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
        <label>
          <div>Email</div>
          <input className="input" type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
        </label>
        <label>
          <div>Password</div>
          <input className="input" type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} />
        </label>
        <button className="btn btn-primary" type="submit">Create account</button>
      </form>
      <p style={{ marginTop: 12, color: 'var(--text-secondary)' }}>
        Already have an account? <Link to="/auth/login">Sign in</Link>
      </p>
    </div>
  );
}
