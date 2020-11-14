import { writable } from "svelte/store";

let uuid = 0
const ProjectsStore = writable(
    [
        {
            id: uuid++,
            name: 'Commands and Snippets',
            description: 'Web app that allows storing useful snippets and commands. It has a branch with authentication available. ',
            github: 'https://github.com/rsousacode/CommandsAndSnippets',
            website: '',
            toggled: false,
            tech: ['C#', '.NET', 'EF', 'XUnit', 'MSSQL', 'HTML/CSS', 'Angular', 'Vue.Js', 'Quasar']
        },
        {
            id: uuid++,
            name: 'Winter Come',
            description: 'Backend, for the Winter Come game. The player can do Qr login from the companion app to be able to sign in in the game. ',
            github: 'https://github.com/rsousacode/WinterComeBackend',
            toggled: false,
            website: 'https://bigmonte.com/projects/wintercome/',
            tech: ['Node.JS', 'Express', 'Mongoose', 'MongoDB', 'Unity', 'C#']
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
        {
            id: uuid++,
            name: 'Horizonte',
            description: 'Horizonte is an open world/rpg game and takes place during the phase of the discoveries. You play an unlikely hero – a 25-year-old circus trainer who is determined to finally change his job to work in Portugal’s royal guard.',
            github: '',
            toggled: false,
            website: 'https://bigmonte.com/projects/horizonte/',
            tech: ['C#', 'Unity', 'Maya', 'Clickup']
        },
        {
            id: uuid++,
            name: 'Frutas ao Combate',
            description: 'Frutas ao Combate is a game with a sublime attempt to combat various health problems. Make as many points against health-damaging food as much as possible. Made in 48h for the Games for Good jam.',
            github: '',
            toggled: false,
            website: 'https://bigmonte-studios.itch.io/frutas-ao-combate',
            tech: ['Unity', 'C#']
        }

    ])
export default ProjectsStore
