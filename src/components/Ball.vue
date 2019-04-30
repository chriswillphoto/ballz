<template>
  <div v-bind:style="styleTest" class="ball" v-on:mouseover='moveRight'></div>
</template>

<script>
import randomColor from 'randomcolor'

var coinflip = function(){
  return Math.random() >= 0.5 ? true : false
}

var randomVelocity = function() { 
  var denom = Math.floor(Math.random() * (130 - 70 + 1) + 70);
  console.log(denom)
  return denom / 100
}

var gravityVar = 980

export default {
  name: "Ball",
  data: function() {
    return {
      ballColor: randomColor(),
      positionX: this.mousePosition.mouseX - 25,
      movementRight: coinflip(),
      positionY: this.mousePosition.mouseY - 25,
      width: this.ballType == 'big' ? 40 : 20,
      lastFrameTimeStamp: Date.now(),
      yVelocity: this.ballType == 'big' ? randomVelocity() * 0.8 * window.innerHeight : randomVelocity() * 0.15 * window.innerHeight,
      xVelocity: Math.random() * (6 - 1) + 1,
      accel: 0,
      aFrame: 0,
      ballSize: this.ballType
    }
  },
  props: {
    'mousePosition': Object,
    'ballType': String
  },
  computed: {
    styleTest() {
      return {
        backgroundColor: this.ballColor,
        position: "absolute",
        left: this.positionX + "px",
        top: this.positionY + "px",
        width: this.width +"px",
        height: this.width + "px",
      }
    }
  },
  mounted: function(){
    this.animatedMove()
    // console.log(typeof randomColor({format: 'hsla', alpha: 1}))
  },
  methods: {
    moveRight: function() {
      if(this.movementRight){
        this.positionX = this.positionX + this.xVelocity;
      }else{
        this.positionX = this.positionX - this.xVelocity;
      }
    },

    animatedMove: function() {
      const timeStamp = Date.now()
      this.moveRight();
      this.accel = this.gravity(timeStamp);
      this.yVelocity = this.velocityChange(timeStamp, this.yVelocity, this.accel)
      console.log(this.yVelocity)
      this.checkPosition();
      this.positionY = this.positionY - this.findDistance(timeStamp)
      this.lastFrameTimeStamp = timeStamp;

    
      // console.log(this.positionY, this.velocity)
      this.aFrame = requestAnimationFrame(this.animatedMove)
      
      if( this.yVelocity < 0 && this.ballType == 'big')
      {
        this.removeBall()
        this.$emit('combust', { event: {clientX: this.positionX, clientY: this.positionY}, quantity: Math.random() * (8 - 2) + 2, ballType: 'small' })
      }

      if( this.ballType == 'small' && this.positionY > (window.innerHeight - 5))
      {
        this.removeBall()
      }

      // console.log(this.ballType, this.positionY)
    },

    checkPosition: function(){
      if(this.positionX >= window.innerWidth - 50 || this.positionX < 0){
        this.movementRight = !this.movementRight
        // this.test = randomColor();
      }
    },

    gravity: function(timeStamp) {
      const timeDiffInSecs = (timeStamp - this.lastFrameTimeStamp) / 1000;
      const returnAccel = this.accel - (gravityVar * timeDiffInSecs);
      
      // console.log(returnAccel)
      return returnAccel
      
    },

    velocityChange: function(timeStamp, velocity, accel){
      const timeDiffInSecs = (timeStamp - this.lastFrameTimeStamp) / 1000
      const returnVelocity = velocity + (accel * timeDiffInSecs)

      return returnVelocity
    },

    findDistance: function(timeStamp){
      const timeDiffInSecs = (timeStamp - this.lastFrameTimeStamp) / 1000
      const returnDistance = (this.yVelocity * timeDiffInSecs)
      // console.log(returnDistance)
      return returnDistance
    },

    removeBall: function(){
      this.$emit('remove')
      window.cancelAnimationFrame(this.aFrame)
    }
  }
}
</script>

<style>
  .ball {
    /* width: 50px;
    height: 50px; */
    border-radius: 50%;
  }
</style>
