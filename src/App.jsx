import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import { Toaster } from "sonner";

function App() {
    return (
        <div>
            <RouterProvider router={router}></RouterProvider>
        </div>
    );
}

export default App;
