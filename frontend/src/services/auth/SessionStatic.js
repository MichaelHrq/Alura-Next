import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authService } from "./AuthService";

function useSession() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    authService
      .getSession()
      .then((response) => {
        setSession(response);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(setLoading(false));
  }, []);

  return {
    data: { session },
    loading,
    error,
  };
}

export function withSessionHOC(Component) {
  return function Wrapper(props) {
    const session = useSession();
    const router = useRouter();
    if (session.error) router.push("/?error=404");
    const modifiedProps = {
      ...props,
      session: session.data.session,
    };

    return <Component {...modifiedProps} />;
  };
}
