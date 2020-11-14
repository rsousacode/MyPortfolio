<script>
    export let author
    export let position
    export let github
    export let linkedin
    export let twitter
</script>


<div class="author-card">
    <div class="author" transition:fade>{author}</div>
    <div class="position">{position}</div>
    <a href="{github}" target="_blank" class="link ml-4">
        <img alt="github" src="/icons/github-alt.svg" class="icon"/>
    </a>
    <a href="{linkedin}" target="_blank" class="link ml-4">
        <img alt="linkedin" src="/icons/linkedin.svg" class="icon"/>
    </a>
    <a href="{twitter}" target="_blank" class="link ml-4"><img alt="twitter" src="/icons/twitter.svg"
                                                               class="icon"/></a>
</div> <!-- close author card-->
