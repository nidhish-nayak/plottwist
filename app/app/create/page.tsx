import CreatePrompt from "@/components/CreatePrompt"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function Create() {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const user_id = user?.id
	if (!user_id) redirect("/login")

	return (
		<main className="flex flex-col flex-1 my-4 md:p-10 justify-start items-center w-full md:w-fit">
			<CreatePrompt />
		</main>
	)
}
