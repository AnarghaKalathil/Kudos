// src/lib/adminApi.ts

const BASE_URL = 'http://140.245.218.8:8000';

const getToken = () => localStorage.getItem('accessToken');

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

// ------------------- LOGIN -------------------
export const loginAdmin = async (username: string, password: string) => {
  const res = await fetch(`${BASE_URL}/accounts/api/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (res.ok && data?.data?.access_token) {
    localStorage.setItem('token', data.data.access_token);
    return { success: true };
  }

  return { success: false, message: data.message || 'Login failed' };
};

// ------------------- USERS -------------------
export const getAllUsers = async () => {
  const res = await fetch(`${BASE_URL}/admin-dashboard/api/users/`, {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error('Failed to fetch users');

  const data = await res.json();
  return data.data || [];
};

export const createUser = async (user: {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  designation: string;
  department?: string;
}) => {
  const res = await fetch(`${BASE_URL}/admin-dashboard/api/users/create/`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(user),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Failed to create user');

  return data.data;
};

export const deleteUser = async (id: number) => {
  const res = await fetch(`${BASE_URL}/admin-dashboard/api/users/${id}/delete/`, {
    method: 'DELETE',
    headers: authHeaders(),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Failed to delete user');
  }

  return true;
};

// ------------------- CATEGORIES -------------------
export const getAllCategories = async () => {
  const res = await fetch(`${BASE_URL}/admin-dashboard/api/categories/`, {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error('Failed to fetch categories');

  const data = await res.json();
  return data.data || [];
};

export const createCategory = async (category: { name: string }) => {
  const res = await fetch(`${BASE_URL}/admin-dashboard/api/categories/create/`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(category),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create category');

  return data.data;
};

export const deleteCategory = async (id: number) => {
  const res = await fetch(`${BASE_URL}/admin-dashboard/api/categories/${id}/delete/`, {
    method: 'DELETE',
    headers: authHeaders(),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Failed to delete category');
  }

  return true;
};

// ------------------- SKILLS -------------------
export const getAllSkills = async () => {
  const res = await fetch(`${BASE_URL}/admin-dashboard/api/skills/`, {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error('Failed to fetch skills');

  const data = await res.json();
  return data.data || [];
};

export const createSkill = async (skill: { name: string}) => {
  const res = await fetch(`${BASE_URL}/admin-dashboard/api/skills/create/`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(skill),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create skill');

  return data.data;
};

export const deleteSkill = async (id: number) => {
  const res = await fetch(`${BASE_URL}/admin-dashboard/api/skills/${id}/delete/`, {
    method: 'DELETE',
    headers: authHeaders(),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Failed to delete skill');
  }

  return true;
};
