<script>
    import {fly, fade} from 'svelte/transition'
    import {flip} from 'svelte/animate';

    import TechStackStore from "../stores/TechStackStore";

    let techStack

    TechStackStore.subscribe(data => {
        techStack = data
    })

</script>

{#if techStack.length > 0}
    <div class="col-right" in:fade={{delay: 1900}} out:fade>
        <div class="projects-title mb-2">Project tech</div>
        <div class="board">
            {#each techStack as tech(tech)}
                <div class="card"
                     animate:flip>
                    {tech}
                </div>
            {/each}
        </div>
    </div>
{/if}


<style>
    .board {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 1em;
        max-width: 36em;
        margin: 0rem auto;
    }

</style>

