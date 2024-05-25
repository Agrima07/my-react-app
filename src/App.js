// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import Navbar from './Navbar';
import './Navbar.css';

function App() {
  const [displayOption, setDisplayOption] = useState('todo');
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState(-1);
  const [currentEditedItem, setCurrentEditedItem] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedIndex, setEditedIndex] = useState(-1);
  

  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem('todolist'));
    const savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) {
      setTodos(savedTodo.filter(todo => todo !== null));
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo.filter(todo => todo !== null));
    }
  }, []);

  const handleAddTodo = () => {
    if (newTitle.trim() === '' || newDescription.trim() === '') {
      alert('Title and Description cannot be empty');
      return;
    }

    const newTodoItem = {
      title: newTitle,
      description: newDescription,
      isImportant: false,
    };

    const updatedTodoArr = [...allTodos, newTodoItem];
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    setNewTitle('');
    setNewDescription('');
  };

  const handleDeleteTodo = (index) => {
    const reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo.filter(todo => todo !== null)));
    setTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    const now = new Date();
    const completedOn = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    const filteredItem = {
      ...allTodos[index],
      completedOn,
    };

    const updatedCompletedArr = [...completedTodos, filteredItem];
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompletedTodo = (index) => {
    const reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo.filter(todo => todo !== null)));
    setCompletedTodos(reducedTodo);
  };

  const handleEdit = (ind, item) => {
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
    setEditedTitle(item.title);
    setEditedDescription(item.description);
    setEditedIndex(ind);
  };

  const handleUpdateTitle = (value) => {
    setEditedTitle(value);
  };

  const handleUpdateDescription = (value) => {
    setEditedDescription(value);
  };

  const handleUpdateToDo = () => {
    const newToDo = [...allTodos];
    newToDo[editedIndex] = { ...newToDo[editedIndex], title: editedTitle, description: editedDescription };
    setTodos(newToDo);
    setCurrentEdit(-1);
    localStorage.setItem('todolist', JSON.stringify(newToDo.filter(todo => todo !== null)));
  };

  const handleToggleImportant = (index) => {
    const updatedTodos = [...allTodos];
    if (updatedTodos[index]) {
      updatedTodos[index] = { ...updatedTodos[index], isImportant: !updatedTodos[index].isImportant };
      setTodos(updatedTodos);
      localStorage.setItem('todolist', JSON.stringify(updatedTodos.filter(todo => todo !== null)));
    }
  };

  const filteredTodos = () => {
    switch (displayOption) {
      case 'completed':
        return completedTodos;
      case 'todo':
        return allTodos.filter(todo => todo && !todo.completedOn);
      case 'important':
        return allTodos.filter(todo => todo && todo.isImportant);
      default:
        return [...allTodos.filter(todo => todo !== null), ...completedTodos.filter(todo => todo !== null)];
    }
  };

  return (
    <div className="App">
      <h1>TaskBliss</h1>

      <Navbar activeOption={displayOption} onOptionChange={setDisplayOption} />

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the task description?"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>

        <div className="todo-list">
          {filteredTodos().map((item, index) => {
            if (!item) return null; // Skip null items

            const isEditing = currentEdit === index;

            return (
              <div className={`todo-list-item ${isEditing ? 'editing' : ''}`} key={index}>
                <div>
                  {isEditing ? (
                    <>
                      <input className='editedtitle'
                        type="text"
                        value={editedTitle}
                        onChange={(e) => handleUpdateTitle(e.target.value)}
                      />
                      <input className='editeddes'
                        type="text"
                        value={editedDescription}
                        onChange={(e) => handleUpdateDescription(e.target.value)}
                      />
                      <button className="update" onClick={handleUpdateToDo}>Update</button>
                      
                    </>
                  ) : (
                    <>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      {item.completedOn && (
                        <p>
                          <small>Completed on: {item.completedOn}</small>
                        </p>
                      )}
                    </>
                  )}
                </div>
                <div>
                  {displayOption === 'completed' ? (
                    <>
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDeleteCompletedTodo(index)}
                        title="Delete?"
                      />
                    </>
                  ) : (
                    <>
                      {!item.completedOn && (
                        <>
                          <AiOutlineDelete
                            className="icon"
                            onClick={() => handleDeleteTodo(index)}
                            title="Delete?"
                          />
                          <BsCheckLg
                            className="check-icon"
                            onClick={() => handleComplete(index)}
                            title="Complete?"
                          />
                          <AiOutlineEdit
                            className="check-icon"
                            onClick={() => handleEdit(index, item)}
                            title="Edit?"
                          />
                          <input className="checkbox"
                            type="checkbox"
                            checked={item.isImportant}
                            onChange={() => handleToggleImportant(index)}
                          />
                          <label></label>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
