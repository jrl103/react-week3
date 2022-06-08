import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./shared/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const SignUp = () => {
  const navigate = useNavigate();

  const id_ref = React.useRef(null);
  const name_ref = React.useRef(null);
  const pwd_ref = React.useRef(null);
  const repwd_ref = React.useRef(null);

  const emailCheck = (email) => {
    let _reg =
      /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
    return _reg.test(email);
  };

  const signupFB = async () => {
    //벨리데이션 필수!
    if (id_ref.current.value === "" || pwd_ref.current.value === "") {
      window.alert("이메일 혹은 비밀번호가 공란! 입력해주세요!");
      return;
    }
    if (!emailCheck(id_ref.current.value)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    } if (pwd_ref.current.value !== repwd_ref.current.value){
        window.alert("비밀번호가 동일하지 않습니다!");
    } else {
      navigate("/");
    }

    const user = await createUserWithEmailAndPassword(
      auth,
      id_ref.current.value,
      name_ref.current.value,
      pwd_ref.current.value,
      repwd_ref.current.value
    );

    console.log(user);

    const user_doc = await addDoc(collection(db, "users"), {
      user_id: user.user.email,
      name: name_ref.current.value,
    });

    console.log(user_doc.id);
  };

  return (
    <div>
      <h1> 회원가입</h1>
      <div className="ContentBox">
        <div>
          <p>아이디</p>
          <br />
          <input type="text" ref={id_ref} />
        </div>
        <div>
          <p>닉네임</p>
          <br />
          <input type="text" ref={name_ref} />
        </div>
        <div>
          <p>비밀번호</p>
          <br />
          <input type="password" ref={pwd_ref} />
        </div>
        <div>
          <p>비밀번호 확인</p>
          <br />
          <input type="password" ref={repwd_ref} />
        </div>
      </div>
      <button
        onClick={() => {
          signupFB();
          
        }}
      >
        회원가입하기
      </button>
    </div>
  );
};

export default SignUp;
