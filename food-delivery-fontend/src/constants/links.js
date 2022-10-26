import { CONSTANT_ROUTE } from "./route.constants";
import { ROLE } from "./contants";
import {
  MdFastfood,
  MdRestaurant,
  MdHome,
  MdPeopleAlt,
  MdCategory,
} from "react-icons/md";

const Links = [
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
    name: "Category",
    icon: <MdCategory />,
    role: ROLE.ADMIN,
    path: CONSTANT_ROUTE.MANAGE_CATEGORY,
  },
  {
    name: "Food",
    icon: <MdFastfood />,
    role: ROLE.ADMIN,
    path: CONSTANT_ROUTE.MANAGE_FOOD,
  },
  {
    name: "Restaurant",
    icon: <MdRestaurant />,
    role: ROLE.ADMIN,
    path: CONSTANT_ROUTE.MANAGE_RESTAURANT,
  },
];

export default Links;
