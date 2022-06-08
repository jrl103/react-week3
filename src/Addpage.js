import React from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "./shared/firebase";
import { addDoc, collection } from "firebase/firestore";
import { addCardFB } from "./redux/modules/card";
import { useDispatch } from "react-redux";


const Addpage = () => {
  const dispatch = useDispatch();

  const add_ref = React.useRef(null);
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
  };

  const addCardList = () => {
    // dispatch(createWord({text:text.current.value, completed:false}));

    dispatch(
        addCardFB({
        image_url: file_link_ref.current.url,
        content: add_ref.current.value,
      })
      
    );
    
  };
  return (
    <div>
      <h2>게시글 작성</h2>
      <br />
      <input type="file" onChange={uploadFB} />
      <br />
      <input placeholder="글 적어라" type="text" ref={add_ref} />
      <br />
      <button onClick={addCardList}>작성하기</button>
    </div>
  );
};

export default Addpage;
