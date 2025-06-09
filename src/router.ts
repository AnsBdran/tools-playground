import { createRouter } from 'sv-router';

import Home from './routes/home.svelte';
import About from './routes/about.svelte';
import Login from './routes/login.svelte';
import AboutNested from './routes/about-nested.svelte';
import NotFound from './routes/404.svelte';
import Layout from './Layout.svelte';
import { AppState } from './App.state.svelte';
import { scrollY } from 'svelte/reactivity/window';
const appState = new AppState();

export const { isActive, route, navigate, p } = createRouter({
	'/': Home,
	'/about': {
		'/': About,
		'/nested': AboutNested
	},
	'/login': Login,
	'*': NotFound,
	layout: Layout,
	hooks: {
		beforeLoad: () => {
			appState.scroll[route.pathname] = scrollY.current ?? 0;
		},
		afterLoad: () => {
			window.scrollTo(0, appState.scroll[route.pathname] ?? 0);
		}
	}
});
