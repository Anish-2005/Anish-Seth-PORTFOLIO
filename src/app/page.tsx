import { SinglePagePortfolio } from "@/app/SinglePagePortfolio";

export const dynamic = "force-static";
export const revalidate = false;

export default function Home() {
  return <SinglePagePortfolio />;
}
