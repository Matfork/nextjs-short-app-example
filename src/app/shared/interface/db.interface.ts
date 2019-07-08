interface DbPossibleValues {
  id: number;
  value: string;
  description: string;
  isDefault: boolean;
}

export interface DbMenu {
  value: number;
  label: string;
}

export interface DbDescription {
  id: number;
  keyName: string;
  description: string;
  type: number;
  isPersonalData: boolean;
  possibleValues: DbPossibleValues[];
}

export interface DbRequest {
  id: number;
  date: string;
  reason: string;
  status: string;
}
