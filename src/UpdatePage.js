import React from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "./shared/firebase";
import { addDoc, collection } from "firebase/firestore";
import { updateCardFB } from "./redux/modules/card";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams} from "react-router-dom"

const UpdatePage = () => {
    const params = useParams();
    const card_index = params.index;
    const card_list = useSelector((state)=>(state.card.list));

    const dispatch = useDispatch();
    const navigate = useNavigate();

  const update_ref = React.useRef(null);
  const file_link_ref = React.useRef(null);

  const uploadFB = async (e) => {
    console.log(e.target.files);
    const uploded_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );

    console.log(uploded_file);

    const file_url = await getDownloadURL(uploded_file.ref);

    console.log(file_url);
    file_link_ref.current = { url: file_url };
    console.log(file_link_ref.current.url,"gsdfg")
    
  };

  const updateCardList = () => {
    dispatch(
        updateCardFB(
            {
                content:update_ref.current.value,
                image_url:file_link_ref.current.url,
                id:card_list[card_index].id,
            }
        )
    )
    navigate('/');
  }

  return (
     <div>
      <h2>게시글 수정</h2>
      <br />
      <input type="file" onChange={uploadFB} />
      <br />
      <input placeholder="글 적어라" type="text" ref={update_ref} />
      <br />
      <button onClick={updateCardList}>수정하기</button>
    </div>
  );
};

export default UpdatePage;
