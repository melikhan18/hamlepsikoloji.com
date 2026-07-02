create table leads (
    id         bigserial primary key,
    name       varchar(255) not null,
    phone      varchar(50) not null,
    email      varchar(255),
    service    varchar(255),
    message    text,
    status     varchar(20) not null default 'new',
    note       text,
    source     varchar(30) default 'form',
    created_at timestamptz
);

create index idx_leads_created on leads (created_at desc);
create index idx_leads_status on leads (status);
