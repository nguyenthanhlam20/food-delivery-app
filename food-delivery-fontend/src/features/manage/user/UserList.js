import React from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";

const Wrapper = styled.div`
  margin: 30px;
  border-radius: 5px;
  box-shadow: 0px 5px 8px 0px #ccc;
`;

const Button = styled.button`
  padding: 5px 20px;
  width: 50%;
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

export const UserList = ({ users }) => {
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
          <Button
            className="btn btn-outline btn-xs"
            // onClick={(e) => handleButtonClick(e, row.id)}
          >
            Edit
          </Button>
          <Button
            className="btn btn-outline btn-xs"
            // onClick={(e) => handleButtonClick(e, row.id)}
          >
            Delete
          </Button>
        </>
      ),
      width: "200px",
    },
  ];

  const data = users;
  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
  return (
    <>
      <Wrapper>
        <DataTable
          columns={columns}
          data={data}
          selectableRows
          selectableRowsHighlight
          pagination
          // dense
          subHeader
          fixedHeader
          striped
          highlightOnHover
          pointerOnHover
          expandableRowsComponent={ExpandedComponent}
        />
      </Wrapper>
    </>
  );
};
