import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListCategory } from "../../features/manage/category/ListCategory";
import { getCategories } from "../../redux/categorySlice";

const ListCategoryPage = () => {
  const dispatch = useDispatch();
  const isRefresh = useSelector((state) => state.category.isRefresh);

  React.useEffect(() => {
    dispatch(getCategories());
  }, [isRefresh]);

  const categories = useSelector((state) => state.category.data);

  return (
    <>
      <ListCategory categories={categories} />
    </>
  );
};

export default ListCategoryPage;
