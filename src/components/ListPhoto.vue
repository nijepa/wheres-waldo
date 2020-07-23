<template>
  <div >
    <div class="list" v-for="(photo, id) in photos" :key="id">
<!--       <img id="listimg" :src="getImgUrl(photo.name)" @click="selectGame(photo)" 
      :alt="photo.name" width="330px"> -->
      <img id="listimg" :src="photo.imgUrl" @click="selectGame(photo)" 
      :alt="photo.name" width="330px">
    </div>
  </div>
</template>

<script>
  import firebase from '../Firebase';

  export default {

    name: 'ListPhoto',

    data() {
      return {
        photos: [],
        imgPath: require("../assets/1-1024.jpg"),
        ref: firebase.firestore().collection('boards')
      }
    },

/*   mounted() {
    // x=590-610 y=690-710
    // x=432-448 y=640-654
    // x=1337-1361 y=393-413
    
    this.photos = [{id: 1, name: '1-1024', xMin: 583, xMax: 615, yMin: 687, yMax: 721}, 
                    {id: 2, name: '2-1024', xMin: 432, xMax: 448, yMin: 640, yMax: 654}, 
                    {id: 3, name: '3-1024', xMin: 1337, xMax: 1361, yMin: 393, yMax: 413}] 
  }, */

    created() {
      this.ref.onSnapshot((querySnapshot) => {
        this.photos = [];
        querySnapshot.forEach((doc) => {
          this.photos.push({
            id: doc.id,
            name: doc.data().name,
            xMin: doc.data().xMin,
            xMax: doc.data().xMax,
            yMin: doc.data().yMin,
            yMax: doc.data().yMax,
            imgUrl: doc.data().imgUrl
          });
        });
      });
    },

    methods: {
      getImgUrl(pet) {
        let images = require.context('../assets/', false, /\.jpg$/)
        return images('./' + pet + ".jpg")
      },
      getPhoto(photoName) {
        require("../assets/"+ photoName)
      },
      selectGame(photo) {
        this.$emit('selectedPhoto', photo)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list {
    display: inline-block;
    position: relative;
    width: 30%;
  }

  #listimg {
    transition: transform .5s;
    cursor: pointer;
  }

  #listimg:hover {
    transform: scale(1.3 ,1.3);
    box-shadow: 0px 3px 22px 7px rgba(245,238,106,1);
  }
</style>