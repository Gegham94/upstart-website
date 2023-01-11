export interface Stats {
  in_basket: StatsData[];
  in_wish_list: StatsData[];
}

export interface StatsData {
  id: number;
  title: string;
  students: StudentStats[];
  trainer: string;
}

export interface StudentStats {
  avatar: string;
  name: string;
  letters?: string;
}
