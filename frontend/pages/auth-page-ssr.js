import { authService } from "../src/services/auth/AuthService"
import { TokenService } from "../src/services/auth/TokenService"

export async function getServerSideProps(ctx) {
  try {
    const session = await authService.getSession(ctx)
    return {
      props: {
        token: TokenService.get(ctx),
        session,
      },
    }
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/?error=401",
      },
    }
  }
}

function AuthPageSSR(props) {
  return (
    <div>
      <h1>Auth Page Server Side Render</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}

export default AuthPageSSR
