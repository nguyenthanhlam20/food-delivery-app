import React from "react";
import { ROLE } from "../../constants";

import { useSelector } from "react-redux";

export const Header = () => {
    const user = useSelector((state) => state.authen.user);

    if(user.role === ROLE.ADMIN)


}