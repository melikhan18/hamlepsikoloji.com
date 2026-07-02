create table faq_groups (
    id         bigserial primary key,
    slug       varchar(255) not null unique,
    title      varchar(255) not null,
    items      jsonb not null default '[]',
    sort_order int default 0,
    created_at timestamptz,
    updated_at timestamptz
);

create index idx_faq_groups_sort on faq_groups (sort_order, id);
