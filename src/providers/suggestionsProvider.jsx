import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import React, { createContext, useState, useMemo, useCallback } from 'react';
import { db } from '../firebase';

export const SuggestionsContext = createContext();

export const SuggestionsProvider = ({ children }) => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = useCallback(async () => {
    try {
        const suggestionsCollection = collection(db, "skill_suggestions");
        const suggestionsSnapshot = await getDocs(
          query(
            suggestionsCollection,
            orderBy("timesubmitted", "desc"),
            limit(100)
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
  }, []);

  const value = useMemo(() => ({
    suggestions, setSuggestions, fetchSuggestions
  }), [suggestions, fetchSuggestions]);

  return (
    <SuggestionsContext.Provider value={value}>
      {children}
    </SuggestionsContext.Provider>
  );
};