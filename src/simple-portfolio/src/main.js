import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
    author: 'Rui Sousa',
    position: "Full-stack programmer",
    projects: [
      { 
        id: 0,
        name: 'Winter Come', 
        description: 'Backend, for the Winter Come game made in Unity, which allows login and QR-Login from the companion app and presents useful data about the game to the player.' , 
        toggled: false },
      { 
        id: 1,
        name: 'Puryon', 
        description: 'Frontend and Backend, for the Puryon FPS multiplayer game made in UE4, which presents real-time statistics and data about the game being played.' , 
        toggled: false },
      {
        id: 2,
        name: 'Lusoportunas', 
      description: 'it is a website carried out within the context of Games & '
      + 'Apps Development bachelor degree at IADE. It streamlines the job finding process'
      + 'and has a comprehensive dashboard for recruiters and job seekers with a communication' 
      + 'platform that allows both to connect easily.', 
      toggled: false },
      
    ]
	}
});


const flipping = new Flipping({
  easing: "cubic-bezier(.5, 0, .5, 1)"
});


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

export default app;