import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { createContext, useState } from 'react';
import { db } from '../firebase';

export const SuggestionsContext = createContext();

export const SuggestionsProvider = ({ children }) => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async () => {
    try {
        const suggestionsCollection = collection(db, "skill_suggestions");
        const suggestionsSnapshot = await getDocs(
          query(
            suggestionsCollection,
            orderBy("timesubmitted", "desc")
          )
        );
        const suggestionsList = suggestionsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setSuggestions(suggestionsList);
        return suggestionsList;
    } catch (error) {
        console.log("Error getting suggestions data: ", error);
        return null;
    }
  };

  return (
    <SuggestionsContext.Provider value={
      { suggestions, setSuggestions, fetchSuggestions }
    }
    >
      {children}
    </SuggestionsContext.Provider>
  );
};