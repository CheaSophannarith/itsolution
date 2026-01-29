# Authentication Quick Reference

Quick reference guide for developers working with the TanXLM authentication system.

## 🚀 Quick Start

### Check if user is authenticated
```typescript
const authStore = useAuthStore()
if (authStore.isAuthenticated) {
  // User is logged in
}
```

### Get current user
```typescript
const authStore = useAuthStore()
const user = authStore.currentUser
console.log(user?.name, user?.email)
```

### Check if email is verified
```typescript
const authStore = useAuthStore()
if (authStore.user?.email_verified_at) {
  // Email is verified
}
```

---

## 🔐 Authentication Actions

### Login
```typescript
const authStore = useAuthStore()
await authStore.login({
  email: 'user@example.com',
  password: 'Password123',
})
```

### Register
```typescript
const authStore = useAuthStore()
await authStore.register({
  name: 'John Doe',
  email: 'user@example.com',
  password: 'Password123',
  password_confirmation: 'Password123'
})
```

### Logout
```typescript
const authStore = useAuthStore()
await authStore.logout()
navigateTo('/signin')
```

### Refresh User Data
```typescript
const authStore = useAuthStore()
await authStore.fetchUser()
```

---

## 📧 Email Verification

### Use Composable
```typescript
const {
  isVerifying,
  verificationSuccess,
  verifyEmail,
  resendVerificationEmail
} = useEmailVerification()

// Verify email
await verifyEmail(id, hash, signature, expires)

// Resend email
await resendVerificationEmail()
```

### Check Verification Status
```typescript
const { needsVerification } = useEmailVerification()
if (needsVerification()) {
  navigateTo('/verify-email')
}
```

---

## 🔑 Password Management

### Forgot Password
```typescript
const authStore = useAuthStore()
await authStore.forgotPassword('user@example.com')
```

### Reset Password
```typescript
const authStore = useAuthStore()
await authStore.resetPassword({
  token: 'reset-token-from-email',
  email: 'user@example.com',
  password: 'NewPassword123',
  password_confirmation: 'NewPassword123'
})
```

### Change Password
```typescript
const authStore = useAuthStore()
await authStore.changePassword({
  current_password: 'OldPassword123',
  password: 'NewPassword123',
  password_confirmation: 'NewPassword123'
})
```

---

## 🛡️ Protecting Routes

### Require Authentication
```typescript
// In your page component
definePageMeta({
  middleware: 'auth'
})
```

### Guest Only (Login/Register pages)
```typescript
// In your page component
definePageMeta({
  middleware: 'guest'
})
```

### Public Page (Skip Verification Check)
Add to exclusion list in `01.check-verification.global.ts`:
```typescript
const excludedPaths = [
  '/your-public-page'
]
```

---

## 🎨 UI Components

### Password Input with Validation
```vue
<template>
  <div>
    <input v-model="password" type="password" />

    <!-- Password Strength -->
    <div class="flex gap-1.5 mt-2">
      <div :class="passwordStrength >= 1 ? 'bg-red-500' : 'bg-gray-200'"></div>
      <div :class="passwordStrength >= 2 ? 'bg-orange-500' : 'bg-gray-200'"></div>
      <div :class="passwordStrength >= 3 ? 'bg-yellow-500' : 'bg-gray-200'"></div>
      <div :class="passwordStrength >= 4 ? 'bg-green-500' : 'bg-gray-200'"></div>
    </div>

    <!-- Requirements -->
    <div class="mt-2 space-y-1 text-xs">
      <p :class="minLength ? 'text-green-600' : 'text-gray-500'">
        {{ minLength ? '✓' : '○' }} At least 8 characters
      </p>
      <p :class="hasUppercase ? 'text-green-600' : 'text-gray-500'">
        {{ hasUppercase ? '✓' : '○' }} One uppercase letter
      </p>
      <p :class="hasNumber ? 'text-green-600' : 'text-gray-500'">
        {{ hasNumber ? '✓' : '○' }} One number
      </p>
    </div>
  </div>
</template>

<script setup>
const password = ref('')

const minLength = computed(() => password.value.length >= 8)
const hasUppercase = computed(() => /[A-Z]/.test(password.value))
const hasNumber = computed(() => /[0-9]/.test(password.value))

const passwordStrength = computed(() => {
  let strength = 0
  if (minLength.value) strength++
  if (hasUppercase.value) strength++
  if (hasNumber.value) strength++
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password.value)) strength++
  return strength
})
</script>
```

