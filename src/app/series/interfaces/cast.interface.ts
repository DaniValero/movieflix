export interface Cast {
  cast: CastElement[];
  crew: CastElement[];
  id:   number;
}

export interface CastElement {
  adult:                boolean;
  gender:               number;
  id:                   number;
  known_for_department: string;
  name:                 string;
  original_name:        string;
  popularity:           number;
  profile_path:         null | string;
  character?:           string;
  credit_id:            string;
  order?:               number;
  department?:          string;
  job?:                 string;
}
