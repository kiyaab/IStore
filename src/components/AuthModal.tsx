import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, ArrowRight, Github, Chrome, AlertCircle } from 'lucide-react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  signInWithPopup 
} from 'firebase/auth';
import { getFirebaseAuth, googleProvider, githubProvider, isFirebaseConfigured } from '@/src/lib/firebase';
import { cn } from '@/src/lib/utils';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const auth = getFirebaseAuth();
    if (!auth) {
      setError('Firebase is not configured. Please add your API keys in the settings.');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: any) => {
    setError(null);
    
    const auth = getFirebaseAuth();
    if (!auth) {
      setError('Firebase is not configured. Please add your API keys in the settings.');
      return;
    }

    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred during social login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[120]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white border border-black/5 z-[130] rounded-[40px] overflow-hidden shadow-2xl"
          >
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-black">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {isLogin ? 'Login to your KIYA account' : 'Join the future of iPhone shopping'}
                  </p>
                </div>
                <button onClick={onClose} className="p-2 text-gray-400 hover:text-black transition-colors">
                  <X size={24} />
                </button>
              </div>

              {!isFirebaseConfigured && (
                <div className="mb-6 p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-start gap-3 text-orange-700 text-sm">
                  <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold mb-1">Configuration Required</p>
                    <p>Please add your Firebase API keys in the app settings to enable authentication features.</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 text-sm">
                  <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-gray-50 border border-black/5 rounded-2xl pl-12 pr-6 py-4 text-black focus:outline-none focus:border-orange-500 transition-all"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full bg-gray-50 border border-black/5 rounded-2xl pl-12 pr-6 py-4 text-black focus:outline-none focus:border-orange-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-gray-50 border border-black/5 rounded-2xl pl-12 pr-6 py-4 text-black focus:outline-none focus:border-orange-500 transition-all"
                    />
                  </div>
                </div>

                {isLogin && (
                  <div className="flex justify-end">
                    <button type="button" className="text-[10px] text-orange-600 hover:text-orange-700 font-bold uppercase tracking-widest">
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-600/20 group mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
                  {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>

              <div className="mt-8">
                <div className="relative flex items-center justify-center mb-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-black/5"></div>
                  </div>
                  <span className="relative px-4 bg-white text-[10px] text-gray-400 uppercase tracking-widest font-bold">Or continue with</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleSocialLogin(googleProvider)}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 py-4 bg-gray-50 border border-black/5 rounded-2xl text-black hover:bg-gray-100 transition-all disabled:opacity-50"
                  >
                    <Chrome size={20} />
                    <span className="text-sm font-bold">Google</span>
                  </button>
                  <button 
                    onClick={() => handleSocialLogin(githubProvider)}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 py-4 bg-gray-50 border border-black/5 rounded-2xl text-black hover:bg-gray-100 transition-all disabled:opacity-50"
                  >
                    <Github size={20} />
                    <span className="text-sm font-bold">GitHub</span>
                  </button>
                </div>
              </div>

              <p className="mt-10 text-center text-gray-500 text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-orange-600 hover:text-orange-700 font-bold"
                >
                  {isLogin ? 'Sign Up' : 'Login'}
                </button>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
