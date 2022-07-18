<template>
  <div class="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  color: $text-main;
  background-color: white;
  * {
    box-sizing: border-box;
  }
}

.app {
  height: 100%;
}

a {
  text-decoration: none;
  color: unset;
}

#app,
.app-content {
  height: 100%;
}

.container {
  max-width: 1200px;
  box-sizing: border-box;
  padding-left: 40px;
  padding-right: 40px;
  margin: 0 auto;
}
</style>
