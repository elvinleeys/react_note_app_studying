import React, { useState } from 'react'
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import { v4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { toggleTagsModal } from '../../../store/modal/modalSlice';
import { removeTags } from '../../../store/notesList/notesListSlice';
import { addTags, deleteTags } from '../../../store/tags/tagsSlice';
import { Tag } from '../../../types/tag';
import getStandardName from '../../../utils/getStandardName';
import { DeleteBox, FixedContainer } from '../Modal.styles';
import { Box, StyledInput, TagsBox } from './TagModal.styles';

interface TagsModalProps {
  type: string;
  addedTags?: Tag[];
  handleTags?: (tag: string, type: string) => void
}

const TagsModal = ({ type, addedTags, handleTags }: TagsModalProps) => {
  const dispatch = useAppDispatch();
  const { tagsList } = useAppSelector((state) => state.tags);
  const [inputText, setInputText] = useState('');

  // form태그의 submit시 작동하는 함수
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    // submit시 전송 경로로 이동하는 이벤트를 방지하기 위함
    e.preventDefault();
    // 만일 input태그에 입력한 text가 없을 경우 return을 통해 함수를 조기종료한다.
    if (!inputText) {
      return;
    }
    // input에 text가 존재하고 submit 상황시 input의 text값은 소문자화시켜
    // uuid를 통해 생성된 고유한 id값과 함께 addTags함수에 전달하여 값을 저장한다.
    dispatch(addTags({ tag: inputText.toLocaleLowerCase(), id: v4() }));
    // submit후 input태그에 존재하는 text는 초기화시켜준다.
    setInputText('');
  }
  // tag를 삭제하는 함수
  const deleteTagsHandler = (tag: string, id: string) => {
    // deleteTags를 통해 id를 전달하여 해당 id와 일치하지 않는 taglist만 불러온다.
    dispatch(deleteTags(id));
    // 해당 removeTags 메소드는 tag를 전달하여 전 noteList 정보를 불러와
    // note의 data중 해당 tag와 일치하지 않는 tag들에 대해서만 data만 저장되도록 설정
    dispatch(removeTags({ tag }));
  }

  return (
    <FixedContainer>
      <Box>
        <div className='editTags__header'>
          <div className='editTags__title'>
            {/* type에 따라서 add이면 ADD Tags와 같이 modal의 이름을 보여주도록하며
            add가 아니라면 edit Tags를 보여주도록 설정 */}
            {type === "add" ? "ADD" : "Edit"} Tags
          </div>
          {/* edit tag의 모달창의 닫힘을 관리하는 styled-component이다.
          해당 div태그를 클릭시 toggleTagsModal 함수에 view를 false로 전달하여
          모달창이 닫히도록, 정확히는 visiblity 속성이 false가 되도록 설정 */}
          <DeleteBox
            className='editTags__close'
            onClick={() => dispatch(toggleTagsModal({ type, view: false }))}
          >
            <FaTimes />
          </DeleteBox>
        </div>
        {/* 해당 form태그로 전송된 값은 text가 추가되도록 설정한 것이며 submit 상태일시
        submitHandler가 작동되도록 설정*/}
        <form onSubmit={submitHandler}>
          {/* 해당 input에 text가 입력되도록 설정하며 값을 입력시 
          target의 value가 input의 text가 되도록 setInputText에 value를 전달한다.*/}
          <StyledInput
            type="text"
            value={inputText}
            placeholder="new tag..."
            onChange={(e) => setInputText(e.target.value)}
          />
        </form>
        <TagsBox>
          {tagsList.map(({ tag, id }) => (
            <li key={id}>
              <div className='editTags__tag'>
                {getStandardName(tag)}
              </div>
              {/* deleteBox 클릭시 tag를 삭제하는 상황은 2가지로 sidebar의 tag와
              note에 생성된 tag 2가지를 없애주는 역할을 해야한다. */}
              {type === "edit" ? (
                <DeleteBox onClick={() => deleteTagsHandler(tag, id)}>
                  <FaTimes />
                </DeleteBox>
              ) : (
                <DeleteBox>
                  {addedTags?.find(
                    (addedTag: Tag) => addedTag.tag === tag.toLowerCase()
                  ) ? (
                    <FaMinus onClick={() => handleTags!(tag, "remove")} />
                  ) :
                    (
                      <FaPlus onClick={() => handleTags!(tag, "add")} />
                    )
                  }
                </DeleteBox>
              )}
            </li>
          ))}
        </TagsBox>
      </Box>
    </FixedContainer>
  )
}

export default TagsModal