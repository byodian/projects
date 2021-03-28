const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const app = require('../app');
const api = supertest(app);

const Note = require('../models/note');

/* eslint-disable no-undef*/

beforeEach(async () => {
  await Note.deleteMany({});

  // Make sure a specifc order executed
  for (let note of helper.initialNotes) {
    let noteObject = new Note(note);
    await noteObject.save();
  }
});

describe('when there is initially some notes saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /json/);
  });
  
  test('all notes are returned', async () => {
    const response = await api.get('/api/notes');
    expect(response.body).toHaveLength(helper.initialNotes.length);
  });
  
  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes');
    const contents = response.body.map(r => r.content);
    expect(contents).toContain('HTML is easy');
  });
});

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const notesAtEnd = await helper.notesInDb();
    const noteToView = notesAtEnd[0];

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /json/);
    
    const processedNoteToView = JSON.parse(JSON.stringify(noteToView));
    expect(resultNote.body).toEqual(processedNoteToView);
  });

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingid = await helper.nonExistingId();

    await api
      .get(`/api/notes/${validNonexistingid}`)
      .expect(404);
  });

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445';

    await api
      .get(`/api/notes/${invalidId}`)
      .expect(400);
  });
});

describe('addition of a new note', () => {
  test('succeeds with valid data', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      like: true,
    };

    const rootuser = {
      username: 'root',
      password: 'sekret'
    };
    
    const response = await api
      .post('/api/login')
      .send(rootuser)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body.username).toBe(rootuser.username);

    await api
      .post('/api/notes')
      .send(newNote)
      .set('Authorization', `bearer ${response.body.token}`)
      .expect(200)
      .expect('Content-Type', /json/);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

    const contents = notesAtEnd.map(r => r.content);
    expect(contents).toContain(
      'async/await simplifies making async calls'
    );
  });

  test('fails with status code 400 if data is invaild', async () => {
    const newNote = {
      like : true,
    };

    const rootuser = {
      username: 'root',
      password: 'sekret'
    };

    const response = await api
      .post('/api/login')
      .send(rootuser)
      .expect(200);

    await api
      .post('/api/notes')
      .send(newNote)
      .set('Authorization', `bearer ${response.body.token}`)
      .expect(400);
      
    const notesAtEnd = await helper.notesInDb();

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
  });

  test('fails with status code 401 if authorizarion is not setted', async () => {
    const notesAtStart = await helper.notesInDb();
    const newNote = {
      content: 'This note is not added',
      like: false
    };

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(401);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(notesAtStart.length);
  });
});

describe('deletion of a note', () => {
  test('succeeds with statuscode 204 if id is valid', async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToDelete = notesAtStart[0];

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204);

    const notesAtEnd = await helper.notesInDb();
    
    expect(notesAtEnd).toHaveLength(
      helper.initialNotes.length - 1
    );

    const contents = notesAtEnd.map(r => r.content);

    expect(contents).not.toContain(noteToDelete.content);
  });
});

describe('updating a specific note', () => {
  test('succeeds with statuscode 200 if id is valid', async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToChange = notesAtStart[0];
    
    const newNote = {
      content: 'JavaScript is hard',
      like: true
    };

    const resultNote = await api
      .put(`/api/notes/${noteToChange.id}`)
      .send(newNote)
      .expect(200)
      .expect('Content-Type', /json/);

    const notesAtEnd = await helper.notesInDb();

    const processedNoteToChange = JSON.parse(JSON.stringify(notesAtEnd[0]));
    expect(resultNote.body).toEqual(processedNoteToChange);
  });
});

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('sekret', 10);

    const user = new User({ username: 'root', name: 'superuser', passwordHash });
    await user.save();
  });

  test('creation fails with proper satuscode and message if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'superuser',
      password: 'selegrina'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /json/);
    
    expect(result.body.error).toContain('`username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });
});



afterAll(() => {
  mongoose.connection.close();
});