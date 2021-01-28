<template lang="pug">
  .construction-info
    i.bx.bx-traffic-cone.icon
    div Under Construction
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.construction-info {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);

  .icon {
    font-size: 48px;
  }
}
</style>
