import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, Truck, Wallet, CheckCircle2, ArrowLeft } from 'lucide-react';
import { CartItem } from '@/src/constants';
import { cn } from '@/src/lib/utils';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onComplete: () => void;
}

export function Checkout({ isOpen, onClose, items, onComplete }: CheckoutProps) {
  const [step, setStep] = React.useState(1);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 15;
  const total = subtotal + deliveryFee;

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    setTimeout(() => {
      onComplete();
    }, 3000);
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
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-4 md:inset-10 lg:inset-x-60 lg:inset-y-20 bg-[#0a0a0a] border border-white/10 z-[110] rounded-[40px] overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/10 flex items-center justify-between bg-black">
              <div className="flex items-center gap-4">
                {step > 1 && step < 3 && (
                  <button onClick={() => setStep(step - 1)} className="p-2 text-gray-500 hover:text-white">
                    <ArrowLeft size={20} />
                  </button>
                )}
                <h2 className="text-2xl font-bold text-white">Checkout</h2>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((s) => (
                  <div 
                    key={s} 
                    className={cn(
                      "w-8 h-1 rounded-full transition-all",
                      step >= s ? "bg-blue-600" : "bg-white/10"
                    )} 
                  />
                ))}
              </div>
              <button onClick={onClose} className="p-2 text-gray-500 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-12">
              <div className="max-w-4xl mx-auto">
                {step === 1 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <h3 className="text-xl font-bold text-white">Shipping Information</h3>
                      <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Input label="First Name" placeholder="John" />
                          <Input label="Last Name" placeholder="Doe" />
                        </div>
                        <Input label="Email Address" placeholder="john@example.com" type="email" />
                        <Input label="Phone Number" placeholder="+1 (555) 000-0000" />
                        <Input label="Address" placeholder="123 Street Name" />
                        <div className="grid grid-cols-2 gap-4">
                          <Input label="City" placeholder="San Francisco" />
                          <Input label="Zip Code" placeholder="94103" />
                        </div>
                      </form>
                      <button 
                        onClick={() => setStep(2)}
                        className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all"
                      >
                        Continue to Payment
                      </button>
                    </div>
                    <OrderSummary items={items} subtotal={subtotal} deliveryFee={deliveryFee} total={total} />
                  </div>
                )}

                {step === 2 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <h3 className="text-xl font-bold text-white">Payment Method</h3>
                      <div className="space-y-4">
                        <PaymentOption 
                          icon={<CreditCard size={20} />} 
                          title="Credit / Debit Card" 
                          description="Pay with Visa, Mastercard, or Amex"
                          active
                        />
                        <PaymentOption 
                          icon={<Wallet size={20} />} 
                          title="Mobile Payment" 
                          description="Apple Pay, Google Pay, or Samsung Pay"
                        />
                        <PaymentOption 
                          icon={<Truck size={20} />} 
                          title="Cash on Delivery" 
                          description="Pay when you receive your order"
                        />
                      </div>
                      <form className="space-y-4 pt-4" onSubmit={handleComplete}>
                        <Input label="Card Number" placeholder="0000 0000 0000 0000" />
                        <div className="grid grid-cols-2 gap-4">
                          <Input label="Expiry Date" placeholder="MM/YY" />
                          <Input label="CVV" placeholder="000" />
                        </div>
                        <button 
                          type="submit"
                          className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all mt-4"
                        >
                          Complete Order • ${total}
                        </button>
                      </form>
                    </div>
                    <OrderSummary items={items} subtotal={subtotal} deliveryFee={deliveryFee} total={total} />
                  </div>
                )}

                {step === 3 && (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 12 }}
                      className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-white mb-8 shadow-2xl shadow-blue-600/40"
                    >
                      <CheckCircle2 size={64} />
                    </motion.div>
                    <h3 className="text-4xl font-bold text-white mb-4">Order Confirmed!</h3>
                    <p className="text-gray-400 text-lg max-w-md mx-auto mb-12">
                      Thank you for shopping at KIYA I-STORE. Your order #KIYA-8293 is being processed.
                    </p>
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/10 w-full max-w-sm">
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-4">Estimated Delivery</p>
                      <p className="text-white font-bold text-xl">March 12 - March 15, 2026</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-widest font-bold text-gray-500 ml-1">{label}</label>
      <input 
        {...props}
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all"
      />
    </div>
  );
}

function PaymentOption({ icon, title, description, active = false }: any) {
  return (
    <div className={cn(
      "p-6 rounded-3xl border transition-all cursor-pointer flex items-center gap-4",
      active ? "bg-blue-600/10 border-blue-600" : "bg-white/5 border-white/10 hover:border-white/30"
    )}>
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center",
        active ? "bg-blue-600 text-white" : "bg-white/5 text-gray-400"
      )}>
        {icon}
      </div>
      <div>
        <h4 className="text-white font-bold">{title}</h4>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      {active && <CheckCircle2 size={20} className="ml-auto text-blue-600" />}
    </div>
  );
}

function OrderSummary({ items, subtotal, deliveryFee, total }: any) {
  return (
    <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 h-fit sticky top-0">
      <h3 className="text-xl font-bold text-white mb-8">Order Summary</h3>
      <div className="space-y-6 mb-8">
        {items.map((item: any) => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-xl overflow-hidden border border-white/10">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">{item.quantity}x • {item.selectedStorage}</p>
              </div>
            </div>
            <span className="text-white font-bold text-sm">${item.price * item.quantity}</span>
          </div>
        ))}
      </div>
      <div className="space-y-3 pt-6 border-t border-white/10">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="text-white font-medium">${subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Delivery Fee</span>
          <span className="text-white font-medium">${deliveryFee}</span>
        </div>
        <div className="pt-4 flex justify-between items-end">
          <span className="text-white font-bold text-lg">Total</span>
          <span className="text-blue-500 font-bold text-3xl">${total}</span>
        </div>
      </div>
    </div>
  );
}
