import { UserProvider } from "../components/UserContext";
const Noop = ({ children }) => <>{children}</>;

export default function App({ Component, pageProps }) {
  const Auth = Component.Auth || Noop;

  return (
    <UserProvider>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </UserProvider>
  );
}
