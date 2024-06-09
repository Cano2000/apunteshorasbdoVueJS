<template>
  <nav>
    <router-link :to="{name: 'home'}">Home</router-link> |
    <router-link :to="{name: 'drops'}">Lista de drops</router-link> |
    <router-link :to="{name: 'login'}">Login / Register(FiredBased)</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
