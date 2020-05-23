import { TSESTree, EcmaVersion } from '@typescript-eslint/types';
import { visitorKeys } from '@typescript-eslint/visitor-keys';
import { Referencer, ReferencerOptions } from './referencer';
import { ScopeManager } from './ScopeManager';

interface AnalyzeOptions {
  /**
   * Whether the whole script is executed under node.js environment.
   * When enabled, the scope manager adds a function scope immediately following the global scope.
   */
  globalReturn?: boolean;

  /**
   * Implied strict mode (if ecmaVersion >= 5).
   */
  impliedStrict?: boolean;

  /**
   * The source type of the script.
   */
  sourceType?: 'script' | 'module';

  /**
   * Which ECMAScript version is considered
   */
  ecmaVersion?: EcmaVersion;

  /**
   * Known visitor keys.
   */
  childVisitorKeys?: ReferencerOptions['childVisitorKeys'];
}

const DEFAULT_OPTIONS: AnalyzeOptions = {
  globalReturn: false,
  impliedStrict: false,
  sourceType: 'script',
  ecmaVersion: 2018,
  childVisitorKeys: visitorKeys,
};

/**
 * Takes an AST and returns the analyzed scopes.
 */
function analyze(
  tree: TSESTree.Node,
  providedOptions?: AnalyzeOptions,
): ScopeManager {
  const options: AnalyzeOptions = {
    globalReturn: providedOptions?.globalReturn ?? DEFAULT_OPTIONS.globalReturn,
    impliedStrict:
      providedOptions?.impliedStrict ?? DEFAULT_OPTIONS.impliedStrict,
    sourceType: providedOptions?.sourceType ?? DEFAULT_OPTIONS.sourceType,
    ecmaVersion: providedOptions?.ecmaVersion ?? DEFAULT_OPTIONS.ecmaVersion,
    childVisitorKeys:
      providedOptions?.childVisitorKeys ?? DEFAULT_OPTIONS.childVisitorKeys,
  };
  const scopeManager = new ScopeManager(options);
  const referencer = new Referencer(options, scopeManager);

  referencer.visit(tree);

  return scopeManager;
}

export { analyze, AnalyzeOptions };
