<script lang="ts">
	import Nav from './lib/nav.svelte';
	import {
		RouterContext,
		RouterDebugger,
		RouteDebugger
	} from '@dvcol/svelte-simple-router/components';
	import {
		links,
		RouterView,
		type Route,
		type RouterOptions,
		useRouter
	} from '@dvcol/svelte-simple-router';
	import Home from './routes/home.svelte';
	import About from './routes/about.svelte';
	import Login from './routes/login.svelte';
	import { RenderScan } from 'svelte-render-scan';
	import { scrollY } from 'svelte/reactivity/window';
	import { watch } from 'runed';
	import { onDestroy } from 'svelte';

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

	let routesYScroll: Record<string, number> = $state({});
	const options: RouterOptions<RouteNames> = {
		routes,
		onStart: (thing) => {
			console.log('beforeEach ' + scrollY.current, routesYScroll, thing);
			if (!thing.from.location) return;
			routesYScroll[thing.from.location.path] = scrollY.current ?? 0;
		},
		onEnd: (thing) => {
			console.log('onEnd', routesYScroll);
			if (
				!routesYScroll[thing.to.route.path] ||
				thing.to.route.path === thing.from.location?.path
			) {
				console.log('same path');
				return window.scrollTo({ top: 0, behavior: 'instant' });
			}
			console.log('scrollTo found old value', routesYScroll[thing.to.route.path]);
			window.scrollTo({ top: routesYScroll[thing.to.route.path], behavior: 'instant' });
		},
		logLevel: 3
	} as const;
	onDestroy(() => {});
	watch(
		() => null,
		() => {
			console.log('#'.repeat(30));
			console.log('#'.repeat(30));
		}
	);
</script>

<div class=" p-4 pt-16 flex flex-col gap-24f w-full">
	<RouterContext {options}>
		<Nav />
		<RouterView />
		<RouteDebugger />
	</RouterContext>
	<RenderScan />
</div>
