import { MainNav } from "@/components/main-nav";
import NavControl from "./nav-control";
import Container from "./ui/container";
import { MobileSidebar } from "./mobile-sidebar";

function SiteHeader() {
  return (
    <header className="bg-background py-1 sticky top-0 z-40 border-b">
      <Container className="h-16 items-center space-x-4 sm:justify-between sm:space-x-0 hidden min-[800px]:flex">
        <MainNav />
        <NavControl />
      </Container>
      <Container className="max-[800px]:px-[calc(10vw/2)] flex items-center justify-between h-16 py-2 min-[800px]:hidden">
        <MobileSidebar />
        <NavControl />
      </Container>
    </header>
  );
}

export default SiteHeader;
