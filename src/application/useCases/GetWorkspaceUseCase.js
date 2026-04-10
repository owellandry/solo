export class GetWorkspaceUseCase {
  constructor(workspaceRepository) {
    this.workspaceRepository = workspaceRepository;
  }
  async execute(id) {
    return this.workspaceRepository.getById(id);
  }
}
