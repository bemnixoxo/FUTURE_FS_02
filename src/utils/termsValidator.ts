/**
 * Client-side security and sanitization checks.
 */

export const MALICIOUS_INJECTIONS = [
  '<script',
  'javascript:',
  'onerror=',
  'onload=',
  'eval(',
  '<iframe',
] as const;

export interface TermValidationResult {
  isValid: boolean;
  matchedTerm?: string;
  type?: 'reserved' | 'prohibited';
  error?: string;
}

export function checkReservedOrProhibitedTerms(...inputs: (string | undefined | null)[]): TermValidationResult {
  const combinedText = inputs.filter(Boolean).join(' ').toLowerCase();

  for (const term of MALICIOUS_INJECTIONS) {
    if (combinedText.includes(term.toLowerCase())) {
      return {
        isValid: false,
        matchedTerm: term,
        type: 'prohibited',
        error: `Submission contains prohibited script or code injection pattern: "${term}".`,
      };
    }
  }

  return { isValid: true };
}
