'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface ContactFormProps {
  onSubmit: (data: FormData) => Promise<void>;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return undefined;
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 3) return 'Subject must be at least 3 characters';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return undefined;
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key as keyof FormData, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormData] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await onSubmit(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const fieldVariants = {
    focus: { scale: 1.02, borderColor: '#6366f1' },
    blur: { scale: 1, borderColor: '#e5e7eb' },
  };

  const errorVariants = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="relative">
          <label htmlFor="name" className="block text-sm font-medium text-dark dark:text-light mb-2">
            Name
          </label>
          <motion.input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onFocus={() => setErrors((prev) => ({ ...prev, name: undefined }))}
            variants={fieldVariants}
            whileFocus="focus"
            className={`w-full px-4 py-3  border-2 transition-colors duration-200 ${
              errors.name
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-dark-300 dark:border-light-300 focus:border-accent focus:ring-accent dark:bg-dark dark:text-light'
            } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            disabled={isSubmitting}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                id="name-error"
                variants={errorVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mt-1 text-sm text-red-500"
                role="alert"
              >
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <label htmlFor="email" className="block text-sm font-medium text-dark dark:text-light mb-2">
            Email
          </label>
          <motion.input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onFocus={() => setErrors((prev) => ({ ...prev, email: undefined }))}
            variants={fieldVariants}
            whileFocus="focus"
            className={`w-full px-4 py-3  border-2 transition-colors duration-200 ${
              errors.email
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-dark-300 dark:border-light-300 focus:border-accent focus:ring-accent dark:bg-dark dark:text-light'
            } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            disabled={isSubmitting}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                id="email-error"
                variants={errorVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mt-1 text-sm text-red-500"
                role="alert"
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative">
        <label htmlFor="subject" className="block text-sm font-medium text-dark dark:text-light mb-2">
          Subject
        </label>
        <motion.input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          onFocus={() => setErrors((prev) => ({ ...prev, subject: undefined }))}
          variants={fieldVariants}
          whileFocus="focus"
          className={`w-full px-4 py-3  border-2 transition-colors duration-200 ${
            errors.subject
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-dark-300 dark:border-light-300 focus:border-accent focus:ring-accent dark:bg-dark dark:text-light'
          } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
          disabled={isSubmitting}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
        <AnimatePresence>
          {errors.subject && (
            <motion.p
              id="subject-error"
              variants={errorVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mt-1 text-sm text-red-500"
              role="alert"
            >
              {errors.subject}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="relative">
        <label htmlFor="message" className="block text-sm font-medium text-dark dark:text-light mb-2">
          Message
        </label>
        <motion.textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          onFocus={() => setErrors((prev) => ({ ...prev, message: undefined }))}
          variants={fieldVariants}
          whileFocus="focus"
          rows={5}
          className={`w-full px-4 py-3  border-2 transition-colors duration-200 ${
            errors.message
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-dark-300 dark:border-light-300 focus:border-accent focus:ring-accent dark:bg-dark dark:text-light'
          } focus:outline-none focus:ring-2 focus:ring-opacity-50 resize-none`}
          disabled={isSubmitting}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p
              id="message-error"
              variants={errorVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mt-1 text-sm text-red-500"
              role="alert"
            >
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
        <div className="mt-1 text-sm text-dark-500 dark:text-light-300" aria-live="polite">
          {formData.message.length}/10 characters minimum
        </div>
      </div>

      <AnimatePresence mode="wait">
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4  bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
            role="alert"
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-green-700 dark:text-green-300 font-medium">
                Message sent successfully!
              </p>
            </div>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4  bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
            role="alert"
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-red-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-700 dark:text-red-300 font-medium">
                Failed to send message. Please try again.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-6 py-3 bg-dark dark:bg-light text-light dark:text-dark font-semibold border-2 border-dark dark:border-light hover:bg-light hover:text-dark dark:hover:bg-dark dark:hover:text-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </motion.button>
    </form>
  );
}
