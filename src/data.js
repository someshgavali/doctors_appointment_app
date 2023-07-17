import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MasksIcon from "@mui/icons-material/Masks";
import HealingIcon from "@mui/icons-material/Healing";
import TuneIcon from "@mui/icons-material/Tune";
import InfoIcon from "@mui/icons-material/Info";
const sideBarData = [
  {
    name: "Dashboard",
    icon: <DashboardCustomizeIcon color="gray" />,
    routeTo: "/",
  },
  {
    name: "Schedule",
    icon: <EventAvailableIcon color="gray" />,
    routeTo: "/schedule",
  },
  {
    name: "Doctors",
    icon: <MasksIcon color="gray" />,
    routeTo: "/doctors",
  },
  {
    name: "Patients",
    icon: <HealingIcon color="gray" />,
    routeTo: "/patients",
  },
  {
    name: "Preference",
    icon: <TuneIcon color="gray" />,
    routeTo: "/preference",
  },
  { name: "About", icon: <InfoIcon color="gray" />, routeTo: "/about" },
];
export default sideBarData;
