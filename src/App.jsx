import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { DataContext } from "./dataContext";
import { useState } from "react";
import {
  hospitalData,
  doctorsData,
  patientsData,
  activityData,
} from "./DataSource";
import ResponsiveDrawer from "./components/SideNav";
function App() {
  const [events, setEvents] = useState(hospitalData);
  const [currentDoctorsData, setCurrentDoctorData] = useState(doctorsData);
  const [patientsInfo, setPatientsInfo] = useState(patientsData);
  const [preferences, setPreferences] = useState({
    view: "Weekly",
    slot: "30 mins",
    weekStart: "Sunday",
    dayStart: "8:00 AM",
    dayEnd: "4:00 PM",
  });
  const [recentActivities, setRecentActivities] = useState(activityData);
  return (
    <>
      <BrowserRouter>
        <DataContext.Provider
          value={{
            events,
            setEvents,
            currentDoctorsData,
            setCurrentDoctorData,
            patientsInfo,
            setPatientsInfo,
            preferences,
            setPreferences,
            recentActivities,
            setRecentActivities,
          }}>
          <ResponsiveDrawer />
        </DataContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
