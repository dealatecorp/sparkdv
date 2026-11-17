export interface AccountUser {
  id: string;
  email: string;
  mobile: string | null;
  name: string;
  created_at: string;
  order_staff?: boolean;
}

export async function authRequest(action?: string, fields?: Record<string, string>): Promise<AccountUser | null> {
  const response = await fetch('/api/auth', action ? {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...fields }),
  } : { cache: 'no-store' });
  const data = await response.json().catch(() => null);
  if (!response.ok || !data || !('user' in data)) {
    throw new Error(data?.error || 'The account service is unavailable. Try again shortly.');
  }
  return data.user;
}
