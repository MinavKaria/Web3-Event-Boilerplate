import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing";
import Layout from "../pages/Layout";
import SmartContractInteraction from "../pages/Contract";
import Trail from "../pages/Trail";
import IPFSupload from "../pages/IPFSupload";

const router=createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                path:'/',
                element:<Landing/>
            },
            {
                path:'/contract',
                element:(
                    <>
                        <SmartContractInteraction/>
                    </>
                )
            },
            {
                path:'/trail',
                element:(
                    <>
                        <Trail/>
                    </>
                )
            },
            {
                path:"/ipfs-upload",
                element:(
                    <>
                        <IPFSupload/>
                    </>
                )
            }
        ]
    },
    {
        path:"/signup",
        element:(
            <>
                <h1>Signup Page</h1>
            </>
        )
    },
    {
        path:"/login",
        element:(
            <>
                <h1>Login Page</h1>
            </>
        )
    },
    {
        path:"*",
        element:(
            <>
                <h1>404 Page not found</h1>
            </>
        )
    }
])

export default router;