export class GetProjectsUseCase {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }
  async execute() {
    return this.projectRepository.getAll();
  }
}
