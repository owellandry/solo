import { SkillRepository } from '../../core/ports/SkillRepository';
import { Skill } from '../../core/domain/Skill';
import { skills, skillCategories } from '../data';

export class InMemorySkillRepository extends SkillRepository {
  async getAll() {
    return skills.map(s => new Skill(s));
  }

  async getCategories() {
    return skillCategories;
  }
}
