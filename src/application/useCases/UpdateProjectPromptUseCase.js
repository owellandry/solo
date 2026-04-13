export class UpdateProjectPromptUseCase {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }
  async execute(id, newPrompt) {
    const project = await this.projectRepository.getById(id);
    if (!project) throw new Error('Project not found');
    project.updatePrompt(newPrompt);
    return this.projectRepository.save(project);
  }
}
