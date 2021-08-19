import { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import AddMovie from "./AddMovie";
import AdminDrawer from "./AdminDrawer";
import BanUser from "./BanUser";
import DeleteMovie from "./DeleteMovie";

const Admin = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const user = useSelector(state => state.auth.user);
  const pages = [
    {
      title: 'Add Movie',
      render: <AddMovie title="Add Movie" />,
      onClick: () => setCurrentPage(0),
    },
    {
      title: 'Delete Movie',
      render: <DeleteMovie title="Delete Movie" />,
      onClick: () => setCurrentPage(1),
    },
    {
      title: 'Ban | Unban User',
      render: <BanUser title="Ban | Unban User" />,
      onClick: () => setCurrentPage(2),
    },
  ];

  if(user.role !== "ADMIN"){
    return <Redirect to="/"/>;
  }

  return (
    <StyledAdminDiv>
      <Header />
      <StyledContainerDiv>
        <AdminDrawer pages={pages}/>
        <StyledContentDiv>
          {
            pages[currentPage].render
          }
        </StyledContentDiv>
      </StyledContainerDiv>
    </StyledAdminDiv>
  );
};

const StyledAdminDiv = styled.div`
  height: 100vh;
`;

const StyledContainerDiv = styled.div`
  display: flex;
  height: 92vh;
`;

const StyledContentDiv = styled.div`
  width: 340px;
  color: var(--primary-text);
  padding: 24px;

  .content-title{
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 12px;
  }

  .content-info{
    font-size: 1.5rem;
    color: var(--unique-text);
    padding: 12px 0px;
  }

  .content-form{
    display: flex;
    flex-direction: column;
    font-size: 1.1rem;
    .movie-input{
      margin-top: 12px;
      max-width: 340px;
    }

    .file-input{
      display: flex;
      flex-direction: column;
    }

    .movie-categories{
      & > * {
        background: var(--secondary-color) !important;
      }
    }
  }
`;


export default Admin;