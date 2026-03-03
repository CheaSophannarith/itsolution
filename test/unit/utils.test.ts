import { describe, it, expect } from 'vitest'

import { cn } from '../../app/lib/utils'
import { validatePassword } from '../../app/lib/validators'

describe('cn', () => {
    it('merges class names', () => {
        expect(cn('foo', 'bar')).toBe('foo bar')
    })

    it('deduplicates conflicting tailwind classes', () => {
        expect(cn('p-2', 'p-4')).toBe('p-4')
    })
})

describe('validatePassword', () => {
    it('fails when password is empty', () => {
        const result = validatePassword('')
        expect(result.isValid).toBe(false)
        expect(result.errors).toContain('Password is required')
    })

    it('passes with a valid strong password', () => {
        const result = validatePassword('StrongPassw0rd!')
        expect(result.isValid).toBe(true)
        expect(result.errors).toHaveLength(0)
    })
})
