import * as React from "react";
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import Email  from "@mui/icons-material/Email";

const DrawerData = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    title: "About Me",
    path: "/AboutMe",
    icon: <InfoIcon />,
  },
  {
    title: "Contact Me",
    path: "/ContactMe",
    icon: <Email />,
  },
]

export default DrawerData;
