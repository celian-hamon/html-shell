let full = false
let lastCommand = "";
addEventListener("load", main);

async function main() {
    // print sample message
    let shell = document.getElementById("shell");
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
    shell.innerHTML += `<p class='first'>Welcome to the shell! If you need help just type it <br/>psssst! (the buttons at the top are functionnals ;))</p > `;
}

addEventListener("click", function (event) {
    if (event.target.id == "close") {
        document.body.innerHTML = "";
    }
    else if (event.target.id == "maximize") {
        if (full) {
            document.getElementById("window").style.width = "80%";
            document.getElementById("window").style.height = "80%";
            full = false;
        } else {
            document.getElementById("window").style.width = "100%";
            document.getElementById("window").style.height = "100%";
            full = true;
        }
    }
    else {
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
        lastCommand = input;
        // clear input
        element.value = "";
        // print input
        shell.innerHTML += "<p>" + input + "</p>";
        // run command
        input = input.split(" ");
        runCommand(input);
        return;
    }

    //if the key pressed is upper arrow key
    if (event.code === "ArrowUp") {
        // retreive last command and assign it to input value
        element.value = lastCommand;
        return;
    }

    // if the value of the input is a command make it green
    for (var i = 0; i < commands.length; i++) {
        if (input.startsWith(commands[i].name)) {
            element.style.color = "var(--green)";
            return;
        } else {
            element.style.color = "var(--text-color)";
        }
    }

});

async function runCommand(input) {
    switch (input[0]) {
        case "clear":
            for (var i = 0; i < shell.children.length; i++) {
                shell.children[i].className = "despawn";
            }
            await new Promise(r => setTimeout(r, 300));
            shell.innerHTML = "";
            return;
        case "help":
            // ├─ ── └
            for (var i = 0; i < commands.length; i++) {
                //add spaces to the command.name to align the commands.value
                let space = 6 - commands[i].name.length;
                let spaces = "";
                for (var j = 0; j < space; j++) {
                    spaces += " ";
                }
                if (i == commands.length - 1) {
                    shell.innerHTML += "<p> └─" + commands[i].name + spaces + "- " + commands[i].value + "</p>";
                    return
                }
                shell.innerHTML += "<p> ├─" + commands[i].name + spaces + "- " + commands[i].value + "</p>";
            }
        case "skills":
            for (var i = 0; i < skills.length; i++) {
                if (i == skills.length - 1) {
                    shell.innerHTML += `<p> └──<img src="${skills[i].value}" alt="${skills[i].name} icon" /> ${skills[i].name}</p>`;
                    break
                }
                shell.innerHTML += `<p> ├──<img src="${skills[i].value}" alt="${skills[i].name} icon" /> ${skills[i].name}</p>`;
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
        case "ls":
            let file = "";
            for (var i = 0; i < files.length; i++) {
                file += files[i] + " ";
            }
            shell.innerHTML += `<p>${file}</p>`;
            return
        case "cat":
            switch (input[1]) {
                case "skills.json":
                    for (var i = 0; i < skills.length; i++) {
                        if (i == skills.length - 1) {
                            shell.innerHTML += `<p> └──<img src="${skills[i].value}" alt="${skills[i].name} icon" /> ${skills[i].name}</p>`;
                            break
                        }
                        shell.innerHTML += `<p> ├──<img src="${skills[i].value}" alt="${skills[i].name} icon" /> ${skills[i].name}</p>`;
                    }
                    return
                case "projects.json":
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
                default:
                    shell.innerHTML += `<p>cat: ${input[1]}: No such file or directory</p>`;
                    return;
            }
        default:
            shell.innerHTML += "<p>invalid command !</p>";
            return;
    }
}

files = ["skills.json", "projects.json"];

commands = [
    { name: "clear", value: "Clears the shell" },
    { name: "help", value: "Prints this message" },
    { name: "ls", value: "Show files" },
    { name: "cat", value: "Show files content" },
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
