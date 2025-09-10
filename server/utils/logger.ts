/**
 * Secure logging utility for production-safe logging
 */

const isDevelopment = process.env.NODE_ENV !== 'production';

/**
 * Masks sensitive information in strings
 */
function maskSensitiveInfo(str: string): string {
  return str
    .replace(/DATABASE_URL: [^\s]+/g, 'DATABASE_URL: [MASKED]')
    .replace(/password@[^\s\/]+/g, 'password@[MASKED]')
    .replace(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi, '[UUID-MASKED]')
    .replace(/\b\d{10,15}\b/g, '[PHONE-MASKED]') // Mask phone numbers
    .replace(/\b\d{4,8}\b/g, '[OTP-MASKED]') // Mask potential OTPs
    .replace(/password.*:.*[^,}]*/gi, 'password: [MASKED]')
    .replace(/email.*:.*[@][^,}]*/gi, 'email: [MASKED]')
    .replace(/AC[a-f0-9]{32}/gi, '[TWILIO-SID-MASKED]') // Mask Twilio SIDs
    .replace(/SM[a-f0-9]{32}/gi, '[MSG-SID-MASKED]'); // Mask message SIDs
}

/**
 * Masks phone numbers to show only last 4 digits
 */
function maskPhoneNumber(phone: string): string {
  if (!phone || phone.length < 4) return '[PHONE-MASKED]';
  return phone.slice(0, -4).replace(/./g, '*') + phone.slice(-4);
}

/**
 * Secure logging function that only logs in development or logs safely in production
 */
export function secureLog(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
  if (isDevelopment) {
    // In development, log everything but still mask sensitive data
    const maskedMessage = maskSensitiveInfo(message);
    console.log(`[${level.toUpperCase()}] ${maskedMessage}`);
  } else {
    // In production, only log non-sensitive operational messages
    if (level === 'error' || level === 'warn') {
      // For errors and warnings, log but mask sensitive data
      const maskedMessage = maskSensitiveInfo(message);
      console.log(`[${level.toUpperCase()}] ${maskedMessage}`);
    }
    // Info logs are suppressed in production unless they're operational
    if (level === 'info' && (
      message.includes('Server') || 
      message.includes('initialized') ||
      message.includes('connected') ||
      message.includes('started')
    )) {
      const maskedMessage = maskSensitiveInfo(message);
      console.log(`[INFO] ${maskedMessage}`);
    }
  }
}

/**
 * Development-only logging function
 */
export function devLog(message: string): void {
  if (isDevelopment) {
    const maskedMessage = maskSensitiveInfo(message);
    console.log(`[DEV] ${maskedMessage}`);
  }
}

/**
 * Safe logging for authentication events
 */
export function authLog(action: string, identifier?: string): void {
  const safeIdentifier = identifier ? `user: ${maskPhoneNumber(identifier)}` : '';
  secureLog(`Auth ${action} ${safeIdentifier}`, 'info');
}

/**
 * Safe logging for SMS/messaging events
 */
export function messageLog(action: string, recipient?: string, success: boolean = true): void {
  const level = success ? 'info' : 'error';
  const safeRecipient = recipient ? maskPhoneNumber(recipient) : '[RECIPIENT-MASKED]';
  secureLog(`Message ${action} to ${safeRecipient}: ${success ? 'sent' : 'failed'}`, level);
}

export { maskSensitiveInfo, maskPhoneNumber };