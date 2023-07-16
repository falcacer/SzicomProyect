export type Answer = {
  id: string;
  question: string;
  user: string;
  content: string;
  created: string;
};

export type Question = {
  id: string;
  user: string;
  title: string;
  content: string;
  created: string;
};

export type User = {
  id: string;
  username: string;
  password: string;
};