### Show Toast Notification
```typescript
const { addToast } = useToast()

// Success
addToast('Operation successful!', 'success')

// Error
addToast('Something went wrong!', 'error')

// Info
addToast('Please note this information', 'info')
```

---

## 🔧 Common Patterns

### Redirect After Login
```typescript
const route = useRoute()
const redirect = route.query.redirect as string

// After successful login
if (authStore.user?.email_verified_at) {
  navigateTo(redirect || '/')
} else {
  navigateTo('/verify-email')
}
```

### Handle API Errors
```typescript
try {
  await authStore.login(credentials)
} catch (error: any) {
  if (error.errors) {
    // Laravel validation errors
    const errors = Object.values(error.errors).flat()
    addToast(errors[0], 'error')
  } else if (error.message) {
    addToast(error.message, 'error')
  } else {
    addToast('An error occurred', 'error')
  }
}
```

### Force Full Page Reload
```typescript
// When you need middleware to re-run with fresh data
window.location.href = '/'
```

### Loading States
```vue
<template>
  <button :disabled="isLoading">
    <Loader2 v-if="isLoading" class="animate-spin" />
    <span v-else>Submit</span>
  </button>
</template>

<script setup>
const isLoading = ref(false)

async function submit() {
  isLoading.value = true
  try {
    await someAsyncOperation()
  } finally {
    isLoading.value = false
  }
}
</script>
```

---

## 📦 Type Definitions

### User
```typescript
interface User {
  uuid: string
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
}
```

### Auth State
```typescript
interface AuthState {
  user: User | null
  token: string | null
}
```

### Login Request
```typescript
interface LoginRequest {
  email: string
  password: string
}
```

### Register Request
```typescript
interface RegisterRequest {
  name: string
  email: string
  password: string
  password_confirmation: string
}
```

---

## 🐛 Debugging

### Check Auth Store State
```typescript
const authStore = useAuthStore()
console.log('User:', authStore.user)
console.log('Token:', authStore.token)
console.log('Is Authenticated:', authStore.isAuthenticated)
```

### Check Current Route
```typescript
const route = useRoute()
console.log('Path:', route.path)
console.log('Query:', route.query)
console.log('Full Path:', route.fullPath)
```

### Test Email Verification
```typescript
const { needsVerification } = useEmailVerification()
console.log('Needs Verification:', needsVerification())
```

### View Middleware Execution
Add console logs in middleware:
```typescript
export default defineNuxtRouteMiddleware((to, from) => {
  console.log('Middleware running:', to.path)
  // ... middleware logic
})
```

---

## 🎯 Cheat Sheet

| Task | Code |
|------|------|
| Get current user | `useAuthStore().currentUser` |
| Check if logged in | `useAuthStore().isAuthenticated` |
| Check if verified | `authStore.user?.email_verified_at` |
| Login user | `await authStore.login(credentials)` |
| Logout user | `await authStore.logout()` |
| Show toast | `addToast(message, 'success')` |
| Protect route | `definePageMeta({ middleware: 'auth' })` |
| Verify email | `await verifyEmail(id, hash, signature, expires)` |
| Resend email | `await resendVerificationEmail()` |
| Reset password | `await authStore.resetPassword(data)` |

---

## 📚 Related Files

| Purpose | File Path |
|---------|-----------|
| Auth Store | `app/stores/auth.ts` |
| API Client | `app/composables/useApi.ts` |
| Email Verification | `app/composables/useEmailVerification.ts` |
| Auth Middleware | `app/middleware/auth.ts` |
| Guest Middleware | `app/middleware/guest.ts` |
| Global Check | `app/middleware/01.check-verification.global.ts` |
| Login Page | `app/pages/(auth)/signin.vue` |
| Register Page | `app/pages/(auth)/signup.vue` |
| Verify Page | `app/pages/(auth)/verify-email.vue` |
| Profile Page | `app/pages/profile/index.vue` |

---

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| Can't redirect after verification | Use `window.location.href = '/'` |
| Infinite redirect loop | Check `/verify-email` is in excluded paths |
| Guest middleware not found | Create `app/middleware/guest.ts` |
| Verification link expired | Click "Resend verification email" |
| "Already verified" shows error | Update composable to treat as success |
| Can access pages without verification | Check global middleware exists |

---

**Tip**: Always wrap async operations in try-catch blocks and provide user feedback!