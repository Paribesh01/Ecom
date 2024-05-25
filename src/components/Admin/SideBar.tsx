import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { PresentationChartBarIcon, PowerIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

export function SideBar() {
  const navigate = useNavigate();
  const { logoutUser } = useUser();
  const handelLogOut = () => {
    logoutUser();
    navigate("/");
  };
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to={"/admin/dashboard"}>Dashboard</Link>
        </ListItem>

        <ListItem onClick={handelLogOut}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
