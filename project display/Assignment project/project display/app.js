document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const projectFormPopup = document.getElementById('project-form-popup');
    const loginPopup = document.getElementById('login-popup');
    const projectsContainer = document.getElementById('projects-container');
    const searchInput = document.getElementById('search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const addProjectBtn = document.getElementById('add-project-btn');
    const loginBtn = document.getElementById('login-btn');
    const mobileLoginBtn = document.getElementById('mobile-login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');
    const noProjectsMessage = document.getElementById('no-projects-message');
    const closeButtons = document.querySelectorAll('.close-popup');

    let projects = [
        {
            title: "Project 1",
            description: "Description for project 1",
            category: "html",
            projectLink: "projects/project1/index.html",
            githubLink: "https://github.com/example/project1"
        },
        {
            title: "Project 2",
            description: "Description for project 2",
            category: "css",
            projectLink: "projects/project2/index.html",
            githubLink: "https://github.com/example/project2"
        }
    ];
    let loggedIn = false;

    navToggle.addEventListener('click', () => {
        mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.getElementById('project-form').addEventListener('submit', (e) => {
        e.preventDefault();
        addProject();
    });

    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        login();
    });

    addProjectBtn.addEventListener('click', () => {
        projectFormPopup.style.display = 'block';
    });

    loginBtn.addEventListener('click', () => {
        loginPopup.style.display = 'block';
    });

    mobileLoginBtn.addEventListener('click', () => {
        loginPopup.style.display = 'block';
    });

    logoutBtn.addEventListener('click', logout);
    mobileLogoutBtn.addEventListener('click', logout);

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            projectFormPopup.style.display = 'none';
            loginPopup.style.display = 'none';
        });
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterProjects(button.dataset.category);
        });
    });

    searchInput.addEventListener('input', () => {
        searchProjects(searchInput.value);
    });

    function addProject() {
        const title = document.getElementById('project-title').value;
        const description = document.getElementById('project-description').value;
        const category = document.getElementById('project-category').value;
        const githubLink = document.getElementById('github-link').value;

        // Generate the project link based on the title
        const projectLink = `projects/${title.toLowerCase().replace(/ /g, '-')}/index.html`;

        const project = { title, description, category, projectLink, githubLink };
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));
        displayProjects(projects);
        projectFormPopup.style.display = 'none';
        document.getElementById('project-form').reset();
    }

    function login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (username === 'ADMIN' && password === 'Ali786786@') {
            loggedIn = true;
            addProjectBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'inline-block';
            mobileLogoutBtn.style.display = 'inline-block';
            loginBtn.style.display = 'none';
            mobileLoginBtn.style.display = 'none';
            loginPopup.style.display = 'none';
            displayProjects(projects);
        } else {
            alert('Incorrect username or password');
        }
    }

    function logout() {
        loggedIn = false;
        addProjectBtn.style.display = 'none';
        logoutBtn.style.display = 'none';
        mobileLogoutBtn.style.display = 'none';
        loginBtn.style.display = 'inline-block';
        mobileLoginBtn.style.display = 'inline-block';
        displayProjects(projects);
    }

    function filterProjects(category) {
        const filteredProjects = category === 'all' ? projects : projects.filter(project => project.category === category);
        displayProjects(filteredProjects);
    }

    function searchProjects(query) {
        const filteredProjects = projects.filter(project => project.title.includes(query) || project.description.includes(query));
        displayProjects(filteredProjects);
    }

    function displayProjects(projectsToDisplay) {
        projectsContainer.innerHTML = '';
        if (projectsToDisplay.length === 0) {
            noProjectsMessage.style.display = 'block';
        } else {
            noProjectsMessage.style.display = 'none';
            projectsToDisplay.forEach((project, index) => {
                const projectElement = document.createElement('div');
                projectElement.className = 'project-box';
                projectElement.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-buttons">
                        <a href="${project.projectLink}" target="_blank"><i class="fas fa-external-link-alt"></i> Project</a>
                        <a href="${project.githubLink}" target="_blank"><i class="fab fa-github"></i> GitHub</a>
                        ${loggedIn ? `
                        <button onclick="editProject(${index})"><i class="fas fa-edit"></i> Edit</button>
                        <button onclick="deleteProject(${index})"><i class="fas fa-trash-alt"></i> Delete</button>
                        ` : ''}
                    </div>
                `;
                projectsContainer.appendChild(projectElement);
            });
        }
    }

    window.editProject = function(index) {
        const project = projects[index];
        document.getElementById('project-title').value = project.title;
        document.getElementById('project-description').value = project.description;
        document.getElementById('project-category').value = project.category;
        document.getElementById('github-link').value = project.githubLink;
        projectFormPopup.style.display = 'block';
        document.getElementById('project-form').onsubmit = function(e) {
            e.preventDefault();
            const updatedProjectLink = `projects/${document.getElementById('project-title').value.toLowerCase().replace(/ /g, '-')}/index.html`;
            projects[index] = {
                title: document.getElementById('project-title').value,
                description: document.getElementById('project-description').value,
                category: document.getElementById('project-category').value,
                projectLink: updatedProjectLink,
                githubLink: document.getElementById('github-link').value,
            };
            localStorage.setItem('projects', JSON.stringify(projects));
            displayProjects(projects);
            projectFormPopup.style.display = 'none';
            document.getElementById('project-form').onsubmit = addProject;
        };
    };

    window.deleteProject = function(index) {
        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
        displayProjects(projects);
    };

    if (localStorage.getItem('projects')) {
        projects = JSON.parse(localStorage.getItem('projects'));
    }
    displayProjects(projects);
});
