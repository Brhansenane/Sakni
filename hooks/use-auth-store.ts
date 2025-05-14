import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserType = "renter" | "owner";

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  userType: UserType;
  phone?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  userType: UserType | null;
  login: (email: string, password: string, userType: UserType) => Promise<boolean>;
  register: (name: string, email: string, password: string, userType: UserType) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      userType: null,
      login: async (email: string, password: string, userType: UserType) => {
        // In a real app, this would make an API call to authenticate
        // For demo purposes, we'll simulate a successful login
        
        // Mock validation
        if (!email || !password) {
          return false;
        }
        
        // Mock user data based on login type
        let userData: User;
        
        if (userType === "owner") {
          userData = {
            id: "o1",
            email,
            name: "Property Owner",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
            userType: "owner",
            phone: "+1 (555) 123-4567",
          };
        } else {
          userData = {
            id: "r1",
            email,
            name: "Alex Johnson",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
            userType: "renter",
            phone: "+1 (555) 987-6543",
          };
        }
        
        set({ 
          isAuthenticated: true,
          user: userData,
          userType
        });
        
        return true;
      },
      register: async (name: string, email: string, password: string, userType: UserType) => {
        // In a real app, this would make an API call to register
        // For demo purposes, we'll simulate a successful registration
        
        // Mock validation
        if (!name || !email || !password) {
          return false;
        }
        
        const userData: User = {
          id: Math.random().toString(36).substring(2, 9),
          email,
          name,
          userType,
          avatar: userType === "owner" 
            ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        };
        
        set({ 
          isAuthenticated: true,
          user: userData,
          userType
        });
        
        return true;
      },
      logout: () => {
        set({ 
          isAuthenticated: false,
          user: null,
          userType: null
        });
      },
      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ 
            user: { ...currentUser, ...userData }
          });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);