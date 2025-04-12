<script lang="ts">
	import avatar from '$lib/img/avatar.jpg';    
</script>

<div class="flex justify-center dark:bg-gray-100 py-10">
	<div class="flex w-full max-w-4xl rounded-lg bg-white shadow-lg">
		<!-- Left Sidebar -->
		<div class="w-1/3 bg-zinc-800 dark:bg-gray-200 p-6">
			<div class="flex flex-col items-center">
				<img src={avatar} alt="Michele Scarpa" class="mb-4 h-24 w-24 rounded-full" />
			</div>

			<div class="mt-6">
				<h3 class="dark:text-cv-primary text-lg font-semibold text-gray-800">Contact</h3>
				<p class="mt-2 text-gray-700">📞 808-555-0188</p>
				<p class="text-gray-700">✉️ oscar@example.com</p>
				<p class="text-gray-700">📍 Orlando, FL, USA</p>
				<p class="text-gray-700">🔗 www.LinkedIn.com/</p>
			</div>

			<div class="mt-6">
				<h3 class="dark:text-cv-primary text-lg font-semibold text-gray-800">Education</h3>
				<p class="mt-2 text-gray-700">Master’s degree, College, University 20XX</p>
				<p class="text-gray-700">Bachelor’s degree, College, University 20XX</p>
				<p class="text-gray-700">Associate’s degree, College, University 20XX</p>
			</div>

			<div class="mt-6">
				<h3 class="dark:text-cv-primary text-lg font-semibold text-gray-800">Skills</h3>
				<ul class="mt-2 list-disc pl-5 text-gray-700">
					<li>Communication</li>
					<li>Teamwork</li>
					<li>Critical Thinking</li>
					<li>Time Management</li>
					<li>Leadership</li>
					<li>Adaptability</li>
					<li>Project Management</li>
				</ul>
			</div>

			<div class="mt-6">
				<h3 class="dark:text-cv-primary text-lg font-semibold text-gray-800">Skills</h3>
				<ul class="mt-2 list-disc pl-5 text-gray-700">
					<li>Communication</li>
					<li>Teamwork</li>
					<li>Critical Thinking</li>
					<li>Time Management</li>
					<li>Leadership</li>
					<li>Adaptability</li>
					<li>Project Management</li>
				</ul>
			</div>
		</div>

		<!-- Right Content -->
		<div class="w-2/3 ">
			<!-- Header -->
			<div class="pl-4 pt-5 bg-slate-100 dark:bg-zinc-800 p-6">
				<h1 class="dark:text-cv-secondary text-4xl font-medium text-gray-800">Michele</h1>
				<h1 class="dark:text-cv-primary text-4xl font-medium text-gray-800">Scarpa</h1>
				<h2 class="mt-5 dark:text-cv-secondary text-2xl text-gray-600">OPERATIONS DIRECTOR</h2>
			</div>
			<div class="bg-slate-100 dark:bg-zinc-800 p-6 mt-4">
				<h2 class="text-xl font-bold text-gray-800 dark:text-cv-primary">Professional Overview</h2>
				<p class="mt-2 text-gray-700 dark:text-gray-100">
					Showcase your most impressive accomplishments right here. Within seconds, the reader
					should be able to tell who you are and what your areas of expertise are. The purpose of a
					professional profile is to provide a quick overview of your potential skills, experience,
					and achievements to a recruiter without requiring them to read the rest of your resume.
				</p>

				<div class="mt-6">
					<h2 class="text-xl font-bold text-gray-800 dark:text-cv-primary">Work Experience</h2>

					<div class="mt-4">
						<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
							Operations Manager
						</h3>
						<p class="text-gray-600 dark:text-gray-100">Northwind Traders, Orlando | 20XX — present</p>
						<ul class="mt-2 list-disc pl-5 text-gray-700 dark:text-gray-100">
							<li>Describe your job role in 2-3 bullet points. Avoid using too many bullets.</li>
							<li>
								Employers want to know what you've achieved. If possible, quantify what you have
								accomplished.
							</li>
							<li>
								Use simple language and make it easily readable. Recruiters who are unfamiliar with
								your specific field may review your resume.
							</li>
							<li>Include key words from the job description in your resume.</li>
						</ul>
					</div>

					<div class="mt-4">
						<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
							Logistics Coordinator
						</h3>
						<p class="text-gray-600 dark:text-gray-100">Northwind Traders, Miami | 20XX — 20XX</p>
						<ul class="mt-2 list-disc pl-5 text-gray-700 dark:text-gray-100">
							<li>Be as precise as possible. Don’t write long paragraphs.</li>
							<li>
								Highlight your accomplishments but don't exaggerate; they will ask questions from
								your resume during the interview.
							</li>
							<li>
								If you are applying for a position in a new area, emphasize the skills you have
								established that will be useful in this position.
							</li>
						</ul>
					</div>

					<div class="mt-4">
						<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Logistics Coordinator</h3>
						<p class="text-gray-600">Northwind Traders, Miami | 20XX — 20XX</p>
						<ul class="mt-2 list-disc pl-5 text-gray-700 dark:text-gray-100">
							<li>Be as precise as possible. Don’t write long paragraphs.</li>
							<li>
								Highlight your accomplishments but don't exaggerate; they will ask questions from
								your resume during the interview.
							</li>
							<li>
								If you are applying for a position in a new area, emphasize the skills you have
								established that will be useful in this position.
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
