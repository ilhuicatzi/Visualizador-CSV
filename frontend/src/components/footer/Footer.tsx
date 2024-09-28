import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
function Footer() {
  return (
    <footer className="w-full flex justify-center px-10 mt-2">
      <section className="container my-5 flex justify-between sm:flex-row flex-col items-center">
        <article>
          <p className="text-sm font-inconsolata font-medium text-muted-foreground hover:text-primary mb-1">
            <a href="mailto:g.ilhuicatzi@gmail.com" target="_blank">g.ilhuicatzi@gmail.com</a>
          </p>
          <p className="flex gap-3 items-center justify-center mb-2">
            <button
              aria-label="github"
              onClick={() =>
                window.open("https://github.com/ilhuicatzi", "_blank")
              }
            >
              <GitHubLogoIcon className="w-5 h-5 text-muted-foreground hover:text-current dark:hover:scale-125 hover:scale-125  inline-block transition duration-300" />
            </button>
            <button
              aria-label="linkedin"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/gonzalo-ilhuicatzi-787a901a1",
                  "_blank"
                )
              }
            >
              <LinkedInLogoIcon className="w-5 h-5 text-muted-foreground hover:text-blue-600 dark:hover:text-current dark:hover:scale-125 hover:scale-125  inline-block transition duration-300"  />
            </button>
          </p>
        </article>
        <article className="text-xs sm:text-sm font-light dark:text-zinc-50">
          Copyright © 2024 Gonzalo
        </article>
      </section>
    </footer>
  );
}

export default Footer;
