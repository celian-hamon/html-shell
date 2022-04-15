addEventListener("load", main);

async function main() {
    console.log("Hello World!");
    // print sample message
    shell = document.getElementById("shell");
    shell.innerHTML += `<p class='first'>            .-"""-. </p>`;
    shell.innerHTML += `<p class='first'>           '       \\ </p>`;
    shell.innerHTML += `<p class='first'>          |,.  ,-.  |</p>`;
    shell.innerHTML += `<p class='first'>          |()L( ()| |</p>`;
    shell.innerHTML += `<p class='first'>          |,'   ".| |</p>`;
    shell.innerHTML += "<p class='first'>          |.___.',| `</p>";
    shell.innerHTML += '<p class="first">         .j `--"  `  `.</p>';
    shell.innerHTML += `<p class='first'>        / '        '   \ </p>`;
    shell.innerHTML += '<p class="first">       / /         `   `</p>';
    shell.innerHTML += `<p class='first'>      / /          '.    </p > `;
    shell.innerHTML += `<p class='first'>    . ,              |   |</p > `;
    shell.innerHTML += `<p class='first'>   ,"'.             .|   |</p > `;
    shell.innerHTML += "<p class='first'> _.'   ``.        | `..-'l</p > ";
    shell.innerHTML += "<p class='first'>|       `.`,        |     `.</p > ";
    shell.innerHTML += "<p class='first'>|         `.    __.j        )</p > ";
    shell.innerHTML += "<p class='first'>|__        |--''___|      ,-'</p > ";
    shell.innerHTML += '<p class="first">   `"--...,+""""   `._,.-"</p > ';

    shell.innerHTML += `<p class='first'>Welcome to the shell! If you need help just type it</p > `;


}
addEventListener("click", function (event) {
    if (event.target.id == "close") {
        document.body.innerHTML = "";
    } else if (event.target.id == "shell" || event.target.id == "window") {
        document.getElementById("input").focus();
    }
});

addEventListener("keyup", function (event) {
    element = document.getElementById("input");
    var input = element.value.toLowerCase();

    //if the key pressed is enter
    if (event.code === "Enter") {
        // get input from user
        if (input == "") {
            return;
        }
        // clear input
        element.value = "";
        // print input
        shell.innerHTML += "<p>" + input + "</p>";
        // run command
        runCommand(input);
        return;
    }

    // if the value of the input is a command make it green
    for (var i = 0; i < commands.length; i++) {
        if (input == commands[i].name) {
            element.style.color = "var(--green)";
            return;
        } else {
            element.style.color = "var(--text-color)";
        }
    }

});

async function runCommand(input) {
    switch (input) {
        case "clear":
            for (var i = 0; i < shell.children.length; i++) {
                shell.children[i].className = "despawn";
            }
            await new Promise(r => setTimeout(r, 300));
            shell.innerHTML = "";
            return;
        case "help":
            // │ ── └
            shell.innerHTML += "<p> ├── clear    - Clears the shell</p>";
            shell.innerHTML += "<p> ├── help     - Prints this message</p>";
            shell.innerHTML += "<p> ├── skills   - Display my skills</p>";
            shell.innerHTML += "<p> ├── projects - Display my projects</p>";
            shell.innerHTML += "<p> └── exit     - Exits the shell</p>";
            return;
        case "skills":
            for (var i = 0; i < skills.length; i++) {
                if (i == skills.length - 1) {
                    shell.innerHTML += `< p > └──<img src="${skills[i].value}" alt="${skills[i].name} icon" /> ${skills[i].name}</p > `;
                    break
                }
                shell.innerHTML += `< p > ├──<img src="${skills[i].value}" alt="${skills[i].name} icon" /> ${skills[i].name}</p > `;
            }
            return
        case "projects":
            shell.innerHTML += '<div id="loader">';

            response = await fetch('https://api.github.com/users/celian-hamon/repos');
            repos = await response.json();
            repos.forEach(repo => {
                repo.topics.forEach(async function (topic) {
                    if (topic == "project") {
                        languages = await fetch(repo.languages_url);
                        languages = await languages.json();
                        shell.innerHTML += `<p><br/></p> `;
                        shell.innerHTML += `<p><a href="${repo.html_url}" target="_blank">${repo.name}</a></p>`;
                        lang = document.createElement("p");
                        for (keyLanguage in languages) {
                            lang.innerHTML += '#' + keyLanguage + " ";
                        }
                        shell.appendChild(lang);
                        shell.innerHTML += `<p> ${repo.description}</p>`;
                    }
                });
            })
            document.getElementById('loader').remove();
            return;
        case "exit":
            document.body.innerHTML = "";
            return;
        default:
            shell.innerHTML += "<p>invalid command !</p>";
            return;
    }
}
commands = [
    { name: "clear", value: "Clears the shell" },
    { name: "help", value: "Prints this message" },
    { name: "skills", value: "Display my skills" },
    { name: "projects", value: "Display my projects" },
    { name: "exit", value: "Exits the shell" }
]

skills = [
    { name: "Golang", value: "https://img.icons8.com/color/48/000000/golang.png" },
    { name: "Python", value: "https://img.icons8.com/fluency/48/000000/python.png" },
    { name: "HTML", value: "https://img.icons8.com/color/48/000000/html-5--v1.png" },
    { name: "CSS", value: "https://img.icons8.com/color/48/000000/css3.png" },
    { name: "Javascript", value: "https://img.icons8.com/color/48/000000/javascript--v1.png" },
    { name: "SQL", value: "https://img.icons8.com/external-flat-juicy-fish/48/000000/external-sql-coding-and-development-flat-flat-juicy-fish.png" },
    { name: "Node", value: "https://img.icons8.com/fluency/48/000000/node-js.png" },
    { name: "Linux", value: "https://img.icons8.com/color/48/000000/linux--v1.png" },
    { name: "Shell", value: "https://img.icons8.com/plasticine/100/000000/bash.png" },
    { name: "Git", value: "https://img.icons8.com/color/48/000000/git.png" },
    { name: "Restful APIs", value: "https://img.icons8.com/color-glass/48/000000/api-settings.png" },
];
