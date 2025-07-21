import React, { use, useEffect, useRef, useState } from 'react'
import {
    LuMapPinHouse, LuMail, LuPhone, LuRss, LuGithub, LuUser,
} from "react-icons/lu"
import { RiLinkedinLine } from "react-icons/ri"
import ContactInfo from '../ResumeSection/ContactInfo';
import EducationInfo from '../ResumeSection/EducationInfo';
import formatYearMonth from '../../utils/helper'
import { data } from 'react-router-dom';
import WorkExperienceForm from '../../pages/ResumeUpdate/Forms/WorkExperienceForm';
import WorkExperience from '../ResumeSection/WorkExperience';
import LanguageSection from '../ResumeSection/LanguageSection'

const DEFAULT_THEME = ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"];

const Title = ({ text, color }) => {
    return (
        <div className='relative w-fit mb-2.5'>
            <span 
                className='absolute bottom-0 left-0 w-full h-2'
                style={{ backgroundColor: color }}
            ></span>

            <h2 className='relative text-sm font-bold'>
                {text}
            </h2>
         </div>
    );
};



const TemplateOne = ({resumeData, colorPalette, containerWidth}) => {
    const themeColor = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;

    const resumeRef = useRef(null);
    const [baseWidth , setBaseWidth] = useState(800) // default value 
    const [scale, setScale] = useState(1);

    useEffect(() => {
        // calculate the scale factor based on the container width
        const actualBaseWidth = resumeRef.current.offsetWidth;
        setBaseWidth(actualBaseWidth);  // get the actual base width 
        setScale(containerWidth / baseWidth);
    }, [containerWidth]);

  return (
    <div
        ref={resumeRef} 
        className='p-3 bg-white'
        style={{
            transform: containerWidth > 0 ? `scale(${scale})` : "none",
            transformOrigin: "top left",
            width: containerWidth > 0 ? `${baseWidth}px` : "auto", //Keep the original size so scaling works correctly
            height: "auto", 
        }}
        >
            <div className='grid grid-cols-12 gap-8'>
                <div
                     className='col-span-4 py-10'
                     style={{ backgroundColor : themeColor[0]}}
                >
                    <div className='flex flex-col items-center px-2'>
                        <div
                             className='w-[100px] h-[100px] max-w-[110px] max-h-[110px] rounded-full flex items-center justify center'
                             style={{ backgroundColor: themeColor[1] }}
                        >
                            {resumeData.profileInfo.profilePreviewUrl ? (
                                <img 
                                    src={resumeData.profileInfo.profilePreviewUrl} 
                                    className='w-[90px] h-[90px] rounded-full' />
                            ) : (
                                <div
                                    className='w-[90px] h-[90px] flex items-center justify-center text-5xl rounded-full '
                                    style={{ color: themeColor[4]}}>
                                        <LuUser />
                                    </div>
                            )}
                        </div>

                        <h2 className='text-xl font-bold mt-3'>
                            {resumeData.profileInfo.fullName}
                        </h2>
                        <p className='text-sm text-center'>
                            {resumeData.profileInfo.designation}
                        </p>
                    </div>

                    

                    <div className='my-6 mx-6'>
                        <div className='flex flex-col gap-4'>
                            <ContactInfo 
                                icon={<LuMapPinHouse/>}
                                iconBG={themeColor[2]}
                                value={resumeData?.contactInfo?.location}
                            />

                            <ContactInfo 
                                icon={<LuMail/>}
                                iconBG={themeColor[2]}
                                value={resumeData?.contactInfo?.email}
                            />

                            <ContactInfo 
                                icon={<LuPhone/>}
                                iconBG={themeColor[2]}
                                value={resumeData?.contactInfo?.phone}
                            />

                            {resumeData.contactInfo.linkedin && (
                                <ContactInfo 
                                icon={<RiLinkedinLine/>}
                                iconBG={themeColor[2]}
                                value={resumeData?.contactInfo?.linkedin}
                            />
                            ) }

                            {resumeData.contactInfo.github &&(
                                <ContactInfo 
                                icon={<LuGithub/>}
                                iconBG={themeColor[2]}
                                value={resumeData?.contactInfo?.github}
                            />
                            )}

                            <ContactInfo 
                                icon={<LuRss/>}
                                iconBG={themeColor[2]}
                                value={resumeData?.contactInfo?.website}
                            />                    


                        </div>

                        {/* Start Coding from here */}

                        <div className='mt-5'>
                            <Title text="Education" color={themeColor[1]} />

                            {resumeData.education.map((data, index)=>(
                                <EducationInfo 
                                    key={`education_${index}`}
                                    degree={data.degree}
                                    institution={data.institution}
                                    duration={`${formatYearMonth(
                                        data.startDate
                                    )} - ${formatYearMonth(data.endDate)}`}
                                />
                            ))}
                        </div>

                        <div className=''>
                            <Title text='Languages' color={themeColor[1]}/>

                            <LanguageSection 
                                languages={resumeData.languages}
                                accentColor={themeColor[3]}
                                bgColor={themeColor[2]}

                            />
                        </div>
                    </div>
                </div>

                    <div className='col-span-8 pt-10 mr-10 pb-5'>
                        <div>
                            <Title text="Professional Summary" color={themeColor[1]}/>
                            <p className='text-sm font-medium'>
                                {resumeData.profileInfo.summary}
                            </p>
                        </div>

                        <div className='mt-4'>
                            <Title text="Work Experience" color={themeColor[1]}/>

                            {resumeData.workExperience.map((data, index) => (
                                <WorkExperience 
                                    key={`work_${index}`}
                                    company={data.company}
                                    role={data.role}
                                    duration={`${formatYearMonth(data.startDate)}
                                        - ${formatYearMonth(data.endDate)}`}
                                        durationColor={themeColor[4]}
                                        description={data.description}
                                />
                            ))}
                        </div>

                        {/* Start code here  4.00.01*/}
                        <div className='mt-4'>
                            <Title text="Projects" color={themeColor[1]}>
                                {resumeData.projects.map((project, index) => (
                                    <ProjectInfo 
                                        key={`project_${index}`}
                                        title={project.title}
                                        description={project.description}
                                        githubLink = {project.github}
                                        liveDemoUrl = {project.liveDemo}
                                        bgColor={themeColor[2]}
                                        
                                    />
                                ))}
                            </Title>
                        </div>
                    </div>
            </div>
        </div>
  )
}

export default TemplateOne