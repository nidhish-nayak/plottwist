import Link from "next/link"

import AuthButton from "@/components/AuthButton"
import ProfileDropdown from "@/components/ProfileDropdown"
import { cn } from "@/lib/utils"
import { AlignRight } from "lucide-react"
import { links } from "./Sidebar"
import { Button, buttonVariants } from "./ui/button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import CardForLimit from "@/components/CardForLimit";
import { getMaxStories } from "@/utils/actions/database/getMaxStories"

export default async function Header(
	{
		email,
		userId,
		username
	}: { email: string | undefined, username: string | any, userId: string | undefined }) {
	const storiesData = await getMaxStories()

	return (
		<nav className="fixed z-30 flex items-center justify-center w-full h-16 border-b bg-zinc-950 border-secondary">
			<div className="flex items-center justify-between w-full px-[5vw] text-sm">
				<Link href="/">
					<div className="font-semibold text-md">
						<p
							style={{ fontFamily: "Cabin, sans-serif" }}
							className="text-xl italic"
						>
							plottwist.
						</p>
					</div>
				</Link>
				<div className="flex gap-3">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" className="hidden max-lg:block">
								<AlignRight />
							</Button>
						</SheetTrigger>
						<SheetContent className="flex flex-col justify-between h-full pb-40">
							<nav className="flex flex-col mt-4 gap-9">
								{links.map((link, index) => (
									<SheetClose asChild>
										<Link
											key={index}
											href={link.href}
											className={cn(
												buttonVariants({ variant: "ghost" }),
												"flex justify-start items-center gap-3 px-3.5 py-2.5 hover:bg-secondary"
											)}
										>
											<span className="block">{link.icon}</span>
											<span>
												{link.text}
											</span>
										</Link>
									</SheetClose>
								))}
							</nav>
							<CardForLimit stories={storiesData!!.storyCount!!} />
						</SheetContent>
					</Sheet>
					{email && userId ? <ProfileDropdown email={email} username={username} /> : <AuthButton />}
				</div>
			</div>
		</nav>
	)
}
