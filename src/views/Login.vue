<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">

    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">

      <h1 class="mb-6 text-3xl font-bold text-center dark:text-white">
        Login
      </h1>

      <form @submit.prevent="handleLogin">

        <div class="mb-4">

          <label class="block mb-2 font-medium dark:text-white">
            Username
          </label>

          <input
            v-model="username"
            type="text"
            placeholder="Enter username"
            class="w-full p-3 border rounded-lg outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />

        </div>

      
        <div class="mb-6">

          <label class="block mb-2 font-medium dark:text-white">
            Password
          </label>

          <input
            v-model="password"
            type="password"
            placeholder="Enter password"
            class="w-full p-3 border rounded-lg outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />

        </div>

     
        <p
          v-if="errorMessage"
          class="mb-4 text-sm text-red-500"
        >
          {{ errorMessage }}
        </p>

        
        <button
          type="submit"
          class="w-full py-3 text-white bg-black rounded-lg hover:bg-gray-800 dark:bg-white dark:text-black"
        >
          Login
        </button>

      </form>

   
      <div class="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">

        <p>Demo Account</p>

        <p>Username: emilys</p>

        <p>Password: emilyspass</p>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface LoginResponse {
  accessToken: string
  refreshToken: string
  username: string
}

const router = useRouter()

const username = ref('')
const password = ref('')

const errorMessage = ref('')

async function handleLogin() {

  errorMessage.value = ''

  try {

    const response = await fetch(
      'https://dummyjson.com/auth/login',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          username: username.value,
          password: password.value,
          expiresInMins: 30
        })
      }
    )

    if (!response.ok) {
      throw new Error('Invalid credentials')
    }

    const data: LoginResponse = await response.json()

   
    localStorage.setItem(
      'token',
      data.accessToken
    )

    localStorage.setItem(
      'user',
      data.username
    )

    router.push('/')

    window.location.reload()

  } catch (error) {

    errorMessage.value =
      'Invalid username or password'

  }

}
</script>