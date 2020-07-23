<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Play</router-link> |
      <router-link to="/about">Scores</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #ffffff;
  }
  
  #nav {
    padding: 5px;

    a {
      font-weight: bold;
      color: #837921;
      background-color: transparent;

      &.router-link-exact-active {
        color: rgba(245,238,106,1);
      }
    }
    a:hover {
      background-color: transparent;
      box-shadow: 0px 3px 22px 7px rgba(245,238,106,1);
    }
  }
</style>
