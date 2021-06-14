import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: () => import('../views/Home')
	},
	{
		path: '/about',
		component: () => import('../views/About')
	},
	{
		path: '/user/:id',
		name: 'User',
		component: () => import ('../views/User'),
		meta: {
			title: `User`
		}
	}
]

export default new VueRouter({
	routes
})