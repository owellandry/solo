export class GetSkillsUseCase {
  constructor(skillRepository) {
    this.skillRepository = skillRepository;
  }
  async execute() {
    return this.skillRepository.getAll();
  }
}
