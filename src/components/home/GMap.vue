<template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'
export default {
  name: 'GMap',
  data(){
    return {
      user:null,
      lat: 37,
      lng: 126
    }
  },

  methods: {
    renderMap(){
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: this.lat , lng: this.lng },
        zoom: 6,
        maxZoom: 20,
        minZoom: 3,
        streetViewControl: false
      })

      var user = firebase.auth().currentUser

      db.collection('users').get().then(users => {
        users.docs.forEach(doc => {
          let data = doc.data()
          if(data.user_id == user.uid){
            if(data.geolocation){
              let marker = new google.maps.Marker({
                position : {
                  lat: data.geolocation.lat,
                  lng: data.geolocation.lng
                },
                title: 'My Position',
                map
              })

              //마커에 클릭 이벤트 추가
              marker.addListener('click', () => {
                this.$router.push({name: 'ViewProfile', params: { id: doc.id}})
              })
            }
          } else{
            if(data.geolocation){
              let marker = new google.maps.Marker({
                position : {
                  lat: data.geolocation.lat,
                  lng: data.geolocation.lng
                },
                icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|1b5e20',
                title: doc.id,
                map
              })
              //마커에 클릭 이벤트 추가
              marker.addListener('click', () => {
                this.$router.push({name: 'ViewProfile', params: { id: doc.id}})
              })
            }
          }
        })
      })
    }
  },

  mounted(){
    //현재사용자 가져오기
    let user = firebase.auth().currentUser

    // 사용자 위치정보 가져오기
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos => {
        this.lat = pos.coords.latitude
        this.lng = pos.coords.longitude

        // 사용자 레코드 찾은 후 geocoords업데이트
        db.collection('users').where('user_id', '==', user.uid).get()
        .then(snapshot => {
          snapshot.forEach((doc) => {
            db.collection('users').doc(doc.id).update({
              geolocation: {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
              }
            })
          })
        }).then(() => {
          this.renderMap()
        })

      }, (err) => {
        console.log(err)
        this.renderMap()
      }, { maximumAge : 60000, timeout : 3000 })
    } else{
      //기본값위치로 화면맞추기
      this.renderMap()
    }
  }
}
</script>

<style>
.google-map{
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top:0;
  left:0;
  z-index: -1;
}
</style>
