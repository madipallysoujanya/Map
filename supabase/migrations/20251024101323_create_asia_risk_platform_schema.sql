/*
  # Asia Risk Platform Database Schema

  1. New Tables
    - `countries`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `code` (text, unique)
      - `created_at` (timestamp)
    
    - `regions`
      - `id` (uuid, primary key)
      - `country_id` (uuid, foreign key to countries)
      - `name` (text)
      - `created_at` (timestamp)
    
    - `states`
      - `id` (uuid, primary key)
      - `region_id` (uuid, foreign key to regions)
      - `name` (text)
      - `created_at` (timestamp)
    
    - `risk_types`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
    
    - `risk_data`
      - `id` (uuid, primary key)
      - `location` (text)
      - `risk_type_id` (uuid, foreign key to risk_types)
      - `impacted_exposure` (numeric)
      - `death_toll` (integer)
      - `year` (integer)
      - `created_at` (timestamp)
    
    - `demographic_data`
      - `id` (uuid, primary key)
      - `location` (text)
      - `age_group` (text)
      - `percentage` (numeric)
      - `population` (numeric)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (this is a public dashboard)
*/

-- Create countries table
CREATE TABLE IF NOT EXISTS countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  code text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create regions table
CREATE TABLE IF NOT EXISTS regions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id uuid REFERENCES countries(id) NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create states table
CREATE TABLE IF NOT EXISTS states (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  region_id uuid REFERENCES regions(id) NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create risk_types table
CREATE TABLE IF NOT EXISTS risk_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create risk_data table
CREATE TABLE IF NOT EXISTS risk_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location text NOT NULL,
  risk_type_id uuid REFERENCES risk_types(id) NOT NULL,
  impacted_exposure numeric DEFAULT 0,
  death_toll integer DEFAULT 0,
  year integer DEFAULT 2025,
  created_at timestamptz DEFAULT now()
);

-- Create demographic_data table
CREATE TABLE IF NOT EXISTS demographic_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location text NOT NULL,
  age_group text NOT NULL,
  percentage numeric DEFAULT 0,
  population numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE states ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE demographic_data ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view countries"
  ON countries FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view regions"
  ON regions FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view states"
  ON states FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view risk_types"
  ON risk_types FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view risk_data"
  ON risk_data FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view demographic_data"
  ON demographic_data FOR SELECT
  TO anon
  USING (true);