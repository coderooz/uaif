/**
 * UIAF Error Definitions
 *
 * Normalized error types for the Universal Application Integration Framework.
 * Provider-specific errors are normalized to these categories.
 *
 * @module @uiaf/core/errors
 */

import type { UIAFErrorCategory, UIAFError } from '../types/index.js';

// ============================================================================
// Base UIAF Error
// ============================================================================

/**
 * Base error class for all UIAF errors.
 * Provides structured error information with category, code, and diagnostics.
 */
export class UIAFBaseError extends Error {
  public readonly category: UIAFErrorCategory;
  public readonly code: string;
  public readonly retryable: boolean;
  public readonly retryAfter?: number;
  public readonly documentation?: string;
  public readonly diagnostics?: Record<string, unknown>;

  constructor(error: UIAFError) {
    super(error.message);
    this.name = 'UIAFBaseError';
    this.category = error.category;
    this.code = error.code;
    this.retryable = error.retryable;
    this.retryAfter = error.retryAfter;
    this.documentation = error.documentation;
    this.diagnostics = error.diagnostics;
  }

  toJSON(): UIAFError {
    return {
      category: this.category,
      code: this.code,
      message: this.message,
      retryable: this.retryable,
      retryAfter: this.retryAfter,
      documentation: this.documentation,
      diagnostics: this.diagnostics,
    };
  }
}

// ============================================================================
// Compatibility Errors
// ============================================================================

export class CompatibilityError extends UIAFBaseError {
  constructor(
    message: string,
    code: string = 'COMPATIBILITY_ERROR',
    diagnostics?: Record<string, unknown>,
  ) {
    super({
      category: 'COMPATIBILITY',
      code,
      message,
      retryable: false,
      diagnostics,
    });
    this.name = 'CompatibilityError';
  }
}

export class IncompatibleFrameworkError extends CompatibilityError {
  constructor(framework: string, version: string, required: string) {
    super(
      `Framework ${framework}@${version} is incompatible with required range ${required}`,
      'INCOMPATIBLE_FRAMEWORK',
      { framework, version, required },
    );
    this.name = 'IncompatibleFrameworkError';
  }
}

export class IncompatibleProviderError extends CompatibilityError {
  constructor(provider: string, target: string, reason: string) {
    super(
      `Provider "${provider}" is incompatible with target "${target}": ${reason}`,
      'INCOMPATIBLE_PROVIDER',
      { provider, target, reason },
    );
    this.name = 'IncompatibleProviderError';
  }
}

// ============================================================================
// Configuration Errors
// ============================================================================

export class ConfigurationError extends UIAFBaseError {
  constructor(
    message: string,
    code: string = 'CONFIGURATION_ERROR',
    diagnostics?: Record<string, unknown>,
  ) {
    super({
      category: 'CONFIGURATION',
      code,
      message,
      retryable: false,
      diagnostics,
    });
    this.name = 'ConfigurationError';
  }
}

export class MissingEnvironmentError extends ConfigurationError {
  constructor(variable: string) {
    super(
      `Missing required environment variable: ${variable}`,
      'MISSING_ENVIRONMENT',
      { variable },
    );
    this.name = 'MissingEnvironmentError';
  }
}

export class InvalidManifestError extends ConfigurationError {
  constructor(message: string, diagnostics?: Record<string, unknown>) {
    super(`Invalid manifest: ${message}`, 'INVALID_MANIFEST', diagnostics);
    this.name = 'InvalidManifestError';
  }
}

// ============================================================================
// Provider Errors
// ============================================================================

export class ProviderError extends UIAFBaseError {
  constructor(
    message: string,
    code: string = 'PROVIDER_ERROR',
    retryable: boolean = false,
    diagnostics?: Record<string, unknown>,
  ) {
    super({
      category: 'PROVIDER',
      code,
      message,
      retryable,
      diagnostics,
    });
    this.name = 'ProviderError';
  }
}

export class ProviderNotFoundError extends ProviderError {
  constructor(provider: string) {
    super(`Provider "${provider}" not found in registry`, 'PROVIDER_NOT_FOUND', false, {
      provider,
    });
    this.name = 'ProviderNotFoundError';
  }
}

