// Mock API functions for frontend development
// Replace these with actual API calls when backend is ready

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
  department: string;
  role: string;
  stars: number;
  badges: string[];
  tags: string[];
}

export interface Recognition {
  id: string;
  fromUser: User;
  toUser: User;
  stars: number;
  comment: string;
  tags: string[];
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewerId?: string;
  createdAt: string;
  approvedAt?: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  message?: string;
}

// Mock user data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    username: "sarah.johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face",
    department: "Engineering",
    role: "Senior Developer",
    stars: 128,
    badges: ["Code Mentor", "Team Player", "Problem Solver"],
    tags: ["React", "TypeScript", "Node.js", "UI/UX", "Code Review"]
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike.chen@company.com",
    username: "mike.chen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    department: "DevOps",
    role: "DevOps Engineer",
    stars: 95,
    badges: ["Infrastructure Expert", "Mentor"],
    tags: ["Docker", "Kubernetes", "AWS", "CI/CD", "Monitoring"]
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    username: "emily.rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    department: "Product",
    role: "Product Manager",
    stars: 87,
    badges: ["Strategic Thinker", "Communicator"],
    tags: ["Product Strategy", "User Research", "Analytics", "Roadmapping"]
  },
  {
    id: "4",
    name: "Alex Thompson",
    email: "alex.thompson@company.com",
    username: "alex.thompson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    department: "Design",
    role: "UX Designer",
    stars: 76,
    badges: ["Creative Problem Solver"],
    tags: ["Figma", "User Testing", "Prototyping", "Design Systems"]
  },
  {
    id: "5",
    name: "Lisa Wang",
    email: "lisa.wang@company.com",
    username: "lisa.wang",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    department: "Engineering",
    role: "Frontend Developer",
    stars: 63,
    badges: ["UI Specialist"],
    tags: ["Vue.js", "CSS", "Animation", "Mobile Development"]
  }
];

// Mock recognitions data
const mockRecognitions: Recognition[] = [
  {
    id: "1",
    fromUser: mockUsers[0],
    toUser: mockUsers[1],
    stars: 5,
    comment: "Great help with Docker configuration!",
    tags: ["Docker", "DevOps"],
    category: "Technical Help",
    status: "approved",
    createdAt: "2024-01-15T10:30:00Z",
    approvedAt: "2024-01-15T14:20:00Z"
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Utility to get/set tokens
const getToken = () => localStorage.getItem('authToken');
const setToken = (token: string) => localStorage.setItem('authToken', token);
const removeToken = () => localStorage.removeItem('authToken');

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

// Login API
export const loginAPI = async (credentials: { email: string; password: string; }) => {
  try {
    const url = `${API_BASE}/accounts/api/login/`;
    console.log('Login API URL:', url);
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    console.log('Login API response:', data);
    return data;
  } catch (e) {
    console.log('Login API error:', e);
    return { status: false, message: 'Network error' };
  }
};

// Logout API
export const logoutAPI = async (): Promise<{ success: boolean; message?: string }> => {
  const refresh = localStorage.getItem('refreshToken');
  try {
    const url = `${API_BASE}/accounts/api/logout/`;
    console.log('Logout API URL:', url);
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refresh }),
    });
    const data = await res.json().catch(() => ({}));
    console.log('Logout API response:', data);
    removeToken();
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('authToken');
    return { success: true };
  } catch (e) {
    console.log('Logout API error:', e);
    removeToken();
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('authToken');
    return { success: false, message: 'Logout error' };
  }
};

// Get all employees API
export const getEmployeesAPI = async (searchTerm?: string): Promise<User[]> => {
  await delay(500);
  
  if (!searchTerm) {
    return mockUsers;
  }
  
  return mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
};

