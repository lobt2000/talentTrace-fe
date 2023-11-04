import { ICommon } from '../../interfaces/common/common.interface';
import { IPosition } from '../../interfaces/personal-info-interfaces/position.interface';

export const employmentTypes: Array<ICommon> = [
  { name: 'Constractor Full-Time', id: 0 },
  { name: 'Constractor Part-Time', id: 1 },
  { name: 'Consultant', id: 2 },
];

export const statusTypes: Array<ICommon> = [
  { name: 'Current', id: 0 },
  { name: 'Pending', id: 1 },
];

export const departmentTypes: Array<ICommon> = [
  { name: 'Accountant', id: 1 },
  { name: 'System Administrator', id: 2 },
  { name: 'Recruitment', id: 3 },
  { name: 'HR', id: 4 },
  { name: 'Sales And Marketing', id: 5 },
  { name: 'Delivery', id: 6 },
];

export const subDepartmentTypes: Array<ICommon> = [
  {
    name: 'Management',
    id: 7,
  },
  {
    name: 'BA',
    id: 8,
  },
  {
    name: 'Software Engineer',
    id: 9,
  },
  {
    name: 'QA Engineer',
    id: 10,
  },
  {
    name: 'UI/UX Designers',
    id: 12,
  },
  {
    name: 'DevOps Engineer',
    id: 16,
  },
];

export const unitTypes: Array<ICommon> = [
  {
    name: 'Unit-1',
    id: 1,
  },
  {
    name: 'Unit-2',
    id: 2,
  },
  {
    name: 'Unit-3',
    id: 3,
  },
  {
    name: 'Non-delivery',
    id: 4,
  },
];

export const qualificationLevel: Array<ICommon> = [
  {
    name: 'Trainee',
    id: 0,
  },
  {
    name: 'Junior Low',
    id: 1,
  },
  {
    name: 'Junior',
    id: 2,
  },
  {
    name: 'Junior Strong',
    id: 3,
  },
  {
    name: 'Middle Low',
    id: 4,
  },
  {
    name: 'Middle',
    id: 5,
  },
  {
    name: 'Middle Strong',
    id: 6,
  },
  {
    name: 'Senior Low',
    id: 7,
  },
  {
    name: 'Senior',
    id: 8,
  },
  {
    name: 'Senior Strong',
    id: 9,
  },
  {
    name: 'Solution Architect',
    id: 10,
  },
];

