import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Country {
  id: string;
  name: string;
  code: string;
}

export interface Region {
  id: string;
  country_id: string;
  name: string;
}

export interface State {
  id: string;
  region_id: string;
  name: string;
}

export interface RiskType {
  id: string;
  name: string;
}

export interface RiskData {
  id: string;
  location: string;
  risk_type_id: string;
  impacted_exposure: number;
  death_toll: number;
  year: number;
}

export interface DemographicData {
  id: string;
  location: string;
  age_group: string;
  percentage: number;
  population: number;
}
