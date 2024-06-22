import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  return (
    <Container className="bg-background py-10 text-foreground">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary">
          Subscribe to Our Newsletter
        </h1>
        <p className="text-muted-foreground mt-4">
          Stay updated with the latest tech news, tutorials, and exclusive
          content.
        </p>
      </header>
      <section className="max-w-3xl mx-auto bg-card p-8 rounded-lg shadow-md">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-muted-foreground mb-2"
            >
              Full Name
            </label>
            <Input type="text" id="name" name="name" placeholder="John Doe" />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-muted-foreground mb-2"
            >
              Email Address
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="john.doe@example.com"
            />
          </div>
          <div className="text-center">
            <Button type="submit">Subscribe</Button>
          </div>
        </form>
      </section>
    </Container>
  );
};

export default Newsletter;
