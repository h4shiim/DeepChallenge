import React, { useState } from 'react';

const ChallengeForm = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [participants, setParticipants] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    const newChallenge = {
      title,
      description,
      startDate,
      endDate,
      participants
    };
    onCreate(newChallenge);
    setTitle('');
    setDescription('');
    setStartDate('');
    setEndDate('');
    setParticipants([]);
  };

  return (
    <div className="challenge-form">
      <h2>Create Challenge</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        <label>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} required />
        <label>Start Date</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
        <label>End Date</label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
        <label>Participants</label>
        <input type="text" value={participants} onChange={e => setParticipants(e.target.value.split(','))} required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default ChallengeForm;
