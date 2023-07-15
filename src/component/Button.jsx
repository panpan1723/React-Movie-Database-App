import styled from "styled-components";
import { Button } from "@material-ui/core";

const SubmitButton = styled(Button)`
  && {
    background-color: #004c99; /* 修改按钮背景颜色 */
    color: white; /* 修改按钮文本颜色 */
  }
`;

export default SubmitButton;

// export default styled.button`
//   padding: 8px;
//   background-color: #01b4e4;
//   border: 1px solid white;
//   color: white;
//   &:hover {
//     background-color: white;
//     color: #01b4e4;
//     border: 1px solid #01b4e4;
//   }
// `;
