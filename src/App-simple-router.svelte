<script lang="ts">
	import Nav from './lib/nav.svelte';
	import {
		RouterContext,
		RouterDebugger,
		RouteDebugger
	} from '@dvcol/svelte-simple-router/components';
	import { RouterView, type Route, type RouterOptions } from '@dvcol/svelte-simple-router';
	import Home from './routes/home.svelte';
	import About from './routes/about.svelte';
	import Login from './routes/login.svelte';
	import { RenderScan } from 'svelte-render-scan';

	const RouteName = {
		Home: 'home',
		About: 'about',
		Login: 'login'
	} as const;

	type RouteNames = (typeof RouteName)[keyof typeof RouteName];

	const routes: Readonly<Route<RouteNames>>[] = [
		{
			name: RouteName.Home,
			path: '/',
			component: Home
		},
		{
			name: RouteName.About,
			path: '/about',
			component: About
		},
		{
			name: RouteName.Login,
			path: '/login',
			component: Login
		}
	];
	const options: RouterOptions<RouteNames> = {
		routes
	} as const;
</script>

<div class=" p-4 flex flex-col gap-24f w-full">
	<RouterContext {options}>
		<Nav />
		<RouterView />
		<RouteDebugger />
	</RouterContext>
	<RenderScan />
</div>
