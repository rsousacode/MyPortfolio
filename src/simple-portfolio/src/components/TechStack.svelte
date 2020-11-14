<script>
    import {fly} from 'svelte/transition'
    import {flip} from 'svelte/animate';

    import TechStackStore from "../stores/TechStackStore";

    let techStack

    TechStackStore.subscribe(data => {
        techStack = data
    })

</script>

{#if techStack.length > 0}
    <div class="col-right" in:fly="{{ x: 300, duration: 1000, delay: 2500 }}"
         out:fly="{{ x: 300, duration: 600 }}">

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

