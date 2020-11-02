import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
    author: 'Rui Sousa',
    position: "Full-stack programmer",
    twitter: '#',
    github: 'https://github.com/rsousacode',
    linkedin: '#',
    uid: 0,
    projects: [
      { 
        id: 0,
        name: 'Commands and Snippets', 
        description: 'Web app that allows storing useful snippets and commands. It has a branch with authentication provided. ' ,
        github:'https://github.com/rsousacode/CommandsAndSnippets', 
        toggled: false,
        tech: '.Net Core Mvc 3.x, T-SQL, Angular, Vue.Js, Quasar'
      },
      { 
        id: 1,
        name: 'Winter Come', 
        description: 'Backend, for the Winter Come game. The player can do Qr login from the companion app to be able to sign in in the game. ' , 
        github:'https://github.com/rsousacode/WinterComeBackend',
        toggled: false,
        tech: 'Node.JS, Express, Mongoose, MongoDB, C# (Client)'
      },
      { 
        id: 2,
        name: 'Puryon', 
        description: 'Frontend and Backend, for the Puryon FPS multiplayer game made in UE4, which presents real-time statistics and data about the game being played.' , 
        github:'https://github.com/rsousacode/puryon_backend',
        toggled: false,
        tech: 'Node.JS, Express, Mongoose, MongoDB, React.Js, C++ (Client)'

      },
      {
        id: 3,
        name: 'Lusoportunas', 
      description: 'Streamlines the job finding process '
      + 'and has a comprehensive dashboard for recruiters and job seekers with a communication' 
      + 'platform that allows both to connect easily.', 
      github:'https://github.com/rsousacode/Lusoportunas',
      toggled: false,
      tech: 'Node.JS, Express, Mongoose, MongoDB, Pug, Passport'

    },
      
    ]
	}
});


const flipping = new Flipping({
  easing: "cubic-bezier(.01, 0, .5, 1)"
});

setTimeout(() => {
  let currentOpenEl;
  Array.from(document.querySelectorAll(".pointer"), button => {
  let parent = button.parentNode
  console.log(parent)
  button.addEventListener(
    "click",
    flipping.wrap(() => {

      if (parent.dataset.open) {
        delete parent.dataset.open;
        currentOpenEl = null;
      } else {
        parent.dataset.open = true;
        if (currentOpenEl) {
          delete currentOpenEl.dataset.open;
        }
        currentOpenEl = parent;
      }
    }));
});
}, 1550)



export default app;