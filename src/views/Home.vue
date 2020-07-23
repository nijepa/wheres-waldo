<template>
  <div class="home">
    <div id="myModal" class="modal">
    
      <!-- Modal content -->
      <div class="modal-content">
        <div class="modal-header">
          <span class="close" @click="closeModal">&times;</span>
          <h1>CONGRATS, YOU FOUND LITTLE GUY !!!</h1>
        </div>
        <div class="modal-body">
          <form action="">
            <!-- <StopWatch :isStarted="gameStart"  /> -->
            <!-- <label for="title">Title : </label> -->
            <!-- <h2>Please, enter nick name</h2> -->
            <input ref="nick" id="name" type="text" name="title" placeholder="pls enter nick name">
          </form>
        </div>
        <div class="modal-footer">
          <div class="actions">
            <!-- <button @click="closeModal" class="btns" type="button" id="cancel">Cancel</button> -->
            <button @click="closeModal" class="btns" type="button" id="save">Close</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!finito" class="list-container">
      <h1 class="list-title">Chose photo to find Wall-E (this guy bellow)</h1>
      <img class="wall" src="../assets/wall-e.png" alt="" width="150px">
      <ListPhoto @selectedPhoto=startGame />
    </div>

    <StopWatch class="sw" :isStarted="gameStart" @foundTime=setTime />

    <div v-if="finito">
      <img class="walli" alt="Wall-e" src="../assets/wall-e.png" width="120px">
      <GamePhoto :selectedPhoto="getImgUrl(imgPath)"
                  :gameData="imgData" msg="Find me" 
                  @gameStarted=start 
                  @gameFinished=finish />
    </div>
  </div>
</template>

<script>
  import GamePhoto from '@/components/GamePhoto.vue';
  import ListPhoto from '@/components/ListPhoto.vue';
  import StopWatch from '@/components/StopWatch.vue';
  import firebase from '../Firebase'

  export default {

    name: 'Home',

    components: {
      GamePhoto, StopWatch, ListPhoto
    },

    data() {
      return {
        gameStart: false,
        imgPath: '',
        imgData: {},
        score: {
          time: '',
          photoId: null,
          name: '',
          dateTime: null
        },
        scores: [],
        ref: firebase.firestore().collection('scores'),
        finito: false
      }
    },

    methods: {
      setTime(ev) {
        this.score.time = ev;
      },
      getImgUrl(pet) {
        let images = require.context('../assets/', false, /\.jpg$/)
        return images('./' + pet + ".jpg")
      },
      startGame: function(ev) {
        this.finito = true;
        this.gameStart = true;
        this.imgPath = ev.name;
        this.imgData = ev;
      },
      start: function(start) {
        (start == true) ? this.gameStart = true : this.gameStart = false
      },
      finish: function() {
        let modal = document.getElementById("myModal");
        modal.style.display = "block";
        this.focusInput();
      },
      closeModal:function() {
        this.finito = false;
        let nickname = this.$refs.nick.value;
        (nickname === '') ? this.score.name = 'jaja' : this.score.name = nickname;
        this.score.photoId = this.imgData.id;
        this.score.dateTime = new Date();
        this.scores.push({...this.score});
        let modal = document.getElementById("myModal");
        modal.style.display = "none";

        this.ref.add(this.score)
          .catch((error) => {
            alert("Error adding document: ", error);
        });
      },
      focusInput() {
        console.log(this.$refs.nick)
        this.$refs.nick.focus();
      }
    }
  }
</script>

<style scoped>
  .sw {
    margin-top: 3em;
  }

  .list-container {
    display: inline;
  }

  .wall {
    margin-bottom: 2rem;
  }

  .walli {
    position: absolute;
    left: 250px;
    top: 55px;
    z-index: 0;
  }

/* The Modal (background) */
  .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 150px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.2); /* Black w/ opacity */
  }

  /* Modal Content */
  .modal-content {
    position: relative;

    background-color: #000000;
    margin: auto;
    padding: 0;
    border: 1px solid rgb(0, 0, 0);
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(228, 241, 34, 0.925),0 6px 20px 0 rgba(0,0,0,0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s;
    border-radius: 1em;
  }

  /* Add Animation */
  @-webkit-keyframes animatetop {
    from {top:-300px; opacity:0} 
    to {top:0; opacity:1}
  }

  @keyframes animatetop {
    from {top:-300px; opacity:0}
    to {top:0; opacity:1}
  }

  /* The Close Button */
  .close {
    color: white;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: rgba(228, 241, 34, 0.925);
    text-decoration: none;
    cursor: pointer;
  }

  .modal-header {
    padding: .5em 1em;
    /* background-color: #dd9427; */
    color: white;
    /* border-radius: 2em; */
  }

  h2 {
    font-size: 1em;
  }

  .modal-body {
    padding: .5em .5em;
    font-size: 1em;
    /* border-radius: 2em; */
  }

  /* .modal-footer {
    padding: 1em 2em 5em 2em;
    background-color: #dd9427;
    color: white;
    border-radius: 2em;
  } */

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  input {
    font-family: 'Share Tech Mono', sans-serif;
    font-size: 1em;
    margin: .5em auto;
    /* width: 90%; */
    text-align: center;
    background-color: black;
    color: white;
    border: 1px solid rgba(228, 241, 34, 0.925);
  }

  .btns {
    color: white;
    font-size: 1em;
    cursor: pointer;
    margin: .5em .2em;
    padding: 0 .5em;
    border-radius: 5px;
    font-family: 'Share Tech Mono', sans-serif;
  }

  #save {
    background-color: black;
    border: 1px solid rgba(228, 241, 34, 0.925);
  }

  #save:hover {
    background-color: rgba(228, 241, 34, 0.925);
    color: black;
  }
</style>
