import { CONSTANT_ROUTE } from "./route.constants";
import { ROLE } from "./roles";
import {
  MdFastfood,
  MdFoodBank,
  MdHome,
  MdFavorite,
  MdHistory,
  MdBookmarkAdd,
} from "react-icons/md";

const UserLinks = [
  {
    name: "Dashboard",
    icon: <MdHome />,
    role: ROLE.USER,
    path: CONSTANT_ROUTE.HOME_PAGE,
  },
  {
    name: "Food Order",
    icon: <MdFoodBank />,
    role: ROLE.USER,
    path: CONSTANT_ROUTE.FOOD_ORDER,
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
  {
    name: "Bills",
    icon: <MdBookmarkAdd />,
    role: ROLE.USER,
    path: CONSTANT_ROUTE.BILLS,
  },
];

export default UserLinks;
