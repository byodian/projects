import React, { useState } from 'react';
import {
  Switch, 
  Route, 
  Link,
  Redirect,
  useHistory,
  useRouteMatch
} from 'react-router-dom';

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  TextField,
  AppBar,
  Toolbar,
  IconButton
} from '@material-ui/core'

import { Alert } from '@material-ui/lab';

const Menu = ({ user }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Button color="inherit" component={Link} to="/">
          home
        </Button>
        <Button color="inherit" component={Link} to="/notes">
          notes
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <Button color="inherit">
          {user
            ? <em>{user} logged in</em>
            : <Link to="/login">login</Link>
          }
        </Button>
      </Toolbar>
    </AppBar>
  )
};

const Login = (props) => {
  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    props.onLogin('mluukkai');
    history.push('/');
  };

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <TextField label="username" />
        </div>
        <div>
          <TextField label="password" type="password" />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">login</Button>
        </div>
      </form>
    </div>
  );
};

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
};

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
        {notes.map(note => 
          <TableRow key={note.id}>
            <TableCell>
              <Link to={`/notes/${note.id}`}>{note.content}</Link>
            </TableCell>
            <TableCell>
              {note.user}
            </TableCell>
          </TableRow>
        )}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);

const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>byodian</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
);

const Home = () => (
  <div>
    <h2>TKTL notes app</h2>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
  </div>
);

const App = () => {
  // eslint-disable-next-line
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only Javascript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const login = (user) => {
    setUser(user);
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null);
    }, 1000);
  };

  const match = useRouteMatch('/notes/:id');
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  return (
    <Container>
      {(message &&
        <Alert severity="success">
          {message}
        </Alert>
      )}
      <Menu user={user}/>

      <Switch>
        <Route path="/login">
          <Login onLogin={login} />
        </Route>
        <Route path="/notes/:id">
          <Note note={note} />
        </Route>
        <Route path="/notes">
          <Notes notes={notes} />
        </Route>
        <Route path="/users">
          {user ? <Users /> : <Redirect to="/login" />}
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <div><i>Note app, Department of Computer Science 2021</i></div>
    </Container>
  )
};

export default App;