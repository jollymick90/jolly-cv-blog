<script lang="ts">
	
import {
    type ExperiencesEvent
} from '$lib/content/resume';

import type {
    IResume,
    StudiesEvent
} from '$lib/content';

export const {
    resume
}: {
    resume: IResume;
} = $props();

const skills = [...resume.skills];
const top5Skills = skills
    .filter((skill) => skill.type === 'SOFT_SKILL')
    .sort((skillA, skillB) => skillB.level - skillA.level)
    .splice(0, 3);

const top5TechSkills = skills
    .filter((skill) => skill.type === 'WEB_DEVELOPMENT')
    .sort((skillA, skillB) => skillB.level - skillA.level)
    .splice(0, 7);
</script>

{#snippet headerDesktop()}
<h1>{resume.fullName}</h1>
<p class="subtitle">{resume.mainRoleTitle}</p>
<div class="details">
    <h3>Details</h3>
    <p>
        {#if resume.contact.address.showStreet}
        <span>{resume.contact.address.street}</span>
        {/if}
        <br />
        {resume.contact.address.city}
        {resume.contact.address.zipcode}
        <br />
        {resume.contact.address.country}
    </p>
    <p>
        {resume.contact.phone}
        <br />
        <a href={`mailto:${resume.contact.email}`}>
            {resume.contact.email}
        </a>
    </p>
</div>
<div class="skills">
    <h3>Skills</h3>
    <ul>
        {#each top5Skills as skill}
        <li>{skill.name}</li>
        {/each}
    </ul>
    <h3>Tech Skills</h3>
    <ul>
        {#each top5TechSkills as skill}
        <li>{skill.name}</li>
        {/each}
    </ul>
</div>
{/snippet}
{#snippet headerMobile()}
<h1>{resume.fullName}</h1>
<p class="mb-2 text-xl">{resume.mainRoleTitle}</p>
<div class="">
    <h3 class="border-b-2 border-[#ffffff55] pb-2 mb-3 text-white">Details</h3>
    <p>
        {#if resume.contact.address.showStreet}
        <span>{resume.contact.address.street}</span>
        {/if}
        <br />
        {resume.contact.address.city}
        {resume.contact.address.zipcode}
        <br />
        {resume.contact.address.country}
    </p>
    <p>
        {resume.contact.phone}
        <br />
        <a href={`mailto:${resume.contact.email}`}>
            {resume.contact.email}
        </a>
    </p>
</div>
<div class="skills">
    <h3>Skills</h3>
    <div class="flex flex-wrap gap-2">
        {#each top5Skills as skill}
        <span>{skill.name}</span>
        {/each}
    </div>
    <h3>Tech Skills</h3>
    <div class="flex flex-wrap gap-2">
        {#each top5TechSkills as skill}
        <span>{skill.name}</span>
        {/each}
    </div>
</div>
{/snippet}
 {#snippet studies(study: StudiesEvent)}
            <h3 class="mb-2 text-[#10253f]">{study.target}, {study.content}, Italy</h3>
            <p><em>{study.date}</em></p>
            {/snippet}

{#snippet experience(experience: ExperiencesEvent)}
<h3 class="mb-2 text-[#10253f]">{experience.role}, {experience.companyName}, Italy</h3>
<p><em>{experience.dateStart} – {experience.dateEnd}</em></p>
<ul>
    {#each Array.from(experience.experiencesList || []) as expItem}
    <li>{expItem}</li>
    {/each}
</ul>
{/snippet}
<div class="cv-container flex flex-col md:flex-row max-w-[1200px] m-auto bg-white">

    <aside class="sidebar hidden md:block">
        {@render headerDesktop()}
    </aside>
    <header class="w-full md:hidden bg-[#10253f] text-white">
        {@render headerMobile()}
    </header>

    <main class=" md:w-[70%] p-5 md:p-4">
        <section class="profile">
            <h2>Profile</h2>
            <p>{resume.presentation}</p>
        </section>

        <section class="experience">
            <h2>Employment History</h2>

            {#each resume.experiences as exp}
            {@render experience(exp)}
            {/each}
        </section>

        <section class="education">
            <h2>Education</h2>

           
            {#each resume.studies as study}
            {@render studies(study)}
            {/each}
        </section>
    </main>
</div>

<style>
.cv-container {
  
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar {
    width: 30%;
    background: #10253f;
    color: white;
    padding: 30px 20px;
    text-align: center;
}

.sidebar h1 {
    margin-top: 15px;
    font-size: 24px;
}

.subtitle {
    font-size: 14px;
    color: #c5d2e0;
    margin-bottom: 30px;
}

.profile-pic {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
}

.details,
.skills {
    text-align: left;
    margin-top: 30px;
}

.details h3,
.skills h3 {
    border-bottom: 1px solid #ffffff55;
    padding-bottom: 5px;
    margin-bottom: 10px;
}

.skills ul {
    list-style: none;
    padding: 0;
}

.skills li {
    padding: 5px 0;
    border-bottom: 1px solid #ffffff33;
}

.main-content {
    width: 70%;
    padding: 40px;
}

h2 {
    border-bottom: 2px solid #ddd;
    padding-bottom: 5px;
    margin-top: 30px;
}
/* h3 {
    margin-bottom: 5px;
    color: #10253f;
} */

.sidebar h3 {
    color: #ddd;
    font-weight: 800;
}

ul {
    margin-top: 5px;
    padding-left: 20px;
}
</style>
