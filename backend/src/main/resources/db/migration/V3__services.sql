create table services (
    id          bigserial primary key,
    slug        varchar(255) not null unique,
    title       varchar(500) not null,
    short_title varchar(255),
    tagline     text,
    summary     text,
    pitch       text,
    icon        varchar(50),
    illo        varchar(50),
    for_who     jsonb not null default '[]',
    process     jsonb not null default '[]',
    faqs        jsonb not null default '[]',
    sort_order  int default 0,
    created_at  timestamptz,
    updated_at  timestamptz
);

create index idx_services_sort on services (sort_order, id);
