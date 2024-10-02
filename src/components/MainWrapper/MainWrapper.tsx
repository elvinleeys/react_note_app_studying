import React from 'react'
import { NotesContainer } from '../../styles/styles';
import { Note } from '../../types/note'
import NoteCard from '../NoteCard/NoteCard';

interface MainWrapperProps {
  notes: Note[];
  type: string;
}

// note 목록들을 감싸주는 일종의 layout역할
const MainWrapper = ({ notes, type }: MainWrapperProps) => {
  return (
    <NotesContainer>
      {/* map함수를 통해 note를 뿌려주며 note와 type을 전달해준다. 
      각 목록은 고유한 key값을 지녀야 하므로 note의 id를 연결시켜준다.*/}
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} type={type} />
      ))}
    </NotesContainer>
  )
}

export default MainWrapper