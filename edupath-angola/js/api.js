// Wrapper para chamadas à API
export async function apiFetch(path, opts = {}) {
	const base = '/api'; // ajustar conforme backend
	const res = await fetch(base + path, opts);
	return res.json();
}
