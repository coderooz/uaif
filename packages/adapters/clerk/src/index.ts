import type {
  AuthContract,
  UIAFUser,
  UIAFSession,
  LoginInput,
  RegisterInput,
  AuthResult,
  ContractMetadata,
} from '@uiaf/core';

export interface ClerkAdapterConfig {
  publishableKey: string;
  secretKey?: string;
  signInUrl?: string;
  signUpUrl?: string;
  afterSignInUrl?: string;
  afterSignUpUrl?: string;
}

export class ClerkAuthAdapter implements AuthContract {
  readonly metadata: ContractMetadata = {
    id: 'clerk',
    version: '0.1.0',
    segment: 'auth',
    description: 'Clerk authentication adapter for UIAF',
    contexts: ['client-component', 'server-component', 'route-handler'],
  };

  readonly portable = true;

  private config: ClerkAdapterConfig;
  private currentToken: string | null = null;

  constructor(config: ClerkAdapterConfig) {
    this.config = config;
  }

  async login(input: LoginInput): Promise<AuthResult> {
    const { email, password } = input;

    const response = await fetch('https://api.clerk.com/v1/client/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.secretKey}`,
      },
      body: JSON.stringify({
        strategy: 'password',
        identifier: email,
        password,
      }),
    });

    if (!response.ok) {
      return { success: false, error: 'Login failed' };
    }

    const data = await response.json();
    this.currentToken = data.token;

    const user = await this.getUser(data.user_id);
    if (!user) {
      return { success: false, error: 'Failed to fetch user' };
    }

    const session: UIAFSession = {
      id: data.id,
      user,
      createdAt: new Date(),
      expiresAt: new Date(data.expire_at),
      active: true,
    };

    return {
      success: true,
      user,
      session,
    };
  }

  async register(input: RegisterInput): Promise<AuthResult> {
    const { email, password, displayName } = input;

    const response = await fetch('https://api.clerk.com/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.secretKey}`,
      },
      body: JSON.stringify({
        email_address: [email],
        password,
        first_name: displayName?.split(' ')[0],
        last_name: displayName?.split(' ').slice(1).join(' '),
      }),
    });

    if (!response.ok) {
      return { success: false, error: 'Registration failed' };
    }

    const clerkUser = await response.json();
    const user = this.mapUser(clerkUser);

    return {
      success: true,
      user,
    };
  }

  async logout(): Promise<void> {
    if (this.currentToken) {
      await fetch('https://api.clerk.com/v1/client/sessions/current', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${this.config.secretKey}`,
        },
      });
      this.currentToken = null;
    }
  }

  async getCurrentUser(): Promise<UIAFUser | null> {
    if (!this.currentToken) return null;

    try {
      const response = await fetch('https://api.clerk.com/v1/client', {
        headers: {
          Authorization: `Bearer ${this.currentToken}`,
        },
      });

      if (!response.ok) return null;

      const client = await response.json();
      const session = client.sessions?.[0];
      if (!session) return null;

      return this.getUser(session.user_id);
    } catch {
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null;
  }

  async getSession(): Promise<UIAFSession | null> {
    if (!this.currentToken) return null;

    try {
      const response = await fetch('https://api.clerk.com/v1/client', {
        headers: {
          Authorization: `Bearer ${this.currentToken}`,
        },
      });

      if (!response.ok) return null;

      const client = await response.json();
      const session = client.sessions?.[0];
      if (!session) return null;

      const user = await this.getUser(session.user_id);
      if (!user) return null;

      return {
        id: session.id,
        user,
        createdAt: new Date(session.created_at),
        expiresAt: new Date(session.expire_at),
        active: true,
      };
    } catch {
      return null;
    }
  }

  async getUser(userId: string): Promise<UIAFUser | null> {
    try {
      const response = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${this.config.secretKey}`,
        },
      });

      if (!response.ok) return null;

      const user = await response.json();
      return this.mapUser(user);
    } catch {
      return null;
    }
  }

  async updateUser(userId: string, data: Partial<UIAFUser>): Promise<UIAFUser> {
    const response = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.secretKey}`,
      },
      body: JSON.stringify({
        first_name: data.displayName?.split(' ')[0],
        last_name: data.displayName?.split(' ').slice(1).join(' '),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    const user = await response.json();
    return this.mapUser(user);
  }

  async deleteUser(userId: string): Promise<void> {
    await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.config.secretKey}`,
      },
    });
  }

  async verifyToken(token: string): Promise<UIAFUser | null> {
    try {
      const response = await fetch('https://api.clerk.com/v1/client', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) return null;

      const client = await response.json();
      const session = client.sessions?.[0];
      if (!session) return null;

      return this.getUser(session.user_id);
    } catch {
      return null;
    }
  }

  private mapUser(clerkUser: Record<string, unknown>): UIAFUser {
    return {
      id: clerkUser.id as string,
      email: ((clerkUser.email_addresses as Array<{ email_address: string }>)?.[0]?.email_address) || '',
      displayName: [clerkUser.first_name, clerkUser.last_name].filter(Boolean).join(' ') || undefined,
      imageUrl: clerkUser.image_url as string | undefined,
      verified: (clerkUser.email_addresses as Array<{ verification?: { status: string } }>)?.[0]?.verification?.status === 'verified',
      metadata: clerkUser.public_metadata as Record<string, unknown> | undefined,
      createdAt: new Date(clerkUser.created_at as string),
      updatedAt: new Date(clerkUser.updated_at as string),
    };
  }
}

export function createClerkAdapter(config: ClerkAdapterConfig): ClerkAuthAdapter {
  return new ClerkAuthAdapter(config);
}
