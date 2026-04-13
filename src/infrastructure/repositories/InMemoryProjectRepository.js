import { ProjectRepository } from '../../core/ports/ProjectRepository';
import { Project } from '../../core/domain/Project';
import { projects as rawProjects } from '../data';

export class InMemoryProjectRepository extends ProjectRepository {
  constructor() {
    super();
    this.projects = rawProjects.map(p => new Project(p));
  }

  async getAll() {
    return this.projects;
  }

  async getById(id) {
    return this.projects.find(p => p.id === id) || null;
  }

  async save(project) {
    const index = this.projects.findIndex(p => p.id === project.id);
    if (index !== -1) {
      this.projects[index] = project;
    } else {
      this.projects.push(project);
    }
    return project;
  }
}
