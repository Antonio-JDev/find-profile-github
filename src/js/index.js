import {
  getGitHubUserByUsername,
  getGitHubUserRepositoriesByUsername,
} from "./githubApi.js";

const inputSearch = document.getElementById("input-search");
const buttonSearch = document.getElementById("btn-search");
const profileResults = document.querySelector(".profile-results");
const statusMessage = document.querySelector(".status-message");
const profileData = document.querySelector(".profile-data");

const profileAvatar = document.getElementById("profile-avatar");
const profileName = document.getElementById("profile-name");
const profileLogin = document.getElementById("profile-login");
const profileBio = document.getElementById("profile-bio");
const profileFollowers = document.getElementById("profile-followers");
const profileFollowing = document.getElementById("profile-following");
const profileRepos = document.getElementById("profile-repos");
const profileLocation = document.getElementById("profile-location");
const profileCompany = document.getElementById("profile-company");
const profileBlog = document.getElementById("profile-blog");
const repositoriesList = document.getElementById("repositories-list");
const repositoriesEmpty = document.getElementById("repositories-empty");
const themeToggleButton = document.getElementById("btn-theme");

const THEME_STORAGE_KEY = "github-profile-theme";

function showMessage(message) {
  statusMessage.textContent = message;
  statusMessage.classList.remove("hide");
  profileData.classList.add("hide");
  profileResults.classList.remove("hide");
}

function showLoading() {
  showMessage("Buscando dados do usuario...");
}

function formatBlogUrl(blog) {
  if (!blog) {
    return "";
  }

  if (blog.startsWith("http://") || blog.startsWith("https://")) {
    return blog;
  }

  return `https://${blog}`;
}

function fillUserProfile(user) {
  const userName = user.name || user.login;
  const userBio = user.bio || "Sem biografia informada.";
  const userLocationValue = user.location || "Nao informado";
  const userCompanyValue = user.company || "Nao informado";
  const userBlogText = user.blog || "Nao informado";
  const userBlogHref = formatBlogUrl(user.blog);

  profileAvatar.src = user.avatar_url;
  profileAvatar.alt = `Avatar de ${userName}`;
  profileName.textContent = userName;
  profileLogin.textContent = `@${user.login}`;
  profileBio.textContent = userBio;
  profileFollowers.textContent = user.followers;
  profileFollowing.textContent = user.following;
  profileRepos.textContent = user.public_repos;
  profileLocation.textContent = userLocationValue;
  profileCompany.textContent = userCompanyValue;
  profileBlog.textContent = userBlogText;

  if (userBlogHref) {
    profileBlog.href = userBlogHref;
  } else {
    profileBlog.removeAttribute("href");
  }

  statusMessage.classList.add("hide");
  profileData.classList.remove("hide");
  profileResults.classList.remove("hide");
}

function createRepositoryListItem(repository) {
  const listItem = document.createElement("li");
  const repositoryLink = document.createElement("a");
  const repositoryName = document.createElement("h4");
  const repositoryMeta = document.createElement("i");

  repositoryLink.href = repository.html_url;
  repositoryLink.target = "_blank";
  repositoryLink.rel = "noopener noreferrer";

  repositoryName.textContent = repository.name;
  repositoryMeta.textContent = `${repository.language || "Sem linguagem"} - ★ ${repository.stargazers_count}`;

  repositoryLink.append(repositoryName, repositoryMeta);
  listItem.append(repositoryLink);

  return listItem;
}

function fillRepositories(repositories) {
  repositoriesList.replaceChildren();

  if (!repositories.length) {
    repositoriesEmpty.classList.remove("hide");
    return;
  }

  repositoriesEmpty.classList.add("hide");

  repositories.forEach((repository) => {
    const repositoryItem = createRepositoryListItem(repository);
    repositoriesList.append(repositoryItem);
  });
}

function applyTheme(theme) {
  const isDarkTheme = theme === "dark";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  themeToggleButton.textContent = isDarkTheme ? "Tema Light" : "Tema Dark";
}

function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "dark") {
    applyTheme("dark");
    return;
  }

  applyTheme("light");
}

function toggleTheme() {
  const isDarkTheme = document.body.classList.contains("dark-theme");
  const nextTheme = isDarkTheme ? "light" : "dark";

  applyTheme(nextTheme);
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
}

async function handleSearch() {
  const username = inputSearch.value.trim();

  if (!username) {
    showMessage("Digite um nome de usuario para buscar.");
    return;
  }

  showLoading();

  try {
    const [userData, repositoriesData] = await Promise.all([
      getGitHubUserByUsername(username),
      getGitHubUserRepositoriesByUsername(username),
    ]);

    fillUserProfile(userData);
    fillRepositories(repositoriesData);
  } catch (error) {
    showMessage(error instanceof Error ? error.message : "Erro ao buscar usuario.");
  }
}

buttonSearch.addEventListener("click", handleSearch);
inputSearch.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

themeToggleButton.addEventListener("click", toggleTheme);
loadTheme();
