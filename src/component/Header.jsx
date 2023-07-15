import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { userLoginAction, userLogoutAction } from "../actions/userActions";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #004c99;
  /* box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16); */
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
  color: #ffffff;
  padding: 10px 50px;
`;

const TabsContainer = styled.ul`
  display: flex;
`;

const Tab = styled.li`
  list-style: none;
  margin-left: 3rem;
  font-size: 1.5rem;
  ${(props) =>
    props.active &&
    `
    &::after {
      content: "";
      width: 100%;
      height: 5px;
      display: block;
      background-color: #01b4e4;
    }
  `}
`;

const Dropdown = styled.div`
  position: absolute;
  display: ${(props) => (props.visible ? "block" : "none")};
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
`;

const StyledLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
`;

export default function Header() {
  const [user, setUser] = React.useState(null);
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUser(parsedUserData);
      dispatch(userLoginAction());
    }
  }, [location, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownVisible(false);
    dispatch(userLogoutAction());
  };

  return (
    <HeaderContainer>
      <Logo />
      <TabsContainer>
        <Tab>
          <StyledLink to="/">HOME</StyledLink>
        </Tab>
        <Tab>
          <StyledLink to="/favorite">FAVORITE</StyledLink>
        </Tab>
        <Tab>
          <StyledLink to="/rated">RATED</StyledLink>
        </Tab>
      </TabsContainer>
      <Tab onClick={() => user && setDropdownVisible(!dropdownVisible)}>
        <StyledLink to={user ? "#" : "/login"}>
          {user ? user.username : `Login`}
        </StyledLink>
        {user && (
          <Dropdown visible={dropdownVisible}>
            <button onClick={handleLogout}>Logout</button>
          </Dropdown>
        )}
      </Tab>
    </HeaderContainer>
    // <HeaderContainer>
    //   <Logo />
    //   <TabsContainer>
    //     <Tab>
    //       <Link to="/">HOME</Link>
    //     </Tab>
    //     <Tab>
    //       <Link to="/favorite">FAVORITE</Link>
    //     </Tab>
    //     <Tab>
    //       <Link to="/rated">RATED</Link>
    //     </Tab>
    //     <Tab onClick={() => user && setDropdownVisible(!dropdownVisible)}>
    //       {/* <Link to="/login">{user ? user.username : `Login`}</Link> */}
    //       <Link to={user ? "#" : "/login"}>
    //         {user ? user.username : `Login`}
    //       </Link>
    //       {user && (
    //         <Dropdown visible={dropdownVisible}>
    //           <button onClick={handleLogout}>Logout</button>
    //         </Dropdown>
    //       )}
    //     </Tab>
    //   </TabsContainer>
    // </HeaderContainer>
  );
}
