<template>
  <div class="hello">
    <!-- <button id="start" @click="startGame(true)">{{ msg }}</button> -->
    
    <form name="pointform" method="post">
      <div style="position: absolute;">

        <div id="founded" class="bag" />

        <div id="tagged" class="tag">
          <span id="span-id">0</span>
        </div>

        <img :src="selectedPhoto" id="pointer_div" @click="clickcoord($event)">
  
        <!-- <div id="cloth" style="visibility:hidden;">
          <select>
            <option value="casaco">Coat</option>
            <option value="calça">Pants</option>
            <option value="sapato">Shoes</option>
            <option value="bolsa">Handbag</option>
          </select>
          <input type="text" placeholder="Brand (optional)" size="14" />
          <input type="submit" value="Save">
        </div> -->
    
     <!--    x = <input type="text" name="form_x" size="4" style="visibility:hidden;" />
        y = <input type="text" name="form_y" size="4" style="visibility:hidden;" /> -->
  
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'GamePhoto',

    props: {
      msg: String,
      selectedPhoto: String,
      gameData: Object
    },

    data(){
      return {
        started: false,
        found: false
      }
    },

    mounted() {
      this.startGame(true)
    },

    methods: {
      startGame: function (start) {
        (start == true) ? this.started = true : this.started = false;
        this.$emit('gameStarted', this.started);
      },
      clickcoord: function(event) {
        if (this.started) {
          const i = parseInt(document.getElementById("span-id").innerHTML);
          
          const image = document.getElementById("pointer_div");
          const tag = document.getElementById("tagged");
          //const clothes = document.getElementById("cloth");
          const founded = document.getElementById("founded");
          
          let pos_x = event.offsetX?(event.offsetX):event.pageX-image.offsetLeft;
          let pos_y = event.offsetY?(event.offsetY):event.pageY-image.offsetTop;
          
          tag.style.left = (pos_x).toString() + 'px';
          tag.style.top = (pos_y).toString() + 'px';
          tag.style.visibility = "visible";
          
          //clothes.style.visibility = "visible";
          
          document.getElementById("span-id").innerHTML = i + 1;
            
          /* document.pointform.form_x.value = pos_x;
          document.pointform.form_y.value = pos_y; */

          if ((pos_x >= this.gameData.xMin && pos_x <= this.gameData.xMax)
              && (pos_y >= this.gameData.yMin && pos_y <= this.gameData.yMax)) {

            this.$emit('gameFinished', true);
            this.found = true;
            this.startGame(false);
            
            tag.style.visibility = "hidden";
            founded.style.left = (pos_x-15).toString() + 'px';
            founded.style.top = (pos_y-15).toString() + 'px';
            founded.style.visibility = "visible";
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  #start {
    background-color: black;
    border: 1px solid white;
    color: white;
    margin-bottom: 1em;
    font-family: 'Share Tech Mono', sans-serif;
    cursor: pointer;
    border-radius: 3px;
  }

  #start:hover {
    background-color: white;
    color: black;
  }

  img {
    cursor: pointer;
    min-width: 1450px;
    min-height: 987px;
    border: 5px solid black;
    box-shadow: 0px 3px 22px 7px rgba(245,238,106,1);
    display: block;
    margin-left: 1rem;
    margin-right: auto;
    margin-bottom: 1rem;
  }

  .bag {
    position:absolute;
    //background: #3E444E;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    border:2px solid #3bd81c;
    visibility: hidden;
    height:32px;
    width:32px;
    padding:8px;
    z-index:2;
  }

  .tag {
    position:absolute;
    //background: #3E444E;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    border:2px solid #ca0505;
    visibility: hidden;
    height:22px;
    width:22px;
    padding:4px;
    z-index:2;
  }

  .tag span {
    position:absolute;
    width:20px;
    color: #ca0505;
    font-family: Helvetica, Arial, Sans-Serif;
    font-size: .8rem;
    text-align:center;
    margin:4px 0;
  }
</style>
