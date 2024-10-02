import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Container, MainBox, StyledLogo, ItemsBox } from './Sidebar.styles';
import { toggleMenu } from '../../store/menu/menuSlice';
import { FaArchive, FaLightbulb, FaTag, FaTrash } from 'react-icons/fa';
import getStandardName from '../../utils/getStandardName';
import { toggleTagsModal } from '../../store/modal/modalSlice';
import { MdEdit } from 'react-icons/md';
import { v4 } from 'uuid';


const items = [
  { icon: <FaArchive />, title: "Archive", id: v4() },
  { icon: <FaTrash />, title: "Trash", id: v4() },
]

const Sidebar = () => {
  const dispatch = useAppDispatch();
  // menu의 isOpen을 받아와 isOpen의 상태를 비구조화 할당한다.
  const { isOpen } = useAppSelector((state) => state.menu);
  // state로부터 tag들을 받아와 tagsList로 비구조화 할당한다.
  const { tagsList } = useAppSelector((state) => state.tags);

  const { pathname } = useLocation();

  if (pathname === "/404") {
    return null;
  }

  return (
    // menu의 상태인 isOpen이 true일 시 속성의 openMenu에 대한 value를 open으로 줌으로써
    // style에서 visibility를 normal과 background 색을 불투명하게 만든다.
    // 또한 sidebar가 smooth하게 나타나도록 transition 속성을 설정한다.
    <Container openMenu={isOpen ? "open" : ""}>
      <MainBox openMenu={isOpen ? "open" : ""}>
        {/* sideBar의 제목 */}
        <StyledLogo>
          <h1>Keep</h1>
        </StyledLogo>

        <ItemsBox >
          {/* note item */}
          <li onClick={() => dispatch(toggleMenu(false))}>
            {/* Link와의 차이점은 active상태를 추가할 수 있는 태그가 NavLink이다.
            to의 경로와 실제 경로가 일치할 시 isActive상태가 true로 변경되고
            그에 따라 className이 변경되어 style이 변경된다. */}
            <NavLink
              to={"/"}
              state={`notes`}
              className={({ isActive }) => isActive ? "active-item" : "inactive-item"}
            >
              <span>
                <FaLightbulb />
              </span>
              <span>Notes</span>
            </NavLink>
          </li>

          {/* tag items */}
          {tagsList?.map(({ tag, id }) => (
            <li key={id} onClick={() => dispatch(toggleMenu(false))}>
              {/* 각 tag들은 tag 클릭시 클릭한 tag에 맞는 경로로 이동시키도록
              경로에 template literal을 사용하여 경로에 tag명을 포함시킨다. */}
              <NavLink
                to={`/tag/${tag}`}
                state={`${tag}`}
                className={({ isActive }) => isActive ? "active-item" : "inactive-item"}
              >
                <span>
                  <FaTag />
                </span>
                <span>{getStandardName(tag)}</span>
              </NavLink>
            </li>
          ))}

          {/* edit tag item */}
          {/* edit tag같은 경우에는 경로를 이동하는 것이 아닌 
          editmodal을 보여주는 것이므로 map에 포함시키지 않는다. */}
          {/* 따라서 li태그 클릭시 toggleTagsModal 함수를 가져와
          type을 edit으로 view상태를 true로 action을 동작시켜
          editModal창이 보여질 수 있도록 한다. */}
          <li
            className='sidebar__edit-item'
            onClick={() => dispatch(toggleTagsModal({ type: "edit", view: true }))}
          >
            <span>
              <MdEdit />
            </span>
            <span>Edit Notes</span>
          </li>

          {/* other items */}
          {/* 다른 side bar 메뉴들을 하드코딩으로 보여주는 것이 아닌
          item list들을 map함수를 통해 icon과 title, id를 인수로 받아 전달한다. 
          li의 key값은 고유한 값이 필요하므로 id를 연결시켜주며
          각 item들은 클릭시 link로 경로를 이동하도록 NavLink의 to 속성으로 경로를 설정해준다.*/}
          {items.map(({ icon, title, id }) => (
            // list 태그 클릭시 toggleMenu들은 false상태로 전달하여 sidebar 메뉴가 닫히도록 설정
            <li key={id} onClick={() => dispatch(toggleMenu(false))}>
              <NavLink
                to={`/${title.toLocaleLowerCase()}`}
                state={`${title}`}
                className={({ isActive }) => isActive ? "active-item" : "inactive-item"}
              >
                <span>{icon}</span>
                <span>{title}</span>
              </NavLink>
            </li>
          ))}

        </ItemsBox>
      </MainBox>
    </Container>
  )
}

export default Sidebar

