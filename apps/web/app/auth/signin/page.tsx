import { signIn } from "../action";

export default function Page() {
    //  const [state, action, pending] = useActionState(signIn, undefined)

    //  if (state?.errors) {
    //     alert(state.errors)
    //  }
    return (
        <>
            <div className="title p-5">Sign In</div>
            <form action={signIn} className="flex flex-col gap-10">
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Login</button>
        
            </form>
        </>
    )
    
}