-- AEHI site submissions: "notify me" sign-ups and partner/institution enquiries.
-- Written only by the AEHI site's server routes using the service key. No public access.
create table if not exists public.aehi_interest (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  kind          text not null check (kind in ('edition_notify', 'partner_inquiry')),
  name          text not null check (char_length(name) between 1 and 160),
  email         text not null check (char_length(email) between 3 and 254),
  organisation  text check (organisation is null or char_length(organisation) <= 160),
  role          text check (role is null or char_length(role) <= 120),
  org_type      text check (org_type is null or char_length(org_type) <= 80),
  interest      text check (interest is null or char_length(interest) <= 80),
  message       text check (message is null or char_length(message) <= 1500),
  country       text check (country is null or char_length(country) <= 80),
  consent       boolean not null check (consent = true),
  status        text not null default 'new' check (status in ('new', 'contacted', 'closed', 'spam')),
  user_agent    text
);

create index if not exists aehi_interest_created_idx on public.aehi_interest (created_at desc);

alter table public.aehi_interest enable row level security;
revoke all on public.aehi_interest from anon, authenticated;
grant all on public.aehi_interest to service_role;
