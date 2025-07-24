import React from 'react'
import TemplateOne from './TemplateOne';
import TemplateTwo from './TemplateTwo'
import TemplateThree from './TemplateThree';
import TemplateFour from './TemplateFour'

const RenderResume = ({
    templateId, resumeData, colorPalette, containerWidth
}) => {
    switch ( templateId) {
        case "01":
            return (
                <TemplateOne 
                    resumeData={resumeData}
                    colorPalette={colorPalette}
                    containerWidth={containerWidth}
                />
            );
        
        case "02":
            return (
                <TemplateTwo
                    resumeData={resumeData}
                    colorPalette={colorPalette}
                    containerWidth={containerWidth}
                />
            );

        case "03":
            return (
                <TemplateThree
                    resumeData={resumeData}
                    colorPalette={colorPalette}
                    containerWidth={containerWidth}
                />
            );
        case "04":
            return (
                <TemplateFour
                    resumeData={resumeData}
                    colorPalette={colorPalette}
                    containerWidth={containerWidth}
                />
            );
        default:
            return(
                <TemplateOne 
                    resumeData={resumeData}
                    colorPalette={colorPalette}
                    containerWidth={containerWidth}
                />
            )

    }
  return (
    <div>RenderResume</div>
  )
}

export default RenderResume