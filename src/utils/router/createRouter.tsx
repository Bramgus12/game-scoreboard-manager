import HomePage from "pages/RootPage/subPages/HomePage";
import RootPage from "pages/RootPage";
import { createBrowserRouter, LoaderFunctionArgs, redirect } from "react-router-dom";
import ScoreBoardPage from "pages/RootPage/subPages/ScoreBoardPage";
import LoginPage from "pages/AuthPage/subPages/LoginPage";
import AuthPage from "pages/AuthPage";
import RegisterPage from "pages/AuthPage/subPages/RegisterPage";
import { UserResponse } from "@supabase/supabase-js";

function createRouter(
    logoutFunction: () => Promise<void>,
    userData?: UserResponse["data"],
) {
    function protectedLoader({ request }: LoaderFunctionArgs) {
        if (userData?.user == null) {
            const params = new URLSearchParams();
            params.set("from", new URL(request.url).pathname);
            return redirect("/auth/login?" + params.toString());
        }
        return null;
    }

    function unAuthLoader() {
        if (userData?.user != null) {
            return redirect("/");
        }
        return null;
    }

    async function logoutAction() {
        await logoutFunction();
        return redirect("/auth/login");
    }

    return createBrowserRouter([
        {
            path: "/",
            loader: protectedLoader,
            element: <RootPage />,
            children: [
                {
                    element: <HomePage />,
                    path: "/",
                },
                {
                    path: "/scoreboard",
                    children: [
                        {
                            path: "/scoreboard",
                            element: <ScoreBoardPage />,
                        },
                        {
                            path: "/scoreboard/:id",
                            element: <ScoreBoardPage />,
                        },
                    ],
                },
            ],
        },
        {
            path: "/auth",
            element: <AuthPage />,
            children: [
                {
                    element: <LoginPage />,
                    path: "/auth/login",
                    loader: unAuthLoader,
                },
                {
                    element: <RegisterPage />,
                    path: "/auth/register",
                    loader: unAuthLoader,
                },
            ],
        },
        {
            path: "/logout",
            action: logoutAction,
        },
    ]);
}

export default createRouter;
