import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import { BrainCircuit, Mail, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import authService from '../../services/authServices';

const Login = () => {

    const [email, setEmail] = useState('alex@timetoprogram.com');
    const [password, setPassword] = useState('Test@123');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setLoading(true);

        try {
            const { token, user } = await authService.login(email, password);

            login(user, token);

            toast.success('Logged in successfully!');

            navigate('/dashboard');
        } catch (err) {
            setError(
                err.message ||
                'Failed to login. Please check your credentials.'
            );

            toast.error(
                err.message ||
                'Failed to login.'
            );
        } finally {
            setLoading(false);
        }
    };
return (
 
  <div className="min-h-screen bg-white flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-8">

      {/* Header */}
      <div className="text-center mb-8">
        <div
          className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-4"
          style={{
            background:
              "linear-gradient(135deg,var(--secondary-dark),var(--teal))"
          }}
        >
          <BrainCircuit
            className="w-8 h-8 text-white"
            strokeWidth={2}
          />
        </div>

        <h1
          className="text-3xl font-bold"
          style={{ color: "var(--secondary-dark)" }}
        >
          Welcome back
        </h1>

        <p className="mt-2 text-slate-500">
          Sign in to continue your journey
        </p>
      </div>

      {/* Form */}
      <div className="space-y-5">

        {/* Email Field */}
        <div>
          <label
            className="block mb-2 text-sm font-medium"
            style={{ color: "var(--primary-dark)" }}
          >
            Email
          </label>

          <div className="relative">
            <div
              className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${
                focusedField === "email"
                  ? "text-cyan-600"
                  : "text-slate-400"
              }`}
            >
              <Mail className="w-5 h-5" strokeWidth={2} />
            </div>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 outline-none transition-all duration-300"
              placeholder="you@example.com"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label
            className="block mb-2 text-sm font-medium"
            style={{ color: "var(--primary-dark)" }}
          >
            Password
          </label>

          <div className="relative">
            <div
              className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${
                focusedField === "password"
                  ? "text-cyan-600"
                  : "text-slate-400"
              }`}
            >
              <Lock className="w-5 h-5" strokeWidth={2} />
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 outline-none transition-all duration-300"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
            <p className="text-red-600 text-sm">
              {error}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 rounded-xl text-white font-semibold shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
          style={{
            background:
              "linear-gradient(90deg,var(--secondary-dark),var(--teal-dark),var(--teal))"
          }}
        >
          <span className="flex items-center justify-center gap-2">
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <ArrowRight
                  className="w-5 h-5"
                  strokeWidth={2.5}
                />
              </>
            )}
          </span>
        </button>

        {/* Footer */}
        <div className="text-center">
          <p className="text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold hover:underline"
              style={{ color: "var(--teal)" }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Footer Text */}
      <p className="text-center text-xs text-slate-400 mt-8">
        By continuing, you agree to our Terms & Privacy Policy
      </p>

    </div>
  </div>
);
}

export default Login;