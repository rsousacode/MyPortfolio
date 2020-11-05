import App from './App.svelte';

let uuid = -1
const app = new App({
    target: document.body,
    props: {
        author: 'Rui Sousa',
        position: "Software developer",
        twitter: 'https://twitter.com/rsousacode',
        github: 'https://github.com/rsousacode',
        linkedin: 'https://linkedin.com/in/rsousa',
        projects: [
            {
                id: uuid++,
                name: 'Commands and Snippets',
                description: 'Web app that allows storing useful snippets and commands. It has a branch with authentication available. ',
                github: 'https://github.com/rsousacode/CommandsAndSnippets',
                website: '',
                toggled: false,
                tech: ['C#', 'NET Core MVC', 'MSSQL','HTML/CSS', 'Angular', 'Vue.Js', 'Quasar']
            },
            {
                id: uuid++,
                name: 'Winter Come',
                description: 'Backend, for the Winter Come game. The player can do Qr login from the companion app to be able to sign in in the game. ',
                github: 'https://github.com/rsousacode/WinterComeBackend',
                toggled: false,
                website: 'https://bigmonte.com/projects/wintercome/',
                tech: ['Node.JS', 'Express', 'Mongoose', 'MongoDB', 'Unity' , 'C#']
            },
            {
                id: uuid++,
                name: 'Puryon',
                description: 'Frontend and Backend, for the Puryon FPS multiplayer game made in UE4, which presents real-time statistics and data about the game being played.',
                github: 'https://github.com/rsousacode/puryon_backend',
                toggled: false,
                website: 'https://bigmonte.com/projects/puryon/',
                tech: ['Node.JS', 'Express', 'Mongoose', 'MongoDB', 'UE4', 'React.Js', 'C++']

            },
            {
                id: uuid++,
                name: 'Lusoportunas',
                description: 'Streamlines the job finding process '
                    + 'and has a comprehensive dashboard for recruiters and job seekers with a communication'
                    + 'platform that allows both to connect easily.',
                github: 'https://github.com/rsousacode/Lusoportunas',
                toggled: false,
                website: '',
                tech: ['Node.JS', 'Express', 'HTML/CSS', 'Mongoose', 'MongoDB', 'Pug', 'Passport']

            },

        ]
    }
});


const flipping = new Flipping({
    easing: "cubic-bezier(.01, 0, .5, 1)"
});

setTimeout(() => {
    let currentOpenEl;
    Array.from(document.querySelectorAll(".project-title"), button => {
        let parent = button.parentNode
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
}, 850)


export default app;
