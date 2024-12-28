import { collection, getDocs } from 'firebase/firestore';
import React, { createContext, useState } from 'react';
import { db } from '../firebase';

export const SkillsContext = createContext();

export const SkillsProvider = ({ children }) => {
  const [skills, setSkills] = useState(null);

  const fetchSkills = async () => {
    try {
        const skillsCollection = collection(db, "skills");
        const skillsSnapshot = await getDocs(skillsCollection);
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
  };

  return (
    <SkillsContext.Provider value={{ skills, setSkills, fetchSkills }}>
      {children}
    </SkillsContext.Provider>
  );
};