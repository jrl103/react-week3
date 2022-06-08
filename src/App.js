import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { auth, db } from "./shared/firebase";
import { useDispatch } from "react-redux";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

import Main from "./Main";
import Addpage from "./Addpage";
import UpdatePage from "./UpdatePage";
import SignUp from "./SignUp";
import Login from "./Login";
import { loadCardFB } from "./redux/modules/card";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = [
    {
      user_info: {
        user_name: "test01",
        user_profile:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXGxD-ND0d9Ekmpwd0jOmgPfXpAlUzFbcnQg&usqp=CAU",
      },
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXGxD-ND0d9Ekmpwd0jOmgPfXpAlUzFbcnQg&usqp=CAU",
      contents: "엉엉! 나스닥 파멸적 반등 좀 주세요ㅜㅠ",
      comment_cnt: 10,
      insert_dt: "2021-02-27 10:00:00",
    },
    {
      user_info: {
        user_name: "test02",
        user_profile:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXGxD-ND0d9Ekmpwd0jOmgPfXpAlUzFbcnQg&usqp=CAU",
      },
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXGxD-ND0d9Ekmpwd0jOmgPfXpAlUzFbcnQg&usqp=CAU",
      contents: "엉엉! 나스닥 파멸적 반등 좀 주세요ㅜㅠ",
      comment_cnt: 10,
      insert_dt: "2021-02-27 10:00:00",
    },
  ];



  React.useEffect(() => {
    dispatch(loadCardFB());
  }, [dispatch]);

  //is_login
  const [is_login, setIsLogin] = React.useState(false);

  console.log(auth.currentUser);

  const loginCheck = async (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };
  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck);
  }, []);

  // 로그인 됐을 경우 보이는 것 만들기
  // const Home = () => {
  //   return <button>로그아웃</button>;
  // };

  // 로그아웃 함수
  const logOut = () => {
     signOut(auth) 
  }
  return (
    <Wrap>
      <Header>
        <HomeBtn
          onClick={() => {
            navigate("/");
          }}
        >
          <HomeOutlined />
        </HomeBtn>
        <UserBtns>
          <SignupBtn
            onClick={() => {
              navigate("/SignUp");
            }}
          >
            회원가입
          </SignupBtn>
            {is_login?(     <LoginBtn
            onClick={() => {
              if (is_login){
                logOut()
              }
              alert("로그아웃 되었습니다.")
              navigate("/");
            }}
          >
           로그아웃         
          </LoginBtn>):(
             <LoginBtn
             onClick={() => {
               if (is_login){
                
               } 
               navigate("/Login");
             }}
           >
            로그인        
           </LoginBtn>
          )}
     
        </UserBtns>
      </Header>
      
      <Routes>
        <Route path="/" element={<Main post={post}/>}></Route>
        <Route path="/addpage" element={<Addpage />}></Route>
        
        <Route path="/signup" element={<SignUp />}></Route>
        {/* {is_login ? (
          <Route path="/" element={<Home />}></Route>
        ) : (
          <Route path="/login" element={<Login />}></Route>
        )} */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Updatepage/:index" element={<UpdatePage />}></Route>
      </Routes>
    </Wrap>
  );
}
const Wrap = styled.div`
  background-color: #b4fff3;
  width: 80%;
  height: 100%;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  padding: 16px;
`;
const HomeBtn = styled.div`
  background-color: #cfcfcf;
  padding: 16px;
  border-radius: 5px;
  font-size: 40px;
  & :hover {
    color: #fff;
    cursor: pointer;
  }
`;
const UserBtns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  & :hover {
    color: #fff;
    cursor: pointer;
  }
`;
const SignupBtn = styled.div`
  background-color: #cfcfcf;
  padding: 16px;
  border-radius: 5px;
`;
const LoginBtn = styled.div`
  background-color: #cfcfcf;
  padding: 16px;
  border-radius: 5px;
`;

export default App;
