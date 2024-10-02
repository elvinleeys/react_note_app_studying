import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { v4 } from 'uuid';

// 각각의 초기 state를 결정하기 위해 각 tag의 이름과
// 고유한 id를 주기 위해 uuid의 v4메소드를 활용한다.
const initialState = {
    tagsList: [
        { tag: "coding", id: v4() },
        { tag: "exercise", id: v4() },
        { tag: "quotes", id: v4() }
    ]
}

// reducer를 생성하기 위해 createSlice를 통해 slice를 생성하고
const tagsSlice = createSlice({
    name: "tags",
    // 초기값 설정
    initialState,
    reducers: {
        // addTags라는 메소드를 생성하고 
        addTags: (state, { payload }) => {
            // 만일 state의 tagsList에 존재하는 tag와 추가되는 tag의 이름이 같다면
            if (state.tagsList.find(({ tag }) => tag === payload.tag)) {
                // 이미 존재하는 태그입니다 라는 문구를 보여준다.
                toast.warning("이미 존재하는 태그입니다.");
            } else {
                // 그렇지 않다면 state 배열에 push메소드를 통해 해당 tag를 추가한다.
                // reducer내에서는 불변성을 안지켜주는 push를 사용해도 상관없다
                // 내부에 immer라는 library가 알아서 처리해주기 때문이다.
                state.tagsList.push(payload);
                toast.info("새로운 태그가 등록되었습니다.");
            }
        },
        // tag 삭제시 payload를 받아와
        deleteTags: (state, { payload }) => {
            // x버튼이 클릭된 tag의 id를 받아와 해당 id와 현재 taglist의 id와 일치하지 않는
            // tag들 목록만 불러온다.
            state.tagsList = state.tagsList.filter(({ id }) => id !== payload)
            // 또한 user에게 삭제되었다는 정보를 보여주기 위해 아래와 같이 사용
            toast.info("태그가 삭제되었습니다.");
        }
    }
})

export const { addTags, deleteTags } = tagsSlice.actions;

export default tagsSlice.reducer;