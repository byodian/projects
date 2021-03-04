const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');
const Note = require('../models/note');

/* eslint-disable no-undef*/

beforeEach(async () => {
  await Note.deleteMany({});

  const noteObjects = helper.initialNotes
    .map(note => new Note(note));
  const promiseArray = noteObjects.map(note => note.save());
  await Promise.all(promiseArray);
});

describe('REST API test', () => {
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

  test('a valid note can be added', async () => {
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

  test('note without content is not added', async () => {
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

  test('a specific note can be viewed', async () => {
    const notesAtEnd = await helper.notesInDb();

    const noteToView = notesAtEnd[0];
    console.log(typeof noteToView.date);

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /json/);
    
    console.log(typeof resultNote.body.date);
  
    const processedNoteToView = JSON.parse(JSON.stringify(noteToView));
    expect(resultNote.body).toEqual(processedNoteToView);
  });

  test('a specific note can be changed', async () => {
    const notesAtStart = await helper.notesInDb();
    console.log(notesAtStart); 
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
    console.log(notesAtEnd);

    const processedNoteToChange = JSON.parse(JSON.stringify(notesAtEnd[0]));
    expect(resultNote.body).toEqual(processedNoteToChange);
  });

  test('a note can be deleted', async () => {
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

afterAll(() => {
  mongoose.connection.close();
});