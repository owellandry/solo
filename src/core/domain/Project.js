export class Project {
  constructor({ id, name, workspace, title, repository, branch, updatedAt, prompt, command, previewUrl, responseTitle, responseSections, todos, taskOutputs, contextBreakdown, references }) {
    this.id = id;
    this.name = name;
    this.workspace = workspace;
    this.title = title;
    this.repository = repository;
    this.branch = branch;
    this.updatedAt = updatedAt;
    this.prompt = prompt;
    this.command = command;
    this.previewUrl = previewUrl;
    this.responseTitle = responseTitle;
    this.responseSections = responseSections || [];
    this.todos = todos || [];
    this.taskOutputs = taskOutputs || [];
    this.contextBreakdown = contextBreakdown || [];
    this.references = references || [];
  }

  updatePrompt(newPrompt) {
    this.prompt = newPrompt;
    return this;
  }
}
