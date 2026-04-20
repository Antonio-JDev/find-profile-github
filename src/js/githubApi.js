const GITHUB_API_BASE_URL = "https://api.github.com";

function buildUserEndpoint(username) {
  return `${GITHUB_API_BASE_URL}/users/${encodeURIComponent(username)}`;
}

function buildUserRepositoriesEndpoint(username) {
  const normalizedUsername = encodeURIComponent(username);
  return `${GITHUB_API_BASE_URL}/users/${normalizedUsername}/repos?sort=updated&per_page=10`;
}

async function request(endpoint) {
  const response = await fetch(endpoint);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Usuario nao encontrado.");
    }

    throw new Error("Nao foi possivel buscar os dados agora.");
  }

  return response.json();
}

export async function getGitHubUserByUsername(username) {
  const normalizedUsername = username.trim();

  if (!normalizedUsername) {
    throw new Error("Nome de usuario invalido.");
  }

  const endpoint = buildUserEndpoint(normalizedUsername);
  return request(endpoint);
}

export async function getGitHubUserRepositoriesByUsername(username) {
  const normalizedUsername = username.trim();

  if (!normalizedUsername) {
    throw new Error("Nome de usuario invalido.");
  }

  const endpoint = buildUserRepositoriesEndpoint(normalizedUsername);
  return request(endpoint);
}
