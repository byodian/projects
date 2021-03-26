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
    reset,
    onChange,
  };
};

export const useMessage = () => {
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState('');

  const handleMessage = (message, severityType) => {
    setMessage(message);
    setSeverity(severityType);
  };

  const removeMessage = (timer) => {
    setTimeout(() => {
      setMessage(null);
    }, timer);
  };

  const helper = {
    handleMessage,
    removeMessage,
    severity
  };

  return [message, helper];
};

export const useResource = (type) => {
  const [resources, setResources] = useState(type);

  // Initializing notes state when Notes page is firstly redered.
  const handleNotes= notes => {
    setResources(notes);
  };

  const helper = {
    handleNotes,
  };

  return [resources, helper];
};

export const useVisibility = (bool) => {
  const [visibility, setVisibility] = useState(bool);

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  return {
    visibility,
    handleVisibility
  };
};