// DOM Elements
const output = document.getElementById('output');
const input = document.getElementById('cmd-input');
const buttons = document.querySelectorAll('.nav-btn');
const clearBtn = document.getElementById('clear-btn');

const info = `¡Hola! Soy Fabio Rojas, desarrollador principiante al que le encanta programar y dar vida a sus ideas.

  ·  Actualmente estoy estudiando Ingeniería Informática para convertirme en desarrollador TI.
  ·  Estoy trabajando en varios proyectos como una extension de vscode de un LSP, una app de traducción, etc...
  ·  ¡Siempre estoy abierto a aprender cosas nuevas y cualquier ayuda es bienvenida!
`

const projects = `Entre mis proyectos tengo:
  ·  Extensión de VSCode de pseud

`


const contact = `Puedes contactarme en:
  ·  fabiorrojas56@gmail.com

  O también en cualquiera de mis RRSS.  
`

// Comandos
const commands = {
  info: info,
  projects: projects,
  descargar_cv: "Por ahora no he subido mi CV :C",
  contact: contact,
  "socialmedia --show": "pruebas"
};

let cmd_blocked = false

function executeCommand(cmd) {
  const response = commands[cmd] || `Comando no reconocido: ${cmd}`;
  
  if (!cmd_blocked) {
    appendOutput(cmd);
  cmd_blocked = true
  setTimeout(() => {
    appendOutput(response); // Mostrar la respuesta después de un retraso
    cmd_blocked = false
  }, 750);}
}

  const links = {
    'RRSS': `<span class="cmd-link" data-command="socialmedia --show">redes sociales</span>`,
    'pseud': `<a class = "cmd-link" href="https://github.com/SymbiontZ/pseud-esp">Pseudocódigo en Español</a>`
  }

  function appendOutput(text) {
    const newLine = document.createElement('div');
    newLine.innerHTML = `\n $ ${text}`;

    let formattedText = text;
  for (const key of Object.keys(links)) {
    if (text.includes(key)) {
      formattedText = formattedText.replace(key, links[key]);
    }
  }

  // Renderizar el texto con los enlaces reemplazados
  newLine.innerHTML = `$ ${formattedText}`;
  output.appendChild(newLine);
  output.scrollTop = output.scrollHeight; // Auto-scroll

  const interactiveTexts = newLine.querySelectorAll('.cmd-link');
  interactiveTexts.forEach((element) => {
    if (element.dataset.command) {
      element.addEventListener('click', () => {
        const command = element.getAttribute('data-command');
        executeCommand(command);
      });
    }
  });
}

// Input Events
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && input.value.trim()) {
    const cmd = input.value.trim();
    
    executeCommand(cmd);
    input.value = '';
  }
});

// Eventos pulsar en boton
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const command = button.getAttribute('data-command');
    executeCommand(command);
  });
});

clearBtn.addEventListener('click', () => {
  output.innerHTML = ''; // Limpia el contenido de la terminal
});