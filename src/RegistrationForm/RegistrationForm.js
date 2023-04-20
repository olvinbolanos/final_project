import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function RegistrationForm(props) {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { id, val } = e.target;
    setState(prevState => ({
      ...prevState,
      [id]: val
    }));
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      sendDetailsToServer()
    } else {
      props.showError('Password does not match, please try again.')
    }
  }

  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <form>
        <Card className="text-left">
          <Card.Body>
          <Card.Title>Email address</Card.Title>
          <input type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={state.email}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
 
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <Card.Title htmlFor="exampleInputPassword1">Confirm Password</Card.Title>
          <input type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm Password"
          />
       
        <Button
          style={{ marginTop: "10px"}}
          type="submit"
          variant="primary"
          onClick={handleSubmitClick}
        >
          Register
          </Button>
            </div>
        </Card.Body>
        </Card>
      </form>
    </div>
  )
}