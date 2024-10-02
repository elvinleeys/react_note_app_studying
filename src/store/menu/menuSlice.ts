import { createSlice } from "@reduxjs/toolkit";

interface MenuState {
    isOpen: boolean;
}

const initialState: MenuState = {
    isOpen: false
}

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        // 메뉴바를 클릭시 사이드바가 보이도록 설정해야 하므로 이 동작을 toggle로 명명한다.
        // 해당 메소드가 실행시 isOpen이라는 상태를 받아와 payload의 값을 전달한다.
        toggleMenu: (state, action) => {
            state.isOpen = action.payload
        }
    }
})

// 다른 컴포넌트에서 사용할 수 있도록 menuSlice내에 존재하는 actions를
// 구조분해 할당을 통해 toggleMenu로 내보낸다.
export const { toggleMenu } = menuSlice.actions;
export default menuSlice.reducer;