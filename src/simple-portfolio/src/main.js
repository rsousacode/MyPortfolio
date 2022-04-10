import App from './App.svelte';

const app = new App({
    target: document.getElementById("home"),
    props: {
        projects: window.projects,
        author: window.author
    }
});



export default app;
