export type PrivacyChoice = 'allow' | 'deny';
export const PRIVACY_KEY = 'benny-privacy-v2';
export const PRIVACY_MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export function readPrivacyChoice(): PrivacyChoice | null {
  try {
    localStorage.removeItem('benny-privacy-v1');
    const record = JSON.parse(localStorage.getItem(PRIVACY_KEY) || 'null');
    if (record && ['allow', 'deny'].includes(record.choice) && record.version === 1 &&
        typeof record.updatedAt === 'number' && record.updatedAt <= Date.now() && Date.now() - record.updatedAt < PRIVACY_MAX_AGE) return record.choice;
    localStorage.removeItem(PRIVACY_KEY);
  } catch { /* Wybór nie wymaga dostępnej pamięci. */ }
  return null;
}
export function savePrivacyChoice(choice: PrivacyChoice): void {
  try { localStorage.setItem(PRIVACY_KEY, JSON.stringify({ choice, updatedAt: Date.now(), version: 1 })); } catch { /* Respektujemy wybór także w bieżącym widoku. */ }
}
