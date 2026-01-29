export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export interface PasswordRequirements {
  minLength?: number
  requireUppercase?: boolean
  requireLowercase?: boolean
  requireNumber?: boolean
  requireSpecialChar?: boolean
}

export interface ImageFileConfig {
  maxSizeMB?: number
  allowedTypes?: string[]
}

const DEFAULT_PASSWORD_REQUIREMENTS: Required<PasswordRequirements> = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: false,
}

const DEFAULT_IMAGE_CONFIG: Required<ImageFileConfig> = {
  maxSizeMB: 5,
  allowedTypes: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'],
}

/**
 * Validates a password against specified requirements
 */
export function validatePassword(
  password: string,
  requirements: PasswordRequirements = {}
): ValidationResult {
  const reqs = { ...DEFAULT_PASSWORD_REQUIREMENTS, ...requirements }
  const errors: string[] = []

  if (!password) {
    errors.push('Password is required')
    return { isValid: false, errors }
  }

  if (password.length < reqs.minLength) {
    errors.push(`Password must be at least ${reqs.minLength} characters long`)
  }

  if (reqs.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (reqs.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (reqs.requireNumber && !/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  if (reqs.requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Validates that two passwords match
 */
export function validatePasswordMatch(
  password: string,
  confirmPassword: string
): ValidationResult {
  const errors: string[] = []

  if (!confirmPassword) {
    errors.push('Please confirm your password')
    return { isValid: false, errors }
  }

  if (password !== confirmPassword) {
    errors.push('Passwords do not match')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Validates an image file against size and type constraints
 */
export function validateImageFile(
  file: File | null,
  config: ImageFileConfig = {}
): ValidationResult {
  const cfg = { ...DEFAULT_IMAGE_CONFIG, ...config }
  const errors: string[] = []

  if (!file) {
    errors.push('Please select a file')
    return { isValid: false, errors }
  }

  // Check file type
  if (!cfg.allowedTypes.includes(file.type)) {
    const allowedExtensions = cfg.allowedTypes
      .map((type) => type.replace('image/', ''))
      .join(', ')
    errors.push(`File must be one of: ${allowedExtensions}`)
  }

  // Check file size
  const maxSizeBytes = cfg.maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    errors.push(`File size must be less than ${cfg.maxSizeMB}MB`)
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
