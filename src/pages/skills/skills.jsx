import Icon_search from '../../assets/icons/search';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { SkillsContext } from '../../providers/skillsProvider';
import { SuggestionsContext } from '../../providers/suggestionsProvider';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import './skills.css';

const AllSkills = React.memo(() => {

    const [isInSuggestionForm, setIsInSuggestionForm] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    
    // SKILL DATA
    const {skills} = useContext(SkillsContext);
    const [queriedSkills, setQueriedSkills] = useState(skills);
    
    // SUGGESTION DATA
    const {suggestions} = useContext(SuggestionsContext);
    const [queriedSuggestions, setQueriedSuggestions] = useState(suggestions);


    useEffect(() => {
        if(searchQuery === '') {
            setQueriedSkills(skills);
            setQueriedSuggestions(suggestions);
            return;
        }
        if (activeSectionIndex === 0) {
            const queried = skills
                .filter(skill => 
                    skill.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
                    || skill.category.toLowerCase().includes(searchQuery.toLowerCase().trim())
                );
            setQueriedSkills(queried);
        }
        else if (activeSectionIndex === 1) {
            const queried = suggestions
                .filter(suggestion => 
                    suggestion.skill.toLowerCase().includes(searchQuery.toLowerCase().trim())
                    || suggestion.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
                );
            setQueriedSuggestions(queried);
        }
    }, [searchQuery]);

    const handleTextChange = (event) => {
        setSearchQuery(event.target.value);
    }

    const onSuggestionFormSubmitted = () => {
        setIsInSuggestionForm(false);
        setSearchQuery('');
        setActiveSectionIndex(0);
    }



    const contentRef = useRef();
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const switchSection = () => {
        if (contentRef.current) {
            contentRef.current.scrollTo({
                left: window.innerWidth * .5 * activeSectionIndex,
                behavior: 'smooth'
            });
        }
    }
    
    useEffect(() => {
        setSearchQuery('');
        switchSection();
    }, [activeSectionIndex]);


    useEffect(() => {

        const handleResize = () => {
            switchSection();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);


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
                                    placeholder={
                                        activeSectionIndex === 0
                                        ? "Search Rakha's skills"
                                        : "Search suggested skills"
                                    }
                                    maxLength={30}
                                    onChange={handleTextChange}
                                    value={searchQuery}
                                />
                            </div>
                        </div>

                        <div className="section_upperbuttons">
                            <div className="nav_btns_container">
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
                            <div className="suggest_btn_container">
                                <button onClick={() => setIsInSuggestionForm(true)}>+ Suggest</button>
                            </div>
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

                            <div className="suggested scroll-container">
                                {
                                    queriedSuggestions.length === 0
                                    ? <div className="nodata_container"></div>
                                    : queriedSuggestions.map((suggestion, index) => {
                                        return <SuggestionItem key={index} data={suggestion} />;
                                    })
                                }
                            </div>
                        </div>
                    </>
            }


        </div>
    );
});



// SKILL ITEM COMPONENT

const SkillItem = React.memo(({data}) => {

    const formatTimeStamp = (time) => {
        const date = time.toDate();
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



// SKILL ITEM COMPONENT

const SuggestionItem = React.memo(({data}) => {

    const formatTimeStamp = (time) => {
        const date = time.toDate();
        const formatter = new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        return formatter.format(date);
    }

    return(
        <div className="skillitem">
            <div className="maininfo">
                <p>{data.skill}</p>
                <p>Suggested by {data.name}</p>
            </div>
            <div className='dateinfo'>
                <p>
                    Suggested on
                    <br />
                    {formatTimeStamp(data.timesubmitted)}
                </p>
            </div>
        </div>
    );
});




// FORM TO SUGGEST A SKILL

const SkillSuggestionForm = React.memo(({initializedSkill, onBack}) => {

    const {fetchSuggestions} = useContext(SuggestionsContext);

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
            await fetchSuggestions();
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
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    onChange={handleChangeName}
                                    maxLength={30}
                                />
                            </div>
                            <div className="input_container">
                                <input
                                    type="text"
                                    placeholder="Skill to suggest"
                                    onChange={handleChangeSkill}
                                    value={suggestedSkill}
                                    maxLength={30}
                                />
                            </div>
                            <p className={invalid ? 'invalid_active' : 'invalid'}>
                                Fill all the inputs!
                            </p>
                        </div>
                        <div className="btns_container">
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
                            <div>
                                <button
                                    className='btn_cancel'
                                    onClick={onBack}
                                >Cancel</button>
                            </div>
                        </div>
                    </>
            }
        </div>
    );
});

export default AllSkills;