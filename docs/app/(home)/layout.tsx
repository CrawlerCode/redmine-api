import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import { getApiHomeUrl } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        { text: "Client", url: "/docs/client", active: "nested-url" },
        { text: "React", url: "/docs/react", active: "nested-url" },
        { text: "API Reference", url: getApiHomeUrl() },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
