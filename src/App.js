import React, { Component } from 'react';
import Modal from 'react-modal';

import {
  List,
  NoteLine,
} from './components'

import './App.css';

class App extends Component {
  state = {
    note: {
      title: '',
      content: '',
    },
    notes: [],
    selectedNoteIndex: null,
    showCreator: false,
  }

  modalStyle = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
  }

  createNote = () => this.setState(({ notes }) => ({
    notes: [...notes, this.state.note],
    note: { title: '', content: '' },
    showCreator: false,
  }));
  updateNote = field => ({ target: { value } }) => this.setState(({ note }) => ({ note: { ...note, [field]: value } }));

  onNoteClick = (_, idx) => this.setState({ selectedNoteIndex: idx });
  toggleModal = () => this.setState(({ showCreator }) => ({ showCreator: !showCreator }));

  renderNoNotes = () => <p style={{ textAlign: 'center', color: '#e0e0e0' }}>No notes found</p>;
  render() {
    const { notes, showCreator, selectedNoteIndex } = this.state;
    
    return (
      <div className="app">
        <Modal
          isOpen={showCreator}
          onRequestClose={this.toggleModal}
          style={this.modalStyle}
          ariaHideApp={false}>
          <input placeholder="title" value={this.state.note.title} onChange={this.updateNote('title')} />
          <textarea placeholder="content" value={this.state.note.content} onChange={this.updateNote('content')} />
          <button onClick={this.createNote}>Save</button>
          <button>Cancel</button>
        </Modal>
        <List
          items={notes}
          renderNoItemsFallback={this.renderNoNotes}
          renderItem={note => <NoteLine note={note} />}
          onItemClick={this.onNoteClick} />
        <button onClick={this.toggleModal}>New note</button>
        <Modal
          isOpen={selectedNoteIndex !== null}
          onRequestClose={() => this.setState({ selectedNoteIndex : null })}
          style={this.modalStyle}
          ariaHideApp={false}>
          {notes[selectedNoteIndex] && <h1>{notes[selectedNoteIndex].title}</h1>}
          {notes[selectedNoteIndex] && <p>{notes[selectedNoteIndex].content}</p>}
        </Modal>
      </div>
    );
  }
}

export default App;
