import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import { CreateNoteModal, TagsModal } from './components'
import { useAppSelector } from './hooks/redux'
import { Navbar, Sidebar } from './layout'
import { AllNotes, ArchiveNotes, ErrorPage, TagNotes, TrashNotes } from './pages'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  // 각 modal창을 관리하는 상태를 커스텀 훅함수인 useAppSelector를 활용하여 modal을 가져오며
  // 비구조화 할당을 통해 tag modal을 관리하는 viewEditTagsModal, note를 생성하는 모달인 viewCreateNoteModal
  // 상태값을 가져온다.
  const { viewEditTagsModal, viewCreateNoteModal } = useAppSelector(state => state.modal);

  return (
    <div className="app">
      {/* viewCreateNoteModal 상태가 true일시 createNoteModal 컴포넌트가 보여지도록
      논리곱연산자를 활용하여 CreateNoteModal 컴포넌트를 보여지게 한다. */}
      {viewCreateNoteModal && <CreateNoteModal />}
      {/* note 수정 버튼 클릭시에도 위와 동일하게 viewEditTagsModal이 true상태일 때
      TagsModal 창이 보이도록 설정 */}
      {viewEditTagsModal && <TagsModal type='edit' />}

      <ToastContainer
        position='bottom-right'
        theme='light'
        pauseOnHover
        autoClose={1500}
      />
      {/* browser컴포넌트를 감싸 브라우저 환경에서 해당 경로로 들어왔을때
      경로에 맞는 컴포넌트를 보여줄 수 있도록 준비한다. */}
      <BrowserRouter>
        {/* 어떤 컴포넌트가 들어오더라도 Sidebar를 보여줄 수 있도록 import해주며 */}
        <Sidebar />
        <div className='app__container'>
          {/* Navbar 역시 어떤 컴포넌트가 보여주도록 import 시켜준다. */}
          <Navbar /> 
          {/* 중첩 라우팅을 사용하기 위해 Routes로 Route를 감싸준다. */}
          <Routes>
            {/* 각 Route는 전달해준 path 경로로 진입시
            element에 해당하는 컴포넌트를 보여준다. */}
            <Route path='/' element={<AllNotes />} />
            <Route path='/archive' element={<ArchiveNotes />} />
            <Route path='/trash' element={<TrashNotes />} />
            <Route path='/tag/:name' element={<TagNotes />} />
            <Route path='/404' element={<ErrorPage />} />
            {/* 위 경로 이외의 모든 경로로 진입시에는 잘못된 경로로 진입한 것이므로
            /404 페이지를 보여줄 수 있도록 설정한다. */}
            <Route path='/*' element={<Navigate to={"/404"} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
