export async function fetchGitHubData(username, apiBase = 'https://api.github.com') {
  const headers = { Accept: 'application/vnd.github+json' };
  const [profileRes, reposRes] = await Promise.all([
    fetch(`${apiBase}/users/${username}`, { headers }),
    fetch(`${apiBase}/users/${username}/repos?per_page=100&sort=updated`, { headers }),
  ]);
  if (!profileRes.ok || !reposRes.ok) throw new Error('GitHub API unavailable');
  const profile = await profileRes.json();
  const repos = await reposRes.json();
  return { profile, repos };
}
