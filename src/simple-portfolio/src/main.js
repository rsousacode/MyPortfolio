import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
    author: 'Rui Sousa',
    position: "Full-stack programmer",
    projects: [
      { name: 'Winter Come', description: 'RPG Action game demo' , toggled: false },
      { name: 'Lusoportunas', description: 'Jobs website example made using mainly Pug, JQuery, and uses MongoDB database.', toggled: false },
    ]
	}
});

export default app;