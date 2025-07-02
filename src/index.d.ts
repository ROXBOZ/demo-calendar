// Refined time string types
type ValidHour = `0${number}` | `1${number}` | `2${0 | 1 | 2 | 3}`;
type ValidMinute =
  | `0${number}`
  | `1${number}`
  | `2${number}`
  | `3${number}`
  | `4${number}`
  | `5${number}`;

type TimeString = `${ValidHour}:${ValidMinute}`;
type WeekDay = 1 | 2 | 3 | 4 | 5;

interface Course {
  title: string;
  weekDay: WeekDay;
  level?: 1 | 2 | 3; // Narrow down the level range
  startTime?: TimeString;
  duration: 60 | 90 | 120;
  minAge: number;
  room: number;
  openToAll: boolean;
  trainers?: string[];
}

interface FiltersProps {
  levelFilter: string;
  setLevelFilter: React.Dispatch<React.SetStateAction<string>>;
  titleFilter: string;
  setTitleFilter: React.Dispatch<React.SetStateAction<string>>;
  trainerFilter: string;
  setTrainerFilter: React.Dispatch<React.SetStateAction<string>>;
  ageGroup: "youngs" | "adults" | "";
  setAgeGroup: React.Dispatch<React.SetStateAction<"youngs" | "adults" | "">>;
  openToAllOnly: boolean;
  setOpenToAllOnly: React.Dispatch<React.SetStateAction<boolean>>;
  titles: string[];
  trainers: string[];
  resetFilters: (
    filterType: "level" | "title" | "trainer" | "ageGroup" | "openToAll"
  ) => void;
}
