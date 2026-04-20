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

const GITHUB_API_URL = "https://api.github.com/users/";

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

async function fetchGitHubUser(username) {
  const response = await fetch(`${GITHUB_API_URL}${encodeURIComponent(username)}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Usuario nao encontrado.");
    }

    throw new Error("Nao foi possivel buscar os dados agora.");
  }

  return response.json();
}

async function handleSearch() {
  const username = inputSearch.value.trim();

  if (!username) {
    showMessage("Digite um nome de usuario para buscar.");
    return;
  }

  showLoading();

  try {
    const userData = await fetchGitHubUser(username);
    fillUserProfile(userData);
  } catch (error) {
    showMessage(error.message);
  }
}

buttonSearch.addEventListener("click", handleSearch);
inputSearch.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});
