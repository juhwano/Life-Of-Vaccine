import { Route, Switch } from "react-router-dom";
import NavbarContainer from "./containers/common/NavbarContainer";
import GlobalStyles from "./GlobalStyles";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { useContext, useEffect } from "react";
import client from "./libs/api/_client";
// import AddProfilePage from "./pages/EditProfilePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import WritePage from "./pages/WritePage";
import Error from "./pages/Error";
import EditProfilePage from "./pages/EditProfilePage";
// import AuthContext from "./context/AuthContext";
// import ChatUserContext from "./context/chat/ChatUserContext";
// import ChatRoomContext from "./context/chat/ChatRoomContext";
import ChatRoomPage from "./pages/ChatRoomPage";
import ChatPage from "./pages/ChatPage";
import AuthContext from "./context/AuthContext";
import ChatUserContext from "./context/chat/ChatUserContext";

const ContentContainer = styled.div`
  background: #fff;
`;
const ContentBlock = styled.div`
  max-width: 48rem;
  /* min-height: 100vh; */
  border-color: #dbdbdb;
  /* border-left: 1px solid #dbdbdb; */
  /* border-right: 1px solid #dbdbdb; */
  background-color: #fff;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
`;

function App() {
  // const dispatch = useDispatch();
  // const { isLoggedIn } = useSelector(({ user }) => ({
  //   isLoggedIn: user.isLoggedIn,
  // }));
  // 가져와서 useState와 똑같이 활용
  const { authInfo, setAuthInfo } = useContext(AuthContext);
  const { userName, setUserName } = useContext(ChatUserContext);
  // const { roomName, setRoomName } = useContext(ChatRoomContext);

  // 통신 진행 후 상태변경(토큰 유무에 따라)
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null;
    async function getAccount() {
      if (token !== null) {
        try {
          client.defaults.headers.common["Authorization"] = `${token}`;
          const response = await client.get("/auth/profile");
          setAuthInfo({ isLoggedIn: true, authInfo: response.data.data });
          setUserName(response.data.data.nickName);
        } catch (error) {
          console.error(error);
        }
      }
    }
    getAccount();
  }, []);

  return (
    <>
      <GlobalStyles />
      <header>
        <NavbarContainer />
      </header>
      <ContentContainer>
        <ContentBlock>
          <Switch>
            <Route component={HomePage} exact path={["/@:username", "/"]} />
            <Route component={SignInPage} exact path="/signin" />
            <Route component={SignUpPage} exact path="/signup" />
            <Route component={EditProfilePage} exact path="/edit/profile" />

            {/* <Route component={RegisterPage} path="/register" /> */}
            <Route component={WritePage} exact path="/write" />
            {/* <Route component={PostPage} path="/@:username/:postId" /> */}

            {/* 채팅 대기실 */}
            <Route component={ChatRoomPage} exact path="/room" />
            {/* 채팅 */}
            <Route component={ChatPage} exact path="/chat" />

            <Route render={Error} />
            <ToastContainer
              position="bottom-center"
              autoClose={2700}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover={false}
              limit={2}
            />
          </Switch>
        </ContentBlock>
      </ContentContainer>
    </>
  );
}

export default App;
