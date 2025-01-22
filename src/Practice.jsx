import  { useState } from 'react'

const Practice = () => {
  return (
    <div>
      {/* <Counter/> */}
      <Profile/>
    </div>
  )
}

export default Practice




export const Counter = () => {
  const [todoItem, setTodoItem] = useState("")
  const [addItem,setAddItem] = useState([])
  function handleAddItem(e) {
    e.preventDefault()
    setAddItem(prevState => [...prevState, todoItem])
    setTodoItem('')
  }
  return (
    <div>
      <form  onSubmit={handleAddItem}>
        <input type="text" value={todoItem} onChange={(e)=>setTodoItem(e.target.value)}  />
      </form>
      <ul>
        {addItem.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}


export const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    city: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Profile Submitted:", profile);
    setProfile({ name: "", age: "", city: "" }); // Reset state
    e.target.reset(); // Reset the form
    e.target[0].focus(); // Focus on the first input
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={profile.name}
          placeholder="Name"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="age"
          value={profile.age}
          placeholder="Age"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="city"
          value={profile.city}
          placeholder="City"
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        <li>Name: {profile.name || "N/A"}</li>
        <li>Age: {profile.age || "N/A"}</li>
        <li>City: {profile.city || "N/A"}</li>
      </ul>
    </>
  );
};
