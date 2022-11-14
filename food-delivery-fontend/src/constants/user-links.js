import { CONSTANT_ROUTE } from "./route.constants";
import { ROLE } from "./roles";
import {
  MdFoodBank,
  MdHome,
  MdFavorite,
  MdHistory,
  MdPerson,
} from "react-icons/md";

const UserLinks = [
  {
    name: "Dashboard",
    icon: <MdHome />,
    role: ROLE.USER,
    path: CONSTANT_ROUTE.HOME_PAGE,
  },
  {
    name: "My Profile",
    icon: <MdPerson />,
    role: ROLE.USER,
    path: CONSTANT_ROUTE.My_PROFILE,
  },
  {
    name: "Food",
    icon: <MdFoodBank />,
    role: ROLE.USER,
    path: CONSTANT_ROUTE.FOOD_LIST,
  },
  {
    name: "Favorite",
    icon: <MdFavorite />,
    role: ROLE.USER,
    path: CONSTANT_ROUTE.FAVORITE,
  },
  {
    name: "Order History",
    icon: <MdHistory />,
    role: ROLE.USER,
    path: CONSTANT_ROUTE.ORDER_HISTORY,
  },
];

export default UserLinks;
