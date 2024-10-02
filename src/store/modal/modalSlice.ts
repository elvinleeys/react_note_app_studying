import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    viewEditTagsModal: boolean,
    viewAddTagsModal: boolean,
    viewCreateNoteModal: boolean,
    viewFiltersModal: boolean
}

const initialState: ModalState = {
    viewEditTagsModal: false,
    viewAddTagsModal: false,
    viewCreateNoteModal: false,
    viewFiltersModal: false
}


const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        // side bar의 tag 탭과 note 수정시 add Tag 버튼 클릭시 생성되는 modal을 처리하는 함수
        toggleTagsModal: (state, { payload }) => {
            const { type, view } = payload;
            //  type이 add일 시
            if (type === "add") {
                // viewAddTagsModal 상태를 view로 변화시켜주고
                state.viewAddTagsModal = view;
            } else {
                // sideBar의 tag탭을 클릭시 상태를 처리해주는 경우
                // viewEditTagsModal 상태를 view로 변화시켜준다.
                state.viewEditTagsModal = view;
            }

        },

        // note를 생성하는 버튼 클릭시 모달창을 보여주는 함수 toggleTagsModal 함수 생성
        toggleCreateNoteModal: (state, action) => {
            // 해당 +버튼 클릭시 viewCreateNoteModal 상태에
            // payload를 넣어준다.
            state.viewCreateNoteModal = action.payload;
        },
        // 메인 화면에 정렬 버튼 클릭시 정렬 기준을 결저하는 modal창 생성과 관련된 처리를 
        // 하는 함수이다.
        toggleFiltersModal: (state, action) => {
            // 정렬기준 선택시 viewFiltersModal상태에 payload를 넣어준다.
            state.viewFiltersModal = action.payload
        },

    }
})


export const { toggleTagsModal, toggleCreateNoteModal, toggleFiltersModal } = modalSlice.actions;
export default modalSlice.reducer;