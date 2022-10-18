import React from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";

import {
  MdOutlineDriveFileRenameOutline,
  MdRestoreFromTrash,
  MdAddCircle,
} from "react-icons/md";

const Wrapper = styled.div`
  margin: 30px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 5px 8px 0px #ccc;
  // width: 100%;
`;

const Title = styled.h2`
  padding: 10px 0px 0px 20px;
`;

const StyledDataTable = styled(DataTable)`
  // border: 1px solid #000;
  margin: 0px;
  width: 100%;
`;

const Label = styled.label``;

const IconContainer = styled.div`
  display: inline-block;
  margin-right: 10px;
  font-size: 15px;
`;

const ActionWrapper = styled.div`
  padding: 5px 20px;
  // width: 50%;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  border-radius: 50px;
  box-shadow: 0px 4px 6px -4px rgba(58, 53, 65, 0.1),
    0px 6px 10px -4px rgba(58, 53, 65, 0.08),
    0px 4px 8px -4px rgba(58, 53, 65, 0.16);
  &:hover {
    background: linear-gradient(270deg, #9155fd 0%, #c6a7fe 100%);
    color: #fff;
  }
`;

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0px 4px 6px -4px rgba(58, 53, 65, 0.1),
    0px 6px 10px -4px rgba(58, 53, 65, 0.08),
    0px 4px 8px -4px rgba(58, 53, 65, 0.16);

  &:hover {
    background: linear-gradient(270deg, #9155fd 0%, #c6a7fe 100%);
    color: #fff;
  }
`;

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #ccc;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const SubHeaderComponent = styled.div`
  display: flex;
  flex-direction: row;
  // justify-items: space-between;
  justify-content: space-between;
  width: 100%;
`;

const Filter = styled.div`
  // width: 100%;
`;

const AddButton = styled.div`
  display: flex;
  flex-direction: row;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <SubHeaderComponent>
    <Filter>
      <TextField
        id="search"
        type="text"
        placeholder="Search User"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />
      <ClearButton type="button" onClick={onClear}>
        X
      </ClearButton>
    </Filter>
    <ActionWrapper>
      <IconContainer>
        <MdAddCircle />
      </IconContainer>
      <Label>Add New User</Label>
    </ActionWrapper>
  </SubHeaderComponent>
);

export const ListUser = ({ users }) => {
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const filteredItems = users.filter(
    (item) =>
      item.username &&
      item.username.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const columns = [
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <>
          <ActionWrapper>
            <IconContainer>
              <MdOutlineDriveFileRenameOutline />
            </IconContainer>
            <Label>Edit</Label>
          </ActionWrapper>
          <ActionWrapper>
            <IconContainer>
              <MdRestoreFromTrash />
            </IconContainer>
            <Label>Delete</Label>
          </ActionWrapper>
        </>
      ),
      width: "230px",
    },
  ];

  const data = filteredItems;
  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
  return (
    <>
      <Wrapper>
        <Title>User List</Title>
        <StyledDataTable
          columns={columns}
          data={data}
          selectableRows
          selectableRowsHighlight
          pagination
          fixedHeaderScrollHeight={"500px"}
          fixedHeader
          striped
          highlightOnHover
          pointerOnHover
          expandableRowsComponent={ExpandedComponent}
          subHeader
          subHeaderAlign={"left"}
          subHeaderComponent={subHeaderComponentMemo}
        />
      </Wrapper>
    </>
  );
};
