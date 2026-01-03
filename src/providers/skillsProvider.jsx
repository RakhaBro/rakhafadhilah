import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import React, { createContext, useState, useMemo, useCallback } from 'react';
import { db } from '../firebase';

export const SkillsContext = createContext();

export const SkillsProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);

  const fetchSkills = useCallback(async () => {
    try {
        const skillsCollection = collection(db, "skills");
        const skillsSnapshot = await getDocs(
          query(
            skillsCollection,
            orderBy("since", "desc"),
            limit(100)
          )
        );
        const skillsList = skillsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSkills(skillsList);
        return skillsList;
    } catch (error) {
        console.log("Error getting skills data: ", error);
        return null;
    }
  }, []);

  const value = useMemo(() => ({
    skills, setSkills, fetchSkills
  }), [skills, fetchSkills]);

  return (
    <SkillsContext.Provider value={value}>
      {children}
    </SkillsContext.Provider>
  );
};