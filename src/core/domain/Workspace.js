export class Workspace {
  constructor({ id, brand, heroTitle, heroSubtitle, heroDescription, accent, cards }) {
    this.id = id;
    this.brand = brand;
    this.heroTitle = heroTitle;
    this.heroSubtitle = heroSubtitle;
    this.heroDescription = heroDescription;
    this.accent = accent;
    this.cards = cards || [];
  }
}
