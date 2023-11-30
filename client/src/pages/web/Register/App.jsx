import Register from "./Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div style={{marginTop : '-3.5rem'}}>
            <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register/>} />
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App