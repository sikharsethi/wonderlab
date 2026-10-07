import { SUBJECTS } from './subjects';
import { EXTRA } from './extra';
export const ALL = [...SUBJECTS, ...EXTRA];
export const getSubject = (id: string) => ALL.find(s => s.id === id);
