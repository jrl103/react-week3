import React from "react";
import styled from "styled-components";
import { HeartOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./shared/firebase";
import { useDispatch, useSelector } from "react-redux";
import {deleteCardFB} from "./redux/modules/card";

const Main = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = props.post;
  console.log(post);
  

  // 로그인
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

  // 뷰 만들기
  const card_list = useSelector((state) => state.card.list);
  console.log(card_list, "지금 확인할 거")

  return (
    <Wrap>
        {card_list.map((list,index)=>{
          return(
            <CardWrap key={index}>
              <ContentBox>
                <CardHead>
                  <CardUserBox>
                    {/* <UserImg>{list.img}</UserImg> */}
                    <UserName>name</UserName>
                  </CardUserBox>
                  <UpdateBox>
                    <UpdateTime>2022.06.09</UpdateTime>
                    {is_login &&
                          <UpdateBtn
                          onClick={() => {
                      
                            navigate(`/updatepage/${index}`);
                          }}
                        >
                          수정
                        </UpdateBtn>
                    }
                  {is_login &&
                      <UpdateBtn onClick={() => {
                        dispatch(deleteCardFB(card_list[index].id))
                      }}
                      >
                        삭제
                      </UpdateBtn>
                  }
                
                  </UpdateBox>
                </CardHead>
                <CardText>{list.content}</CardText>
                <CardImg src={list.image_url}/>
                <CardFoot>
                  <LikesCount>좋아요 0개</LikesCount>
                  <LikeBtn>
                    <HeartOutlined />
                  </LikeBtn>
                </CardFoot>
              </ContentBox>
            </CardWrap>
          )
        })}
        
      {is_login && (
        <AddBtn
          onClick={() => {
            navigate("/addpage");
          }}
        >
          <EditOutlined />
        </AddBtn>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  /* background-color: #b4fff3; */
  width: 80%;
  height: 100vh;
  margin: auto;
`;

const CardWrap = styled.div``;
const ContentBox = styled.div`
  background-color: #fff;
  margin-top: 16px;
`;
const CardHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const CardUserBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;
const UserImg = styled.div``;
const UserName = styled.div``;

const UpdateBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;
const UpdateTime = styled.div``;
const UpdateBtn = styled.div`
  background-color: #cfcfcf;
  padding: 10px;
  border-radius: 5px;
  & :hover {
    color: #fff;
    cursor: pointer;
  }
`;
const CardText = styled.div``;
const CardImg = styled.img`
/* height: 200px;
width: 450px; */

`;

const CardFoot = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const LikesCount = styled.div`
  padding: 10px;
`;
const LikeBtn = styled.div`
  padding: 10px;
`;

const AddBtn = styled.div`
  position: fixed;
  bottom: 20px;
  right: 70px;
  font-size: 40px;
  padding: 16px;
  background-color: #cfcfcf;
  border-radius: 5px;
  & :hover {
    color: #fff;
    cursor: pointer;
  }
`;

export default Main;




{/* <CardWrap>
              <ContentBox>
                <CardHead>
                  <CardUserBox>
                    <UserName>name</UserName>
                  </CardUserBox>
                  <UpdateBox>
                    <UpdateTime>2022.06.09</UpdateTime>
                    <UpdateBtn
                      onClick={() => {
                        navigate("/UpdatePage");
                      }}
                    >
                      수정
                    </UpdateBtn>
                  </UpdateBox>
                </CardHead>
                <CardText>{post[0].contents}</CardText>
                <CardImg src={post[0].image_url}/>
                <CardFoot>
                  <LikesCount>좋아요 0개</LikesCount>
                  <LikeBtn>
                    <HeartOutlined />
                  </LikeBtn>
                </CardFoot>
              </ContentBox>
            </CardWrap> */}