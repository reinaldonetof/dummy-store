import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Routes from "./src/routes";
import { linking } from "./src/routes/linking";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        <Routes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
