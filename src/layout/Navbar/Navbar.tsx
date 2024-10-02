import React from 'react'
import { Container, StyledNav } from './Navbar.styles'
import { FiMenu } from 'react-icons/fi';
import { ButtonFill } from '../../styles/styles';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { toggleMenu } from '../../store/menu/menuSlice';
import { toggleCreateNoteModal } from '../../store/modal/modalSlice';
import getStandardName from '../../utils/getStandardName';

const Navbar = () => {
  // useDispatch의 커스텀 훅함수를 import 시켜준다.
  const dispatch = useAppDispatch();
  // useLocation을 통해 location 객체를 가져오며
  // location객체를 비구조화 할당을 통해 pathname과 state로 분리한다.
  const { pathname, state } = useLocation()
  console.log(state);
  // 만일 잘못된 경로로 진입시 null로 redirect시켜준다.
  if (pathname === "/404") {
    return null;
  }

  return (
    // Navbar의 styled-component인 StyledNav로 감싸준다.
    <StyledNav>
      <div className='nav__menu'>
        {/* 메뉴 icon클릭시 sidebar가 보이도록 toggleMenu라는 메소드에 true를 전달하여
        상태의 isOpen을 true로 변경시켜 준다. */}
        <FiMenu onClick={() => dispatch(toggleMenu(true))} />
      </div>

      <Container>
        {/* 어느 위치에 존재하는 note인지 보여줄 수 있도록
        getStandardName에 location의 state를 전달하여 표시할 수 있도록 한다. */}
        <div className='nav__page-title'>{getStandardName(state)} </div>
        {/* 해당 +버튼은 location, 즉 위치 상태가 Trash가 아니고
        Archive가 아닐때만 보여줄 수 있도록 논리곱연산자(&&)를 사용한다. */}
        {state !== "Trash" && state !== "Archive" &&
          // +button을 추가하여 해당 버튼 클릭시 노트를 작성할 수 있도록
          // toggleCreateNoteModal 메소드에 true를 전달한다.
          // 따라서 viewCreateNoteModal상태가 true로 변화하며 createNoteModal이
          // 보여지게 된다.
          <ButtonFill
            onClick={() => dispatch(toggleCreateNoteModal(true))}
            className="nav__btn"
          >
            <span>+</span>
          </ButtonFill>
        }

      </Container>
    </StyledNav>
  )
}

export default Navbar