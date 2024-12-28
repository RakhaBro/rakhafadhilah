import Icon_search from '../../assets/icons/search';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { SkillsContext } from '../../providers/skillsProvider';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import './skills.css';

const AllSkills = React.memo(() => {

    const [isInSuggestionForm, setIsInSuggestionForm] = useState(false);

    // SKILL DATA
    const {skills, setSkills} = useContext(SkillsContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [queriedSkills, setQueriedSkills] = useState(skills);

    useEffect(() => {
        if(searchQuery === '') {
            setQueriedSkills(skills);
            return;
        }
        const queried = skills
            .filter(skill => 
                skill.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
                || skill.category.toLowerCase().includes(searchQuery.toLowerCase().trim())
            );
        setQueriedSkills(queried);
    }, [searchQuery]);

    const handleTextChange = (event) => {
        setSearchQuery(event.target.value);
    }

    const onSuggestionFormSubmitted = () => {
        setIsInSuggestionForm(false);
        setSearchQuery('');
    }



    const contentRef = useRef();
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTo({
                left: window.innerWidth * .5 * activeSectionIndex,
                behavior: 'smooth'
            });
        }
    }, [activeSectionIndex]);


    return(
        <div className="allskills_container neum">

            {
                isInSuggestionForm
                    ? <SkillSuggestionForm
                        initializedSkill={searchQuery}
                        onBack={onSuggestionFormSubmitted}
                    />
                    : <>
                        <div className="upper">
                            <div className="input_container">
                                <Icon_search dimension={20} />
                                <input
                                    type="text"
                                    placeholder="Search Rakha's skill"
                                    maxLength={30}
                                    onChange={handleTextChange}
                                />
                            </div>
                        </div>

                        <div className="section_navigation">
                            <button
                                onClick={() => setActiveSectionIndex(0)}
                                className={activeSectionIndex == 0 ? 'active_section' : null}
                            >
                                <p>Studied</p>
                            </button>
                            <button
                                onClick={() => setActiveSectionIndex(1)}
                                className={activeSectionIndex == 1 ? 'active_section' : null}
                            >
                                <p>People Suggestions</p>
                            </button>
                        </div>
                        
                        <div className="content" ref={contentRef}>
                            <div className="studied scroll-container">
                                {
                                    queriedSkills.length === 0
                                    ? <div className="nodata_container">
                                        <h4>Rakha hasn't learnt this</h4>
                                        <p>Suggest Rakha to learn "{searchQuery.trim()}"</p>
                                        <br />
                                        <div>
                                            <button
                                                onClick={() => setIsInSuggestionForm(true)}
                                            >Suggest</button>
                                        </div>
                                    </div>
                                    : queriedSkills.map((skill, index) => {
                                        return <SkillItem key={index} data={skill} />;
                                    })
                                }
                            </div>

                            <div className="suggested"></div>
                        </div>
                    </>
            }


        </div>
    );
});



// SKILL ITEM COMPONENT

const SkillItem = React.memo(({data}) => {

    const formatTimeStamp = () => {
        const date = data.since.toDate();
        const formatter = new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        return formatter.format(date);
    }

    return(
        <div className="skillitem">
            <img src={`./assets/img/skills/skill_${data.id}.webp`} alt="" />
            <div className="maininfo">
                <p>{data.name}</p>
                <p>{data.category}</p>
            </div>
            <div className='dateinfo'>
                <p>
                    Since
                    <br />
                    {formatTimeStamp(data.since)}
                </p>
            </div>
        </div>
    );
});




// FORM TO SUGGEST A SKILL

const SkillSuggestionForm = React.memo(({initializedSkill, onBack}) => {

    const [name, setName] = useState('');
    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    const [suggestedSkill, setSuggestedSkill] = useState(initializedSkill ?? "");
    const handleChangeSkill = (event) => {
        setSuggestedSkill(event.target.value);
    }

    const [invalid, setInvalid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const submit = async () => {
        if (isSubmitting) {
            return;
        }
        if (name.trim() == "" || suggestedSkill.trim() == "") { 
            setInvalid(true);
            return;
        }
        setInvalid(false);
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'skill_suggestions'), {
                name: name,
                skill: suggestedSkill,
                timesubmitted: Timestamp.now()
            });
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error adding suggestion: ', error);
        }
        setIsSubmitting(false);
        setTimeout(() => {       
            onBack();
        }, 3000);
    }

    return(
        <div className="suggestionform_container">
            {
                isSubmitted
                    ? <div>
                        <h2>Thank you for your suggestion!</h2>
                        <br />
                        <p>I will consider to explore the tech you suggest!</p>
                    </div>
                    : <>
                        <h2>Suggest Rakha to learn!</h2>
                        <div className="inputs">
                            <div className="input_container">
                                <input type="text" placeholder="Your name" onChange={handleChangeName} />
                            </div>
                            <div className="input_container">
                                <input
                                    type="text"
                                    placeholder="Skill to suggest"
                                    onChange={handleChangeSkill}
                                    value={initializedSkill}
                                />
                            </div>
                            <p className={invalid ? 'invalid_active' : 'invalid'}>
                                Fill all the inputs!
                            </p>
                        </div>
                        <div>
                            <button
                                className={
                                    isSubmitting || name.trim() == "" || suggestedSkill.trim() == ""
                                    ? "disabled"
                                    : null
                                }
                                onClick={submit}
                            >
                                Send suggestion
                            </button>
                        </div>
                    </>
            }
        </div>
    );
});

export default AllSkills;