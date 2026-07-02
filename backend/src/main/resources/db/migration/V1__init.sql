create table posts (
    id          bigserial primary key,
    slug        varchar(255) not null unique,
    title       varchar(500) not null,
    excerpt     text,
    post_date   date,
    category    varchar(255),
    icon        varchar(50),
    cover_url   text,
    author_slug varchar(255),
    content     jsonb not null default '[]',
    created_at  timestamptz,
    updated_at  timestamptz
);

create index idx_posts_date on posts (post_date desc);
create index idx_posts_category on posts (category);
