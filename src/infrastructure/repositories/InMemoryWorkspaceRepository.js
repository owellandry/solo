import { WorkspaceRepository } from '../../core/ports/WorkspaceRepository';
import { Workspace } from '../../core/domain/Workspace';
import { workspaceContent } from '../data';

export class InMemoryWorkspaceRepository extends WorkspaceRepository {
  async getById(id) {
    const data = workspaceContent[id];
    if (!data) return null;
    return new Workspace({ id, ...data });
  }

  async getAll() {
    return Object.entries(workspaceContent).map(([id, data]) => new Workspace({ id, ...data }));
  }
}
