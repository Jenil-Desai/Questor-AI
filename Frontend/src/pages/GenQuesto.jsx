import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../components/global/Navbar';
import { TypewriterEffectSmooth } from '../components/ui/TypeWritter';
import { BackgroundBeamsWithCollision } from '../components/ui/BackgroundBeam';
import Footer from '../components/global/Footer';

const GenQuesto = () => {
  const [questions, setQuestions] = useState([{ id: uuidv4(), type: '', marks: '', number: '' }]);

  const words = [
    { text: 'Build Question Paper With Questor-Ai!', className: 'text-red-500' },
  ];

  const handleChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { id: uuidv4(), type: '', marks: '', number: '' }]);
  };

  const handleSubmit = () => {
    console.log(questions);
  };

  const handleReset = () => {
    setQuestions([{ id: uuidv4(), type: '', marks: '', number: '' }]);
  };

  const handleOnDragEnd = (result) => {
    // Only proceed if destination is defined (item was dropped)
    if (!result.destination) return;

    const newQuestions = [...questions]; // Copy the questions array

    // Remove the item from its current position
    const [reorderedItem] = newQuestions.splice(result.source.index, 1);

    // Insert the item at the new position
    newQuestions.splice(result.destination.index, 0, reorderedItem);

    // Update state with the new order
    setQuestions(newQuestions);
  };

  return (
    <BackgroundBeamsWithCollision>
      <div style={containerStyle}>
        <Navbar />
        <br /><br /><br /><br />
        <div className='text-center flex justify-center'>
          <TypewriterEffectSmooth words={words} className="text-center" />
        </div>
        <div style={formContainerStyle}>
          <h2 style={headerStyle}>Question Generator</h2>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="questions">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {questions.map((question, index) => (
                    <Draggable key={question.id} draggableId={question.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            ...questionStyle,
                          }}
                        >
                          <label style={labelStyle}>
                            Question Type:
                            <select
                              value={question.type}
                              onChange={(e) => handleChange(index, 'type', e.target.value)}
                              style={selectStyle}
                            >
                              <option value="">Select Type</option>
                              <option value="MCQ">MCQ</option>
                              <option value="Blanks">Blanks</option>
                              <option value="Question Answer">Question Answer</option>
                              <option value="Short Answer">Short Answer</option>
                            </select>
                          </label>
                          <label style={labelStyle}>
                            Marks:
                            <input
                              type="number"
                              value={question.marks}
                              onChange={(e) => handleChange(index, 'marks', e.target.value)}
                              min="1"
                              style={inputStyle}
                            />
                          </label>
                          <label style={labelStyle}>
                            Number of Questions:
                            <input
                              type="number"
                              value={question.number}
                              onChange={(e) => handleChange(index, 'number', e.target.value)}
                              min="1"
                              style={inputStyle}
                            />
                          </label>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <button onClick={addQuestion} style={addButtonStyle}>Add Question</button>
          <div style={buttonContainerStyle}>
            <button onClick={handleSubmit} style={buttonStyle}>Submit</button>
            <button onClick={handleReset} style={buttonStyle}>Reset</button>
          </div>
        </div>
      </div>
     
    </BackgroundBeamsWithCollision>
  );
};

// Styles (same as before)
const containerStyle = {
  color: '#E0E0E0',
  minHeight: '100vh',
  padding: '20px',
  width: '100vw',
};

const formContainerStyle = {
  padding: '20px',
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#1E1E1E',
  borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  fontSize: '24px',
};

const questionStyle = {
  margin: '15px 0',
  border: '1px solid #444',
  padding: '10px',
  borderRadius: '5px',
  backgroundColor: '#2C2C2C',
};

const labelStyle = {
  display: 'block',
  margin: '10px 0 5px',
  fontWeight: 'bold',
};

const selectStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #444',
  backgroundColor: '#333',
  color: '#E0E0E0',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #444',
  backgroundColor: '#333',
  color: '#E0E0E0',
};

const buttonContainerStyle = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'space-between',
};

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '5px',
  backgroundColor: '#6c63ff',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

const addButtonStyle = {
  margin: '20px 0',
  padding: '10px 20px',
  borderRadius: '5px',
  backgroundColor: '#FF9800',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  display: 'block',
  width: '100%',
};

export default GenQuesto;