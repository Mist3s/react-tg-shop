import type { AuthTokens } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const AUTH_STORAGE_KEY = 'teagram-auth';

export class ApiError extends Error {
  status?: number;
  data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

const readAuthTokens = (): AuthTokens | null => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as AuthTokens;
  } catch (error) {
    console.error('Failed to parse auth tokens', error);
    return null;
  }
};

const persistAuthTokens = (tokens: AuthTokens | null) => {
  if (!tokens) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(tokens));
};

let inFlightRefresh: Promise<AuthTokens | null> | null = null;

const refreshTokens = async (): Promise<AuthTokens | null> => {
  if (inFlightRefresh) {
    return inFlightRefresh;
  }

  const tokens = readAuthTokens();
  if (!tokens?.refreshToken) {
    return null;
  }

  inFlightRefresh = fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken: tokens.refreshToken }),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new ApiError('Failed to refresh tokens', response.status, await response.json().catch(() => null));
      }
      const nextTokens = (await response.json()) as AuthTokens;
      persistAuthTokens(nextTokens);
      return nextTokens;
    })
    .catch((error) => {
      console.error('Token refresh failed', error);
      persistAuthTokens(null);
      return null;
    })
    .finally(() => {
      inFlightRefresh = null;
    });

  return inFlightRefresh;
};

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

export const request = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const tokens = options.skipAuth ? null : readAuthTokens();
  const headers = new Headers({ Accept: 'application/json' });

  if (options.headers) {
    const incoming = new Headers(options.headers);
    incoming.forEach((value, key) => headers.set(key, value));
  }

  if (!options.skipAuth && tokens?.accessToken) {
    headers.set('Authorization', `Bearer ${tokens.accessToken}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.ok) {
    if (response.status === 204) {
      return undefined as T;
    }
    return (await response.json()) as T;
  }

  if (response.status === 401 && !options.skipAuth) {
    const refreshed = await refreshTokens();
    if (refreshed?.accessToken) {
      return request<T>(path, options);
    }
  }

  let errorBody: unknown;
  try {
    errorBody = await response.json();
  } catch (error) {
    errorBody = null;
  }

  throw new ApiError('Request failed', response.status, errorBody);
};

export const setAuthTokens = (tokens: AuthTokens | null) => persistAuthTokens(tokens);
export const getAuthTokens = () => readAuthTokens();
