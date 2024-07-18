import { useState } from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import validator from 'validator';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const submitForm = (email: string, password: string) => {
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);
    setError('');
    setSuccess('');

    if (!validator.isEmail(sanitizedEmail)) {
      setError('Email or password is wrong');
      return;
    }

    if (!validator.isLength(sanitizedPassword, { min: 8 })) {
      setError('Email or password is wrong');
      return;
    }

    setError('');

    fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: sanitizedEmail,
        password: sanitizedPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
        setSuccess('Login successful'); // This is a placeholder since we don't have a real API
        // setError('Login failed'); // This is a placeholder since we don't have a real API
      });

    // Clear the form fields
    setEmail('');
    setPassword('');
  };
  const handleSubmit = () => {
    submitForm(email, password);
  };

  return (
    <div className="h-screen w-full bg-bg-hero flex flex-col justify-center items-center">
      <div className="backdrop-blur-3xl w-full h-screen max-h-[60%] max-w-[25%] border-2 border-[#2C2747] rounded-3xl justify-center items-center flex flex-col">
        <div className="flex flex-col justify-center items-center gap-4 p-4">
          <h1 className="text-4xl text-white font-bold">Sign In</h1>
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">{success}</div>}

          <div className="flex flex-col justify-center items-center gap-4">
            <input
              type="text"
              placeholder="Email"
              className="w-full p-2 rounded-lg border-2 border-[#2C2747]"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 rounded-lg border-2 border-[#2C2747]"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="p-2 bg-[#2C2747] text-white rounded-lg cursor-pointer"
              onClick={handleSubmit}
            >
              Sign In
            </div>
            <p className="text-white">
              Don't have an account?{' '}
              <Link to="/signup">
                <span className="text-[#2C2747]">Sign Up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
