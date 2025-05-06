import { MdOutlineBakeryDining } from "react-icons/md";
import { StaggeredAnimationWrapper } from "../../component/AnimationWrapper/StaggeredAnimationWrapper";
import { AnimationWrapper } from "../../component/AnimationWrapper/AnimationWrapper";
import { Form } from "../../component/form/Form";
import { Input } from "../../component/form/Input";
import { Button } from "../../component/form/Button";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/features/hook";
import { setUser } from "../../redux/features/auth/authSlice";

const Login = () => {
    const [userLogin, { isLoading }] = useLoginMutation();
    const navigate = useNavigate(); // Import useNavigate from react-router-dom
    const dispatch = useAppDispatch(); // Import useAppDispatch from your Redux store
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userName = formData.get("userName"); // Changed to userName
        const password = formData.get("password");
        const credentials = { userName, password }; // Updated to match API format
        userLogin(credentials)
            .unwrap()
            .then((response) => {
                dispatch(
                    setUser({
                        user: response.user,
                        token: response.accessToken,
                        refreshToken: response.refreshToken,
                    })
                );
                console.log("Login successful:", response);
                toast.success("Login successful!");
                navigate("/dashboard"); // Redirect to dashboard after successful login
            })
            .catch((error) => {
                console.error("Login failed:", error);
            });
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Side */}
            <AnimationWrapper animationType="slideLeft">
                <div className="md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-700 text-gray-100 p-10">
                    <div className="flex justify-center items-center">
                        <MdOutlineBakeryDining size={40} className="mr-2" />
                        <span className="text-2xl font-bold">Bloom&Tech</span>
                    </div>
                    <AnimationWrapper animationType="fadeUp" delay={0.2}>
                        <h1 className="text-4xl font-bold mb-4 text-center">
                            Welcome Back
                        </h1>
                    </AnimationWrapper>
                    <AnimationWrapper animationType="fadeUp" delay={0.4}>
                        <p className="text-lg text-gray-300 text-center max-w-sm">
                            Log in to access your dashboard and manage your
                            account effortlessly. We're glad to see you again!
                        </p>
                    </AnimationWrapper>
                </div>
            </AnimationWrapper>

            {/* Right Side */}
            <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-8">
                <AnimationWrapper animationType="slideRight">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                            Login to Your Account
                        </h2>
                        <StaggeredAnimationWrapper selector="div, button, p">
                            <Form onSubmit={handleSubmit}>
                                <Input
                                    id="userName"
                                    name="userName"
                                    type="text"
                                    label="Username or Email"
                                    placeholder="Enter your username or email"
                                    defaultValue="react@test.com"
                                />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Password"
                                    placeholder="Enter your password"
                                    defaultValue="playful009"
                                />
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? "Logging in..." : "Login"}
                                </Button>
                            </Form>
                            <p className="mt-5 text-sm text-center text-gray-600">
                                Don't have an account?{" "}
                                <a
                                    href="#"
                                    className="text-gray-800 font-semibold hover:underline"
                                >
                                    Sign up
                                </a>
                            </p>
                        </StaggeredAnimationWrapper>
                    </div>
                </AnimationWrapper>
            </div>
        </div>
    );
};

export default Login;
