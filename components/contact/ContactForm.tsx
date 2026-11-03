'use client';

import { CircleAlert, CircleCheck, LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef, useState, type FocusEvent, type FormEvent } from 'react';
import { cn } from '@/lib/cn';

const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? '';
const EMAIL_TO = 'global@fc-om.com';

type Field = 'name' | 'company' | 'email' | 'phone' | 'projectType' | 'country' | 'message';
type Errors = Partial<Record<Field, string>>;
const REQUIRED: Field[] = ['name', 'email', 'projectType', 'message'];
const PROJECT_TYPES = ['roads', 'dams', 'buildings', 'networks', 'power', 'services', 'other'] as const;

export function ContactForm() {
  const t = useTranslations('contact.form');
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'mailto' | 'error'>('idle');
  const [sentTo, setSentTo] = useState('');

  const validate = (name: Field, raw: string): string | undefined => {
    const v = raw.trim();
    if (REQUIRED.includes(name) && !v) return t('errors.required');
    if (name === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return t('errors.email');
    if (name === 'phone' && v && !/^\+?[\d\s\-()]{6,20}$/.test(v)) return t('errors.phone');
    if (name === 'message' && v && v.length < 20) return t('errors.min');
    return undefined;
  };

  const onBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = e.target.name as Field;
    setErrors((prev) => ({ ...prev, [name]: validate(name, e.target.value) }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Errors = {};
    (['name', 'company', 'email', 'phone', 'projectType', 'country', 'message'] as Field[]).forEach((f) => {
      const err = validate(f, String(data.get(f) ?? ''));
      if (err) next[f] = err;
    });
    setErrors(next);
    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const payload = Object.fromEntries(data.entries()) as Record<Field, string>;
    const typeLabel = payload.projectType ? t(`types.${payload.projectType as (typeof PROJECT_TYPES)[number]}`) : '';
    setStatus('sending');

    if (!ENDPOINT) {
      const subject = `Project enquiry: ${typeLabel} (${payload.name})`;
      const body = [
        `Name: ${payload.name}`,
        `Company: ${payload.company}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone}`,
        `Project type: ${typeLabel}`,
        `Country: ${payload.country}`,
        '',
        payload.message,
      ].join('\n');
      window.location.href = `mailto:${EMAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, projectType: typeLabel, _subject: `Project enquiry: ${typeLabel}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSentTo(payload.email);
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  const field = (name: Field) => ({
    id: `f-${name}`,
    name,
    onBlur,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `f-${name}-err` : undefined,
    required: REQUIRED.includes(name),
    className: cn(
      'mt-2 block min-h-12 w-full border bg-white px-4 py-3 text-ink transition-colors placeholder:text-steel/70 focus:border-brand focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-0 focus-visible:outline-brand',
      errors[name] ? 'border-[#B42318]' : 'border-[#8A949C]',
    ),
  });

  const label = (name: Field, text: string) => (
    <label htmlFor={`f-${name}`} className="block font-semibold text-ink">
      {text}
      {REQUIRED.includes(name) ? (
        <span aria-hidden="true" className="ms-1 text-brand-deep">
          *
        </span>
      ) : (
        <span className="ms-2 text-sm font-normal text-steel">({t('optional')})</span>
      )}
    </label>
  );

  const error = (name: Field) =>
    errors[name] ? (
      <p id={`f-${name}-err`} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-[#B42318]">
        <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
        {errors[name]}
      </p>
    ) : null;

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2">
      <div>
        {label('name', t('name'))}
        <input type="text" autoComplete="name" {...field('name')} />
        {error('name')}
      </div>
      <div>
        {label('company', t('company'))}
        <input type="text" autoComplete="organization" {...field('company')} />
        {error('company')}
      </div>
      <div>
        {label('email', t('email'))}
        <input type="email" autoComplete="email" inputMode="email" dir="ltr" {...field('email')} />
        {error('email')}
      </div>
      <div>
        {label('phone', t('phone'))}
        <input type="tel" autoComplete="tel" inputMode="tel" dir="ltr" {...field('phone')} />
        {error('phone')}
      </div>
      <div>
        {label('projectType', t('projectType'))}
        <select defaultValue="" {...field('projectType')}>
          <option value="" disabled>
            {t('select')}
          </option>
          {PROJECT_TYPES.map((p) => (
            <option key={p} value={p}>
              {t(`types.${p}`)}
            </option>
          ))}
        </select>
        {error('projectType')}
      </div>
      <div>
        {label('country', t('country'))}
        <input type="text" autoComplete="country-name" {...field('country')} />
        {error('country')}
      </div>
      <div className="md:col-span-2">
        {label('message', t('message'))}
        <textarea rows={6} {...field('message')} className={cn(field('message').className, 'min-h-40')} />
        {error('message')}
      </div>

      <div className="flex flex-col gap-4 md:col-span-2">
        <p className="text-sm">{t('privacy')}</p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-brand px-8 font-display text-lg font-bold tracking-wide text-white uppercase transition-colors hover:bg-brand-deep disabled:cursor-wait disabled:opacity-80 sm:w-auto sm:self-start rtl:normal-case"
        >
          {status === 'sending' ? <LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> : null}
          {status === 'sending' ? t('sending') : t('submit')}
        </button>
        <div aria-live="polite" role="status">
          {status === 'success' || status === 'mailto' ? (
            <p className="flex items-start gap-2 border-s-4 border-brand bg-concrete p-4 text-ink">
              <CircleCheck className="mt-0.5 size-5 shrink-0 text-brand-deep" aria-hidden="true" />
              {status === 'success' ? t('success', { email: sentTo }) : t('successMailto')}
            </p>
          ) : null}
          {status === 'error' ? (
            <p className="flex items-start gap-2 border-s-4 border-[#B42318] bg-[#FEF3F2] p-4 text-[#7A271A]">
              <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              {t('error')}
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
}
