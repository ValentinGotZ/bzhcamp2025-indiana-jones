<script setup lang="ts">
import { usePlayer } from '@/stores/usePlayer.ts'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const playerStore = usePlayer()
const router = useRouter()

const form = reactive({
  firstname: null,
  lastname: null,
  email: null,
  allowContact: false,
})

const onSubmit = async () => {
  if (!form.firstname || !form.lastname || !form.email) {
    return alert('Veuillez remplir tous les champs !')
  }

  try {
    const playerId = await playerStore.addPlayer({
      firstname: form.firstname,
      lastname: form.lastname,
      email: form.email,
      allowContact: form.allowContact,
    })

    await router.push(`/game/${playerId}`)
  } catch (err) {
    console.error(err)

    alert(err)
  }
}
</script>

<template>
  <div class="page--content">
    <img class="title__img" src="../assets/title-jouer.png" alt="Jouer" />

    <form @submit.prevent="onSubmit">
      <div class="form-field">
        <label for="firstname">Prénom</label>
        <input id="firstname" type="text" v-model="form.firstname" required />
      </div>
      <div class="form-field">
        <label for="lastname">Nom</label>
        <input id="lastname" type="text" v-model="form.lastname" required />
      </div>
      <div class="form-field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="form.email" required />
      </div>
      <div class="form-field form-field__checkbox">
        <label for="allowContact">J'accepte d'être contacté</label>
        <input id="allowContact" type="checkbox" v-model="form.allowContact" />
      </div>

      <div class="actions-container">
        <button type="submit" class="button-lg">Jouer</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.page--content {
  display: flex;
  flex-direction: column;

  img {
    align-self: center;
  }

  .actions-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>
