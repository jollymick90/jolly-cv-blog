<script lang="ts">
	type Log = {
		type: 'input' | 'output' | 'error';
		text: string;
	};

	let logs = $state<Log[]>([
		{ type: 'output', text: 'Welcome to ENGINEER_CORE_V4 terminal.' },
		{ type: 'output', text: 'Type "help" to see available commands.' }
	]);
	
	let inputValue = $state('');
	let inputRef: HTMLInputElement;

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			const cmd = inputValue.trim().toLowerCase();
			if (!cmd) return;
			
			logs = [...logs, { type: 'input', text: `root@mscarpa:~# ${cmd}` }];
			
			switch (cmd) {
				case 'whoami':
					logs = [...logs, { type: 'output', text: 'Michele Scarpa. Senior Software Engineer with 10 years of experience, specialized in enterprise GIS systems and agentic AI solutions.' }];
					break;
				case 'skills':
					logs = [...logs, 
						{ type: 'output', text: '--- Solid Foundation ---' },
						{ type: 'output', text: 'Java, Angular, React, GIS' },
						{ type: 'output', text: '--- Modern Stack ---' },
						{ type: 'output', text: 'SvelteKit, Tailwind, AI Automation, Claude Code, Cursor' }
					];
					break;
				case 'projects':
					logs = [...logs, { type: 'output', text: 'VeneziaSpatial_v4.0 (LIVE)' }, { type: 'output', text: 'Core_Engine_Rust (PRIVATE REPO)' }, { type: 'output', text: 'BacaroOS_Platform (V1.2.0)' }, { type: 'output', text: 'AI_Proxy_Gateway (BETA)' }];
					break;
				case 'contact':
					logs = [...logs, { type: 'output', text: 'Email: michele@example.com   LinkedIn: linkedin.com/in/michelescarpa' }];
					break;
				case 'help':
					logs = [...logs, { type: 'output', text: 'Available commands: whoami, skills, projects, contact, clear' }];
					break;
				case 'clear':
					logs = [];
					break;
				default:
					logs = [...logs, { type: 'error', text: `Command not found: ${cmd}` }];
					break;
			}
			inputValue = '';
			
			setTimeout(() => {
				if (inputRef) {
					inputRef.scrollIntoView({ behavior: 'smooth', block: 'end' });
				}
			}, 10);
		}
	}
</script>

<div class="rounded-lg overflow-hidden border border-outline-variant/30 shadow-2xl bg-[#0d1117] h-full flex flex-col">
	<div class="bg-[#161b22] px-4 py-2 flex items-center justify-between border-b border-outline-variant/20 shrink-0">
		<div class="flex gap-1.5">
			<div class="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
			<div class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
			<div class="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
		</div>
		<div class="text-[10px] font-mono text-secondary/40 tracking-widest uppercase">bash</div>
		<div class="w-10"></div>
	</div>

	<div class="p-4 md:p-6 font-mono text-sm space-y-1.5 grow overflow-y-auto max-h-[300px] md:max-h-[400px]">
		{#each logs as log}
			<div class="flex gap-2 {log.type === 'error' ? 'text-error' : 'text-on-surface'}">
				<span>{log.text}</span>
			</div>
		{/each}

		<div class="flex items-center gap-2 mt-2">
			<span class="text-[#b3d17a] shrink-0">root@mscarpa:~#</span>
			<input
				bind:this={inputRef}
				bind:value={inputValue}
				onkeydown={handleKeydown}
				type="text"
				class="bg-transparent text-on-surface outline-none border-none flex-grow p-0 focus:ring-0 font-mono"
				autofocus
				autocomplete="off"
				spellcheck="false"
			/>
		</div>
	</div>
</div>
