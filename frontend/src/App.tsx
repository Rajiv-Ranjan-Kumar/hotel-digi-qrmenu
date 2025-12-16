import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppRoutes } from "./utils/routes/AppRoutes";
import { Suspense } from "react";





function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading Website...</div>}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
