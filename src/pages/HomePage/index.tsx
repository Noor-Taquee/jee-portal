import { useUser } from "../../hooks/useUser";

import NoUserContent from "./FeaturePage";
import Content from "./HomeContent";

export default function HomePage() {
  const { user } = useUser();

  return user ? <Content /> : <NoUserContent />;
}
