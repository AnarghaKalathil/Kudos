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

// Login API
export const loginAPI = async (credentials: {
  email: string;
  username: string;
  password: string;
}): Promise<LoginResponse> => {
  await delay(1000);
  
  // Mock authentication logic
  const user = mockUsers.find(u => 
    u.email === credentials.email && u.username === credentials.username
  );
  
  if (user && credentials.password.length >= 6) {
    return {
      success: true,
      user
    };
  }
  
  return {
    success: false,
    message: "Invalid credentials"
  };
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
export const getUserProfileAPI = async (userId: string): Promise<User | null> => {
  await delay(300);
  
  return mockUsers.find(user => user.id === userId) || null;
};

// Give recognition API
export const giveRecognitionAPI = async (recognition: {
  toUserId: string;
  stars: number;
  comment: string;
  tags: string[];
  category: string;
  reviewerId: string;
}): Promise<{ success: boolean; message: string; recognitionId?: string }> => {
  await delay(800);
  
  // Mock validation
  if (recognition.stars < 1 || recognition.stars > 5) {
    return {
      success: false,
      message: "Stars must be between 1 and 5"
    };
  }
  
  if (recognition.comment.length < 10) {
    return {
      success: false,
      message: "Comment must be at least 10 characters"
    };
  }
  
  // Mock successful creation
  const newRecognition: Recognition = {
    id: Date.now().toString(),
    fromUser: mockUsers[0], // Current user
    toUser: mockUsers.find(u => u.id === recognition.toUserId)!,
    stars: recognition.stars,
    comment: recognition.comment,
    tags: recognition.tags,
    category: recognition.category,
    status: 'pending',
    reviewerId: recognition.reviewerId,
    createdAt: new Date().toISOString()
  };
  
  mockRecognitions.push(newRecognition);
  
  return {
    success: true,
    message: "Recognition submitted successfully and sent for review",
    recognitionId: newRecognition.id
  };
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