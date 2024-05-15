interface User {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
}

interface Register {
  email: string;
  name: string;
  password: string;
}

interface Login {
  email: string;
  password: string;
}
