import { buttonVariants } from "@/components/ui/button"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import CreateReview from "@/components/CreateReview"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { getReviews } from "@/utils/actions/database/getReviews"
import { getStory, getStoryReturnType } from "@/utils/actions/database/getStory"
import getUserInfo from "@/utils/actions/database/getUserinfo"
import getSession from "@/utils/actions/database/getSession"
import { Bookmark, BotIcon, MessageSquareText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import DeleteReview from "@/components/DeleteReview"
import NotFound from "@/app/not-found"
import { createClient } from "@/utils/supabase/server"

export default async function StoryDetails({
	params,
	searchParams,
}: {
	params: { id: string }
	searchParams: { isReview: boolean }
}) {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const user_id = user?.id

	let story: getStoryReturnType | null

	try {
		story = await getStory(params.id)
	} catch (error) {
		return <NotFound />
	}

	let author = await getUserInfo(story?.user_id!!)

	// if the story is private and the current user is not the author, 404 since its nun of their business
	if (story?.published === false && author.data.user_id != user_id)
		return <NotFound />

	const accountInfo = [author.stories!!, 20, 570]

	const icons = ["/icons/book.png", "/icons/star.png", "/icons/bookmark.png"]

	const reviews = await getReviews({
		storyId: Number(params.id),
		commentsCount: 20,
	})

	const currentUser = await getSession()

	return (
		<main className="flex flex-col w-full mx-auto gap-2 py-8 my-12">
			<div className="flex flex-col w-full mx-auto">
				<TracingBeam className="pt-6 pb-10">
					<h1
						style={{
							textShadow: "0em 0em 0.3em rgba(255,255,255,0.6)",
						}}
						className="text-4xl font-bold mb-5"
					>
						{story?.title!!}
					</h1>
					<TextGenerateEffect
						className="max-w-4xl tracking-wider"
						words={story!!.story!!}
					/>
				</TracingBeam>
				<div className="flex flex-col w-full mx-auto max-w-5xl">
					<p className="font-mono text-sm mb-2 text-white/35">Generated by</p>
					<div className="flex items-center gap-3 w-full">
						<a href="" className="w-[fit-content]">
							<Image
								src={author.data.image || "/icons/pfp1.png"}
								width={150}
								height={150}
								alt="Author"
								className="cursor-pointer w-9 h-9 rounded-full"
							/>
						</a>
						<div className="flex flex-col gap-1">
							<a href="" className="w-[fit-content]">
								<h2
									style={{
										textShadow: "0em 0em 0.3em white",
									}}
									className="text-base font-bold cursor-pointer hover:underline w-full"
								>
									{author.data.name!!}
								</h2>
							</a>
							<div className="flex flex-row text-start">
								{accountInfo.map((info: any, index) => (
									<div className="flex items-start gap-0" key={index}>
										<img
											className="h-[0.8rem] w-[0.8rem] mr-1 invert"
											src={icons[index]}
										></img>
										<span
											style={{
												textShadow: "0em 0em 0.4em white",
											}}
											className="text-xs font-bold mr-2"
										>
											{info}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="flex items-center gap-3 w-full pt-4 mb-7">
						<TooltipProvider delayDuration={300}>
							<Tooltip>
								<TooltipTrigger>
									<Link
										className={buttonVariants({
											variant: "outline",
										})}
										href={""}
									>
										<BotIcon className="size-5 mx-4 my-2"></BotIcon>
									</Link>
								</TooltipTrigger>
								<TooltipContent
									className="p-0 m-0 border-none outline-none font-mono bg-transparent text-xs font-extralight"
									side="bottom"
								>
									<p
										style={{
											textShadow: "0em 0em 0.3em white",
										}}
									>
										Remix generation
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						{story?.user_id != currentUser.user?.id && (
							<>
								<TooltipProvider delayDuration={300}>
									<Tooltip>
										<TooltipTrigger>
											<Dialog defaultOpen={searchParams.isReview}>
												<DialogTrigger asChild>
													<Link
														className={buttonVariants({
															variant: "outline",
														})}
														href={""}
													>
														<MessageSquareText className="size-4 mx-4 my-2"></MessageSquareText>
													</Link>
												</DialogTrigger>
												<DialogContent className="sm:max-w-[425px]">
													<DialogHeader>
														<DialogTitle>Add a review</DialogTitle>
													</DialogHeader>
													<CreateReview
														storyId={story?.id!!}
														authorId={currentUser!!.user!!.id}
													/>
												</DialogContent>
											</Dialog>
										</TooltipTrigger>
										<TooltipContent
											className="z-2 p-0 m-0 border-none outline-none font-mono bg-transparent text-xs font-extralight"
											side="bottom"
										>
											<p
												style={{
													textShadow: "0em 0em 0.3em white",
												}}
											>
												Add a review
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<TooltipProvider delayDuration={300}>
									<Tooltip>
										<TooltipTrigger>
											<Link
												className={buttonVariants({
													variant: "outline",
												})}
												href={""}
											>
												<Bookmark className="size-4 mx-4 my-2"></Bookmark>
											</Link>
										</TooltipTrigger>
										<TooltipContent
											className="p-0 m-0 border-none outline-none font-mono bg-transparent text-xs font-extralight"
											side="bottom"
										>
											<p
												style={{
													textShadow: "0em 0em 0.3em white",
												}}
											>
												Add to library
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</>
						)}
					</div>
					<p className="font-mono text-sm mb-2 text-white/60">Reviews</p>
					<div className="container h-[30vh] overflow-y-auto overflow-x-hidden border border-white/15 bg-black/10 border-solid rounded-lg p-5 flex flex-col items-start gap-3 w-full pt-4">
						{reviews!!.length == 0 ? (
							<>No reviews (yet...)</>
						) : (
							<>
								{reviews!!.map(async (rev, index) => (
									<div
										className="flex flex-col gap-2 mx-auto w-[60rem]"
										key={index}
									>
										<div className="my-2">
											<div className="flex justify-between">
												<div className="flex flex-row gap-2">
													<a href="" className="w-[fit-content]">
														<img
															className="w-6 h-6 rounded-full"
															src={
																(await getUserInfo(rev.user_id)).data!!
																	.image!! || "/icons/pfp1.png"
															}
														></img>
													</a>
													<a
														href=""
														className="w-[fit-content] h-[fit-content]"
													>
														<h2
															style={{
																textShadow: "0em 0em 0.3em white",
															}}
															className="text-sm cursor-pointer hover:underline w-full"
														>
															{(await getUserInfo(rev.user_id)).data.name}
														</h2>
													</a>
												</div>
												{rev.user_id == currentUser.user?.id && (
													<DeleteReview
														commentId={rev.comment_id}
														storyId={story?.id!!}
													/>
												)}
											</div>
											<p className="text-[14px] p-[0.1rem] mt-0 font-mono text-white/50">
												{rev.comment}
											</p>
										</div>
										<div className="mx-auto w-full h-[0.01rem] bg-white/5"></div>
									</div>
								))}
							</>
						)}
					</div>
				</div>
			</div>
		</main>
	)
}
