<template>
  <div class="home-wrap">
    <div class="home-name">
      {{ $t('name') }}
    </div>
    <AppLogo />
    <div v-html="$t('generated')" />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.home-wrap {
  background-color: white;
  height: 100%;
  color: $text-main;
  @include flex-center-col;

  & .home-name {
    font-weight: bold;
  }

  & img {
    margin: 16px 0;
  }
}

.hide-enter-active,
.hide-leave-active {
  transition: opacity 0.3s linear;
}
.hide-enter-from,
.hide-leave-to {
  opacity: 0;
}
</style>
