import { useNavigate, useLocation } from "react-router-dom";

const Navigation_Route_Cycle = [
  "/",
  "/backlog",
  "/estimation",
  "/categorisation",
  "/prioritisation",
  "/done",
];

export default function useNavigationHelper() {
  const navigate = useNavigate();
  const location = useLocation();

  const n = Navigation_Route_Cycle.length;

  const navigateHome = () => navigate("/");
  const navigateNext = () => {
    const idx = Navigation_Route_Cycle.indexOf(location.pathname);
    navigate(Navigation_Route_Cycle[(idx + 1) % n]);
  };
  const navigatePrev = () => {
    const idx = Navigation_Route_Cycle.indexOf(location.pathname);
    navigate(Navigation_Route_Cycle[(idx - 1 + n) % n]);
  };

  return {
    navigateHome,
    navigateNext,
    navigatePrev,
  };
}
