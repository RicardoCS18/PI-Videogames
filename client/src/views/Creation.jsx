import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { setGenres } from "../redux/actions";

const Creation = () => {
    
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        name: "",
        description: "",
        platforms: [],
        image: "",
        released: "",
        rating:"",
        genre:[]
    });
    const [error, setError] = useState({})
    const genres = useSelector(state => state.allGenres);
    const [inputsToCheck, setInputsToCheck] = useState({});

    const createDisabled = Object.values(form).some(val=> val.length ===0) || Object.values(error).some((val) => val !== "");
    
    useEffect(() => {
        if(genres.length===0){
         axios.get("http://localhost:3001/genres")
             .then(({ data }) => dispatch(setGenres(data))) 
             .catch((error) => window.alert(error.message));
         console.log("fetching genres")}
     }, []);

    const validate = (form) => {
        const error = {}
        if(form.name.trim()==="") error.name="Please provide a name for the game"
        
        if(form.name && !/^[a-zA-Z0-9\s]{1,40}$/.test(form.name)) error.name="The length of the name must be a maximum of 40 characters and cannot contain special characters"
        
        if(form.image === "") error.image="Please include an image for referencing the game"
        
        if(form.description.length===0) error.description="A description for the game is required"
        
        if(form.description && form.description.lengt>500) error.description="The length of the description must be a maximum of 500 characters"
        
        if(form.platforms.length === 0) error.platforms="Select at least one platform that supports the game" 
        
        if(form.released==="") error.released="Please specify the release date of the game"
        
        if(form.rating < 0 || form.rating>5 || form.rating==="") error.rating="Enter a rating between 0 and 5"
        
        if(form.genre.length===0) error.genre="Select the genre(s) to which the game belongs"
        
        
      return error
    }

    const genreSelectionHandler = (e) => {
        const { checked, name, value } = e.target;
        if (checked) {
          setForm({ ...form, [name]: [...form[name], value] });
        } else {
            let validation = validate({...form, [name]:form[name].filter((ID) => ID !== value)})
            setError(validation);
            setForm({ ...form, [name]: form[name].filter((ID) => ID !== value) });
        }

      };
      
    const changeHandler = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]:value})
        
        let validation = validate({...form, [name]:value})
        setError(validation);
    }
    const clickHandler = (e) => {
        const {name,value} = e.target;
        setInputsToCheck({ ...inputsToCheck, [name]: true });
        let validation = validate({...form, [name]:value})
        setError(validation);
    }
    const submitHandler = () => {
    const validation = validate(form);
    if (Object.keys(validation).length === 0) {
        axios.post("http://localhost:3001/videogames", form)
            .then(response => {
                // Handle the successful response here
                window.alert("Post successful", response.data);
            })
            .catch(error => {
                // Handle errors here
                console.error("Error posting data", error);
            });
    }
};
    return (
        <form onSubmit={submitHandler}>
            <label htmlFor="name">Name</label>
            <input type="text" value={form.name}  name="name" onClick={clickHandler} onChange={changeHandler} /> {inputsToCheck.name && error.name && <h5>{error.name}</h5>}
            <br />
            <label htmlFor="image">Image</label>
            <input type="text" value={form.image}  name="image" onClick={clickHandler} onChange={changeHandler} /> {inputsToCheck.image && error.image && <h5>{error.image}</h5>}
            <br />
            <label htmlFor="description">Description</label>
            <input type="text" value={form.description}  name="description" onClick={clickHandler} onChange={changeHandler} /> {inputsToCheck.description&& error.description &&<h5>{error.description}</h5>}
            <br />
            <label htmlFor="platforms">Platforms</label>
            <input type="text" value={form.platforms}  name="platforms" onClick={clickHandler} onChange={changeHandler} /> {inputsToCheck.platforms && error.platforms && <h5>{error.platforms}</h5>}
            <br />
            <label htmlFor="released">Released</label>
            <input type="date" value={form.released}  name="released"  onClick={clickHandler} onChange={changeHandler} /> {inputsToCheck.released && error.released && <h5>{error.released}</h5>}
            <br />
            <label htmlFor="rating">Rating</label>
            <input
                type="number"
                step="0.01"
                min="0"
                max="5"
                value={form.rating}
                name="rating"
                onClick={clickHandler}
                onChange={changeHandler}
            /> {inputsToCheck.rating && error.rating && <h5>{error.rating}</h5>}
            <br />
            <label htmlFor="genre">Genre</label>
            <div>
                {genres.map((genre) => (
                <label key={genre.id}>
                <input
                    type="checkbox"
                    name="genre"
                    value={genre.id}
                    onClick={clickHandler}
                    onChange={genreSelectionHandler}
                />
                {genre.name}
                </label>
            ))}
            </div>
            {inputsToCheck.genre && error.genre && <h5>{error.genre}</h5>}
            <br />
            <button type="submit" disabled={createDisabled} >Create</button>
        </form>
    )
}
export default Creation