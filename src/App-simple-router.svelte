<script lang="ts">
	import Nav from './lib/nav-simple-router.svelte';
	import { RouterContext, RouteDebugger } from '@dvcol/svelte-simple-router/components';
	import { RouterView, type Route, type RouterOptions } from '@dvcol/svelte-simple-router';
	import Home from './routes/home.svelte';
	import About from './routes/about.svelte';
	import Login from './routes/login.svelte';
	import { AppState } from './App.state.svelte';
	import { RenderScan } from 'svelte-render-scan';
	import { scrollY } from 'svelte/reactivity/window';
	import { watch } from 'runed';
	import { transition } from '@dvcol/svelte-simple-router/utils';
	import Layout from './Layout.svelte';

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

	const options: RouterOptions<RouteNames> = {
		routes,
		onEnd: (event) => {
			if (
				!appState.scroll[event.to.route.path] ||
				event.to.route.path === event.from.location?.path
			) {
				return window.scrollTo({ top: 0, behavior: 'instant' });
			}
			window.scrollTo({ top: appState.scroll[event.to.route.path], behavior: 'instant' });
		}
	} as const;

	watch(
		() => scrollY.current,
		() => {
			appState.scroll[window.location.pathname] = scrollY.current ?? 0;
		}
	);
</script>

<div class=" p-4 pt-16 flex flex-col gap-24f w-full">
	<RouterContext {options}>
		<Nav />
		<Layout>
			<RouterView {transition}>
				{#snippet routing()}
					<p>routing...</p>
				{/snippet}
				{#snippet loading()}
					<p>loading...</p>
				{/snippet}
			</RouterView>
		</Layout>
		<RouteDebugger />
	</RouterContext>
	<RenderScan />
</div>
