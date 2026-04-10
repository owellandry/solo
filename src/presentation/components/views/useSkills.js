import { useState, useEffect } from 'react';
import { getSkillsUseCase, getSkillCategoriesUseCase } from '../../../application/di';

export function useSkills() {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getSkillsUseCase.execute().then(setSkills);
    getSkillCategoriesUseCase.execute().then(setCategories);
  }, []);

  return { skills, categories };
}
