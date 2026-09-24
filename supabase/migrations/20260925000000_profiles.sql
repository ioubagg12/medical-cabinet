-- One row per user, created automatically at sign-up.
-- Row level security: a signed-in user can read and change only their own row.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  -- Profile tab contact details: { personal: {address, phone, email}, emergency: {name, relation, phone} }
  contact jsonb not null default '{}'::jsonb check (octet_length(contact::text) <= 4000),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

create policy "Users can update their own profile"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- No insert or delete policy: rows are created by the trigger below and
-- removed when the auth user is deleted (on delete cascade).

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
