<script>
    import {fly} from 'svelte/transition'

    // Components
    import AuthorCard from './components/AuthorCard.svelte'
    import Projects from "./components/Projects.svelte";
    import TechStack from "./components/TechStack.svelte";

    // Stores
    import ProjectsStore from "./stores/ProjectsStore";
    import {cleanTechStack} from "./stores/TechStackStore";

    // Store Data
    let projectsData
    let hideProjects = false
    let pageLoaded = false

    // Pagination
    let currentPage = 1
    let projectsPerPage = 3
    let shownProjects = []

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
    <div class="row">
        <div class="col-left">
            <AuthorCard/>
        </div>
    </div>
    {#if pageLoaded}
        <div class="row mt-4">
            <div class="col-left pr-1 mb-2" transition:fly="{{ x: -200, duration: 300}}">
                <div class="projects-title" transition:fly>Projects</div>
                {#if !hideProjects}
                <Projects
                        projects={shownProjects}/>
                {/if}
            </div> <!-- close col -->
            <div class="col">
                <p> {currentPage} - {getMaxNumPages()}</p>
                {#if currentPage > 1}
                    <button on:click={previousPage}>Previous Page</button>
                {/if}
                {#if getMaxNumPages() !== currentPage}
                    <button on:click={nextPage}>Next Page</button>
                {/if}
            </div>
            <TechStack/>
        </div> <!-- close row -->
    {/if}
</main>
