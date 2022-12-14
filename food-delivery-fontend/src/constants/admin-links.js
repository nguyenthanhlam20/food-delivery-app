import { CONSTANT_ROUTE } from "./route.constants";
import { ROLE } from "./roles";
import {
  MdFastfood,
  MdRestaurant,
  MdHome,
  MdPeopleAlt,
  MdCategory,
} from "react-icons/md";

const AdminLinks = [
  {
    name: "Dashboard",
    icon: <MdHome />,
    role: ROLE.EVERYONE,
    path: CONSTANT_ROUTE.HOME_PAGE,
  },
  {
    name: "User",
    icon: <MdPeopleAlt />,
    role: ROLE.ADMIN,
    path: CONSTANT_ROUTE.MANAGE_USER,
  },

  {
    name: "Order",
    icon: <MdRestaurant />,
    role: ROLE.ADMIN,
    path: CONSTANT_ROUTE.MANAGE_ORDER,
  },
  {
    name: "Food",
    icon: <MdFastfood />,
    role: ROLE.ADMIN,
    path: CONSTANT_ROUTE.MANAGE_FOOD,
  },
  {
    name: "Category",
    icon: <MdCategory />,
    role: ROLE.ADMIN,
    path: CONSTANT_ROUTE.MANAGE_CATEGORY,
  },

  {
    name: "Restaurant",
    icon: <MdRestaurant />,
    role: ROLE.ADMIN,
    path: CONSTANT_ROUTE.MANAGE_RESTAURANT,
  },
];

export default AdminLinks;
