export class GetSkillCategoriesUseCase {
  constructor(skillRepository) {
    this.skillRepository = skillRepository;
  }
  async execute() {
    return this.skillRepository.getCategories();
  }
}