// Search experts by tags API
export const searchExpertsAPI = async (tags: string[]): Promise<User[]> => {
  await delay(500);
  
  if (tags.length === 0) {
    return mockUsers;
  }
  
  return mockUsers.filter(user =>
    tags.some(tag =>
      user.tags.some(userTag =>
        userTag.toLowerCase().includes(tag.toLowerCase())
      )
    )
  ).sort((a, b) => {
    // Sort by relevance (number of matching tags)
    const aMatches = tags.filter(tag =>
      a.tags.some(userTag => userTag.toLowerCase().includes(tag.toLowerCase()))
    ).length;
    const bMatches = tags.filter(tag =>
      b.tags.some(userTag => userTag.toLowerCase().includes(tag.toLowerCase()))
    ).length;
    return bMatches - aMatches;
  });
};

// Get user profile API
export const getUserProfileAPI = async () => {
  try {
    const url = `${API_BASE}/dashboard/api/profile`;
    console.log('Get User Profile API URL:', url);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    console.log('Get User Profile API response:', data);
    return data;
  } catch (e) {
    console.log('Get User Profile API error:', e);
    return null;
  }
};

// Give recognition API (Swagger: sender, receiver, category, message, skills, reviewer)
export const giveRecognitionAPI = async (recognition: {
  sender: number;
  receiver: number;
  category: number;
  message: string;
  skills: number[];
  reviewer?: number;
}): Promise<{ success: boolean; message: string; recognitionId?: string }> => {
  try {
    const url = `${API_BASE}/dashboard/api/recognition/`;
    console.log('Give Recognition API URL:', url);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(recognition),
    });
    const data = await res.json().catch(() => ({}));
    console.log('Give Recognition API response:', data);
    if (res.ok) {
      return { success: true, message: 'Recognition submitted', recognitionId: data.id };
    }
    return { success: false, message: data.message || 'Failed to submit recognition' };
  } catch (e) {
    console.log('Give Recognition API error:', e);
    return { success: false, message: 'Network error' };
  }
};

// Recognition status change API (Swagger: id, status)
export const changeRecognitionStatusAPI = async (id: number, status: string): Promise<{ success: boolean; message?: string }> => {
  try {
    const url = `${API_BASE}/dashboard/api/recognition/status`;
    const payload = { id, status };
    console.log('Recognition Status Change API URL:', url);
    console.log('Recognition Status Change API payload:', payload);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    console.log('Recognition Status Change API response:', data);
    if (res.ok) {
      return { success: true };
    }
    return { success: false, message: data.message || 'Failed to change status' };
  } catch (e) {
    console.log('Recognition Status Change API error:', e);
    return { success: false, message: 'Network error' };
  }
};

// Get leaderboard API
export const getLeaderboardAPI = async (): Promise<User[]> => {
  await delay(400);
  
  return [...mockUsers].sort((a, b) => b.stars - a.stars);
};

// Get all available tags API
export const getTagsAPI = async (): Promise<string[]> => {
  await delay(200);
  
  const allTags = mockUsers.flatMap(user => user.tags);
  return [...new Set(allTags)].sort();
};

// Get user's recognitions API
export const getUserRecognitionsAPI = async (userId: string): Promise<Recognition[]> => {
  await delay(400);
  
  return mockRecognitions.filter(recognition => 
    recognition.toUser.id === userId && recognition.status === 'approved'
  );
};

// Get dashboard data
export const getDashboardAPI = async () => {
  try {
    const url = `${API_BASE}/dashboard/api/dashboard/`;
    console.log('Get Dashboard API URL:', url);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    console.log('Get Dashboard API response:', data);
    return data;
  } catch (e) {
    console.log('Get Dashboard API error:', e);
    return null;
  }
};

// Get all teams
export const getTeamsAPI = async () => {
  try {
    const url = `${API_BASE}/dashboard/api/teams/`;
    console.log('Get Teams API URL:', url);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    console.log('Get Teams API response:', data);
    return data;
  } catch (e) {
    console.log('Get Teams API error:', e);
    return null;
  }
};

