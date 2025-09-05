import { NativeModules } from "react-native";

interface CalendarReminderModuleInterface {
  addProductReminder(
    productName: string,
    productDescription: string,
    reminderDate: string,
    productUrl?: string
  ): Promise<boolean>;

  requestCalendarPermission(): Promise<boolean>;
}

const { CalendarReminderModule } = NativeModules;

export default CalendarReminderModule as CalendarReminderModuleInterface;
