-- Create table
create table public.knitter_reviews (
  id bigint generated by default as identity not null,
  knitter_id character varying not null,
  body text not null,
  created_by character varying not null,
  approved boolean not null default false,
  created_at timestamp with time zone not null default now(),
  constraint knitter_reviews_pkey primary key (id)
) TABLESPACE pg_default;

-- Enable row-level security on the table
ALTER TABLE public.knitter_reviews ENABLE ROW LEVEL SECURITY;

-- Create a policy for inserting rows
create policy "Enable insert for authenticated users only"
on "public"."knitter_reviews"
to public
with check (
  ((approved = false)
  AND ((body IS NOT NULL)
  AND (body <> ''::text))
  AND ((knitter_id IS NOT NULL)
  AND ((knitter_id)::text <> ''::text))
  AND ((created_by IS NOT NULL)
  AND ((created_by)::text <> ''::text)))
  );

-- Create a policy for reading rows
create policy "Enable read access for all users"
on "public"."knitter_reviews"
to public
using (
    (approved = true)
);