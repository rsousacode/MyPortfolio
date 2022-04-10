<script>
    import {fade} from 'svelte/transition'

    import AuthorStore from "../stores/AuthorStore";

    export let author;


</script>


<div class="author-card">
    <div class="author" transition:fade>{author.name}</div>
    <div class="position ml-4">{author.position}</div>
    <a href="{author.github}" target="_blank" class="link ml-4">
        <img alt="github" src="/wp-content/themes/portfolio-theme/icons/github-alt.svg" class="icon"/>
    </a>
    <a href="{author.linkedin}" target="_blank" class="link ml-4">
        <img alt="linkedin" src="/wp-content/themes/portfolio-theme/icons/linkedin.svg" class="icon"/>
    </a>
    <a href="{author.twitter}" target="_blank" class="link ml-4"><img alt="twitter" src="/wp-content/themes/portfolio-theme/icons/twitter.svg"
                                                               class="icon"/></a>
</div> <!-- close author card-->
