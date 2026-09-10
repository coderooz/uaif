import type {
  AuthContract,
  UAIFUser,
  UAIFSession,
  LoginInput,
  RegisterInput,
  AuthResult,
  ContractMetadata,
} from '@uaif/core';

export interface FirebaseAuthAdapterConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

export class FirebaseAuthAdapter implements AuthContract {
  readonly metadata: ContractMetadata = {
    id: 'firebase',
    version: '0.1.0',
    segment: 'auth',
    description: 'Firebase authentication adapter for UAIF',
    contexts: ['client-component', 'server-component', 'route-handler'],
  };

  readonly portable = true;

  private config: FirebaseAuthAdapterConfig;
  private currentToken: string | null = null;

  constructor(config: FirebaseAuthAdapterConfig) {
    this.config = config;
  }

  async login(input: LoginInput): Promise<AuthResult> {
    const { email, password } = input;

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.config.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );

    if (!response.ok) {
      return { success: false, error: 'Login failed' };
    }

    const data = (await response.json()) as Record<string, unknown>;
    this.currentToken = data.idToken as string;

    const user: UAIFUser = {
      id: data.localId as string,
      email: data.email as string,
      displayName: data.displayName as string,
      imageUrl: data.photoUrl as string,
      verified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const session: UAIFSession = {
      id: data.idToken as string,
      user,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + Number(data.expiresIn) * 1000),
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

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.config.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          displayName,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      return { success: false, error: 'Registration failed' };
    }

    const data = (await response.json()) as Record<string, unknown>;
    this.currentToken = data.idToken as string;

    const user: UAIFUser = {
      id: data.localId as string,
      email: data.email as string,
      displayName: data.displayName as string,
      verified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const session: UAIFSession = {
      id: data.idToken as string,
      user,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + Number(data.expiresIn) * 1000),
      active: true,
    };

    return {
      success: true,
      user,
      session,
    };
  }

  async logout(): Promise<void> {
    this.currentToken = null;
  }

  async getCurrentUser(): Promise<UAIFUser | null> {
    if (!this.currentToken) return null;

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${this.config.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken: this.currentToken }),
        }
      );

      if (!response.ok) return null;

      const data = (await response.json()) as Record<string, unknown>;
      const users = data.users as Array<Record<string, unknown>> | undefined;
      const userData = users?.[0];
      if (!userData) return null;

      return {
        id: userData.localId as string,
        email: userData.email as string,
        displayName: userData.displayName as string,
        imageUrl: userData.photoUrl as string,
        verified: true,
        metadata: userData.customAttributes ? JSON.parse(userData.customAttributes as string) : undefined,
        createdAt: new Date(Number(userData.createdAt) * 1000),
        updatedAt: new Date(Number(userData.lastLoginAt) * 1000),
      };
    } catch {
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null;
  }

  async getSession(): Promise<UAIFSession | null> {
    const user = await this.getCurrentUser();
    if (!user) return null;

    return {
      id: this.currentToken || '',
      user,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 3600 * 1000),
      active: true,
    };
  }

  async updateUser(userId: string, data: Partial<UAIFUser>): Promise<UAIFUser> {
    if (!this.currentToken) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${this.config.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idToken: this.currentToken,
          displayName: data.displayName,
          photoUrl: data.imageUrl,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not found after update');

    return user;
  }

  async deleteUser(_userId: string): Promise<void> {
    if (!this.currentToken) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${this.config.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: this.currentToken }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    this.currentToken = null;
  }

  async verifyToken(token: string): Promise<UAIFUser | null> {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${this.config.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken: token }),
        }
      );

      if (!response.ok) return null;

      const data = (await response.json()) as Record<string, unknown>;
      const users = data.users as Array<Record<string, unknown>> | undefined;
      const userData = users?.[0];
      if (!userData) return null;

      return {
        id: userData.localId as string,
        email: userData.email as string,
        displayName: userData.displayName as string,
        imageUrl: userData.photoUrl as string,
        verified: true,
        createdAt: new Date(Number(userData.createdAt) * 1000),
        updatedAt: new Date(Number(userData.lastLoginAt) * 1000),
      };
    } catch {
      return null;
    }
  }
}

export function createFirebaseAuthAdapter(config: FirebaseAuthAdapterConfig): FirebaseAuthAdapter {
  return new FirebaseAuthAdapter(config);
}
