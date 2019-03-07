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
    addNewBall(state, ballAttr){
      // let quantityInt = parseInt(quantity)
      for (let i = 0; i < ballAttr.quantity; i++) {
        state.balls.push(
          {name: 'ball', startPosition: ballAttr.mousePos, key: "ballKey" + state.ballKey, ballType: ballAttr.ballType}
        )
        state.ballKey += 1
      }
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
      // console.log(event)
      var ballAttr = {
        mousePos: {
          mouseX: event.event.clientX,
          mouseY: event.event.clientY
        },
        quantity: event.quantity,
        ballType: event.ballType
      }
      context.commit('addNewBall', ballAttr)
    },
    removeBallFromStore(context, ballKey){
      context.commit('removeBall', ballKey)
    }
  }
})