import { signUp } from "../action";

export default function Page() {
    //  const [state, action, pending] = useActionState(signUp, undefined)

    //  if (state?.errors) {
    //     alert(state.errors)
    //  }
    return (
        <>
            <div className="title p-5">Sign Up</div>
            <form action={signUp} className="flex flex-col gap-10">
                <input type="text" name="username" placeholder="Username" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Sign up</button>
        
            </form>
        </>
    )
    
}