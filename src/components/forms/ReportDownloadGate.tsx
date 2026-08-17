'use client'

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  firstName: z.string().min(2, { message: 'First name is required' }),
  email: z.string().email({ message: 'Valid work email required' }),
  company: z.string().min(2, { message: 'Company name is required' }),
  role: z.string().min(2, { message: 'Role is required' }),
  country: z.string().min(2, { message: 'Country is required' }),
});

type FormData = z.infer<typeof schema>;

interface ReportDownloadGateProps {
  editionLabel: string;
}

export function ReportDownloadGate({ editionLabel }: ReportDownloadGateProps) {
  const [downloaded, setDownloaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(`aehi_download_${editionLabel}`)) {
      setDownloaded(true);
    }
  }, [editionLabel]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { country: 'Nigeria' }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/report-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      
      localStorage.setItem(`aehi_download_${editionLabel}`, 'true');
      setDownloaded(true);
      
      if (result.pdfUrl) {
        window.open(result.pdfUrl, '_blank');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (downloaded) {
    return (
      <div className="bg-[var(--aehi-surface)] border border-[var(--aehi-lime)]/30 p-10 rounded-2xl text-center">
        <div className="w-16 h-16 bg-[var(--aehi-lime)]/10 text-[var(--aehi-lime)] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">✓</div>
        <h3 className="text-2xl font-head font-medium text-white mb-2">Report Unlocked</h3>
        <p className="text-[var(--aehi-muted)] mb-8 max-w-md mx-auto">
          You have access to the {editionLabel} report. If your download didn't start automatically, you can download it directly here.
        </p>
        <button 
          onClick={() => window.open(`/reports/aehi-${editionLabel.toLowerCase().replace(' ', '-')}.pdf`, '_blank')}
          className="px-8 py-3 bg-[var(--aehi-lime)] text-[#050505] font-medium rounded-lg"
        >
          Download PDF Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--aehi-surface)] border border-[var(--aehi-border)] p-8 md:p-12 rounded-2xl">
      <h3 className="text-2xl font-head font-medium text-white mb-2">Download the {editionLabel} Report</h3>
      <p className="text-[var(--aehi-muted)] mb-8 text-sm">
        Free for industry professionals. Fill out this brief form to access the 40-page PDF report.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-2">First Name</label>
            <input 
              {...register('firstName')} 
              className="w-full bg-[#050B14] border border-[var(--aehi-border)] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--aehi-lime)] transition-colors"
            />
            {errors.firstName && <p className="text-[var(--aehi-red)] text-xs mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="block text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-2">Work Email</label>
            <input 
              {...register('email')} 
              className="w-full bg-[#050B14] border border-[var(--aehi-border)] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--aehi-lime)] transition-colors"
            />
            {errors.email && <p className="text-[var(--aehi-red)] text-xs mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-2">Company Name</label>
          <input 
            {...register('company')} 
            className="w-full bg-[#050B14] border border-[var(--aehi-border)] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--aehi-lime)] transition-colors"
          />
          {errors.company && <p className="text-[var(--aehi-red)] text-xs mt-1">{errors.company.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-2">Your Role</label>
            <select 
              {...register('role')} 
              className="w-full bg-[#050B14] border border-[var(--aehi-border)] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--aehi-lime)] transition-colors appearance-none"
            >
              <option value="">Select a role...</option>
              <option value="CEO/MD">CEO / MD / Founder</option>
              <option value="Investment Professional">Investment Professional</option>
              <option value="Policy/Government">Policy / Government</option>
              <option value="Academic/Researcher">Academic / Researcher</option>
              <option value="Consultant">Consultant</option>
              <option value="Other">Other</option>
            </select>
            {errors.role && <p className="text-[var(--aehi-red)] text-xs mt-1">{errors.role.message}</p>}
          </div>
          <div>
            <label className="block text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-2">Country</label>
            <input 
              {...register('country')} 
              className="w-full bg-[#050B14] border border-[var(--aehi-border)] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--aehi-lime)] transition-colors"
            />
            {errors.country && <p className="text-[var(--aehi-red)] text-xs mt-1">{errors.country.message}</p>}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full py-4 mt-4 bg-[var(--aehi-lime)] text-[#050505] font-medium text-sm rounded-lg hover:bg-opacity-90 transition-all shadow-[0_0_15px_rgba(0,201,133,0.2)] disabled:opacity-50"
        >
          {isSubmitting ? 'Processing...' : 'Download PDF Report'}
        </button>
        <p className="text-center text-[11px] text-[var(--aehi-dim)] mt-4">
          By downloading, you agree to receive occasional updates about the AEHI.
        </p>
      </form>
    </div>
  );
}
