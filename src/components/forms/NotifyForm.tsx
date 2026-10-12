'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  name: z.string().trim().min(2, { message: 'Your name is required' }),
  email: z.string().trim().email({ message: 'Enter a valid work email' }),
  organisation: z.string().trim().min(2, { message: 'Organisation is required' }),
  role: z.string().trim().optional(),
  country: z.string().trim().optional(),
  consent: z.literal(true, { message: 'Please agree so we can email you' }),
  website: z.string().optional(),
});

type FormData = z.input<typeof schema>;

const input =
  'w-full bg-[#050B14] border border-[var(--aehi-border)] rounded-lg px-4 py-3 text-white text-sm focus:border-[var(--aehi-lime)] outline-none';
const label = 'block text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-2';

export function NotifyForm({ editionLabel }: { editionLabel: string }) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { country: 'Nigeria' },
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.status === 429) throw new Error('Too many attempts from this connection. Please try again later.');
      if (!res.ok) throw new Error('We could not save your details. Please try again, or email aehi@crelligent.com.');
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    }
  };

  if (done) {
    return (
      <div className="bg-[var(--aehi-surface)] border border-[var(--aehi-lime)]/30 p-10 rounded-2xl text-center" role="status">
        <div className="w-16 h-16 bg-[var(--aehi-lime)]/10 text-[var(--aehi-lime)] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl" aria-hidden="true">✓</div>
        <h3 className="text-2xl font-head font-medium text-white mb-2">You&apos;re on the list</h3>
        <p className="text-[var(--aehi-muted)] max-w-md mx-auto">
          We&apos;ll email you when the {editionLabel} edition publishes. Want your own score now?{' '}
          <a href="https://crelligent.com/diagnostic" className="text-[var(--aehi-lime)] underline underline-offset-4">Take the diagnostic</a>.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--aehi-surface)] border border-[var(--aehi-border)] p-8 md:p-10 rounded-2xl">
      <h3 className="text-2xl font-head font-medium text-white mb-2">Get the report when it publishes</h3>
      <p className="text-[var(--aehi-muted)] mb-8 text-sm">Free. One email when the {editionLabel} edition is out, nothing else.</p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div className="hidden" aria-hidden="true">
          <label>Leave empty<input tabIndex={-1} autoComplete="off" {...register('website')} /></label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="n-name" className={label}>Name</label>
            <input id="n-name" autoComplete="name" {...register('name')} className={input} aria-invalid={!!errors.name} />
            {errors.name && <p className="mt-1.5 text-xs text-[var(--aehi-red)]">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="n-email" className={label}>Work email</label>
            <input id="n-email" type="email" autoComplete="email" {...register('email')} className={input} aria-invalid={!!errors.email} />
            {errors.email && <p className="mt-1.5 text-xs text-[var(--aehi-red)]">{errors.email.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="n-org" className={label}>Organisation</label>
            <input id="n-org" autoComplete="organization" {...register('organisation')} className={input} aria-invalid={!!errors.organisation} />
            {errors.organisation && <p className="mt-1.5 text-xs text-[var(--aehi-red)]">{errors.organisation.message}</p>}
          </div>
          <div>
            <label htmlFor="n-role" className={label}>Role (optional)</label>
            <input id="n-role" autoComplete="organization-title" {...register('role')} className={input} />
          </div>
        </div>
        <div>
          <label htmlFor="n-country" className={label}>Country</label>
          <input id="n-country" autoComplete="country-name" {...register('country')} className={input} />
        </div>
        <label className="flex items-start gap-3 text-sm text-[var(--aehi-muted)]">
          <input type="checkbox" {...register('consent')} className="mt-1 size-4 accent-[var(--aehi-lime)]" />
          <span>Crelligent may email me about the AEHI. I can unsubscribe at any time.</span>
        </label>
        {errors.consent && <p className="text-xs text-[var(--aehi-red)]">{errors.consent.message}</p>}
        {error && <p role="alert" className="text-sm text-[var(--aehi-red)]">{error}</p>}
        <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-[var(--aehi-lime)] text-[#050505] font-medium text-sm rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50">
          {isSubmitting ? 'Saving…' : 'Notify me'}
        </button>
      </form>
    </div>
  );
}
