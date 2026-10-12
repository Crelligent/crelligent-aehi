'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  institution: z.string().min(2),
  institutionType: z.string().min(2, { message: 'Select a type' }),
  interest: z.string().min(2, { message: 'Select what you are interested in' }),
  message: z.string().max(1500).optional(),
  consent: z.literal(true, { message: 'Please agree so we can reply' }),
  website: z.string().optional(),
});

type FormData = z.input<typeof schema>;

export function InstitutionalInquiry() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/institutional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSubmitted(true);
    } catch {
      setSubmitError('We could not send your enquiry. Please try again, or email aehi@crelligent.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[var(--aehi-surface)] border border-[var(--aehi-lime)]/30 p-12 rounded-2xl text-center">
        <div className="w-16 h-16 bg-[var(--aehi-lime)]/10 text-[var(--aehi-lime)] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">✓</div>
        <h3 className="text-2xl font-head font-medium text-white mb-2">Inquiry Received</h3>
        <p className="text-[var(--aehi-muted)] max-w-md mx-auto">
          Thank you. A member of the Crelligent team will reply within two working days.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--aehi-surface)] border border-[var(--aehi-border)] p-8 md:p-12 rounded-2xl">
      <h3 className="text-2xl font-head font-medium text-white mb-2">Get in touch</h3>
      <p className="text-[var(--aehi-muted)] mb-8 text-sm">
        Tell us about your institution and how you would like to work with the AEHI.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-2">First Name</label>
            <input {...register('firstName')} className="w-full bg-[#050B14] border border-[var(--aehi-border)] rounded-lg px-4 py-3 text-white text-sm focus:border-[var(--aehi-lime)] outline-none" />
          </div>
          <div>
            <label className="block text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-2">Last Name</label>
            <input {...register('lastName')} className="w-full bg-[#050B14] border border-[var(--aehi-border)] rounded-lg px-4 py-3 text-white text-sm focus:border-[var(--aehi-lime)] outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-2">Work Email</label>
            <input {...register('email')} className="w-full bg-[#050B14] border border-[var(--aehi-border)] rounded-lg px-4 py-3 text-white text-sm focus:border-[var(--aehi-lime)] outline-none" />
          </div>
          <div>
            <label className="block text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-2">Institution Name</label>
            <input {...register('institution')} className="w-full bg-[#050B14] border border-[var(--aehi-border)] rounded-lg px-4 py-3 text-white text-sm focus:border-[var(--aehi-lime)] outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-2">Institution Type</label>
            <select {...register('institutionType')} className="w-full bg-[#050B14] border border-[var(--aehi-border)] rounded-lg px-4 py-3 text-white text-sm focus:border-[var(--aehi-lime)] outline-none appearance-none">
              <option value="">Select type...</option>
              <option value="Private Equity Firm">Private Equity Firm</option>
              <option value="Development Finance Institution">Development Finance Institution</option>
              <option value="Commercial Bank">Commercial Bank</option>
              <option value="Government / Policy">Government / Policy</option>
              <option value="Corporate Strategy">Corporate Strategy</option>
              <option value="Academic Institution">Academic Institution</option>
              <option value="Industry Association">Industry Association</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-2">Interested In</label>
            <select {...register('interest')} className="w-full bg-[#050B14] border border-[var(--aehi-border)] rounded-lg px-4 py-3 text-white text-sm focus:border-[var(--aehi-lime)] outline-none appearance-none">
              <option value="">Select one...</option>
              <option value="Research partnership">Research partnership</option>
              <option value="Distributing the survey to our network">Distributing the survey to our network</option>
              <option value="Data access when published">Data access when published</option>
              <option value="Commissioned research">Commissioned research</option>
              <option value="Other">Other</option>
            </select>
            {errors.interest && <p className="mt-1.5 text-xs text-[var(--aehi-red)]">{errors.interest.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-2">Message (Optional)</label>
          <textarea {...register('message')} className="w-full h-24 bg-[#050B14] border border-[var(--aehi-border)] rounded-lg px-4 py-3 text-white text-sm focus:border-[var(--aehi-lime)] outline-none resize-none" />
        </div>

        <div className="hidden" aria-hidden="true">
          <label>Leave empty<input tabIndex={-1} autoComplete="off" {...register('website')} /></label>
        </div>

        <label className="flex items-start gap-3 text-sm text-[var(--aehi-muted)]">
          <input type="checkbox" {...register('consent')} className="mt-1 size-4 accent-[var(--aehi-lime)]" />
          <span>Crelligent may contact me about this enquiry.</span>
        </label>
        {errors.consent && <p className="text-xs text-[var(--aehi-red)]">{errors.consent.message}</p>}
        {submitError && <p role="alert" className="text-sm text-[var(--aehi-red)]">{submitError}</p>}

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full py-4 bg-[var(--aehi-lime)] text-[#050505] font-medium text-sm rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50"
        >
          {isSubmitting ? 'Sending…' : 'Send enquiry'}
        </button>
      </form>
    </div>
  );
}
