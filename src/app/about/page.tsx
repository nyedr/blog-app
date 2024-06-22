import Container from "@/components/ui/container";

const About = () => {
  return (
    <Container className="bg-background py-10 text-foreground">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary">About Us</h1>
      </header>
      <section className="max-w-4xl mx-auto bg-card sm:p-8 rounded-lg shadow-md">
        <p className="text-muted-foreground mb-6">
          Welcome to our Tech Blog! We are passionate about technology and
          committed to bringing you the latest trends, tutorials, and insights
          from the tech world.
        </p>

        <h2 className="text-2xl font-semibold text-primary mb-4">
          Our Mission
        </h2>
        <p className="text-muted-foreground mb-6">
          Our mission is to educate, inspire, and empower tech enthusiasts and
          professionals by providing high-quality, reliable, and up-to-date
          content. Whether you are a beginner or an expert, we aim to offer
          something valuable for everyone.
        </p>

        <h2 className="text-2xl font-semibold text-primary mb-4">
          What We Offer
        </h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
          <li>
            In-depth articles on programming languages, frameworks, and tools
          </li>
          <li>Tutorials and guides for beginners and advanced users</li>
          <li>Latest news and updates from the tech industry</li>
          <li>Interviews with industry experts and influencers</li>
          <li>Community forums for discussions and knowledge sharing</li>
        </ul>

        <h2 className="text-2xl font-semibold text-primary mb-4">Join Us</h2>
        <p className="text-muted-foreground">
          We invite you to join our community, contribute your knowledge, and
          learn from others. Together, we can stay ahead in the ever-evolving
          world of technology. Follow us on our social media channels and
          subscribe to our newsletter for the latest updates.
        </p>
      </section>
    </Container>
  );
};

export default About;
