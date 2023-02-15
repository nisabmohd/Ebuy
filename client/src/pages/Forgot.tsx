import { useEffect } from "react";

export default function Forgot({
  setHideNav,
}: {
  setHideNav: (val: boolean) => void;
}) {
  useEffect(() => {
    setHideNav(true);
  }, []);
  return <div>Forgot</div>;
}
