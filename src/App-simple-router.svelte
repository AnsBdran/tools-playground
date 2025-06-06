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
	import { AppState } from './App.state.svelte.ts';
	import { RenderScan } from 'svelte-render-scan';
	import { scrollY } from 'svelte/reactivity/window';
	import { watch } from 'runed';
	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { transition } from '@dvcol/svelte-simple-router/utils';
	const RouteName = {
		Home: 'home',
		About: 'about',
		Login: 'login',
		Any: 'any'
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
		},
		{
			name: RouteName.Any,
			path: '*',
			redirect: {
				name: RouteName.Home
			}
		}
	];

	const appState = new AppState();

	let routesYScroll: Record<string, number> = $state({});
	const options: RouterOptions<RouteNames> = {
		routes,
		// onStart: (thing) => {
		// 	// console.log('beforeEach ' + scrollY.current, routesYScroll, thing);
		// 	if (!thing.from.location) return;
		// 	if (routesYScroll[thing.from.location.path]) return;
		// 	routesYScroll[thing.from.location.path] = scrollY.current ?? 0;
		// },
		onEnd: (thing) => {
			// console.log('onEnd', routesYScroll);
			if (
				!appState.scroll[thing.to.route.path] ||
				thing.to.route.path === thing.from.location?.path
			) {
				// console.log('same path');
				return window.scrollTo({ top: 0, behavior: 'instant' });
			}
			// console.log('scrollTo found old value', routesYScroll[thing.to.route.path]);
			window.scrollTo({ top: appState.scroll[thing.to.route.path], behavior: 'instant' });
		},
		failOnNotFound: true
		// logLevel: 3
	} as const;
	onDestroy(() => {});
	watch(
		() => scrollY.current,
		() => {
			appState.scroll[window.location.pathname] = scrollY.current ?? 0;
		}
	);
	$inspect(routesYScroll);
</script>

<div class=" p-4 pt-16 flex flex-col gap-24f w-full">
	<RouterContext {options}>
		<Nav />
		<div in:fade={{ duration: 1000 }}>
			<RouterView {transition} />
		</div>

		<RouteDebugger />
	</RouterContext>
	<RenderScan />
</div>
