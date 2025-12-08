/**
 * Security: Attack Detection and Logging for CVE-2025-55182 (React2Shell)
 * 
 * This module detects and logs attack attempts, particularly:
 * - Command injection attempts (wget, curl, bash)
 * - File system access attempts (/root, /etc/shadow)
 * - Remote code execution attempts
 */

interface AttackAttempt {
  type: 'command_injection' | 'file_system_access' | 'rce_attempt' | 'suspicious_pattern';
  pattern: string;
  input: string;
  timestamp: string;
  path?: string;
  ip?: string;
}

const attackPatterns = {
  command_injection: [
    /wget\s+-qO-/i,
    /curl\s+/i,
    /\|\s*bash/i,
    /bash\s+-c/i,
    /sh\s+-c/i,
    /powershell/i,
    /node\s+-e/i,
  ],
  file_system_access: [
    /\/root/i,
    /\/etc\/shadow/i,
    /\/etc\/passwd/i,
    /scandir/i,
    /EACCES/i,
  ],
  rce_attempt: [
    /http:\/\/\d+\.\d+\.\d+\.\d+:\d+/i, // IP addresses in URLs
    /command\s+failed/i,
    /exec\(/i,
    /spawn\(/i,
  ],
};

/**
 * Detects attack patterns in error messages or user input
 */
export function detectAttackAttempt(
  input: string,
  context?: { path?: string; ip?: string }
): AttackAttempt | null {
  const inputLower = input.toLowerCase();

  // Check for command injection
  for (const pattern of attackPatterns.command_injection) {
    if (pattern.test(input)) {
      return {
        type: 'command_injection',
        pattern: pattern.toString(),
        input: input.substring(0, 500), // Limit log size
        timestamp: new Date().toISOString(),
        path: context?.path,
        ip: context?.ip,
      };
    }
  }

  // Check for file system access attempts
  for (const pattern of attackPatterns.file_system_access) {
    if (pattern.test(input)) {
      return {
        type: 'file_system_access',
        pattern: pattern.toString(),
        input: input.substring(0, 500),
        timestamp: new Date().toISOString(),
        path: context?.path,
        ip: context?.ip,
      };
    }
  }

  // Check for RCE attempts
  for (const pattern of attackPatterns.rce_attempt) {
    if (pattern.test(input)) {
      return {
        type: 'rce_attempt',
        pattern: pattern.toString(),
        input: input.substring(0, 500),
        timestamp: new Date().toISOString(),
        path: context?.path,
        ip: context?.ip,
      };
    }
  }

  return null;
}

/**
 * Logs attack attempt with full context
 */
export function logAttackAttempt(attempt: AttackAttempt) {
  const logMessage = {
    level: 'SECURITY_ALERT' as const,
    event: 'CVE-2025-55182_EXPLOITATION_ATTEMPT',
    attack: attempt,
    severity: 'CRITICAL',
    recommendation: 'Block this request and investigate source IP',
  };

  // Log to console (will be captured by logging system)
  console.error('[SECURITY ALERT] Attack attempt detected:', JSON.stringify(logMessage, null, 2));

  // In production, you might want to:
  // - Send to security monitoring system
  // - Send to SIEM
  // - Send alert to security team
  // - Block IP address automatically

  return logMessage;
}

/**
 * Checks if an error message indicates an attack attempt
 */
export function isAttackError(error: Error | string): boolean {
  const errorMessage = error instanceof Error ? error.message : error;
  return detectAttackAttempt(errorMessage) !== null;
}

/**
 * Specific detection for the attacks we've seen
 */
export function detectKnownAttackPatterns(error: Error | string): {
  detected: boolean;
  attackType?: string;
  details?: string;
} {
  const errorMessage = error instanceof Error ? error.message : error;
  const errorLower = errorMessage.toLowerCase();

  // Known attack: wget command injection
  if (/wget\s+-qO-.*\|\s*bash/i.test(errorMessage)) {
    return {
      detected: true,
      attackType: 'CVE-2025-55182_RCE_ATTEMPT',
      details: 'Attempted remote code execution via wget and bash pipe',
    };
  }

  // Known attack: file system access to /root
  if (/eacces.*scandir.*\/root/i.test(errorLower)) {
    return {
      detected: true,
      attackType: 'FILE_SYSTEM_RECONNAISSANCE',
      details: 'Attempted to scan /root directory',
    };
  }

  // Known attack: reading /etc/shadow
  if (/eacces.*open.*\/etc\/shadow/i.test(errorLower)) {
    return {
      detected: true,
      attackType: 'CREDENTIAL_THEFT_ATTEMPT',
      details: 'Attempted to read password file /etc/shadow',
    };
  }

  return { detected: false };
}
