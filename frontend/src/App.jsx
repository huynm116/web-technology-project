import { useEffect, useState } from "react";
import "./App.css";
import roomService from "./services/room";

function newEmptyFormData() {
    console.log("Creating new form data...");
    return { title: "", author: "", category: "", description: "", image: "" };
  }
  
function App() {
    const [rooms, setRooms] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState(null);
  
    // If I pass newEmptyFormData() directly to useState, it will be called on
    // every time App renders.
    // const [formData, setFormData] = useState(newEmptyFormData());
  
    // Instead, React supports lazy initialization. I can pass a function to
    // useState so it will only be called on first render.
    const [formData, setFormData] = useState(newEmptyFormData);
  
    const [editId, setEditId] = useState(null);
  
    // Call API to get all blogs on first render
    useEffect(() => {
      const callApi = async () => {
        try {
          const data = await roomService.getAll();
          // Normally, data is enough to pass to setBlogs. However, backend in
          // class's exercise returns data as { data: [blogs], status: [status] }.
          const returnedRooms = data.data;
          setBooks(returnedRooms);
        } catch (error) {
          alert("Failed to get rooms!");
        }
      };
  
      callApi();
    }, []);
  
    const handleChange = (event) => {
      // Create new object with same properties as formData
      const newFormData = Object.assign({}, formData);
      newFormData[event.target.name] = event.target.value;
      setFormData(newFormData);
  
      // Alternative way to do all of above
      // Here, I use spread operator `...` to create new object with old data.
      // Then, I overwrite old property by appending updated key-value pair to end.
      // setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (event) => {
      // I use form to have browser handle validation. However, I don't want
      // default behavior of refreshing page on submit. So, I prevent default.
      event.preventDefault();
  
      if (formType === "create") {
        try {
          const data = await roomService.create(formData);
          const returnedRoom = data.data;
          console.log("Returned room after creating: ", returnedRoom);
          // returnedBlog should be used to render as backend can process data and
          // normalize it. Shouldn't use formData as it isn't normalized.
          const newRooms = books.concat(returnedRoom);
          setBooks(newRooms);
          setFormData(newEmptyFormData());
          alert("Room created!");
        } catch (error) {
          alert("Failed to create room!");
        }
      }
  
      if (formType === "update") {
        try {
          const data = await roomService.update(editId, formData);
          const returnedRoom = data.data;
          console.log("Returned room after updating: ", returnedRoom);
          // returnedBlog should be used to render as backend can process data and
          // normalize it. Shouldn't use formData as it isn't normalized.
          // However, backend in class's exercise doesn't return updated blog. It
          // returns old blog. So, I have to update it manually =))
          const newRooms = rooms.map((room) => {
            if (room._id === returnedRoom._id) {
              return { _id: returnedRoom._id, ...formData }; // New blog
            } else {
              return room;
            }
          });
          setRooms(newRooms);
          alert("Room updated!");
        } catch (error) {
          alert("Failed to update Room!");
        }
      }
    };
  
    const handleClickEdit = async (id) => {
      setShowForm(true);
      setFormType("update");
      // Populate form with data from blog
      setFormData(rooms.find((room) => room._id === id));
      // Set editId for handleSubmit to use
      setEditId(id);
    };
  
    const handleClickDelete = async (id) => {
      try {
        const data = await roomService.remove(id);
        const returnedRoom = data.data;
        // Delete blog from blogs array and rerender locally
        const newBooks = rooms.filter((room) => blog._id !== returnedRoom._id);
        setBooks(newRooms);
        alert("Room deleted!");
      } catch (error) {
        alert("Failed to delete room!");
      }
    };
  
    console.log("Form data: ", formData);
    return (
      <>
        <h1>Room Management</h1>
        <button
          onClick={() => {
            // Toggle showForm
            setShowForm(!showForm);
            // Toggle formType
            setFormType(!formType ? "create" : null);
            // Reset form data in both cases
            setFormData(newEmptyFormData());
          }}
        >
          {/* Display different text depending on showForm */}
          {showForm ? "Back to home" : "New room"}
        </button>
  
        {/* Display different heading depending on formType */}
        {showForm && formType === "create" && <h2>New room</h2>}
        {showForm && formType === "update" && <h2>Update room</h2>}
        
        {/* Display form or books depending on showForm, if showForm = true ( create or updat (not null)) -> create or update form, if showForm = false (null) -> show list of books */}
        {showForm == false && 
        <table id="header">
          <tr>
                    <td id="tab-title">Title</td>
                    <td id="tab-author">Author</td>
                    <td id="tab-category">Category</td>
                    <td id="tab-description">Description</td>
                    <td id="tab=image">Image</td>
                    <td id="tab-action">Action</td>
                  </tr>
          </table>}
        {showForm ? (
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
              gap: "4px",
            }}
            onSubmit={handleSubmit}
          >
            <input
              required
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
            />
            <input 
              required
              type="text"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
            />
            <input
              required
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
            />
            <button type="submit" style={{ marginTop: "20px" }}>
              Submit
            </button>
          </form>
        ) : (
          //map function: with each book in books, return a div with book's info
          rooms.map((room) => {
            return (
              <div key={room._id}>  
                <table>
                  <tr>
                    <td id="tab-title">{room.title}</td>
                    <td id="tab-author">{room.author}</td>
                    <td id="tab-category">{room.category}</td>
                    <td id="tab-description">{room.description}</td>
                    <td id="tab=image"><img
                  src={room.image}
                  alt={`Thumbnail for ${room.title}`}
                  style={{ height: "250px", marginTop: "10px", marginBottom: "5px"
                }}
                    /></td>
                    <td id="tab-action">
                      <button
                        onClick={() => {
                          handleClickEdit(room._id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {  
                          handleClickDelete(room._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </table>
              </div>
            );
            
          })
        )
        }
      </>
    );
  }
  export default App
  
  