export const positionTypes: Array<IPosition> = [
  {
    department: {
      name: 'Accountant',
      id: 1,
    },
    qualificationLevelRequired: false,
    requiresTechStack: false,
    name: 'Head Of Accountant',
    id: 1,
  },
  {
    department: {
      name: 'Accountant',
      id: 1,
    },
    qualificationLevelRequired: true,
    requiresTechStack: false,
    name: 'PE Accountant',
    id: 2,
  },
  {
    department: {
      name: 'Accountant',
      id: 1,
    },
    qualificationLevelRequired: true,
    requiresTechStack: false,
    name: 'Accountant',
    id: 3,
  },
  {
    department: {
      name: 'System Administrator',
      id: 2,
    },
    qualificationLevelRequired: true,
    requiresTechStack: false,
    name: 'System Administrator',
    id: 4,
  },
  {
    department: {
      name: 'Recruitment',
      id: 3,
    },
    qualificationLevelRequired: false,
    requiresTechStack: false,
    name: 'Head of Recruitment',
    id: 5,
  },
  {
    department: {
      name: 'Recruitment',
      id: 3,
    },
    qualificationLevelRequired: false,
    requiresTechStack: false,
    name: 'Recruitment Lead',
    id: 6,
  },
  {
    department: {
      name: 'Recruitment',
      id: 3,
    },
    qualificationLevelRequired: true,
    requiresTechStack: false,
    name: 'Recruiter',
    id: 7,
  },
  {
    department: {
      name: 'Recruitment',
      id: 3,
    },
    qualificationLevelRequired: true,
    requiresTechStack: false,
    name: 'Sourcing Specialist',
    id: 8,
  },
  {
    department: {
      name: 'HR',
      id: 4,
    },
    qualificationLevelRequired: false,
    requiresTechStack: false,
    name: 'Head of HR',
    id: 9,
  },
  {
    department: {
      name: 'HR',
      id: 4,
    },
    qualificationLevelRequired: true,
    requiresTechStack: false,
    name: 'HR Manager',
    id: 10,
  },
  {
    department: {
      name: 'HR',
      id: 4,
    },
    qualificationLevelRequired: true,
    requiresTechStack: false,
    name: 'Learning And Development Manager',
    id: 11,
  },
  {
    department: {
      name: 'HR',
      id: 4,
    },
    qualificationLevelRequired: false,
    requiresTechStack: false,
    name: 'Office Manager',
    id: 12,
  },
  {
    department: {
      name: 'HR',
      id: 4,
    },
    qualificationLevelRequired: false,
    requiresTechStack: false,
    name: 'English Teacher',
    id: 13,
  },
  {
    department: {
      name: 'HR',
      id: 4,
    },
    qualificationLevelRequired: false,
    requiresTechStack: false,
    name: 'Employer Brand Manager',
    id: 14,
  },
  {
    department: {
      name: 'Sales And Marketing',
      id: 5,
    },
    qualificationLevelRequired: false,
    requiresTechStack: false,
    name: 'Head of Sales And Marketing',
    id: 15,
  },
  {
    department: {
      name: 'Sales And Marketing',
      id: 5,
    },
    qualificationLevelRequired: false,
    requiresTechStack: false,
    name: 'Digital Marketing Manager',
    id: 16,
  },
  {
    department: {
      name: 'Sales And Marketing',
      id: 5,
    },
    qualificationLevelRequired: false,
    requiresTechStack: false,
    name: 'Digital Content Manager',
    id: 17,
  },
  {
    department: {
      name: 'Sales And Marketing',
      id: 5,
    },
    qualificationLevelRequired: false,
    requiresTechStack: false,
    name: 'Head of Lead Generation Managers',
    id: 18,
  },
  {
    department: {
      name: 'Sales And Marketing',
      id: 5,
    },
    qualificationLevelRequired: false,
    requiresTechStack: false,
    name: 'Lead of Lead Generation Managers',
    id: 19,
  },
  {
    department: {
      name: 'Sales And Marketing',
      id: 5,
    },
    qualificationLevelRequired: true,
    requiresTechStack: false,
    name: 'Lead Generation Manager',
    id: 20,
  },
  {
    department: {
      name: 'Sales And Marketing',
      id: 5,
    },
    qualificationLevelRequired: true,
    requiresTechStack: false,
    name: 'Business Development Manager',
    id: 21,
  },
  {
    department: {
      name: 'Sales And Marketing',
      id: 5,
    },
    qualificationLevelRequired: true,
    requiresTechStack: false,
    name: 'Lead Marketing Manager',
    id: 22,
  },
  {
    department: {
      name: 'Sales And Marketing',
      id: 5,
    },
    qualificationLevelRequired: false,
    requiresTechStack: false,
    name: 'Business Development Assistant',
    id: 23,
  },
  {
    department: {
      name: 'Sales And Marketing',
      id: 5,
    },
    qualificationLevelRequired: true,
    requiresTechStack: false,
    name: 'Content Writer',
    id: 44,
  },
  {
    department: {
      name: 'Management',
      id: 7,
    },
    qualificationLevelRequired: false,
    requiresTechStack: false,
    name: 'Head of Delivery',
    id: 24,
  },
  {
    department: {
      name: 'Management',
      id: 7,
    },
    qualificationLevelRequired: false,
    requiresTechStack: false,
    name: 'Delivery Manager',
    id: 25,
  },
  {
    department: {
      name: 'Management',
      id: 7,
    },
    qualificationLevelRequired: false,
    requiresTechStack: false,
    name: 'Delivery Manager Associate',
    id: 26,
  },
  {
    department: {
      name: 'Management',
      id: 7,
    },
    qualificationLevelRequired: true,
    requiresTechStack: false,
    name: 'Project Manager',
    id: 27,
  },
  {
    department: {
      name: 'BA',
      id: 8,
    },
    qualificationLevelRequired: false,
    requiresTechStack: false,
    name: 'Lead of Business Analyst',
    id: 28,
  },
  {
    department: {
      name: 'BA',
      id: 8,
    },
    qualificationLevelRequired: true,
    requiresTechStack: false,
    name: 'BA',
    id: 29,
  },
  {
    department: {
      name: 'Software Engineer',
      id: 9,
    },
    qualificationLevelRequired: false,
    requiresTechStack: true,
    name: 'Competence Lead',
    id: 30,
  },
  {
    department: {
      name: 'Software Engineer',
      id: 9,
    },
    qualificationLevelRequired: true,
    requiresTechStack: true,
    name: 'Software Engineer',
    id: 31,
  },
  {
    department: {
      name: 'Software Engineer',
      id: 9,
    },
    qualificationLevelRequired: true,
    requiresTechStack: false,
    name: 'Head of Technologies and Solutions',
    id: 45,
  },
  {
    department: {
      name: 'QA Engineer',
      id: 10,
    },
    qualificationLevelRequired: true,
    requiresTechStack: false,
    name: 'QA Engineer',
    id: 32,
  },
  {
    department: {
      name: 'QA Engineer',
      id: 10,
    },
    qualificationLevelRequired: true,
    requiresTechStack: false,
    name: 'AQA Engineer',
    id: 33,
  },
  {
    department: {
      name: 'UI/UX Designers',
      id: 12,
    },
    qualificationLevelRequired: true,
    requiresTechStack: false,
    name: 'Designer',
    id: 35,
  },
  {
    department: {
      name: 'UI/UX Designers',
      id: 12,
    },
    qualificationLevelRequired: false,
    requiresTechStack: false,
    name: 'Lead Designer',
    id: 36,
  },
  {
    department: {
      name: 'DevOps Engineer',
      id: 16,
    },
    qualificationLevelRequired: true,
    requiresTechStack: true,
    name: 'DevUps Engineer',
    id: 34,
  },
];

export const countriesType: Array<ICommon> = [{ id: 0, name: 'Ukraine' }];
