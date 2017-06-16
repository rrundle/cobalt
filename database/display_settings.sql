DROP TABLE IF EXISTS display_settings;

CREATE TABLE display_settings (
  site_id               varchar,
  org_address           boolean,
  org_phone             boolean,
  site_color_primary    boolean,
  site_color_secondary  boolean,
  site_photo            boolean,
  site_background_photo boolean,
  news                  boolean,
  events                boolean
);
