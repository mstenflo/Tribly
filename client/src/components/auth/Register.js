import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './auth.css';

const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Passwords do not match')
    } else {
      console.log(formData);
    }
  }
  
  return (
    <div className="bg-dark full-screen">
      <div className="auth-container text-dark">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" action="create-profile.html" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={e => onChange(e)}
              required />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              required />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <input type="submit" className="btn btn-light" value="Register" />
        </form>
        <p className="my-1 small">
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
