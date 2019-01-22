DROP TABLE IF EXISTS sites;

CREATE TABLE sites (
  site_id               serial,
  site_url              varchar,
  name                  varchar,
  email                 varchar,
  password              varchar,
  org_name              varchar,
  org_address           varchar,
  org_city              varchar,
  org_state             varchar,
  org_zipcode           integer,
  org_phone             varchar,
  site_color_primary    varchar,
  site_color_secondary  varchar,
  site_photo            varchar,
  site_background_photo varchar
);
