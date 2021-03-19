import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    type,
    value,
    onChange,
    reset
  };
};

export const useMessage = () => {
  const [message, setMessage] = useState(null);

  const handleMessge = (message) => {
    setMessage(message);
  };

  const removeMessage = (timer) => {
    setTimeout(() => {
      setMessage(null);
    }, timer);
  };

  const helper = {
    handleMessge,
    removeMessage
  };

  return [message, helper];
};

export const useResource = () => {
  const [resources, setResources] = useState([]);

  // Initializing notes state when Notes page is firstly redered.
  const handleNotes= notes => {
    setResources(notes);
  };

  const helper = {
    handleNotes,
  };

  return [resources, helper];
};
