<template>
  <div class="lists">
    <div class="list" v-for="board in boards" :key="board.key">
      <h2>{{board.name}}</h2> 
      <div class="score" 
            v-for="(score, index) in scores.filter(x => x.photoId == board.key).sort((a,b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0))"
            :key="index" i = index>
        <p>{{ index + 1 }}. {{ score.time }} <span> - {{ score.name }}</span></p>
      </div>
    </div>
  </div>
</template>

<script>        
  import firebase from '../Firebase'

  export default {
    
    name: 'Scores',

    data () {
      return {
        scores: [],
        boards: [],
        errors: [],
        ref: firebase.firestore().collection('scores'),
        ref2: firebase.firestore().collection('boards')
      }
    },

    created () {
      this.ref.onSnapshot((querySnapshot) => {
        this.scores = [];
        querySnapshot.forEach((doc) => {
          this.scores.push({
            key: doc.id,
            name: doc.data().name,
            time: doc.data().time,
            photoId: doc.data().photoId
          });
        });
      });
      this.ref2.onSnapshot((querySnapshot) => {
        this.boards = [];
        querySnapshot.forEach((doc) => {
          this.boards.push({
            key: doc.id,
            name: doc.data().name
          });
        });
      });
    },
  }
</script>

<style lang="scss" scoped>
  .lists {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 10px;
  }

  h2 {
    text-decoration: underline;
    text-align: left;
    margin-left: 6rem;
  }

  .score {
    text-align: left;
    margin-left: 3rem;
  }
  
  span {
    color: rgba(245,238,106,1);
  }
</style>