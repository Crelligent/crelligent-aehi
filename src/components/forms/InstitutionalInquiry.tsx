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
  institutionType: z.string().min(2),
  intendedUse: z.string().min(2),
  budget: z.string().min(2),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function InstitutionalInquiry() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await fetch('/api/institutional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
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
          Thank you — a member of the Crelligent team will be in touch within 48 hours regarding institutional data access.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--aehi-surface)] border border-[var(--aehi-border)] p-8 md:p-12 rounded-2xl">
      <h3 className="text-2xl font-head font-medium text-white mb-2">Request Data License</h3>
      <p className="text-[var(--aehi-muted)] mb-8 text-sm">
        Please provide details about your institution and intended use of the AEHI dataset.
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
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-2">Intended Use</label>
            <select {...register('intendedUse')} className="w-full bg-[#050B14] border border-[var(--aehi-border)] rounded-lg px-4 py-3 text-white text-sm focus:border-[var(--aehi-lime)] outline-none appearance-none">
              <option value="">Select use case...</option>
              <option value="Due Diligence">Due Diligence</option>
              <option value="Portfolio Monitoring">Portfolio Monitoring</option>
              <option value="Policy Research">Policy Research</option>
              <option value="Market Analysis">Market Analysis</option>
              <option value="Academic Research">Academic Research</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-2">Budget Range</label>
          <select {...register('budget')} className="w-full bg-[#050B14] border border-[var(--aehi-border)] rounded-lg px-4 py-3 text-white text-sm focus:border-[var(--aehi-lime)] outline-none appearance-none">
            <option value="">Select budget range...</option>
            <option value="Under ₦2M">Under ₦2M</option>
            <option value="₦2M–₦10M">₦2M–₦10M</option>
            <option value="₦10M–₦30M">₦10M–₦30M</option>
            <option value="₦30M+">₦30M+</option>
            <option value="Discuss with team">Discuss with team</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-2">Message (Optional)</label>
          <textarea {...register('message')} className="w-full h-24 bg-[#050B14] border border-[var(--aehi-border)] rounded-lg px-4 py-3 text-white text-sm focus:border-[var(--aehi-lime)] outline-none resize-none" />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full py-4 bg-[var(--aehi-lime)] text-[#050505] font-medium text-sm rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </form>
    </div>
  );
}
