import { ArrowUpRight } from "lucide-react";

const members = [
  {
    name: "Liam Brown",
    role: "Founder - CEO",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=900&auto=format&fit=crop",
    link: "#",
  },
  {
    name: "Elijah Jones",
    role: "Co-Founder - CTO",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=900&auto=format&fit=crop",
    link: "#",
  },
  {
    name: "Isabella Garcia",
    role: "Sales Manager",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=900&auto=format&fit=crop",
    link: "#",
  },
  {
    name: "Henry Lee",
    role: "UX Engineer",
    avatar:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=900&auto=format&fit=crop",
    link: "#",
  },
  {
    name: "Ava Williams",
    role: "Interaction Designer",
    avatar:
      "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=900&auto=format&fit=crop",
    link: "#",
  },
  {
    name: "Olivia Miller",
    role: "Visual Designer",
    avatar:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=900&auto=format&fit=crop",
    link: "#",
  },
];

export default function TeamSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
      <div className="mx-auto max-w-5xl border-t px-6">
        <span className="-ml-6 -mt-3.5 block w-max bg-gray-50 px-6 text-xs uppercase tracking-[0.14em] text-muted-foreground dark:bg-gray-950">
          Team
        </span>
        <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
          <div className="sm:w-2/5">
            <h2 className="text-3xl font-bold sm:text-4xl">Our dream team</h2>
          </div>
          <div className="mt-6 sm:mt-0">
            <p>
              During the working process, we perform regular fitting with the
              client because they are the only person who can feel whether a new
              suit fits or not.
            </p>
          </div>
        </div>
        <div className="mt-12 md:mt-24">
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, index) => (
              <div key={index} className="group overflow-hidden">
                <img
                  className="h-96 w-full rounded-md object-cover object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl"
                  src={member.avatar}
                  alt="team member"
                  width="826"
                  height="1239"
                />
                <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                  <div className="flex justify-between">
                    <h3 className="text-base font-medium transition-all duration-500 group-hover:tracking-wider">
                      {member.name}
                    </h3>
                    <span className="text-xs">_0{index + 1}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="inline-block translate-y-6 text-sm text-muted-foreground opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {member.role}
                    </span>
                    <a
                      href={member.link}
                      className="inline-flex items-center gap-1 translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      Linktree
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
