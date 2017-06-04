DROP TABLE IF EXISTS events;

CREATE TABLE events (
  site_id           varchar,
  event_name        varchar,
  event_date        varchar,
  event_start_time  varchar,
  event_end_time    varchar,
  location_address  varchar,
  location_city     varchar,
  location_state    varchar,
  location_zipcode  varchar,
  details           varchar
);