// Get all recognitions
export const getAllRecognitionsAPI = async () => {
  try {
    const url = `${API_BASE}/dashboard/api/recognition/`;
    console.log('Get All Recognitions API URL:', url);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    console.log('Get All Recognitions API response:', data);
    // If response is {data: [...], status: true}, return data.data
    if (data && Array.isArray(data.data)) {
      return data.data;
    }
    return data;
  } catch (e) {
    console.log('Get All Recognitions API error:', e);
    return null;
  }
};

// Admin: Get all categories
export const getCategoriesAPI = async () => {
  try {
    const url = `${API_BASE}/admin-dashboard/api/categories/`;
    console.log('Get Categories API URL:', url);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    console.log('Get Categories API response:', data);
    return data;
  } catch (e) {
    console.log('Get Categories API error:', e);
    return null;
  }
};

// Admin: Create category
export const createCategoryAPI = async (category: { name: string }) => {
  try {
    const url = `${API_BASE}/admin-dashboard/api/categories/create/`;
    console.log('Create Category API URL:', url);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(category),
    });
    const data = await res.json();
    console.log('Create Category API response:', data);
    return data;
  } catch (e) {
    console.log('Create Category API error:', e);
    return null;
  }
};

// Admin: Delete category
export const deleteCategoryAPI = async (category_id: number) => {
  try {
    const url = `${API_BASE}/admin-dashboard/api/categories/${category_id}/delete/`;
    console.log('Delete Category API URL:', url);
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    console.log('Delete Category API response:', res.status);
    return res.status === 204;
  } catch (e) {
    console.log('Delete Category API error:', e);
    return false;
  }
};

// Admin: Get all users
export const getUsersAPI = async () => {
  try {
    const url = `${API_BASE}/admin-dashboard/api/users/`;
    console.log('Get Users API URL:', url);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    console.log('Get Users API response:', data);
    return data;
  } catch (e) {
    console.log('Get Users API error:', e);
    return null;
  }
};

// Admin: Create user
export const createUserAPI = async (user: any) => {
  try {
    const url = `${API_BASE}/admin-dashboard/api/users/create/`;
    console.log('Create User API URL:', url);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log('Create User API response:', data);
    return data;
  } catch (e) {
    console.log('Create User API error:', e);
    return null;
  }
};

// Admin: Delete user
export const deleteUserAPI = async (user_id: number) => {
  try {
    const url = `${API_BASE}/admin-dashboard/api/users/${user_id}/delete/`;
    console.log('Delete User API URL:', url);
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    console.log('Delete User API response:', res.status);
    return res.status === 204;
  } catch (e) {
    console.log('Delete User API error:', e);
    return false;
  }
};

// Admin: Get all skills
export const getSkillsAPI = async () => {
  try {
    const url = `${API_BASE}/admin-dashboard/api/skills/`;
    console.log('Get Skills API URL:', url);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    console.log('Get Skills API response:', data);
    return data;
  } catch (e) {
    console.log('Get Skills API error:', e);
    return null;
  }
};

// Admin: Create skill
export const createSkillAPI = async (skill: { name: string }) => {
  try {
    const url = `${API_BASE}/admin-dashboard/skills/create/`;
    console.log('Create Skill API URL:', url);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(skill),
    });
    const data = await res.json();
    console.log('Create Skill API response:', data);
    return data;
  } catch (e) {
    console.log('Create Skill API error:', e);
    return null;
  }
};

// Admin: Delete skill
export const deleteSkillAPI = async (skill_id: number) => {
  try {
    const url = `${API_BASE}/admin-dashboard/skills/${skill_id}/delete/`;
    console.log('Delete Skill API URL:', url);
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    console.log('Delete Skill API response:', res.status);
    return res.status === 204;
  } catch (e) {
    console.log('Delete Skill API error:', e);
    return false;
  }
};

// Authentication helper
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const logout = (): void => {
  localStorage.removeItem('user');
  window.location.href = '/login';
};