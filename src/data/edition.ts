/**
 * AEHI status. The inaugural edition is in preparation: there are no published scores yet.
 * Do not add figures to the site until an edition has actually been published from real data.
 */
export const EDITION = {
  label: 'Q4 2026',
  status: 'in-preparation' as const,
  statusLabel: 'Inaugural edition in preparation',
  diagnosticUrl: 'https://crelligent.com/diagnostic',
}

export const LAYERS = [
  {
    code: 'L1',
    name: 'Business Design',
    measures: 'The commercial logic: revenue model, positioning and unit economics.',
  },
  {
    code: 'L2',
    name: 'Operating Model',
    measures: 'How work gets done: processes, roles, decision rights and handovers.',
  },
  {
    code: 'L3',
    name: 'Technology',
    measures: 'The systems the business runs on, and whether they connect.',
  },
  {
    code: 'L4',
    name: 'Data & Intelligence',
    measures: 'How the business senses what is happening and decides on it.',
  },
  {
    code: 'L5',
    name: 'Governance',
    measures: 'Controls, risk and accountability: who can approve what, and how exceptions are handled.',
  },
] as const

/** Patterns from Crelligent's diagnostic work that the inaugural edition will test. Hypotheses, not findings. */
export const HYPOTHESES = [
  {
    title: 'The founder as scheduler',
    body: 'In many growing companies core processes are undocumented, so the founder or CEO still routes day-to-day work. We expect the Operating Model (L2) to be the most common constraint.',
  },
  {
    title: 'Systems that do not talk',
    body: 'Companies invest in technology (L3) but score lower on data and intelligence (L4): the ERP is in place, but nobody gets a real-time view of operations.',
  },
  {
    title: 'Governance by escalation',
    body: 'Exceptions are solved by going to the top rather than through clear authority matrices and controls (L5).',
  },
] as const
