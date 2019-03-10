<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center indigo-text">Signup</h2>
      <div class ="field">
        <label class="indigo-text" for="email">Email</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class ="field">
        <label class="indigo-text" for="password">Password</label>
        <input type="password" name="password" v-model="password">
      </div>
      <div class ="field">
        <label class="indigo-text" for="nickname">NickName:</label>
        <input type="text" name="nickname" v-model="nickname">
      </div>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class ="field center">
        <button class="btn indigo">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
import firebase from 'firebase'


export default{
  name: 'Signup',
  data(){
    return{
      email: null,
      password: null,
      nickname: null,
      feedback: null,
      slug: null
    }
  },
  methods:{
    signup(){
      if(this.nickname && this.email && this.password){
        this.slug = slugify(this.nickname, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })

        let ref = db.collection('users').doc(this.slug)
        ref.get().then(doc => {
          if(doc.exists){
            this.feedback = '별명이 이미 사용중입니다!.'
          }
          else {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(cred => {
              ref.set({
                nickname: this.nickname,
                geolocation: null,
                user_id: cred.user.uid
              })
            }).then(() => {
              this.$router.push({ name: 'GMap' })
            })
            .catch(err => {
              this.feedback = err.message
            })

            this.feedback = '별명이용가능합니다'
          }
        })
        console.log(this.slug)
      }

      else {
        this.feedback = "모든 입력란에 입력해주세요."
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
.signup h2{
  font-size:2.4em;
}
.signup.field{
  margin-bottom: 16px;
}

</style>
