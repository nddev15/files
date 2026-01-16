// Terminal Module
const Terminal = (() => {
  let commands = [];

  const loadCommands = async () => {
    try {
      const res = await fetch('assets/config/terminalcmd/cmd.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load commands');
      const data = await res.json();
      commands = data.commands || [];
    } catch (err) {
      console.error('Error loading terminal commands:', err);
      commands = [];
    }
  };

  const findCommand = (input) => {
    const lowerInput = input.toLowerCase().trim();
    for (const cmd of commands) {
      if (cmd.name.toLowerCase() === lowerInput) return cmd;
      if (cmd.aliases && cmd.aliases.some(alias => alias.toLowerCase() === lowerInput)) return cmd;
    }
    return null;
  };

  const initTerminal = () => {
    const input = document.getElementById('terminalInput');
    const output = document.getElementById('terminalOutput');
    const promptEl = document.getElementById('terminalPrompt');
    if (!input || !output) return;

    const typeText = (el, text, speed = 28) => {
      return new Promise(resolve => {
        let i = 0;
        const scrollEl = el;
        function step() {
          el.textContent += text.charAt(i);
          i++;
          if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;
          if (i < text.length) setTimeout(step, speed);
          else resolve();
        }
        step();
      });
    };

    input.addEventListener('keydown', async (e) => {
      if (e.key !== 'Enter') return;
      const cmd = input.value.trim();
      if (!cmd) return;
      input.value = '';

      const lang = I18N.getCurrentLang();
      const trans = I18N.translations();
      const promptText = trans[lang] && trans[lang].terminalPrompt ? trans[lang].terminalPrompt : '666cheat@localhost :~$';

      output.textContent = output.textContent + '\n' + promptText + ' ' + cmd + '\n';
      try { output.scrollTop = output.scrollHeight; } catch (e) {}

      input.disabled = true;

      const foundCmd = findCommand(cmd);
      
      if (foundCmd) {
        if (foundCmd.name.toLowerCase() === 'clear' || foundCmd.name.toLowerCase() === 'cls') {
          output.textContent = trans[lang] && trans[lang].terminalHeader ? trans[lang].terminalHeader + '\n' : '';
        } else if (foundCmd.output_key) {
          const output_text = trans[lang] && trans[lang][foundCmd.output_key] ? trans[lang][foundCmd.output_key] : '';
          await typeText(output, output_text.replace(/\\n/g, '\n'));
        }
      } else {
        await typeText(output, 'Command not found: ' + cmd);
      }

      input.disabled = false;
      input.focus();
    });

    if (promptEl) promptEl.addEventListener('click', () => { input.focus(); });
  };

  return {
    init: initTerminal,
    loadCommands
  };
})();