export class ProviderNotInstalledError extends ProviderError {
  constructor(provider: string, packages: string[]) {
    super(
      `Provider "${provider}" requires packages: ${packages.join(', ')}`,
      'PROVIDER_NOT_INSTALLED',
      false,
      { provider, packages },
    );
    this.name = 'ProviderNotInstalledError';
  }
}

// ============================================================================
// Contract Errors
// ============================================================================

export class ContractError extends UIAFBaseError {
  constructor(
    message: string,
    code: string = 'CONTRACT_ERROR',
    diagnostics?: Record<string, unknown>,
  ) {
    super({
      category: 'CONTRACT',
      code,
      message,
      retryable: false,
      diagnostics,
    });
    this.name = 'ContractError';
  }
}

export class ContractViolationError extends ContractError {
  constructor(contract: string, violation: string) {
    super(
      `Contract "${contract}" violation: ${violation}`,
      'CONTRACT_VIOLATION',
      { contract, violation },
    );
    this.name = 'ContractViolationError';
  }
}

// ============================================================================
// Registry Errors
// ============================================================================

export class RegistryError extends UIAFBaseError {
  constructor(
    message: string,
    code: string = 'REGISTRY_ERROR',
    diagnostics?: Record<string, unknown>,
  ) {
    super({
      category: 'REGISTRY',
      code,
      message,
      retryable: false,
      diagnostics,
    });
    this.name = 'RegistryError';
  }
}

// ============================================================================
// Resolver Errors
// ============================================================================

export class ResolverError extends UIAFBaseError {
  constructor(
    message: string,
    code: string = 'RESOLVER_ERROR',
    retryable: boolean = false,
    diagnostics?: Record<string, unknown>,
  ) {
    super({
      category: 'RESOLVER',
      code,
      message,
      retryable,
      diagnostics,
    });
    this.name = 'ResolverError';
  }
}

// ============================================================================
// CLI Errors
// ============================================================================

export class CLIError extends UIAFBaseError {
  constructor(
    message: string,
    code: string = 'CLI_ERROR',
    diagnostics?: Record<string, unknown>,
  ) {
    super({
      category: 'CLI',
      code,
      message,
      retryable: false,
      diagnostics,
    });
    this.name = 'CLIError';
  }
}

// ============================================================================
// Validation Errors
// ============================================================================

export class ValidationError extends UIAFBaseError {
  constructor(
    message: string,
    code: string = 'VALIDATION_ERROR',
    diagnostics?: Record<string, unknown>,
  ) {
    super({
      category: 'VALIDATION',
      code,
      message,
      retryable: false,
      diagnostics,
    });
    this.name = 'ValidationError';
  }
}

// ============================================================================
// Error Normalization
// ============================================================================

/**
 * Normalize provider-specific errors to UIAF error categories.
 * Preserves provider-specific diagnostic metadata.
 */
export function normalizeError(
  error: unknown,
  provider: string,
  context?: string,
): UIAFBaseError {
  if (error instanceof UIAFBaseError) {
    return error;
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    // Detect common error patterns
    if (message.includes('network') || message.includes('timeout') || message.includes('fetch')) {
      return new ProviderError(
        `Network error from ${provider}: ${error.message}`,
        'NETWORK_ERROR',
        true,
        { provider, context, originalError: error.message },
      );
    }

    if (message.includes('rate limit') || message.includes('429')) {
      return new ProviderError(
        `Rate limited by ${provider}: ${error.message}`,
        'RATE_LIMITED',
        true,
        { provider, context, originalError: error.message, retryAfter: 60 },
      );
    }

    if (message.includes('unauthorized') || message.includes('401') || message.includes('forbidden') || message.includes('403')) {
      return new ProviderError(
        `Authentication error from ${provider}: ${error.message}`,
        'AUTHENTICATION_ERROR',
        false,
        { provider, context, originalError: error.message },
      );
    }

    if (message.includes('not found') || message.includes('404')) {
      return new ProviderError(
        `Resource not found from ${provider}: ${error.message}`,
        'NOT_FOUND',
        false,
        { provider, context, originalError: error.message },
      );
    }

    return new ProviderError(
      `Provider error from ${provider}: ${error.message}`,
      'PROVIDER_ERROR',
      false,
      { provider, context, originalError: error.message },
    );
  }

  return new ProviderError(
    `Unknown error from ${provider}: ${String(error)}`,
    'UNKNOWN_ERROR',
    false,
    { provider, context, originalError: String(error) },
  );
}
