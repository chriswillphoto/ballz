<template>
  <div id="app" v-on:click='addBallToStore({event:$event, quantity: 1, ballType: "big"})'>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    
    <Ball v-for='ball in BALLS'  v-bind:mousePosition='ball.startPosition' v-bind:key='ball.key' v-bind:ballkey='ball.key' @remove='removeBallFromStore(ball.key)' @combust='addBallToStore' v-bind:ballType='ball.ballType'/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import {mapGetters, mapActions} from 'vuex'
import Ball from './components/Ball.vue'

export default {
  name: 'app',
  components: {
    Ball,
  },
  computed: {
    ...mapGetters([
      'BALLS',
    ])
  },
  methods: {
    ...mapActions(({
      addBallToStore: "addBallToStore",
      removeBallFromStore: "removeBallFromStore"
    })),
    addBall: function() {

    }
  },
  data: function(){
    return {
      ballKey: 1,
    }
  }

}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  /* margin-top: 60px; */
  background: #34343f;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
</style>
