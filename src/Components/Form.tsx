import React, { useReducer,useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { TInputs,Action,FormProps} from "./types";



const initialState: TInputs = {
  avatar: { file: null, previewUrl: null },
  name: "",
  email: "",
  githubUsername: "",
};

// Reducer Function
function reducer(state: TInputs, action: Action): TInputs {
  switch (action.type) {
    case "setAvatar":
      return { ...state, avatar: action.payload };
    case "removeAvatar":
      return { ...state, avatar: { file: null, previewUrl: null } }
    case "setName":
      return { ...state, name: action.payload };
    case "setEmail":
      return { ...state, email: action.payload };
    case "setGithubUsername":
      return { ...state, githubUsername: action.payload };
    default:
      return state;
  }
}



const Form: React.FC<FormProps> = ({ handleUserData }) => {
  const [{ avatar, name, email, githubUsername }, dispatch] = useReducer<
    React.Reducer<TInputs, Action>
  >(reducer, initialState);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TInputs>({
    defaultValues: initialState, // Set default values
  });

  const onHandleSubmit: SubmitHandler<TInputs> = (data) => {
    console.log("Form submitted", data);
    if (!avatar || !name || !email || !githubUsername) return;

    const id = crypto.randomUUID(); // Generate unique ID
    const uuid = id;
    const shortId = uuid.split("-")[0]; // Extract the part before the first hyphen
    console.log(shortId); // Output: "c363d83d"

    const newUser = {
      id: shortId,
      avatar: avatar.file,
      avatarPreview: avatar.previewUrl,
      name,
      email,
      githubUsername,
    };
    console.log(newUser);
    handleUserData(newUser); // Pass new user data to parent
  };


  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0]; // Get the first dropped file
    if (file) {
      // Validate file size (e.g., max 500KB)
      if (file.size > 500 * 1024) {
        alert("File size exceeds 500KB. Please upload a smaller file.");
        return;
      }
      // Validate file type (e.g., JPG, PNG)
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("Invalid file type. Please upload a JPG or PNG image.");
        return;
      }
      // Generate a preview URL
      const previewUrl = URL.createObjectURL(file);
      dispatch({ type: "setAvatar", payload: { file, previewUrl } });
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onHandleSubmit)}
        className=" lg:w-[32rem] md:w-[22rem] space-y-4 relative z-20"
        noValidate
      >
        {/* Avatar Upload */}
        <label htmlFor="avatar">
          Upload Avatar
          <div
            className={`border-dashed border-2 p-4 mt-2 rounded-lg text-center hover:bg-Neutral700 bg-Neutral400 transition-all ${
              errors.avatar ? "border-red-500" : "border-Neutral500"
              }`}
                        onDragOver={(e) => e.preventDefault()} // Prevent default behavior
            onDrop={handleFileDrop} // Handle file drop

          >
            {avatar?.previewUrl ? (
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={avatar.previewUrl}
                  alt="Avatar preview"
                  className="h-16 w-16 rounded-lg"
                />
                <div className="flex space-x-4">
                  {/* Change Image Button */}
                  <button
                    type="button"
                    className="avatarBtn"
                  onClick={() => fileInputRef.current?.click()}
                  >
                    Change Image
                  </button>
                  {/* Remove Image Button */}
                  <button
                    type="button"
                    className="avatarBtn"
                    onClick={() => dispatch({ type: "removeAvatar" })}
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  id="avatar"
                  accept=".jpg, .png"
                    className="hidden"
                       ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0]; // Get the selected file
                    if (file) {
                      // Validate file size (e.g., max 500KB)
                      if (file.size > 500 * 1024) {
                        alert("File size exceeds 500KB. Please upload a smaller file.");
                        return;
                      }
                      // Validate file type (e.g., JPG, PNG)
                      if (!["image/jpeg", "image/png"].includes(file.type)) {
                        alert("Invalid file type. Please upload a JPG or PNG image.");
                        return;
                      }
                      // Generate a preview URL
                      const previewUrl = URL.createObjectURL(file);
                      dispatch({ type: "setAvatar", payload: { file, previewUrl } });
                    }
                  }}
                />
                <div className="h-10 w-10 bg-Neutral600 rounded-lg mx-auto flex items-center justify-center">
                  <img
                    src="/assets/images/icon-upload.svg"
                    alt="Upload icon"
                    className={`mx-auto mb-2 z-20 relative ${
                      errors.avatar && "fill-red-500"
                    }`}
                  />
                </div>
                <p className="text-sm text-gray-500">Drag and drop or click to upload</p>
              </>
            )}
          </div>
          <span className="text-xs text-gray-500 mt-1 block">
            <img
              src="/assets/images/icon-info.svg"
              alt="Info icon"
              className="inline-block mr-1"
            />
            {errors.avatar ? (
              <span className="text-xs text-red-500">
                File is required. Upload a photo under 500KB.
              </span>
            ) : (
              "Upload your photo (JPG or PNG, max size: 500KB)."
            )}
          </span>
        </label>

        {/* Full Name */}
        <label htmlFor="name">
          Full Name
          <input
            type="text"
            id="name"
            {...register("name", { required: true, maxLength: 20 })}
            placeholder="Enter your full name"
            className={` ${
              errors.name ? "border-red-500" : "border-Neutral500"
            }`}
            onChange={(e) =>
              dispatch({ type: "setName", payload: e.target.value })
            }
          />
          {errors.name && (
            <span className="text-xs text-red-500">
              Please enter a valid name.
            </span>
          )}
        </label>

        {/* Email Address */}
        <label htmlFor="email">
          Email Address
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            placeholder="example@email.com"
            className={` ${
              errors.email ? "border-red-500" : "border-Neutral500"
            }`}
            onChange={(e) =>
              dispatch({ type: "setEmail", payload: e.target.value })
            }
          />
          {errors.email && (
            <span className="text-xs text-red-500">
              Please enter a valid email address.
            </span>
          )}
        </label>

        {/* GitHub Username */}
        <label htmlFor="githubUsername">
          GitHub Username
          <input
            type="text"
            id="githubUsername"
            {...register("githubUsername", { required: true, maxLength: 30 })}
            placeholder="@yourusername"
            className={` ${
              errors.githubUsername ? "border-red-500" : "border-Neutral500"
            }`}
            onChange={(e) =>
              dispatch({
                type: "setGithubUsername",
                payload: e.target.value,
              })
            }
          />
          {errors.githubUsername && (
            <span className="text-xs text-red-500">
              Please enter a valid GitHub username.
            </span>
          )}
        </label>

        {/* Submit Button */}
        <button type="submit">Generate My Ticket</button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default Form;
