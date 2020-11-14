<script>
    import {fade} from 'svelte/transition'

    import AuthorStore from "../stores/AuthorStore";

    export let authorData

    AuthorStore.subscribe((data) => {
        authorData = data
    })
</script>


<div class="author-card">
    <div class="author" transition:fade>{authorData.name}</div>
    <div class="position ml-4">{authorData.position}</div>
    <a href="{authorData.github}" target="_blank" class="link ml-4">
        <img alt="github" src="/icons/github-alt.svg" class="icon"/>
    </a>
    <a href="{authorData.linkedin}" target="_blank" class="link ml-4">
        <img alt="linkedin" src="/icons/linkedin.svg" class="icon"/>
    </a>
    <a href="{authorData.twitter}" target="_blank" class="link ml-4"><img alt="twitter" src="/icons/twitter.svg"
                                                               class="icon"/></a>
</div> <!-- close author card-->
