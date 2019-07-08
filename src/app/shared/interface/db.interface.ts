interface DbMenu {
  value: number;
  label: string;
}

interface DbDescription {
  id: number;
  keyName: string;
  description: string;
  type: number;
  isPersonalData: boolean;
  possibleValues: DbPossibleValues[];
}

interface DbPossibleValues {
  id: number;
  value: string;
  description: string;
  isDefault: boolean;
}

interface DbRequest {
  id: number;
  date: string;
  reason: string;
  status: string;
}
