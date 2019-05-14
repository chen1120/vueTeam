<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
  body {
    font-size: 16PX;
    max-width: 750px;
    min-width: 320px;
    margin: 0 auto;
  }
</style>
