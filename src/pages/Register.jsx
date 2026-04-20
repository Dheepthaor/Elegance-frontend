import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { toast } from 'sonner';
import { registerUser } from '@/services/authService';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const passwordRequirements = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    { label: 'Contains a number', met: /\d/.test(formData.password) },

  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!passwordRequirements.every((req) => req.met)) {
      if(formData.password.length!=8){
        toast.error("password length should be 8")
      }
      else{
        toast.error("passwords requirments should be followed")
      }

      return;
    }

    if (!acceptTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      // 🔹 BACKEND-EXPECTED PAYLOAD
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      };

      const res = await registerUser(payload);

      toast.success(res.message || 'User registered successfully');

      // redirect to login
      navigate('/login');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Registration failed',
        
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-semibold mb-2">Create Account</h1>
            <p className="text-muted-foreground">
              Join us and discover exclusive styles
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <input
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="input-styled"
              />

              <input
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className="input-styled"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input-styled"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="input-styled pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input-styled"
            />

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <span className="text-sm text-muted-foreground">
                I agree to the Terms and Privacy Policy
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-4"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm mt-8">
            Already have an account?{' '}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
