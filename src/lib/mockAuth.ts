export type UserRole = "owner" | "engineer" | "worker";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  farmId: string;
  farmName: string;
  avatarColor: string;
}

const STORAGE_KEY = "galla_user";

const PRESET_USERS: Record<UserRole, User> = {
  owner: {
    id: "u_owner_1",
    name: "الحاج ابراهيم",
    email: "owner@galla.ma",
    role: "owner",
    farmId: "farm_1",
    farmName: "مزرعة الوادي الأخضر",
    avatarColor: "#1F3A2E",
  },
  engineer: {
    id: "u_eng_1",
    name: "المهندسة سلمى",
    email: "engineer@galla.ma",
    role: "engineer",
    farmId: "farm_1",
    farmName: "مزرعة الوادي الأخضر",
    avatarColor: "#C98A3A",
  },
  worker: {
    id: "u_worker_1",
    name: "يوسف",
    email: "worker@galla.ma",
    role: "worker",
    farmId: "farm_1",
    farmName: "مزرعة الوادي الأخضر",
    avatarColor: "#5B8C3A",
  },
};

export function login(role: UserRole): User {
  const user = PRESET_USERS[role];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getCurrentUser(): User | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}
