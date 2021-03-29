import React, { useEffect, useState } from 'react';
import noteService from './components/services/note';
import loginService from './components/services/login';
import NoteForm from './components/NoteForm';
import Login from './page/Form/Login';
import Register from './page/Form/Register';
import Form from './page/Form';
import Home from './page/Home';
import Notes from './page/Notes';
import Details from './page/Details';
import NotesContainer from './components/NotesContainer';
import { useResource, useMessage, useVisibility } from './hooks';
import './assets/styles/main.scss';
import { Container } from './AppElements';
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useRouteMatch
} from 'react-router-dom';

const App = () => {
  const [notes, { handleNotes }] = useResource([]);
  const [message, { handleMessage, removeMessage, severity }] = useMessage();
  const [user, setUser] = useState(null);
  const modal = useVisibility(false);
  const sidebar = useVisibility(false);
  const history = useHistory();

  const compare = (a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
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

  const favoriteNotes = notes.filter(n => n.like);

  const addNote = async (noteObject) => {
    try {
      const returnedNote = await noteService.create(noteObject);
      handleNotes(notes.concat(returnedNote).sort(compare));
      handleMessage('保存成功', 'success');
      removeMessage(2000);
    } catch(exception) {
      handleMessage('内容不能为空或字数不能少于八', 'error');
      removeMessage(2000);
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
        removeMessage(2000);

      }
    } catch(error) {
      handleMessage('删除失败', 'error');
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
    } catch (exception) {
      handleMessage('用户名或密码不正确', 'error');
      removeMessage(4000);
    }
  };

  const register = () => {
    console.log(123);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
    history.push('/login');
  };

  const loginPage = () => (
    <Form heading="登录" message={message}>
      <Login handleLogin={login}/>
    </Form>
  );

  const registerPage = () => (
    <Form message={message} heading="注册">
      <Register handleRegister={register}/>
    </Form>
  );

  const getLocalDate = (date) => {
    const d = new Date(date);
    const localTime = d.toLocaleTimeString('en', { hour12: false });
    const localDate = d.toLocaleDateString('zh-cn').replace(/\//g, '-');
    return `${localDate} ${localTime}`;
  };

  const notesProps = {
    notes,
    user,
    handleNotes,
    message,
    severity,
    getLocalDate,
    compare,
    toggleLikeOf,
    deleteNoteOf
  };

  const favoriteNotesProps = {
    ...notesProps,
    notes: favoriteNotes,
  };

  const custom = {
    open: sidebar.visibility,
    handleOpen: sidebar.handleVisibility,
    handleLogout,
    message,
    severity,
    createNote: addNote,
    handleShow: modal.handleVisibility,
    show: modal.visibility
  };

  const showNotesPage = (notesProps) => (
    <Container isOpen={sidebar.visibility}>
      <NotesContainer {...custom}>
        <Notes {...notesProps}>
          <NoteForm createNote={addNote} />
        </Notes>
      </NotesContainer>
    </Container>
  );

  const showDetailsPage = () => (
    <Container isOpen={sidebar.visibility}>
      <NotesContainer {...custom}>
        <Details
          id={id}
          getLocalDate={getLocalDate}
        />
      </NotesContainer>
    </Container>
  );

  return (
    <>
      <Switch>
        <Route path="/notes/:id">
          {showDetailsPage()}
        </Route>
        <Route path="/favorites">
          { user ? showNotesPage(favoriteNotesProps) : null }
        </Route>
        <Route path="/notes">
          { user ? showNotesPage(notesProps) : null }
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