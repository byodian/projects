const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
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
      important: true,
    };

    await api
      .post('/api/notes')
      .send(newNote)
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
      important : true,
    };

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400);
      
    const notesAtEnd = await helper.notesInDb();

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
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
  test('succeeds with statuscode if id is valid', async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToChange = notesAtStart[0];
    
    const newNote = {
      content: 'JavaScript is hard',
      important: true
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

afterAll(() => {
  mongoose.connection.close();
});