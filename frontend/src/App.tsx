import { ThemeProvider } from "./contexts/ThemeContext";
import { AppRoutes } from "./utils/routes/AppRoutes";




function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>

  );
}

export default App;
