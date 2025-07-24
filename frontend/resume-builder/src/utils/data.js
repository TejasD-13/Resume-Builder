// data.js

import TEMPLATE_ONE_IMG from '../assets/template-one.png';
import TEMPLATE_TWO_IMG from '../assets/template-two.png';
import TEMPLATE_THREE_IMG from '../assets/template-three.png';
import TEMPLATE_FOUR_IMG from '../assets/template-four.png'
 
export const resumeTemplates = [
  {
    id: '01',
    thumbnailImg: TEMPLATE_ONE_IMG,
    colorPaletteCode: 'themeOne',
  },
  {
    id: '02',
    thumbnailImg: TEMPLATE_TWO_IMG,
    colorPaletteCode: 'themeTwo',
  },
  {
    id: '03',
    thumbnailImg: TEMPLATE_THREE_IMG,
    colorPaletteCode: 'themeThree',
  },
  {
    id: '04',
    thumbnailImg: TEMPLATE_FOUR_IMG,
    colorPaletteCode: 'themeFour',
  },
];

export const themeColorPalette = {
  themeOne: [
    ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00BBDD", "#4A5565"],
    ["#E9FBFF", "#93E2DA", "#2AC9A0", "#30DCA5", "#3D4C54"],
    ["#F5FAFF", "#C9C2F8", "#8579D1", "#4B4B5C", "#444B5C"],
    ["#FFF5F7", "#FFE0EF", "#FAC6D8", "#F6792C", "#5A5A5A"],
    ["#F9FAFF", "#EAE7EB", "#BCB0BE", "#776C95", "#20374B"],
    ["#F4FFFF", "#F3DFD2", "#B0E094", "#34C79D", "#384C48"],
    ["#F4FFFF", "#F3DFD2", "#8ED09A", "#34C79D", "#384C48"],
    ["#F9FCFF", "#EAF2FF", "#C0E2DE", "#2AC9A0", "#4C4C74"],
    ["#F9FCFF", "#EAF2FF", "#C0E2DE", "#2AC9A0", "#3D4565"],
    ["#F7F7FF", "#F2F2F2", "#D9D9FF", "#7A77AA", "#2B3342"],
    ["#F7F7FF", "#E4E4E4", "#CFCFCF", "#444444", "#222222"],
    ["#E3F2FD", "#99CAF9", "#8AD2F4", "#1E88E5", "#0047A1"],
  ],
};



export const DUMMY_RESUME_DATA = {
  profileInfo: {
    profileImg: null,
    previewUrl: null,
    fullName: 'John Doe',
    designation: 'Senior Software Engineer',
    summary:
      'Passionate and results-driven developer with 6+ years of experience building full-stack web applications.',
  },
  contactInfo: {
    email: 'john.doe@example.com',
    phone: '+1234567890',
    location: '#12 Anywhere, Any City, Any Country',
    linkedin: 'https://linkedin.com/timetoprogram',
    github: 'https://github.com/timetoprogram',
    website: 'https://timetoprogram.com',
  },
  workExperience: [
    {
      company: 'Tech Solutions',
      role: 'Senior Frontend Engineer',
      startDate: '2022-03',
      endDate: '2025-04',
      description:
        'Leading the frontend team to build scalable enterprise applications using React and TypeScript.',
    },
    {
      company: 'Coding Dev',
      role: 'Full Stack Developer',
      startDate: '2020-01',
      endDate: '2022-02',
      description:
        'Worked on cross-functional teams developing full-stack solutions with React, Node.js, and MongoDB.',
    },
    {
      company: 'Startup Company',
      role: 'Junior Web Developer',
      startDate: '2018-06',
      endDate: '2019-12',
      description:
        'Built responsive websites for startups and small businesses. Maintained legacy codebases and optimized UX.',
    },
  ],
  education: [
    {
      degree: 'M.Sc. Software Engineering',
      institution: 'Tech University',
      startDate: '2021-08',
      endDate: '2023-06',
    },
    {
      degree: 'B.Sc. Computer Science',
      institution: 'State University',
      startDate: '2017-08',
      endDate: '2021-07',
    },
  ],
  skills: [
    { name: 'JavaScript', progress: 95 },
    { name: 'React', progress: 90 },
    { name: 'Node.js', progress: 85 },
    { name: 'TypeScript', progress: 80 },
    { name: 'MongoDB', progress: 75 },
  ],
  projects: [
    {
      title: 'Project Manager App',
      description:
        'A task and team management app built with MERN stack. Includes user roles, role-based access, and timelines.',
      github: 'https://github.com/timetoprogram/project-manager-app',
    },
    {
      title: 'E-Commerce Platform',
      description:
        'An e-commerce site built with Next.js and Stripe integration. Supports cart, checkout, and admin dashboard.',
      liveDemo: 'https://ecommerce-demo.timetoprogram.com',
    },
    {
      title: 'Blog CMS',
      description:
        'A custom CMS for blogging using Express and React. Includes WYSIWYG editor, markdown support, and user auth.',
      github: 'https://github.com/timetoprogram/blog-cms',
      liveDemo: 'https://blogcms.timetoprogram.dev',
    },
  ],
  certifications: [
    {
      title: 'React Advanced Certification',
      issuer: 'Coursera',
      year: '2022',
    },
  ],
  languages: [
    { name: 'English', progress: 100 },
    { name: 'Spanish', progress: 70 },
    { name: 'French', progress: 40 },
  ],
  interests: ['Reading', 'Open Source Contribution', 'Hiking'],
};
