import React, { useEffect, useState } from 'react';
import { useResource, useMessage, useVisibility } from './hooks';
import noteService from './components/services/note';
import loginService from './components/services/login';
import userService from './components/services/user';
import NoteForm from './components/NoteForm';
import Overlay from './components/Overlay';
import DefaultPage from './components/DefaultPage';
import { ReactComponent as DefaultHomeSvg } from './assets/svg/defaultHome.svg';
import { ReactComponent as DefaultTagsSvg } from './assets/svg/defaultTags.svg';
import Login from './page/Form/Login';
import Register from './page/Form/Register';
import Form from './page/Form';
import Home from './page/Home';
import Notes from './page/Notes';
import Details from './page/Details';
import NotesContainer from './page/NotesContainer';
import Tags from './page/Tags';
import { Container } from './AppElements';
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useRouteMatch
} from 'react-router-dom';
import './assets/styles/main.scss';

const App = () => {
  const [user, setUser] = useState(null);
  const [notes, { handleResources: handleNotes }] = useResource([]);
  const [message, { handleMessage, removeMessage, severity }] = useMessage();
  const [tags, { handleResources: handleTags }] = useResource([]);
  const modal = useVisibility(false);
  const sidebar = useVisibility(false);
  const history = useHistory();

  const helper = {
    getAllNotes: user => note =>
      note.user.username === user.username,
    getFavoriteNotes: user => note =>
      notes.user.username === user.username && note.like,
    compare: (a, b) => {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    },
    getLocalDate: (date) => {
      const d = new Date(date);
      const localTime = d.toLocaleTimeString('en', { hour12: false });
      const localDate = d.toLocaleDateString('zh-cn').replace(/\//g, '-');
      return `${localDate} ${localTime}`;
    }
  };

  useEffect(() => {
    const loggedNoteappUser = window.localStorage.getItem('loggedNoteappUser');
    if (loggedNoteappUser) {
      const user = JSON.parse(loggedNoteappUser);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  // Route
  const match = useRouteMatch('/notes/:id');
  const id = match ? match.params.id : null;

  const tagMatch = useRouteMatch('/tags/:tag');
  const tag = tagMatch ? tagMatch.params.tag : null;

  // Get favorite notes
  const favoriteNotes = notes.filter(n => n.like);

  // Get the notes of specific tag
  const notesOfSpecificTag = notes.filter(n => n.tags.includes(tag));

  const addNote = async (noteObject) => {
    try {
      const returnedNote = await noteService.create(noteObject);
      handleNotes(notes.concat(returnedNote).sort(helper.compare));
      handleMessage('保存成功', 'success');
      removeMessage(1000);
    } catch(exception) {
      handleMessage('内容不能为空或字数不能少于八', 'error');
      removeMessage(5000);
    }
  };

  const toggleLikeOf = async (id) => {
    const note = notes.find(note => note.id === id);
    const changedNote = { ...note, like: !note.like };

    try {
      const updatedNote = await noteService.update(id, changedNote);
      handleNotes(notes.map(n => n.id !== id ? n : updatedNote));
    } catch(error) {
      handleMessage('更新失败', 'error');
      removeMessage(2000);
    }
  };

  const deleteNoteOf = async (id) => {
    try {
      if (window.confirm('此操作不可撤销，并且将从你的个人资料中移除此条笔记')) {
        handleNotes(notes.filter(n => n.id !== id));
        await noteService.remove(id);
        handleMessage('删除成功', 'success');
        removeMessage(1000);
      }
    } catch(error) {
      handleMessage('删除失败', 'error');
      removeMessage(2000);
    }
  };

  const updateTagsOf = async (id, tags) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, tags: tags };

    try {
      if (window.confirm('此操作将更新笔记标签')) {
        const updatedNote = await noteService.update(id, changedNote);
        handleNotes(notes.map(note => note.id !== id ? note : updatedNote));
      }
    } catch(error) {
      handleMessage('更新失败', 'error');
      removeMessage(2000);
    }
  };

  const login = async (userObject) => {
    try {
      const user = await loginService.login(userObject);
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      setUser(user);
      noteService.setToken(user.token);
      handleMessage('登录成功', 'success');
      removeMessage(2000);
      history.push('/notes');
    } catch (exception) {
      handleMessage('用户名或密码不正确', 'error');
      removeMessage(5000);
    }
  };
  // eslint-disable-next-line
  const register = async (newUser) => {
    try {
      const user = await userService.create(newUser);
      handleMessage(`用户 ${user.username} 注册成功，请登录！`, 'success');
      removeMessage(2000);
      history.push('/login');
    } catch(error) {
      handleMessage('您输入的邮箱地址或用户名已被使用', 'error');
      console.dir(error);
      removeMessage(5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
    handleTags([]);
    history.push('/');
  };

  const loginPage = () => (
    <Form heading="登录" message={message} severity={severity} >
      <Login handleLogin={login} />
    </Form>
  );

  const registerPage = () => (
    <Form message={message} heading="注册" severity={severity}>
      <Register handleRegister={register}/>
    </Form>
  );

  const notesProps = {
    notes,
    user,
    handleNotes,
    message,
    severity,
    getLocalDate: helper.getLocalDate,
    compare: helper.compare,
    toggleLikeOf,
    deleteNoteOf,
    updateTagsOf
  };

  const custom = {
    open: sidebar.visibility,
    handleOpen: sidebar.handleVisibility,
    handleLogout,
    message,
    severity,
    createNote: addNote,
    handleShow: modal.handleVisibility,
    show: modal.visibility,
    tags
  };

  const showNotesPage = (notesProps) => (
    <Container>
      <Overlay
        visibility={sidebar.visibility}
        handleClick={sidebar.setHidden}
      />
      <NotesContainer {...custom}>
        <Notes {...notesProps}>
          {
            notes.length > 0
              ? <NoteForm createNote={addNote} />
              : <div>
                <NoteForm createNote={addNote} />
                <DefaultPage icon={<DefaultHomeSvg />} text="写点什么吧？" />
              </div>
          }
        </Notes>
      </NotesContainer>
    </Container>
  );

  const showDetailsPage = () => (
    <Container>
      <Overlay
        visibility={sidebar.visibility}
        handleClick={sidebar.handleVisibility}
      />
      <NotesContainer {...custom}>
        <Details
          id={id}
          getLocalDate={helper.getLocalDate}
        />
      </NotesContainer>
    </Container>
  );

  const showTagsPage = () => (
    <Container>
      <Overlay
        visibility={sidebar.visibility}
        handleClick={sidebar.handleVisibility}
      />
      <NotesContainer {...custom}>
        <Tags
          user={user}
          tags={tags}
          handleTags={handleTags}
        ></Tags>
        {notes.length > 0
          ? null
          : <DefaultPage icon={<DefaultTagsSvg />} text="还没有标签" />
        }
      </NotesContainer>
    </Container>
  );

  return (
    <>
      <Switch>
        <Route path="/tags/:tag">
          { user ? showNotesPage({ ...notesProps, notes: notesOfSpecificTag }) : null }
        </Route>
        <Route path="/tags">
          {user ? showTagsPage : null }
        </Route>
        <Route path="/notes/:id">
          {showDetailsPage()}
        </Route>
        <Route path="/favorites">
          { user ? showNotesPage({ ...notesProps, notes: favoriteNotes }) : null }
        </Route>
        <Route path="/notes">
          { user ? showNotesPage(notesProps) : <Redirect to="/login" /> }
        </Route>
        <Route path="/login">
          { user === null ? loginPage() : <Redirect to="/notes" /> }
        </Route>
        <Route path="/register">
          {registerPage()}
        </Route>
        <Route path="/">
          { user === null ? <Home /> : <Redirect to="/notes" /> }
        </Route>
      </Switch>
    </>
  );
};

export default App;