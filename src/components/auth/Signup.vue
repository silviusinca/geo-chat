<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password">
      </div>
      <div class="field">
        <label for="nickname">Nickname:</label>
        <input type="text" name="nickname" v-model="nickname">
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
  name: 'Signup',
  data () {
    return {
      email: null,
      password: null,
      nickname: null,
      feedback: null,
      slug: null
    }
  },
  methods: {
    signup () {
      if(this.nickname && this.email && this.password) {
        this.feedback = null
        this.slug = slugify(this.nickname, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        let ref = db.collection('users').doc(this.slug)
        ref.get().then(doc => {
          if(doc.exists) this.feedback = 'This nickname is already used'
          else {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(cred => {
              // console.log(cred.user)
              ref.set({
                nickname: this.nickname,
                geolocation: null,
                user_id: cred.user.uid
              })
            })
            .then(() => this.$router.push({ name: 'GMap' }))
            .catch(e => {
              console.log(e)
              this.feedback = e.message
            })
            this.feedback = 'This nickname is free to use'
          }
        })
        console.log(this.slug)
      } else {
        this.feedback = 'You must enter all fields!'
      }
    }
  }
}
</script>

<style>
.signup{
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}
.signup .field{
  margin-bottom: 16px;
}
</style>
