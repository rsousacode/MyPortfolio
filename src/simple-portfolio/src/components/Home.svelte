<script>
    import {fly} from 'svelte/transition'

    // Components
    import Author from "./Author.svelte";
    import Projects from "./Projects.svelte";
    import TechStack from "./TechStack.svelte";

    // Stores
    import ProjectsStore from "../stores/ProjectsStore";
    import {cleanTechStack} from "../stores/TechStackStore";
    import {onMount} from "svelte";

    export let projects;
    export let author;

    // Store Data
    let projectsData
    let hideProjects = false
    let pageLoaded = false

    // Pagination
    let currentPage = 1
    let projectsPerPage = 3
    let shownProjects = [];

    let apiProjectList = [];

    let id = 0;

    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        let newProject = {};
        newProject.description = project.excerpt;
        newProject.id = ++id;
        newProject.name = project.title;
        newProject.tech = project.tech;
        newProject.github = '';
        newProject.website = '';
        // if has github
        for (let i = 0; i < project.urls.length; i++) {
            const u = project.urls[i];
            if(u.media_type === "github") {
                newProject.github = u.url;
                continue;
            }
            if(u.media_type === "website") {
                newProject.website = u.url;
            }
        }

        apiProjectList.push(newProject);
    }

    ProjectsStore.update((data) => {
        return apiProjectList;
    })

    ProjectsStore.subscribe((data) => {
        projectsData = data
    })


    function initProjects() {
        closeAllProjects()
        let startIndex
        startIndex = currentPage * projectsPerPage - 3

        if (currentPage === 1) {
            startIndex = 0
        }

        let t = projectsPerPage * currentPage

        if (projectsData.length < t) {
            shownProjects = projectsData.slice(startIndex)
        } else {
            shownProjects = projectsData.slice(startIndex, projectsPerPage * currentPage)
        }
    }

    function closeAllProjects() {
        let i
        for (i = 0; i < shownProjects.length; i++) {
            shownProjects[i].toggled = false
        }
    }

    function simulateLoading(exec) {
        setTimeout(() => {
            exec()
        }, 800)

    }

    function onPageLoaded() {
        pageLoaded = true
    }

    function getMaxNumPages() {
        if (projectsData.length % projectsPerPage > 0) {
            return Math.floor(projectsData.length / projectsPerPage) + 1
        }
        return projectsData.length / projectsPerPage

    }

    function onPageSwitchedEndLoading() {
        hideProjects = false
    }

    function nextPage() {
        currentPage++
        onPageSwitched()
    }

    function previousPage() {
        currentPage--
        onPageSwitched()
    }

    function onPageSwitched() {
        initProjects()
        hideProjects = true
        cleanTechStack()
        simulateLoading(onPageSwitchedEndLoading)
    }

    initProjects()
    simulateLoading(onPageLoaded)


</script>
<main>
    <Author author={author}/>
    {#if pageLoaded}
        <div class="row mt-4">
            <div class="col-left projects pr-1 mb-2" transition:fly="{{ x: -200, duration: 500}}">
                <div class="projects-title" transition:fly>Projects</div>
                {#if !hideProjects}
                    <Projects projects={shownProjects}/>
                {/if}
            </div>
            <TechStack/>
        </div>
            <ul class="pagination" transition:fly="{{ x: 200, duration: 500, delay: 2000}}">
                <li on:click= {getMaxNumPages() !== currentPage ? nextPage : previousPage }>
                    {currentPage} / {getMaxNumPages()}
                </li>
                {#if currentPage > 1}
                    <li on:click={previousPage}>❮</li>
                {/if}
                {#if getMaxNumPages() !== currentPage}
                    <li on:click={nextPage}>❯</li>
                {/if}
            </ul>
    {/if}
</main>

<style>
    ul.pagination {
        position: fixed;
        display: inline-block;
        padding: 0;
        margin: 0;
        bottom: 5%;
        left: 75%;
        float: right;
    }

    ul.pagination li {display: inline;}

    ul.pagination li {
        float: left;
        padding: 4px 8px;
        text-decoration: none;
        cursor: pointer;
    }

</style>
