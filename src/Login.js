import React from "react";
import { useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./shared/firebase";
import { async } from "@firebase/util";
import { getDocs, where, query, collection } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();

  const id_ref = React.useRef(null);
  const pwd_ref = React.useRef(null);

  const emailCheck = (email) => {
    let _reg =
      /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
    return _reg.test(email);
  };

  // 값 받아오기
  const loginFB = async () => {
    console.log(id_ref.current.value, pwd_ref.current.value);

    //벨리데이션 필수!
    if (id_ref.current.value === "" || pwd_ref.current.value === "") {
      window.alert("이메일 혹은 비밀번호가 공란! 입력해주세요!");
      return;
    }
    if (!emailCheck(id_ref.current.value)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    } else {
      navigate("/");
    }
    const user = await signInWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pwd_ref.current.value
    );

    console.log(user);

    const user_docs = await getDocs(
      query(db, "users"),
      where("user_id", "==", user.user.email)
    );

    user_docs.forEach((u) => {
      console.log(u.data());
    });
  };

  // 로그인 체크
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

  return (
    <div>
      <h1>로그인</h1>
      <div className="ContentBox">
        <div>
          <p>아이디</p>
          <br></br>
          <input type="text" ref={id_ref}/>
        </div>
        <div>
          <p>비밀번호</p>
          <br></br>
          <input type="password" ref={pwd_ref} />
        </div>
      </div>
      <button
        onClick={() => {
          loginFB();
        }}
      >
        로그인하기
      </button>
    </div>
  );
};

export default Login;
