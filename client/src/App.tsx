import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import BattleDemo from "@/pages/BattleDemo";
import Onboarding from "@/pages/Onboarding";
import FirstUse from "@/pages/FirstUse";
import Tutorial from "@/pages/Tutorial";
import Dashboard from "@/pages/Dashboard";
import Changelog from "@/pages/Changelog";
import Settings from "@/pages/Settings";
import Pets from "@/pages/Pets";
import Care from "@/pages/Care";
import DemoHub from "@/pages/DemoHub";
import Teams from "@/pages/Teams";
import Bag from "@/pages/Bag";
import Breed from "@/pages/Breed";
import Shop from "@/pages/Shop";
import StatsMenu from "@/pages/StatsMenu";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/first-use" component={FirstUse} />
      <Route path="/tutorial" component={Tutorial} />
      <Route path="/home" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/battle-demo" component={BattleDemo} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/changelog" component={Changelog} />
      <Route path="/settings" component={Settings} />
      <Route path="/pets" component={Pets} />
      <Route path="/care" component={Care} />
      <Route path="/demo-hub" component={DemoHub} />
      <Route path="/teams" component={Teams} />
      <Route path="/bag" component={Bag} />
      <Route path="/breed" component={Breed} />
      <Route path="/shop" component={Shop} />
      <Route path="/stats" component={StatsMenu} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
