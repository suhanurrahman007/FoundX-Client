import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/src/config/site";
import { title, subtitle } from "@/src/components/primitives";
import { GithubIcon } from "@/src/components/icons";
import Landing from "@/src/components/modules/home/Landing";

export default function Home() {
  return (
    <>
      <div>
        <Landing />
      </div>
    </>
  );
}
