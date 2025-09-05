import { useState, useCallback } from "react";
import { Platform, Alert } from "react-native";
import CalendarReminderModule from "../src/CalendarReminderModule";

export interface ProductReminderData {
  name: string;
  description: string;
  reminderDate: string;
  url?: string;
}

export interface UseCalendarReminderReturn {
  isLoading: boolean;
  hasPermission: boolean | null;
  requestPermission: () => Promise<boolean>;
  addReminder: (data: ProductReminderData) => Promise<boolean>;
  isSupported: boolean;
}

export const useCalendarReminder = (): UseCalendarReminderReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const isSupported = Platform.OS === "ios";

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) {
      Alert.alert(
        "Not Supported",
        "Calendar reminders are only supported on iOS."
      );
      return false;
    }

    try {
      setIsLoading(true);
      const granted = await CalendarReminderModule.requestCalendarPermission();
      setHasPermission(granted);

      if (!granted) {
        Alert.alert(
          "Permission Denied",
          "Calendar permission was denied. Please enable it in Settings to use this feature."
        );
      }

      return granted;
    } catch (error: any) {
      console.error("Error requesting calendar permission:", error);
      Alert.alert(
        "Error",
        error.message || "Failed to request calendar permission"
      );
      setHasPermission(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported]);

  const addReminder = useCallback(
    async (data: ProductReminderData): Promise<boolean> => {
      if (!isSupported) {
        Alert.alert(
          "Not Supported",
          "Calendar reminders are only supported on iOS."
        );
        return false;
      }

      if (!data.name.trim()) {
        Alert.alert("Error", "Product name is required");
        return false;
      }

      if (!data.reminderDate.trim()) {
        Alert.alert("Error", "Reminder date is required");
        return false;
      }

      try {
        setIsLoading(true);
        let isoDate = data.reminderDate;
        const success = await CalendarReminderModule.addProductReminder(
          data.name,
          data.description || "",
          isoDate,
          data.url
        );

        if (success) {
          Alert.alert(
            "Success",
            `Reminder created for "${data.name}"! Check your iOS Reminders app.`
          );
        }
        return success;
      } catch (error: any) {
        console.error("Error adding reminder:", error);
        let errorMessage = "Failed to create reminder";
        if (error.code === "PERMISSION_DENIED") {
          errorMessage =
            "Calendar permission not granted. Please grant permission first.";
          setHasPermission(false);
        } else if (error.code === "INVALID_DATE") {
          errorMessage = "Invalid date format. Please use a valid date.";
        } else if (error.message) {
          errorMessage = error.message;
        }

        Alert.alert("Error", errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [isSupported]
  );

  return {
    isLoading,
    hasPermission,
    requestPermission,
    addReminder,
    isSupported,
  };
};
