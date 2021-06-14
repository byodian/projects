<template>
	<div>
		<div>Home</div>
	</div>
</template>

<script>
export default {
	computed: {
		username() {
			return this.$route.params.username
		}
	},
	mounted() {
		this.getRouter()
	},
	methods: {
		goBack() {
			window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
		},
		getRouter() {
			console.log(typeof this.$router)
			console.log(this.$route)
		}
	}
}
</script>

<style>

</style>