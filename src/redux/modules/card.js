// card.js
import { db } from "../../shared/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// action
const LOAD = "card/LOAD";
const CREATE = "card/CREATE";
const UPDATE = "card/UPDATE";
const DELETE = "card/DELETE";

const initialState = {
  is_loaded: false,
  list: [],
};

// action creator
export function loadCard(card_list) {
  return { type: LOAD, card_list };
}

export function createCard(card) {
  console.log("액션을 생성할거야!");
  return { type: CREATE, card };
}

export function updateCard(card_index, card_id, card_data) {
  return { type: UPDATE, card_index, card_id, card_data };
}

export function deleteCard(card_index) {
  // console.log("지울 버킷 인덱스", card_index);
  return { type: DELETE, card_index };
}


// middlewares
export const loadCardFB = () => {
  return async function (dispatch) {
    const card_data = await getDocs(collection(db, "card"));
    console.log(card_data);

    let card_list = [];

    card_data.forEach((b) => {
      // console.log(b.data());
      card_list.push({ id: b.id, ...b.data() });
    });

    // console.log(card_list);

    dispatch(loadCard(card_list));
  };
};

export const addCardFB = (card) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "card"), card);

    const _card = await getDoc(docRef);

    const card_data = { id: docRef.id, ..._card.data() };

    dispatch(createCard(card_data));
  };
};

export const updateCardFB = (card_id) => {
  return async function (dispatch, getState) {
    console.log(card_id.id, "id");
    const newCard = {
      content: card_id.content,
      image_url: card_id.image_url,
    };
    // console.log(newCard, "새로들어갈 content");
    const docRef = doc(db, "card", card_id.id);
    await updateDoc(docRef, {
      content: card_id.content,
      image_url: card_id.image_url,
    });
    // console.log(getState().homework.list);
    const _card_list = getState().card.list;
    //                            스토어.list
    const card_index = _card_list.findIndex((c) => {
      return c.id === card_id.id;
    });
    // console.log(word_index, "요거확인!");
    dispatch(updateCard(card_index, card_id.id, newCard)); // 수정할 아이디와 수정할 데이터를 전송해야 리덕스를 수정할 수 있음
    // 항해강의에서 하는거는 우리가 선택한 값을 true
  };
};

export const deleteCardFB = (card_id) => {
  return async function (dispatch, getState) {
    if (!card_id) {
      window.alert("아이디가 없네요!");
      return;
    }
    const docRef = doc(db, "card", card_id);

    await deleteDoc(docRef);

    const _card_list = getState().card.list;

    const card_index = _card_list.findIndex((b) => {
      return b.id === card_id;
    });

    dispatch(deleteCard(card_index));
  };
};

// reducer

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "card/LOAD": {
      return { list: action.card_list };
    }
    case "card/CREATE": {
      const new_card_list = [...state.list, action.card];
      return { ...state, list: new_card_list };
    }

    case "card/UPDATE": {
      console.log(action); // action.id, action.data
      const new_card_list = state.list.map((l, index) => {
        // 원하는 id의 데이터를 찾고 그 데이터만 우리가 교체하고 싶은 데이터로 교체
        if (parseInt(action.card_index) === index) {
          //문자열을 수로 바꿔줌
          //   console.log(action.content_data.image_url, "이건데");
          return {
            ...l,
            content: action.card_data.content,
            image_url: action.card_data.image_url,
            // id: action.word_index.id,
          };
          // idx가 같은 것만 true로 변경 후 리턴
        } else {
          return l;
          // 나머진 그대로 리턴
        }
      });
      return { ...state, list: new_card_list };
    }

    case "card/DELETE": {
      const new_card_list = state.list.filter((l, idx) => {
        return parseInt(action.card_index) !== idx;
      });

      return { ...state, list: new_card_list };
    }


    default:
      return state;
  }
}
