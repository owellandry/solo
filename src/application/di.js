import { projectRepository, workspaceRepository, skillRepository } from '../infrastructure/di';
import { GetProjectsUseCase } from './useCases/GetProjectsUseCase';
import { GetWorkspaceUseCase } from './useCases/GetWorkspaceUseCase';
import { GetSkillsUseCase } from './useCases/GetSkillsUseCase';
import { GetSkillCategoriesUseCase } from './useCases/GetSkillCategoriesUseCase';
import { UpdateProjectPromptUseCase } from './useCases/UpdateProjectPromptUseCase';

export const getProjectsUseCase = new GetProjectsUseCase(projectRepository);
export const getWorkspaceUseCase = new GetWorkspaceUseCase(workspaceRepository);
export const getSkillsUseCase = new GetSkillsUseCase(skillRepository);
export const getSkillCategoriesUseCase = new GetSkillCategoriesUseCase(skillRepository);
export const updateProjectPromptUseCase = new UpdateProjectPromptUseCase(projectRepository);
