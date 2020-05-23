/* eslint-disable @typescript-eslint/no-namespace */

import * as scopeManager from '@typescript-eslint/scope-manager';

namespace Scope {
  export type ScopeManager = scopeManager.ScopeManager;
  export type Reference = scopeManager.Reference;
  export type Variable = scopeManager.Variable;
  export type Scope = scopeManager.Scope;
  // TODO - in the next major, clean this up with a breaking change
  export type DefinitionType = scopeManager.Definition;
  export type Definiton = scopeManager.Definition;
}

export { Scope };
