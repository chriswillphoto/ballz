import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



export const store = new Vuex.Store({
  state: {
    what: 'another',
    balls: [],
    ballKey: 0,
  },
  getters: {
    BALLS: state => {
      return state.balls
    },
  },

  mutations: {
    addNewBall(state, mousePos){
      state.balls.push(
        {name: 'ball', startPosition: mousePos, key: "ballKey" + state.ballKey}
      )

      state.ballKey += 1
    },
    removeBall(state, removeBallKey){
      var newState = state.balls.filter((ball) => {
        return ball.key != removeBallKey
      })

      state.balls = newState
    }
  },

  actions: {
    addBallToStore(context, event){
      // console.log(event.clientX)
      var mousePos = {
        mouseX: event.clientX,
        mouseY: event.clientY
      }
      context.commit('addNewBall', mousePos)
    },
    removeBallFromStore(context, ballKey){
      context.commit('removeBall', ballKey)
    }
  }
})