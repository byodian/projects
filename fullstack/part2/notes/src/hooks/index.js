import { useState, useEffect } from 'react';
import axios from 'axios';

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

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(async () => {
    try {
      const request = await axios.get(baseUrl);
      setResources(request.data.notes);
    } catch(error) {
      console.log(error.message);
    }
  }, []);

  const service = {
  };

  return [resources, service];
};
