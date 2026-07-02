create table experts (
    id            bigserial primary key,
    slug          varchar(255) not null unique,
    name          varchar(255) not null,
    title         varchar(255),
    credentials   text,
    photo         text,
    approach      text,
    specialties   jsonb not null default '[]',
    methods       jsonb not null default '[]',
    service_slugs jsonb not null default '[]',
    education     jsonb not null default '[]',
    bio           jsonb not null default '[]',
    sort_order    int default 0,
    created_at    timestamptz,
    updated_at    timestamptz
);

create index idx_experts_sort on experts (sort_order, id);
