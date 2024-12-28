import Icon_search from '../../assets/icons/search';
import data_of_skills from '../../data/skills';
import React, { useEffect, useState } from 'react';
import './skills.css';

const AllSkills = React.memo(() => {

    const [searchQuery, setSearchQuery] = useState('');
    const [queriedSkills, setQueriedSkills] = useState(data_of_skills);

    useEffect(() => {
        if(searchQuery === '') {
            setQueriedSkills(data_of_skills);
            return;
        }
        const queried = data_of_skills
            .filter(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase().trim()));
        setQueriedSkills(queried);
    }, [searchQuery]);

    const handleTextChange = (event) => {
        setSearchQuery(event.target.value);
    }

    return(
        <div className="allskills_container neum">

            <div className="upper">
                <div className="searchinput_container">
                    <Icon_search dimension={20} />
                    <input
                        type="text"
                        placeholder="Search Rakha's skill"
                        maxLength={30}
                        onChange={handleTextChange}
                    />
                </div>
            </div>
            
            
            {
                queriedSkills.length === 0
                    ? <div className="nodata_container">
                        <h4>Rakha hasn't learnt this</h4>
                        <p>Suggest Rakha to learn "{searchQuery.trim()}"</p>
                        <br />
                        <div>
                            <button>Suggest</button>
                        </div>
                    </div>
                    : <div className="content scroll-container">
                        {
                            queriedSkills.map((skill, index) => {
                                return <SkillItem key={index} data={skill} />;
                            })
                        }
                    </div>
            }

        </div>
    );
});

const SkillItem = React.memo(({data}) => {
    return(
        <div className="skillitem">
            <img src={`./assets/img/skills/skill_${data.id}.webp`} alt="" />
            <p>{data.name}</p>
        </div>
    );
});

export default AllSkills;