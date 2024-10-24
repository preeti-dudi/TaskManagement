
import * as Icons from '@ant-design/icons';

// TaskTypes.ts
export interface Task {
  id: string | null; // Use null for new tasks before being assigned an ID
  title: string;
  color: { lightTheme: string, darkTheme: string };
  icon: { name: keyof typeof Icons, color: string } | null; // Use string to represent the icon name or FontAwesomeIcon if you want to keep it typed
  scheduledDate: string | null;
  specificTime: string | string[] | boolean | null;
  isRepeat: boolean;
  repeatFrequency: 'everyday' | 'yearly' | 'weekly' | 'monthly'; // You can extend this as needed
  repeatEndDate: string;
  reminder: boolean;
  tag: string;
  subtasks: string[];
  selectedWeekdays: string[];
  selectedDaysOfMonth: number[];
  selectedYears: number[];
}
