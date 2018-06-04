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

  componentDidMount() {
    try {
      const persistentState = JSON.parse(localStorage.getItem('state'));
      this.setState({
        notes: persistentState.notes,
        note: persistentState.note,
      });
    } catch (e) {
      console.log('No previous state');
    }
  }

  setPersistentState = (update) => this
    .setState(update, () => localStorage.setItem('state', JSON.stringify(this.state)));

  createNote = () => this.setPersistentState(({ notes }) => ({
    notes: [...notes, this.state.note],
    note: { title: '', content: '' },
    showCreator: false,
  }));
  updateNote = field => ({ target: { value } }) => this.setPersistentState(({ note }) => ({ note: { ...note, [field]: value } }));
  canSaveNote = () => !!this.state.note.title || !!this.state.note.content;

  onNoteClick = (_, idx) => this.setState({ selectedNoteIndex: idx });
  toggleModal = () => this.setState(({ showCreator }) => ({ showCreator: !showCreator }));

  handleKeyPress = (event) => {
    if(event.key === 'Enter' && this.canSaveNote()){
      this.createNote();
    }
  }

  renderNoNotes = () => <p style={{ textAlign: 'center' }}>No notes found</p>;
  render() {
    const { notes, showCreator, selectedNoteIndex } = this.state;
    
    return (
      <div className="app">
        <Modal
          isOpen={showCreator}
          onRequestClose={this.toggleModal}
          style={this.modalStyle}
          ariaHideApp={false}>
          <input
            placeholder="title"
            value={this.state.note.title}
            onChange={this.updateNote('title')}
            onKeyPress={this.handleKeyPress} />
          <textarea
            placeholder="content"
            value={this.state.note.content}
            onChange={this.updateNote('content')}
            onKeyPress={this.handleKeyPress} />
          <div className="buttons" style={{ float: 'right' }}>
            <button disabled={!this.canSaveNote()} onClick={this.createNote}>Save</button>
            <button onClick={this.toggleModal}>Cancel</button>
          </div>
        </Modal>
        <List
          items={notes}
          renderNoItemsFallback={this.renderNoNotes}
          renderItem={note => <NoteLine note={note} />}
          onItemClick={this.onNoteClick} />
        <button style={{ width: '100%' }} onClick={this.toggleModal}>Create note</button>
        <Modal
          isOpen={selectedNoteIndex !== null}
          onRequestClose={() => this.setState({ selectedNoteIndex : null })}
          style={this.modalStyle}
          ariaHideApp={false}>
          {notes[selectedNoteIndex] && <NoteLine note={notes[selectedNoteIndex]} />}
        </Modal>
      </div>
    );
  }
}

export default App;
