<template>
  <div v-bind:style="styleTest" class="ball" v-on:mouseover='moveRight'></div>
</template>

<script>
import randomColor from 'randomcolor'

var coinflip = function(){
  return Math.random() >= 0.5 ? true : false
}

export default {
  name: "Ball",
  data: function() {
    return {
      ballColor: randomColor(),
      positionX: this.mousePosition.mouseX - 25,
      movementRight: coinflip(),
      positionY: this.mousePosition.mouseY - 25,
      width: 50,
      lastFrameTimeStamp: Date.now(),
      yVelocity: 0.018 * window.innerHeight,
      xVelocity: 5,
      accel: 0.00,
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

    if(this.ballType == 'small')
    {
      this.yVelocity = 0.009 * window.innerHeight
      this.xVelocity = Math.random() * (6 - 1) + 1
      this.width = 20
    }
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
      this.yVelocity = this.yVelocity + this.accel;
      this.checkPosition();
      this.lastFrameTimeStamp = timeStamp;

      this.positionY = this.positionY - this.yVelocity
      // console.log(this.positionY, this.velocity)
      this.aFrame = requestAnimationFrame(this.animatedMove)
      
      if( this.yVelocity < 0 && this.ballType == 'big')
      {
        this.removeBall()
        this.$emit('combust', { event: {clientX: this.positionX, clientY: this.positionY}, quantity: Math.random() * (8 - 2) + 2, ballType: 'small' })
      }

      if( this.ballType == 'small' && this.positionY > (window.innerHeight - 200))
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
      const returnAccel = this.accel - (0.98 * timeDiffInSecs);
      
      return returnAccel
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
