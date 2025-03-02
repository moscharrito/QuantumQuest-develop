import axios from 'axios';

const API_BASE_URL = 'https://singhit-api.onrender.com/';

export async function getProjects() {
  const res = await axios.get('/api/projects');
  return res.data;
}

export async function updateTaskStatus(taskId, newStatus) {
  const res = await axios.patch(`${API_BASE_URL}/api/tasks/${taskId}`, { status: newStatus });
  return res.data;
}
