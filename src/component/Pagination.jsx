import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  margin: 1rem auto;
`;

const PaginationButton = styled(Button)`
  && {
    background-color: #004c99;
    color: white;
  }
`;

export default function Pagination(props) {
  return (
    <PaginationContainer>
      <PaginationButton onClick={props.onClickPrev}>Prev</PaginationButton>
      <p>
        {props.currentPage} / {props.totalPages}
      </p>
      <PaginationButton onClick={props.onClickNext}>Next</PaginationButton>
    </PaginationContainer>
  );
}
