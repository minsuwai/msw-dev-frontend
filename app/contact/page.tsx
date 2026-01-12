import { ContactForm } from "@/components/sections/contact-form";
import { Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // <--- This was missing!

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Get in Touch
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have a project in mind or just want to chat? I'd love to hear from
          you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
        {/* LEFT COLUMN: Contact Info */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              I am currently open for freelance projects and full-time
              opportunities. Feel free to reach out via email or connect on
              social media.
            </p>
          </div>

          <div className="space-y-4">
            <Card className="bg-card/50 backdrop-blur-sm border-white/10 hover:bg-card/80 transition-colors">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a
                    href="mailto:minsuwai.dev@gmail.com"
                    className="font-medium hover:text-primary"
                  >
                    minsuwai.dev@gmail.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-white/10 hover:bg-card/80 transition-colors">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Yangon, Myanmar</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect with me</h3>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" asChild>
                <Link href="https://github.com/minsuwai" target="_blank">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link
                  href="https://www.linkedin.com/in/minsuwai/"
                  target="_blank"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="https://x.com/Cody_Loop_69" target="_blank">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">X</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Form */}
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
