import {fetchDataAllProduct,fetchDataProductById } from "../redux/reducer";
import { useAppDispatch } from "../redux/store";

function HomePage() {
    // const dispatch = useAppDispatch()
    // const value = dispatch(fetchDataProductById({
    //     id:49,
    //     token: document.cookie.split("=")[1],
    // }))
    // console.log(value)
    return (<div>
        <h1>Home Page</h1>
        
    </div>  );
}

export default HomePage;