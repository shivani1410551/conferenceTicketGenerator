// Define the User Data Type
export interface UserData {
  id: string;
  avatar: File | null;
  avatarPreview: string | null;
  name: string;
  email: string;
  githubUsername: string;
}
export type TicketUserData = {
  avatar?: File | null; // Optional avatar file
  name: string;
  email: string;
  githubUsername: string;
  id: string;
};

export type TInputs = {
  avatar: { file: File | null; previewUrl: string | null };
  name: string;
  email: string;
  githubUsername: string;
};

export type Action =
  | { type: "setAvatar"; payload: { file: File; previewUrl: string } }
  | { type: "removeAvatar" }
  | { type: "setName"; payload: string }
  | { type: "setEmail"; payload: string }
  | { type: "setGithubUsername"; payload: string };

  export interface FormProps {
  handleUserData: (user: {
    id: string;
    avatar: File | null;
    avatarPreview: string | null;
    name: string;
    email: string;
    githubUsername: string;
  }) => void;
}
