<script lang="ts">
	import { type ExperiencesEvent } from '$lib/content/resume'

	
import type {
    IResume
} from "$lib/content";

export const {
    resume
}: {
    resume: IResume
} = $props();

const skills = [...resume.skills];
const top5Skills = skills.filter(skill => skill.type === 'SOFT_SKILL')
.sort((skillA, skillB) => skillB.level - skillA.level)
.splice(0,3);


const top5TechSkills = skills.filter(skill => 
skill.type === 'WEB_DEVELOPMENT'
)
.sort((skillA, skillB) => skillB.level - skillA.level)
.splice(0,7);
</script>

<!-- <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Neil Burrows - CV</title>
  <link rel="stylesheet" href="styles.css">
</head> -->

<div class="cv-container">
    <aside class="sidebar">
        <!-- <img src="profile.jpg" alt={resume.fullName} class="profile-pic"> -->
        <h1>{resume.fullName}</h1>
        <p class="subtitle">{resume.mainRoleTitle}</p>
        <div class="details">
            <h3>Details</h3>
            <p>
                {#if resume.contact.address.showStreet}
                     <span>{resume.contact.address.street}</span>
                {/if}
                <br>
                {resume.contact.address.city} {resume.contact.address.zipcode}
                <br>
                {resume.contact.address.country}
            </p>
            <p>
                {resume.contact.phone}<br>
            <a href="{resume.contact.email}">
                {resume.contact.email}
            </a>
            </p>
        </div>
        <div class="skills">
            <h3>Skills</h3>
            <ul>
                {#each top5Skills as skill }
                    <li>{skill.name}</li>
                {/each}
            </ul>
            <h3>Tech Skills</h3>
             <ul>
                {#each top5TechSkills as skill }
                    <li>{skill.name}</li>
                {/each}
            </ul>
        </div>
    </aside>

    <main class="main-content">
        <section class="profile">
            <h2>Profile</h2>
            <p>{resume.presentation}</p>
        </section>

        <section class="experience">
            <h2>Employment History</h2>
             {#snippet experience(experience: ExperiencesEvent)}
                           
            <h3>{experience.role}, {experience.companyName}, Italy</h3>
            <p><em>September 2014 – September 2019</em></p>
            <ul>
                <li>Carefully managed projects so that milestones were met during agreed time and within budget confines.</li>
                <li>Attended meetings to discuss projects with clients, contractors, asset owners, and stockholders.</li>
                <li>Created detailed plans and frequently monitored progress to assure project goals were met.</li>
                <li>Ensured that building regulations were all met and provided thorough directions with any unusual or difficult engineering issue.</li>
            </ul>
             {/snippet}
             {#each resume.experiences as exp}
               {@render experience(exp)} 
             {/each}
 

            <h3>Civil Engineer, Racon & Lewis Ltd, Danbury</h3>
            <p><em>August 2012 – August 2014</em></p>
            <ul>
                <li>Planned and directed the execution of various projects, keeping economical, administrative, and physical requirements in mind.</li>
                <li>Trained incoming engineers to meet standards and protocol expectations.</li>
                <li>Wrote daily reports for accountability and quality assurance.</li>
                <li>Advised project managers on financial decisions regarding product costs.</li>
            </ul>

            <h3>Junior Civil Engineer, Racon & Lewis Ltd, Danbury</h3>
            <p><em>August 2009 – August 2012</em></p>
            <ul>
                <li>Assisted senior engineers with all tasks related to ensuring project success.</li>
                <li>Inspected all materials to ensure project specifications and quantities properly met.</li>
                <li>Thoroughly inspected all major structures and supervised any revisions made.</li>
                <li>Monitored construction and inspected installation of major systems.</li>
                <li>Assisted with and independently produced many Engineer reports.</li>
            </ul>
        </section>

        <section class="education">
            <h2>Education</h2>
            <h3>Master of Civil Engineering, New York University, New York</h3>
            <p><em>January 2009 – January 2011</em></p>
            <p>Graduated with a 3.9 GPA.</p>
        </section>
    </main>
</div>

<style>
body {
    font-family: 'Segoe UI', sans-serif;
    margin: 0;
    background: #f5f5f5;
    color: #333;
}

.cv-container {
    display: flex;
    max-width: 1200px;
    margin: auto;
    background: white;
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

h3 {
    margin-bottom: 5px;
    color: #10253f;
}
.sidebar h3 {
   color: #ddd; 
   font-weight: 800;
}

ul {
    margin-top: 5px;
    padding-left: 20px;
}
</style>
