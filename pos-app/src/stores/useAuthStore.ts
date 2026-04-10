import { create } from 'zustand';

type User = {
  firstName: string;
  lastName: string;
  role: string;
};

interface UseAuthStore {
  user: User;
  setAuth: ({ firstName, lastName, role }: User) => void;
}

export const useAuthStore = create<UseAuthStore>((set) => ({
  user: {
    firstName: '',
    lastName: '',
    role: '',
  },
  setAuth: ({ firstName, lastName, role }) => {
    set({
      user: {
        firstName,
        lastName,
        role,
      },
    });
  },
}));
