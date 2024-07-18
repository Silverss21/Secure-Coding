import { useState } from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import validator from 'validator';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const submitForm = (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    // Sanitize inputs before submission
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);
    const sanitizedConfirmPassword = DOMPurify.sanitize(confirmPassword);

    // Validate email and passwords
    if (!validator.isEmail(sanitizedEmail)) {
      setError('Invalid email format');
      return;
    }

    if (sanitizedPassword !== sanitizedConfirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!validator.isLength(sanitizedPassword, { min: 8 })) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // Clear previous error messages
    setError('');

    // Perform the form submission (e.g., send to API)
    fetch('/api/signup', {
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
        // Handle response data
        if (data.success) {
          setSuccess('Success: Account created successfully');
          setError('');
        } else {
          setError(`Error: ${data.message}`);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setSuccess('Success: Account created successfully');
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submitForm(email, password, confirmPassword);
  };

  return (
    <div className="h-screen w-full bg-bg-hero flex flex-col justify-center items-center">
      <div className="backdrop-blur-3xl w-full h-screen max-h-[60%] max-w-[25%] border-2 border-[#2C2747] rounded-3xl justify-center items-center flex flex-col">
        <div className="flex flex-col justify-center items-center gap-4 p-4">
          <h1 className="text-4xl text-white font-bold">Sign Up</h1>
          {/* Error and success messages */}
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">{success}</div>}

          <form
            className="flex flex-col justify-center items-center gap-4"
            onSubmit={handleSubmit}
          >
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
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 rounded-lg border-2 border-[#2C2747]"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="submit"
              className="p-2 bg-[#2C2747] text-white rounded-lg"
            >
              Sign Up
            </button>
            <p className="text-white">
              Already have an account?{' '}
              <Link to="/" className="text-[#2C2747]">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
