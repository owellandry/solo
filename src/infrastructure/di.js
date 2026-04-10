import { InMemoryProjectRepository } from './repositories/InMemoryProjectRepository';
import { InMemoryWorkspaceRepository } from './repositories/InMemoryWorkspaceRepository';
import { InMemorySkillRepository } from './repositories/InMemorySkillRepository';

export const projectRepository = new InMemoryProjectRepository();
export const workspaceRepository = new InMemoryWorkspaceRepository();
export const skillRepository = new InMemorySkillRepository();
