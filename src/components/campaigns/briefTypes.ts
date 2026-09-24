export interface BriefDraft {
  company: string;
  product: string;
  links: string;
  goal: string;
  city: string;
  zone: string;
  audience: string;
  audienceUnknown: boolean;
  budget: string;
  budgetExact: string;
  startDate: string;
  startFlexible: boolean;
  keyDates: string;
  experience: string;
  experienceKind: string;
  measures: string[];
  destinations: string[];
  materials: string;
  contactName: string;
  contact: string;
  comment: string;
  consent: boolean;
}

export const EMPTY_DRAFT: BriefDraft = {
  company: '',
  product: '',
  links: '',
  goal: '',
  city: '',
  zone: '',
  audience: '',
  audienceUnknown: false,
  budget: '',
  budgetExact: '',
  startDate: '',
  startFlexible: false,
  keyDates: '',
  experience: '',
  experienceKind: '',
  measures: [],
  destinations: [],
  materials: '',
  contactName: '',
  contact: '',
  comment: '',
  consent: false,
};
