<template>
  <div>
    <div>User {{ $route.params.id }}</div>
    <div>{{ name }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'byodian'
    }
  },
  watch: {
    $route(to, from) {
      console.log(to);
      console.log(from);
      console.log(this.$data);
      console.log(this.$route);
      console.log(this.$router); // VueRouter
    }
  },
  // beforeCreate() {
  //   console.log('beforeCreate');
  //   console.log('Init Events & LifeCycle')
  //   console.log('name', this.name)
  //   console.log('------');
  // },
  // created() {
  //   console.log('created');
  //   console.log('Init injections & reactivity');
  //   console.log("the 'name' of reactivity data", this.name);
  //   console.log('------');
  // },
  // beforeMount() {
  //   console.log('beforeMount')
  //   console.log('Compile template into render function');
  //   console.log('Compile el\'s outerHTML as template');
  //   console.log(this)
  //   console.log(this.$el);
  //   console.log('------');
  // },
  // mounted() {
  //   console.log('Create vm.$el and replace "el" with it')
  //   console.log(this)
  //   console.log(this.$el);
  //   console.log('------');
  // },
  // beforeUpdate() {
  //   console.log('beforeUpdate');
  //   console.log('before virtual dom re-render and patch')
  //   console.log('------');
  // },
  // updated() {
  //   console.log('updated');
  //   console.log('virtual dom re-render and patch');
  //   console.log('------');
  // },
  // beforeDestroy() {
  //   console.log('beforeDestory')
  //   console.log('------');
  // },
  // destroyed() {
  //   console.log('destory')
  //   console.log('Teardown watchers, child, components and event listener')
  //   console.log('------');
  // }
}
</script>

<style>

</style>