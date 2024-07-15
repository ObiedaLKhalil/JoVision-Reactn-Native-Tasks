import React, { createContext, useState } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

// Create a Context
const SharedTextContext = createContext();

// Create a Provider component
const SharedTextProvider = ({ children }) => {
  const [sharedText, setSharedText] = useState('');

  return (
    <SharedTextContext.Provider value={{ sharedText, setSharedText }}>
      {children}
    </SharedTextContext.Provider>
  );
};

export { SharedTextContext, SharedTextProvider };
