<template>
  <div id="clock" >
    <span class="time">{{ time }}</span>
<!--   <div class="btn-container">
    <a id="start" @click="start">Start</a>
    <a id="stop" @click="stop">Stop</a>
    <a id="reset" @click="reset">Reset</a>
  </div> -->
  </div>
</template>

<script>
  export default {

    name: 'StopWatch',

    props: {
      isStarted: {type: Boolean, default: false}
    },

    data() {
      return {
        time: '00:00:00.000',
        timeBegan: null,
        timeStopped: null,
        stoppedDuration: 0,
        started: null,
        running: false
      }
    },

    watch: {
      isStarted() {
        console.log(this.isStarted);
        (this.isStarted  == true) ? this.start() : this.stop()
      }
    },

    methods: {
      start: function() {
        console.log('zuzuzuz')
        this.reset();
        if (this.isStarted) {
          if(this.running) return;
        
          if (this.timeBegan === null) {
            this.reset();
            this.timeBegan = new Date();
          }

          if (this.timeStopped !== null) {
            this.stoppedDuration += (new Date() - this.timeStopped);
          }

          this.started = setInterval(this.clockRunning, 10);	
          this.running = true;
        }
      },
      stop: function() {
        this.isStarted = false;
        this.running = false;
        this.timeStopped = new Date();
        clearInterval(this.started);
        this.$emit('foundTime', this.time);
      },
      reset: function() {
        this.running = false;
        clearInterval(this.started);
        this.stoppedDuration = 0;
        this.timeBegan = null;
        this.timeStopped = null;
        this.time = "00:00:00.000";
      },
      clockRunning: function(){
        let currentTime = new Date()
        , timeElapsed = new Date(currentTime - this.timeBegan - this.stoppedDuration)
        , hour = timeElapsed.getUTCHours()
        , min = timeElapsed.getUTCMinutes()
        , sec = timeElapsed.getUTCSeconds()
        , ms = timeElapsed.getUTCMilliseconds();

        this.time = 
          this.zeroPrefix(hour, 2) + ":" + 
          this.zeroPrefix(min, 2) + ":" + 
          this.zeroPrefix(sec, 2) + "." + 
          this.zeroPrefix(ms, 3);
      },
      zeroPrefix: function(num, digit) {
        let zero = '';
        for(let i = 0; i < digit; i++) {
          zero += '0';
        }
        return (zero + num).slice(-digit);
      }
    }
  }
</script>

<style lang="scss">
  $color: rgba(245,238,106,1);
  $color-light: rgb(241, 238, 172);

  @import url('https://fonts.googleapis.com/css?family=Share+Tech+Mono');

  body {
    background-color: rgb(10, 10, 10);
    font-family: 'Share Tech Mono', sans-serif;
    //display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    //justify-content: center;
    align-content: center;
    align-items: center;
  }

  #clock {
    order: 0;
    flex: 0 1 auto;
    align-self: center;
    color: $color;
    //text-shadow: 0px 0px 25px $color;

    .time {
      font-size: 2.5em;
    }

    .text {
      margin-top: 10px;
      font-size: .5em;
      color: rgba($color, .15);
      text-align: center;

      a {
        text-decoration: none;
        color: inherit;

        transition: color .1s ease-out;

        &:hover {
          color: $color;
        }
      }
    }

    .btn-container {
      display: flex;
      margin-top: 15px;

      a {
        text-align: center;
        font-family: 'Share Tech Mono', sans-serif;
        background: transparent;
        //border: 3px solid $color;
        border: none;
        color: $color;
        padding: 10px 15px;
        margin: 0 10px;
        text-transform: uppercase;
        font-size: 1em;
        cursor: pointer;
        //text-shadow: 0px 0px 10px $color;

        flex-grow: 1;

        transition: color .1s ease-out;

        &:hover {
          color: $color-light;
        }
      }
    }
  }
</style>